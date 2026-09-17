"""Reproduce review observations in temporary workspaces without changing the harness."""

import http.server
import json
import os
from pathlib import Path
import subprocess
import tempfile
import threading
import urllib.request


ROOT = Path(__file__).resolve().parents[4]


def probe_simplify_hook():
    hook = ROOT / "hooks/simplify-ignore.sh"
    with tempfile.TemporaryDirectory(prefix="harness-review-filter-") as temporary:
        source = Path(temporary) / "example.js"
        source.write_text(
            "// simplify-ignore-start\n"
            "function preserved() { return 42; }\n"
            "// simplify-ignore-end\n"
            "console.log(preserved());\n"
        )
        environment = dict(os.environ, CLAUDE_PROJECT_DIR=temporary)

        def run_hook(payload):
            return subprocess.run(
                ["bash", str(hook)], input=json.dumps(payload), text=True,
                capture_output=True, env=environment, timeout=15,
            )

        baseline = subprocess.run(
            ["node", str(source)], capture_output=True, text=True, timeout=15,
        )
        read = run_hook({"tool_name": "Read", "tool_input": {"file_path": str(source)}})
        after_read = subprocess.run(
            ["node", str(source)], capture_output=True, text=True, timeout=15,
        )
        with source.open("a") as output:
            output.write("// edit made by another tool\n")
        stop = run_hook({})
        return {
            "baseline_exit": baseline.returncode,
            "read_hook_exit": read.returncode,
            "runtime_exit_after_read": after_read.returncode,
            "runtime_error": next(
                (line for line in after_read.stderr.splitlines() if "ReferenceError" in line), "",
            ),
            "stop_hook_exit": stop.returncode,
            "other_tool_edit_preserved": "// edit made by another tool" in source.read_text(),
            "protected_function_restored": "function preserved()" in source.read_text(),
        }


def probe_cache_freshness():
    state = {"body": "version one", "etag": '"v1"'}

    class Handler(http.server.BaseHTTPRequestHandler):
        def log_message(self, *args):
            pass

        def do_GET(self):
            self.send_response(200)
            self.send_header("ETag", state["etag"])
            self.end_headers()
            self.wfile.write(state["body"].encode())

        def do_HEAD(self):
            matches = self.headers.get("If-None-Match") == state["etag"]
            self.send_response(304 if matches else 200)
            self.send_header("ETag", state["etag"])
            self.end_headers()

    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        with tempfile.TemporaryDirectory(prefix="harness-review-cache-") as temporary:
            url = f"http://127.0.0.1:{server.server_port}/docs"
            with urllib.request.urlopen(url, timeout=5) as response:
                original_body = response.read().decode()
            state.update(body="version two", etag='"v2"')
            environment = dict(os.environ, CLAUDE_PROJECT_DIR=temporary)
            tool_input = {"url": url, "prompt": "Return current content"}
            post = subprocess.run(
                ["bash", str(ROOT / "hooks/sdd-cache-post.sh")],
                input=json.dumps({"tool_input": tool_input, "tool_response": original_body}),
                text=True, capture_output=True, env=environment, timeout=15,
            )
            cache_file = next((Path(temporary) / ".claude/sdd-cache").glob("*.json"))
            cache = json.loads(cache_file.read_text())
            pre = subprocess.run(
                ["bash", str(ROOT / "hooks/sdd-cache-pre.sh")],
                input=json.dumps({"tool_input": tool_input}),
                text=True, capture_output=True, env=environment, timeout=15,
            )
            return {
                "post_exit": post.returncode,
                "cached_body": cache["content"],
                "cached_etag": cache["etag"],
                "current_origin_body": state["body"],
                "pre_exit": pre.returncode,
                "claims_revalidated": "Revalidated via HTTP 304" in pre.stderr,
                "returned_old_body": original_body in pre.stderr,
            }
    finally:
        server.shutdown()
        server.server_close()
        thread.join()


if __name__ == "__main__":
    revision = subprocess.check_output(
        ["git", "rev-parse", "HEAD"], cwd=ROOT, text=True,
    ).strip()
    paths = ["hooks/simplify-ignore.sh", "hooks/sdd-cache-pre.sh", "hooks/sdd-cache-post.sh"]
    blobs = {
        path: subprocess.check_output(
            ["git", "hash-object", path], cwd=ROOT, text=True,
        ).strip()
        for path in paths
    }
    print(json.dumps({
        "reviewed_revision": revision,
        "source_blobs": blobs,
        "simplify_hook": probe_simplify_hook(),
        "cache_freshness": probe_cache_freshness(),
    }, indent=2))

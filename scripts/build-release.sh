#!/bin/sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname "$0")" && pwd)
REPO_DIR=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
DIST_DIR="$REPO_DIR/dist"
XPI_NAME="pdf-ai-bookmarks.xpi"
RELEASE_URL="https://github.com/edwintuan/pdf-ai-bookmarks/releases/download/xpi/$XPI_NAME"
ADDON_ID="pdf-ai-bookmarks@edwintuan.com"

VERSION=$(python3 -c 'import json, pathlib; print(json.loads(pathlib.Path("manifest.json").read_text())["version"])')
VERSIONED_XPI_NAME="pdf-ai-bookmarks-$VERSION.xpi"

rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

cd "$REPO_DIR"
zip -X -r "$DIST_DIR/$XPI_NAME" \
    manifest.json \
    bootstrap.js \
    icon.svg \
    pdf-ai-bookmarks.js \
    preferences.js \
    preferences.xhtml \
    prefs.js \
    lib \
    locale >/dev/null

cp "$DIST_DIR/$XPI_NAME" "$DIST_DIR/$VERSIONED_XPI_NAME"

HASH=$(shasum -a 512 "$DIST_DIR/$XPI_NAME" | awk '{print $1}')

python3 - "$REPO_DIR/update.json" "$VERSION" "$RELEASE_URL" "$HASH" "$ADDON_ID" <<'PY'
import json
import pathlib
import sys

update_path = pathlib.Path(sys.argv[1])
version = sys.argv[2]
release_url = sys.argv[3]
hash_value = sys.argv[4]
addon_id = sys.argv[5]

payload = {
    "addons": {
        addon_id: {
            "updates": [
                {
                    "version": version,
                    "update_link": release_url,
                    "update_hash": f"sha512:{hash_value}",
                    "applications": {
                        "zotero": {
                            "strict_min_version": "8.0",
                            "strict_max_version": "10.*",
                        }
                    },
                }
            ]
        }
    }
}

update_path.write_text(json.dumps(payload, indent=2) + "\n")
PY

cp "$REPO_DIR/update.json" "$DIST_DIR/update.json"

printf 'Built %s\n' "$DIST_DIR/$XPI_NAME"
printf 'Copied %s\n' "$DIST_DIR/$VERSIONED_XPI_NAME"
printf 'Updated %s\n' "$REPO_DIR/update.json"

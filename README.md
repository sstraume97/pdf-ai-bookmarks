# PDF AI Bookmarks for Zotero

A Zotero 8/9 plugin that automatically generates hierarchical PDF bookmarks (outlines/table of contents) using Google's Gemini AI.

## Features

- **One-click bookmark generation** - Generate comprehensive bookmarks from the Tools menu
- **AI-powered analysis** - Uses Gemini AI to analyze PDF structure and create accurate bookmarks
- **Hierarchical structure** - Properly nested chapters, sections, and subsections
- **Large file support** - Uses Gemini's Files API and splits oversized PDFs into chunks when necessary
- **Preserves annotations** - Only modifies bookmarks, leaving your highlights and notes intact

## Installation

1. Download the latest `pdf-ai-bookmarks.xpi` from the [Releases](https://github.com/edwintuan/pdf-ai-bookmarks/releases) page
2. In Zotero, go to **Tools → Add-ons**
3. Click the gear icon and select **Install Add-on From File...**
4. Select the downloaded `.xpi` file
5. Restart Zotero

Automatic updates are served from [raw `update.json`](https://raw.githubusercontent.com/edwintuan/pdf-ai-bookmarks/main/update.json) and download the latest release asset from GitHub Releases.

## Configuration

1. Go to **Zotero → Settings → PDF AI Bookmarks** on macOS, or **Edit → Settings → PDF AI Bookmarks** on Windows/Linux
2. Enter your [Google Gemini API Key](https://aistudio.google.com/app/apikey)
3. Click OK to save

## Usage

1. Open a PDF in Zotero's reader, or select an item with a PDF attachment
2. Go to **Tools → Generate PDF AI Bookmarks**
3. Wait for the AI to analyze the document and generate bookmarks
4. Reload the PDF tab to see the new bookmarks

## Requirements

- Zotero 8.0 or 9.x
- Google Gemini API key (free tier available)

## How It Works

The plugin:
1. Reads the PDF file from your Zotero library
2. Sends it to Gemini AI for structure analysis
3. Receives a hierarchical list of bookmarks with page numbers
4. Writes the bookmarks directly into the PDF file

For larger PDFs, the plugin uploads the document via Gemini's Files API instead of embedding the PDF inline in the request payload. If a PDF exceeds Gemini's per-file PDF limits, the plugin splits it into smaller chunks, processes them separately, and merges the resulting bookmarks.

## Limitations

- Bookmark quality depends on the PDF's structure and readability
- Very large PDFs may take several minutes to process
- Requires an active internet connection

## Release Helper

Run `sh scripts/build-release.sh` to:

1. build `dist/pdf-ai-bookmarks.xpi`
2. copy `dist/pdf-ai-bookmarks-<version>.xpi`
3. recompute the SHA-512 in `update.json`

Upload the refreshed `dist/pdf-ai-bookmarks.xpi` asset to the GitHub release/tag named `xpi`.

## License

MIT License

## Acknowledgments

- [pdf-lib](https://pdf-lib.js.org/) - PDF manipulation library
- [Google Gemini](https://ai.google.dev/) - AI model for document analysis

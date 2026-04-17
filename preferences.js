window.PDFAIBookmarks_Preferences = {
    init: function () {
        Zotero.debug("PDF AI Bookmarks: Initialize preference pane");

        const apiKeyInput = document.getElementById("pdf-ai-bookmarks-api-key");
        const polishCheckbox = document.getElementById("pdf-ai-bookmarks-polish");

        const currentApiKey = Zotero.Prefs.get('extensions.pdf-ai-bookmarks.apiKey', true);
        const currentPolish = Zotero.Prefs.get('extensions.pdf-ai-bookmarks.polish', true);

        if (currentApiKey && !apiKeyInput.value) {
            apiKeyInput.value = currentApiKey;
        }

        if (typeof currentPolish === "boolean") {
            polishCheckbox.checked = currentPolish;
        } else {
            polishCheckbox.checked = true;
        }
    }
};

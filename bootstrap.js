var PDFAIBookmarks;
var PDFAIBookmarks_MenuRegistration = null;
const PDFAIBookmarks_PLUGIN_ID = "pdf-ai-bookmarks@edwintuan.com";

function log(msg) {
    Zotero.debug("PDF AI Bookmarks: " + msg);
}

function install() {
    log("Installed");
}

async function startup({ id, version, rootURI }) {
    log("Starting " + version);

    if (Zotero.initializationPromise) {
        await Zotero.initializationPromise;
    }

    // Register preferences pane
    Zotero.PreferencePanes.register({
        pluginID: PDFAIBookmarks_PLUGIN_ID,
        src: rootURI + 'preferences.xhtml',
        scripts: [rootURI + 'preferences.js']
    });

    // Load pdf-lib library
    Services.scriptloader.loadSubScript(rootURI + 'lib/pdf-lib.js');

    // Load main plugin logic
    Services.scriptloader.loadSubScript(rootURI + 'pdf-ai-bookmarks.js');
    PDFAIBookmarks.init({ id, version, rootURI, pluginID: PDFAIBookmarks_PLUGIN_ID });
    PDFAIBookmarks.addToAllWindows();
    PDFAIBookmarks_MenuRegistration = PDFAIBookmarks.registerMenu();
}

function onMainWindowLoad({ window }) {
    if (PDFAIBookmarks) {
        PDFAIBookmarks.addToWindow(window);
    }
}

function onMainWindowUnload() {}

function shutdown() {
    log("Shutting down");

    if (PDFAIBookmarks) {
        PDFAIBookmarks.unregisterMenu(PDFAIBookmarks_MenuRegistration);
    }
    PDFAIBookmarks_MenuRegistration = null;

    if (Zotero.PreferencePanes && typeof Zotero.PreferencePanes.unregister === "function") {
        Zotero.PreferencePanes.unregister(PDFAIBookmarks_PLUGIN_ID);
    }

    PDFAIBookmarks = undefined;
}

function uninstall() {
    log("Uninstalled");
}

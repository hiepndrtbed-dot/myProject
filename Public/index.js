
function copyToClipboard() {
    var clipboard = navigator.clipboard;
    var copyText = document.getElementById("copyinput");
    var dataTransferProviders = { "text/plain": copyText.value };
    clipboard.writeText(dataTransferProviders).then(
        () => {
            console.log("Copied Successfully!");
        },
        (err) => {
            console.log("Copied Failed! " + err);
        }
    );
}

function getFromClipboard() {
    var clipboard = navigator.clipboard;
    clipboard.readText().then(
        (result) => {
            document.getElementById("contentresult").value = result["text/plain"];
        },
        (error) => {
            console.log("Get from clipboard Failed : " + error);
        }
    );
}

function showOtherPanel() {
    const pm = require("uxp").pluginManager;
    // find the expected plugin in the loaded plugins
    const inputid = document.getElementById("pluginInput").value;
    const testPlugin = Array.from(pm.plugins).find(plugin => plugin.id === inputid);
    if (testPlugin) {
    //What commands and panels are available?
    const testPanels = Array.from(testPlugin.manifest.panels, command => command.panelId);
    // Show the inspector panel; note that panels can only be made visible -- you can't ask to hide the panel
    testPlugin.showPanel(testPanels);
    }
    else {
        console.log(" Input plugin not added/loaded in host app! ");
    }
}

document.getElementById("copyToClipboard").addEventListener("click", copyToClipboard);

document.getElementById("getFromClipboard").addEventListener("click", getFromClipboard);

document.getElementById("showOtherPanel").addEventListener("click", showOtherPanel);



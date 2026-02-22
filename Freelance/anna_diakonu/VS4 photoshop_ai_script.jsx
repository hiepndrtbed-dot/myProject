// ==========================================
// PHOTOSHOP AI GENERATION SCRIPT - ADOBE STYLE UI
// Workflow: API Setup → Selection → Prompt → Nano-Banana → Results
// ==========================================

// Include JSON support for ExtendScript
#include "json2.js"

// ===== GLOBAL CONFIGURATION =====
var CONFIG = {
    API_KEY: "",
    MODELS: {
         "Stable Diffusion XL": "stability-ai/sdxl"
    },
    MAX_POLL_ATTEMPTS: 60,
    POLL_INTERVAL: 2000, // 2 seconds
    JPEG_QUALITY: 9,
    MAX_DIMENSION: 1280,
    IS_WINDOWS: $.os.indexOf("Windows") !== -1
};

// ===== GLOBAL STATE =====
var PROCESS_CANCELLED = false;
var progressWindow = null;

// ==========================================
// 1. API KEY MANAGEMENT & SECURITY
// ==========================================

function initializeAPIKey() {
    CONFIG.API_KEY = loadAPIKey();
    
    if (!CONFIG.API_KEY || CONFIG.API_KEY.length < 10) {
        CONFIG.API_KEY = promptForAPIKey();
        
        if (CONFIG.API_KEY && CONFIG.API_KEY.length > 10) {
            if (testAPIConnection(CONFIG.API_KEY)) {
                saveAPIKey(CONFIG.API_KEY);
                return true;
            } else {
                alert("API key test failed. Please check your key and try again.");
                return false;
            }
        } else {
            alert("Valid API key required to continue.");
            return false;
        }
    }
    
    return true;
}

function promptForAPIKey() {
    var dialog = new Window("dialog", "Replicate API Key Required");
    dialog.orientation = "column";
    dialog.alignChildren = "fill";
    dialog.preferredSize.width = 450;
    dialog.margins = 15;
    dialog.spacing = 10;
    
    var instructionPanel = dialog.add("panel", undefined, "API Setup");
    instructionPanel.alignChildren = "left";
    instructionPanel.margins = 10;
    
    instructionPanel.add("statictext", undefined, "1. Go to replicate.com and create an account");
    instructionPanel.add("statictext", undefined, "2. Visit replicate.com/account/api-tokens");
    instructionPanel.add("statictext", undefined, "3. Copy your API token (starts with 'r8_')");
    instructionPanel.add("statictext", undefined, "4. Paste it below:");
    
    var inputGroup = dialog.add("group");
    inputGroup.add("statictext", undefined, "API Key:");
    var apiKeyInput = inputGroup.add("edittext", undefined, "");
    apiKeyInput.characters = 40;
    apiKeyInput.active = true;
    
    var buttonGroup = dialog.add("group");
    buttonGroup.alignment = "center";
    var okButton = buttonGroup.add("button", undefined, "OK");
    var cancelButton = buttonGroup.add("button", undefined, "Cancel");
    
    okButton.onClick = function() {
        if (apiKeyInput.text.length < 10) {
            alert("Please enter a valid API key");
            return;
        }
        dialog.close(1);
    };
    
    cancelButton.onClick = function() {
        dialog.close(0);
    };
    
    var result = dialog.show();
    return (result == 1) ? apiKeyInput.text : null;
}

function testAPIConnection(apiKey) {
    try {
        var testFile = new File(Folder.temp + "/api_test_" + new Date().getTime() + ".json");
        var curlArgs = '-s -H "Authorization: Token ' + apiKey + '" "https://api.replicate.com/v1/account"';
        
        var response = executeCurl(curlArgs, testFile.fsName, true);
        if (!response) return false;

        try {
            var data = JSON.parse(response);
            if (data && data.username) {
                return true;
            }
        } catch (jsonError) {
            alert("Error parsing JSON: " + jsonError.message);
            return false;
        }
    } catch(e) {
        alert("API error: " + e.message);
        return false;
    }
    return false;
}

function getPreferencesFile() {
    var prefsFolder = new Folder(Folder.userData + "/PhotoshopAI");
    if (!prefsFolder.exists) {
        prefsFolder.create();
    }
    return new File(prefsFolder + "/api_key.json");
}

function saveAPIKey(apiKey) {
    try {
        var prefsFile = getPreferencesFile();
        prefsFile.open("w");
        prefsFile.write('{"apiKey":"' + apiKey + '"}');
        prefsFile.close();
        return true;
    } catch(e) {
        alert("Error saving API key: " + e.message);
        return false;
    }
}

function loadAPIKey() {
    try {
        var prefsFile = getPreferencesFile();
        if (prefsFile.exists) {
            prefsFile.open("r");
            var content = prefsFile.read();
            prefsFile.close();
            
            var match = content.match(/"apiKey"\\s*:\\s*"([^"]+)"/);
            if (match && match[1]) {
                return match[1];
            }
        }
    } catch(e) {
        alert("Error loading API key: " + e.message);
    }
    return null;
}

// ==========================================
// 2. SELECTION VALIDATION
// ==========================================

function validateSelection() {
    try {
        if (!app.documents.length) {
            alert("Please open an image in Photoshop first!");
            return false;
        }
        
        var bounds = app.activeDocument.selection.bounds;
        if (!bounds || bounds.length !== 4) {
            alert("Please make a selection using any selection tool first!");
            return false;
        }
        
        // Check if selection is too small
        var width = bounds[2].value - bounds[0].value;
        var height = bounds[3].value - bounds[1].value;
        
        if (width < 50 || height < 50) {
            alert("Selection is too small. Please make a larger selection.");
            return false;
        }
        
        return true;
    } catch(e) {
        alert("Please make a selection first using any selection tool!");
        return false;
    }
}

// ==========================================
// 3. ADOBE-STYLE MODEL SELECTION DIALOG
// ==========================================

function createAdobeStyleDialog() {
    var dialog = new Window("dialog", "Choose an Adobe model");
    dialog.orientation = "column";
    dialog.alignChildren = "fill";
    dialog.preferredSize.width = 450;
    dialog.preferredSize.height = 400;
    dialog.margins = 0;
    dialog.spacing = 0;
    
    // Header with close button
    var headerGroup = dialog.add("group");
    headerGroup.orientation = "row";
    headerGroup.alignChildren = "center";
    headerGroup.alignment = "fill";
    headerGroup.margins = [15, 15, 15, 10];
    
    var titleText = headerGroup.add("statictext", undefined, "Choose an Adobe model");
    titleText.graphics.font = ScriptUI.newFont(titleText.graphics.font.name, ScriptUI.FontStyle.BOLD, 14);
    
    headerGroup.add("panel"); // spacer
    
    var closeBtn = headerGroup.add("button", undefined, "✕");
    closeBtn.preferredSize = [25, 25];
    closeBtn.onClick = function() { dialog.close(0); };
    
    // Model selection area
    var modelPanel = dialog.add("panel");
    modelPanel.orientation = "column";
    modelPanel.alignChildren = "fill";
    modelPanel.alignment = "fill";
    modelPanel.margins = [15, 10, 15, 10];
    
    // Nano-Banana model item
    var modelGroup = modelPanel.add("group");
    modelGroup.orientation = "row";
    modelGroup.alignChildren = "center";
    modelGroup.alignment = "fill";
    modelGroup.preferredSize.height = 50;
    
    var modelIcon = modelGroup.add("panel");
    modelIcon.preferredSize = [40, 40];
    
    var modelInfo = modelGroup.add("group");
    modelInfo.orientation = "column";
    modelInfo.alignChildren = "left";
    modelInfo.alignment = "fill";
    
    var modelName = modelInfo.add("statictext", undefined, "Nano-Banana (Gemini)");
    modelName.graphics.font = ScriptUI.newFont(modelName.graphics.font.name, ScriptUI.FontStyle.BOLD, 12);
    
    var modelDate = modelInfo.add("statictext", undefined, "Released October 2024");
    modelDate.graphics.font = ScriptUI.newFont(modelDate.graphics.font.name, ScriptUI.FontStyle.REGULAR, 10);
    
    var checkIcon = modelGroup.add("statictext", undefined, "✓");
    checkIcon.graphics.font = ScriptUI.newFont(checkIcon.graphics.font.name, ScriptUI.FontStyle.BOLD, 16);
    
    // Reference image section
    var refGroup = dialog.add("group");
    refGroup.orientation = "row";
    refGroup.alignment = "fill";
    refGroup.margins = [15, 5, 15, 5];
    
    refGroup.add("statictext", undefined, "Reference Image (Optional):");
    var refButton = refGroup.add("button", undefined, "Browse...");
    refButton.preferredSize.width = 80;
    
    var refText = dialog.add("statictext", undefined, "No reference image selected");
    refText.alignment = "fill";
    refText.margins = [15, 0, 15, 10];
    refText.graphics.font = ScriptUI.newFont(refText.graphics.font.name, ScriptUI.FontStyle.ITALIC, 10);
    
    dialog.referenceFile = null;
    
    refButton.onClick = function() {
        var file = File.openDialog("Select reference image", "*.jpg;*.jpeg;*.png;*.bmp;*.tiff");
        if (file) {
            refText.text = "Reference: " + file.name;
            dialog.referenceFile = file;
        }
    };
    
    // Prompt input area (Adobe style)
    var promptGroup = dialog.add("group");
    promptGroup.orientation = "row";
    promptGroup.alignment = "fill";
    promptGroup.margins = [15, 0, 15, 10];
    
    var promptInput = promptGroup.add("edittext", undefined, "What would you like to generate? (Optional)");
    promptInput.alignment = "fill";
    promptInput.preferredSize.height = 35;
    promptInput.graphics.font = ScriptUI.newFont(promptInput.graphics.font.name, ScriptUI.FontStyle.REGULAR, 11);
    
    // Clear placeholder text on focus
    promptInput.onActivate = function() {
        if (this.text === "What would you like to generate? (Optional)") {
            this.text = "";
        }
    };
    
    var promptIcon = promptGroup.add("button", undefined, "⚙");
    promptIcon.preferredSize = [35, 35];
    promptIcon.onClick = function() {
        alert("Advanced options coming soon!");
    };
    
    var moreOptionsBtn = promptGroup.add("button", undefined, "⋯");
    moreOptionsBtn.preferredSize = [35, 35];
    moreOptionsBtn.onClick = function() {
        alert("More options coming soon!");
    };
    
    // Bottom buttons (Adobe style)
    var bottomGroup = dialog.add("group");
    bottomGroup.orientation = "row";
    bottomGroup.alignment = "fill";
    bottomGroup.margins = [15, 10, 15, 15];
    
    var cancelBtn = bottomGroup.add("button", undefined, "Cancel");
    cancelBtn.alignment = "left";
    
    bottomGroup.add("panel"); // spacer
    
    var generateBtn = bottomGroup.add("button", undefined, "Generate");
    generateBtn.alignment = "right";
    generateBtn.preferredSize.width = 100;
    
    // Style the generate button
    generateBtn.fillBrush = generateBtn.graphics.newBrush(generateBtn.graphics.BrushType.SOLID_COLOR, [0.2, 0.4, 0.8, 1]);
    
    // Button handlers
    cancelBtn.onClick = function() { dialog.close(0); };
    
    generateBtn.onClick = function() {
        var prompt = promptInput.text;
        if (prompt === "What would you like to generate? (Optional)") {
            prompt = "";
        }
        
        if (prompt.length === 0) {
            var confirm = Window.confirm("Generate without a prompt? The AI will analyze your selection and create something based on what it sees.");
            if (!confirm) return;
        }
        
        dialog.close(1);
    };
    
    // Store the prompt input for access
    dialog.promptInput = promptInput;
    
    return dialog;
}

function getPromptFromUser() {
    var dialog = createAdobeStyleDialog();
    var result = dialog.show();
    
    if (result == 1) {
        var prompt = dialog.promptInput.text;
        if (prompt === "What would you like to generate? (Optional)") {
            prompt = "";
        }
        
        return {
            prompt: prompt,
            referenceFile: dialog.referenceFile
        };
    }
    
    return null;
}

// ==========================================
// 4. PROGRESS WINDOW
// ==========================================

function createProgressWindow() {
    PROCESS_CANCELLED = false;
    
    progressWindow = new Window("palette", "AI Generation in Progress");
    progressWindow.orientation = "column";
    progressWindow.alignChildren = "fill";
    progressWindow.preferredSize.width = 350;
    progressWindow.margins = 15;
    progressWindow.spacing = 10;
    
    // Status text
    progressWindow.statusText = progressWindow.add("statictext", undefined, "Preparing image...");
    
    // Time estimate
    var timeText = progressWindow.add("statictext", undefined, "This usually takes 10-30 seconds");
    timeText.graphics.font = ScriptUI.newFont(timeText.graphics.font.name, ScriptUI.FontStyle.ITALIC, 10);
    
    // Cancel button
    var cancelBtn = progressWindow.add("button", undefined, "Cancel");
    cancelBtn.onClick = function() {
        PROCESS_CANCELLED = true;
        progressWindow.close();
        progressWindow = null;
    };
    
    // Update function
    progressWindow.updateStatus = function(status) {
        try {
            if (progressWindow && progressWindow.statusText) {
                progressWindow.statusText.text = status;
                progressWindow.update();
            }
        } catch(e) {}
    };
    
    progressWindow.show();
    return progressWindow;
}

function closeProgressWindow() {
    if (progressWindow) {
        try {
            progressWindow.close();
            progressWindow = null;
        } catch(e) {}
    }
}

// ==========================================
// 5. IMAGE PROCESSING & EXPORT
// ==========================================

function exportSelection() {
    try {
        var doc = app.activeDocument;
        var bounds = doc.selection.bounds;
        
        // Create a merged copy of the selection
        var tempLayer = doc.artLayers.add();
        tempLayer.name = "Temp Export";
        
        // Copy merged selection
        doc.selection.copy(true); // copy merged
        doc.paste();
        
        // Crop to selection bounds
        var tempDoc = doc.duplicate("temp_export", true);
        tempDoc.crop(bounds);
        
        // Resize if too large
        var width = tempDoc.width.value;
        var height = tempDoc.height.value;
        
        if (width > CONFIG.MAX_DIMENSION || height > CONFIG.MAX_DIMENSION) {
            var scale = CONFIG.MAX_DIMENSION / Math.max(width, height);
            var newWidth = Math.round(width * scale);
            var newHeight = Math.round(height * scale);
            tempDoc.resizeImage(UnitValue(newWidth, "px"), UnitValue(newHeight, "px"));
        }
        
        // Save to temp file
        var tempFile = new File(Folder.temp + "/ai_input_" + new Date().getTime() + ".jpg");
        var saveOptions = new JPEGSaveOptions();
        saveOptions.quality = CONFIG.JPEG_QUALITY;
        tempDoc.saveAs(tempFile, saveOptions, true, Extension.LOWERCASE);
        
        // Cleanup
        tempDoc.close(SaveOptions.DONOTSAVECHANGES);
        tempLayer.remove();
        
        return tempFile;
        
    } catch(e) {
        alert("Error exporting selection: " + e.message);
        return null;
    }
}

function encodeImageBase64(imageFile) {
    try {
        var outputFile = new File(Folder.temp + "/base64_" + new Date().getTime() + ".txt");
        
        if (CONFIG.IS_WINDOWS) {
            var cmd = 'certutil -encode "' + imageFile.fsName + '" "' + outputFile.fsName + '"';
            app.system(cmd);
            
            if (outputFile.exists) {
                outputFile.open("r");
                var data = outputFile.read();
                outputFile.close();
                outputFile.remove();
                
                // Clean certutil format
                data = data.replace(/-----BEGIN CERTIFICATE-----/g, "");
                data = data.replace(/-----END CERTIFICATE-----/g, "");
                data = data.replace(/[\\r\\n\\s]/g, "");
                
                return data;
            }
        } else {
            var cmd = 'base64 -i "' + imageFile.fsName + '" > "' + outputFile.fsName + '"';
            app.system(cmd);
            
            if (outputFile.exists) {
                outputFile.open("r");
                var data = outputFile.read();
                outputFile.close();
                outputFile.remove();
                
                return data.replace(/[\\r\\n\\s]/g, "");
            }
        }
    } catch(e) {
        return null;
    }
    
    return null;
}

// ==========================================
// 6. CURL OPERATIONS
// ==========================================

function checkCurlAvailable() {
    var result = app.system("curl --version");
    if (result !== 0) {
        alert("Error: curl is not available. Please install curl and ensure it is in your system's PATH.");
        return false;
    }
    return true;
}

function executeCurl(curlArgs, outputFile, returnContent) {
    try {
        var command = 'curl ' + curlArgs + ' -o "' + outputFile + '"';
        var result = app.system(command);

        if (result !== 0) {
            alert("Error executing curl. Result code: " + result);
            return null;
        }

        if (returnContent) {
            var file = new File(outputFile);
            file.open("r");
            var content = file.read();
            file.close();
            file.remove();
            return content;
        }

        return true;
    } catch (e) {
        alert("Error executing curl: " + e.message);
        return null;
    }
}

// ==========================================
// 7. NANO-BANANA API INTEGRATION
// ==========================================

function callNanoBananaAPI(imageFile, referenceFile, prompt) {
    try {
        if (progressWindow) progressWindow.updateStatus("Encoding image...");
        
        var base64Data = encodeImageBase64(imageFile);
        if (!base64Data || PROCESS_CANCELLED) {
            return null;
        }
        
        var imageInputArray = ["data:image/jpeg;base64," + base64Data];
        
        // Add reference image if provided
        if (referenceFile && referenceFile.exists) {
            if (progressWindow) progressWindow.updateStatus("Encoding reference image...");
            
            var refBase64Data = encodeImageBase64(referenceFile);
            if (refBase64Data) {
                imageInputArray.unshift("data:image/jpeg;base64," + refBase64Data);
            }
        }
        
        if (progressWindow) progressWindow.updateStatus("Sending to Nano-Banana...");
        
        // Create Nano-Banana payload
        var payload = {
            "version": CONFIG.MODELS["Nano-Banana (Gemini)"],
            "input": {
                "prompt": prompt || "",
                "image_input": imageInputArray
            }
        };
        
        // Write payload to file
        var payloadFile = new File(Folder.temp + "/payload_" + new Date().getTime() + ".json");
        payloadFile.open("w");
        payloadFile.write(JSON.stringify(payload));
        payloadFile.close();
        
        if (PROCESS_CANCELLED) {
            payloadFile.remove();
            return null;
        }
        
        // Make API request
        var responseFile = new File(Folder.temp + "/response_" + new Date().getTime() + ".json");
        var curlArgs = '-s -X POST ' +
                       '-H "Authorization: Token ' + CONFIG.API_KEY + '" ' +
                       '-H "Content-Type: application/json" ' +
                       '-d @"' + payloadFile.fsName + '" ' +
                       '"https://api.replicate.com/v1/predictions"';
        
        var response = executeCurl(curlArgs, responseFile.fsName, true);
        
        payloadFile.remove();
        
        if (!response || PROCESS_CANCELLED) {
            return null;
        }
        
        // Check for immediate success or get prediction ID for polling
        if (response.indexOf('"status":"succeeded"') > -1) {
            return downloadResult(response);
        } else {
            var predictionId = extractPredictionId(response);
            if (predictionId) {
                return pollForResult(predictionId);
            }
        }
        
        return null;
        
    } catch(e) {
        alert("API error: " + e.message);
        return null;
    }
}

function pollForResult(predictionId) {
    for (var i = 0; i < CONFIG.MAX_POLL_ATTEMPTS; i++) {
        if (PROCESS_CANCELLED) return null;
        
        $.sleep(CONFIG.POLL_INTERVAL);
        
        if (progressWindow) {
            var percent = Math.round((i / CONFIG.MAX_POLL_ATTEMPTS) * 100);
            progressWindow.updateStatus("AI is working... " + percent + "%");
        }
        
        var statusFile = new File(Folder.temp + "/status_" + new Date().getTime() + ".json");
        var curlArgs = '-s -H "Authorization: Token ' + CONFIG.API_KEY + '" ' +
                       '"https://api.replicate.com/v1/predictions/' + predictionId + '"';
        
        var response = executeCurl(curlArgs, statusFile.fsName, true);
        
        if (response && !PROCESS_CANCELLED) {
            if (response.indexOf('"status":"succeeded"') > -1) {
                if (progressWindow) progressWindow.updateStatus("Downloading result...");
                return downloadResult(response);
            } else if (response.indexOf('"status":"failed"') > -1) {
                alert("Generation failed");
                return null;
            }
        }
    }
    
    if (!PROCESS_CANCELLED) {
        alert("Request timed out. Please try again.");
    }
    return null;
}

function downloadResult(response) {
    try {
        var outputUrl = extractOutputUrl(response);
        if (!outputUrl) {
            alert("Could not find output URL in response");
            return null;
        }
        
        var resultFile = new File(Folder.temp + "/ai_result_" + new Date().getTime() + ".jpg");
        var curlArgs = '-s -L "' + outputUrl + '"';
        
        if (!executeCurl(curlArgs, resultFile.fsName)) {
            alert("Could not download result");
            return null;
        }
        
        if (resultFile.exists && resultFile.length > 0) {
            return resultFile;
        }
        
        alert("Downloaded file does not exist or is empty");
        return null;
    } catch(e) {
        alert("Download error: " + e.message);
        return null;
    }
}

// ==========================================
// 8. RESULT HANDLING DIALOG
// ==========================================

function showResultDialog(resultFile, prompt, referenceFile) {
    var dialog = new Window("dialog", "Generation Complete!");
    dialog.orientation = "column";
    dialog.alignChildren = "fill";
    dialog.spacing = 15;
    dialog.margins = 20;
    dialog.preferredSize.width = 400;
    
    // Success message
    var successText = dialog.add("statictext", undefined, "Your AI image has been generated successfully!");
    successText.graphics.font = ScriptUI.newFont(successText.graphics.font.name, ScriptUI.FontStyle.BOLD, 12);
    successText.alignment = "center";
    
    // Show generation info
    var infoPanel = dialog.add("panel", undefined, "Generation Details");
    infoPanel.alignChildren = "left";
    infoPanel.margins = 10;
    
    if (prompt && prompt.length > 0) {
        var promptText = infoPanel.add("statictext", undefined, 
            "Prompt: \"" + (prompt.length > 40 ? prompt.substr(0, 40) + "..." : prompt) + "\"");
        promptText.graphics.font = ScriptUI.newFont(promptText.graphics.font.name, ScriptUI.FontStyle.ITALIC, 10);
    } else {
        infoPanel.add("statictext", undefined, "Generated from visual analysis of your selection");
    }
    
    if (referenceFile) {
        var refText = infoPanel.add("statictext", undefined, "Reference image: " + referenceFile.name);
        refText.graphics.font = ScriptUI.newFont(refText.graphics.font.name, ScriptUI.FontStyle.ITALIC, 10);
    }
    
    // Action buttons
    var buttonGroup = dialog.add("group");
    buttonGroup.alignment = "center";
    buttonGroup.spacing = 10;
    
    var saveLayerBtn = buttonGroup.add("button", undefined, "Save as New Layer");
    var rerunBtn = buttonGroup.add("button", undefined, "Re-run");
    var cancelBtn = buttonGroup.add("button", undefined, "Cancel");
    
    // Button styling
    saveLayerBtn.preferredSize.width = 130;
    rerunBtn.preferredSize.width = 80;
    cancelBtn.preferredSize.width = 80;
    
    // Button handlers
    saveLayerBtn.onClick = function() {
        dialog.close();
        insertAsNewLayer(resultFile, prompt);
        resultFile.remove();
    };
    
    rerunBtn.onClick = function() {
        dialog.close();
        resultFile.remove();
        // Restart the generation process
        runGeneration();
    };
    
    cancelBtn.onClick = function() {
        dialog.close();
        resultFile.remove();
    };
    
    dialog.show();
}

function insertAsNewLayer(resultFile, prompt) {
    try {
        var resultDoc = app.open(resultFile);
        
        // Copy the generated image
        resultDoc.selection.selectAll();
        resultDoc.selection.copy();
        resultDoc.close(SaveOptions.DONOTSAVECHANGES);
        
        // Paste into original document as new layer
        app.activeDocument.paste();
        
        // Name the layer
        var newLayer = app.activeDocument.activeLayer;
        if (prompt && prompt.length > 0) {
            newLayer.name = "AI: " + (prompt.length > 20 ? prompt.substr(0, 20) + "..." : prompt);
        } else {
            newLayer.name = "AI Generated";
        }
        
        alert("Generated image added as new layer: " + newLayer.name);
        
    } catch(e) {
        alert("Error inserting image: " + e.message);
    }
}

// ==========================================
// 9. UTILITY FUNCTIONS
// ==========================================

function extractPredictionId(response) {
    try {
        var match = response.match(/"id"\\s*:\\s*"([^"]+)"/);
        return match ? match[1] : null;
    } catch(e) {
        return null;
    }
}

function extractOutputUrl(response) {
    try {
        var match = response.match(/"output"\\s*:\\s*\\[?\\s*"([^"]+)"/);
        return match ? match[1] : null;
    } catch(e) {
        return null;
    }
}

// ==========================================
// 10. MAIN EXECUTION FLOW
// ==========================================

function runGeneration() {
    try {
        // Validate selection
        if (!validateSelection()) {
            return;
        }
        
        // Get prompt and reference from user
        var userInput = getPromptFromUser();
        if (!userInput) {
            return; // User cancelled
        }
        
        // Export selection for processing
        var exportedFile = exportSelection();
        if (!exportedFile) {
            return; // Export failed
        }
        
        // Show progress and send to Nano-Banana
        createProgressWindow();
        
        var resultFile = callNanoBananaAPI(exportedFile, userInput.referenceFile, userInput.prompt);
        
        // Cleanup
        exportedFile.remove();
        closeProgressWindow();
        
        // Handle results
        if (resultFile && !PROCESS_CANCELLED) {
            showResultDialog(resultFile, userInput.prompt, userInput.referenceFile);
        } else if (!PROCESS_CANCELLED) {
            alert("Generation failed. Please try again.");
        }
        
    } catch(e) {
        closeProgressWindow();
        alert("Script error: " + e.message);
    }
}

function main() {
    try {
        if (!checkCurlAvailable()) {
            alert("This script requires curl to be installed. On Windows 10/11 and macOS, curl should be pre-installed.");
            return;
        }
        
        if (!initializeAPIKey()) {
            return;
        }
        
        runGeneration();
        
    } catch(e) {
        closeProgressWindow();
        alert("Script error: " + e.message);
    }
}

// ==========================================
// START SCRIPT EXECUTION
// ==========================================

main();

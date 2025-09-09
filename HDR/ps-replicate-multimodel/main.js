import { app, core } from 'photoshop';
import { DEFAULT_MODELS } from './config.js';

const ls = localStorage;

const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

const statusEl = $("#status");
const resultsGrid = $("#resultsGrid");
const apiTokenInput = $("#apiToken");
const promptInput = $("#prompt");
const respectSelectionCheckbox = $("#respectSelection");
const runBtn = $("#runBtn");
const rerunBtn = $("#rerunBtn");
const modelsConfigContainer = $("#modelsConfig");
const addModelBtn = $("#addModelBtn");

function setStatus(msg) {
  statusEl.textContent = msg || "";
}

function loadState() {
  apiTokenInput.value = ls.getItem("replicate_api_token") || "";
  promptInput.value = ls.getItem("replicate_prompt") || "";
  const savedModels = ls.getItem("replicate_models");
  const models = savedModels ? JSON.parse(savedModels) : DEFAULT_MODELS;
  renderModels(models);
}
function saveState() {
  ls.setItem("replicate_api_token", apiTokenInput.value.trim());
  ls.setItem("replicate_prompt", promptInput.value);
  const models = collectModels();
  ls.setItem("replicate_models", JSON.stringify(models));
}

function renderModels(models) {
  modelsConfigContainer.innerHTML = "";
  models.forEach((m, idx) => {
    const row = document.createElement("div");
    row.className = "card";
    row.innerHTML = `
      <div class="row" style="justify-content:space-between; align-items:center">
        <span class="badge">${m.label || "Model " + (idx+1)}</span>
        <button class="secondary small" data-action="remove">Remove</button>
      </div>
      <label>Label <input type="text" data-field="label" value="${m.label||""}" /></label>
      <label>Owner <input type="text" data-field="owner" value="${m.owner||""}" /></label>
      <label>Name <input type="text" data-field="name" value="${m.name||""}" /></label>
      <label>Version <input type="text" data-field="version" value="${m.version||""}" placeholder="<version hash>"/></label>
    `;
    row.querySelector('[data-action="remove"]').addEventListener("click", () => {
      row.remove();
      saveState();
    });
    row.querySelectorAll("input").forEach(inp => {
      inp.addEventListener("input", saveState);
    });
    modelsConfigContainer.appendChild(row);
  });
}
function collectModels() {
  const rows = modelsConfigContainer.querySelectorAll(".card");
  return Array.from(rows).map(row => ({
    label: row.querySelector('input[data-field="label"]').value.trim(),
    owner: row.querySelector('input[data-field="owner"]').value.trim(),
    name: row.querySelector('input[data-field="name"]').value.trim(),
    version: row.querySelector('input[data-field="version"]').value.trim(),
  })).filter(m => m.owner && m.name && m.version);
}

addModelBtn.addEventListener("click", () => {
  const models = collectModels();
  models.push({ label: "New Model", owner: "", name: "", version: "" });
  renderModels(models);
  saveState();
});

apiTokenInput.addEventListener("input", saveState);
promptInput.addEventListener("input", saveState);

let lastInputs = null;
let lastResults = null;

runBtn.addEventListener("click", async () => {
  try {
    setStatus("Preparing selection...");
    const token = apiTokenInput.value.trim();
    if (!token) throw new Error("Please paste your Replicate API token.");

    const models = collectModels();
    if (!models.length) throw new Error("Please configure at least one model (owner/name/version).");

    const prompt = promptInput.value.trim();
    if (!prompt) throw new Error("Please enter a prompt.");

    const onlySelection = respectSelectionCheckbox.checked;

    const src = await exportSelectionPNG();
    // Run predictions in parallel
    setStatus("Submitting to Replicate...");
    const predicts = await Promise.all(models.map(m => startPrediction(token, m, { prompt, image: src })));

    setStatus("Waiting for results...");
    const outputs = await Promise.all(predicts.map(p => pollPrediction(token, p.id)));

    // Render previews
    resultsGrid.innerHTML = "";
    outputs.forEach((out, i) => {
      const url = extractFirstImageURL(out);
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="badge">${models[i].label || models[i].name}</div>
        <img class="thumb" src="${url}" />
        <div class="actions">
          <button data-action="insert" data-index="${i}">Insert</button>
          <button class="secondary" data-action="rerunOne" data-index="${i}">Re-run</button>
        </div>
        <div class="small">Status: ${out.status}</div>
      `;
      resultsGrid.appendChild(card);
    });

    // Enable global rerun
    rerunBtn.disabled = false;
    lastInputs = { token, models, prompt, src, onlySelection };
    lastResults = outputs;

    // Wire buttons
    resultsGrid.querySelectorAll("button[data-action='insert']").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const i = parseInt(btn.getAttribute("data-index"));
        const out = lastResults[i];
        const url = extractFirstImageURL(out);
        await insertResultIntoSelection(url, onlySelection);
        setStatus("Inserted result as a new layer.");
      });
    });
    resultsGrid.querySelectorAll("button[data-action='rerunOne']").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const i = parseInt(btn.getAttribute("data-index"));
        setStatus("Re-running " + (lastInputs.models[i].label || lastInputs.models[i].name) + "...");
        const p = await startPrediction(lastInputs.token, lastInputs.models[i], { prompt: lastInputs.prompt, image: lastInputs.src });
        const out = await pollPrediction(lastInputs.token, p.id);
        lastResults[i] = out;
        const card = resultsGrid.children[i];
        const img = card.querySelector("img.thumb");
        img.src = extractFirstImageURL(out);
        card.querySelector(".small").textContent = "Status: " + out.status;
        setStatus("Updated result.");
      });
    });

    setStatus("Done. Click Insert to place a result.");
  } catch (err) {
    console.error(err);
    setStatus("Error: " + err.message);
  }
});

rerunBtn.addEventListener("click", async () => {
  if (!lastInputs) return;
  runBtn.click();
});

/** Export the current selection (or full canvas) as a PNG data URL. */
async function exportSelectionPNG() {
  const batchPlay = core.executeAsModal ? core.executeAsModal : (fn) => fn();
  let pngData;
  await batchPlay(async () => {
    const doc = app.activeDocument;
    if (!doc) throw new Error("Open a document first.");
    // If there's a selection, copy the selection to a new temp document
    let hasSelection = false;
    try {
      await app.batchPlay([{ "_obj": "get", "_target": [{ "_ref": "channel", "_enum": "channel", "_value": "selection" }] }], {});
      hasSelection = true; // If no selection, Photoshop throws; catch below
    } catch (e) { hasSelection = false; }

    // Duplicate selection to a new doc
    await app.batchPlay([
      { "_obj": "copyEvent", "copyHint": 0, "_isCommand": True },
    ], {});
    const newDoc = await app.documents.add({ width: app.activeDocument.width, height: app.activeDocument.height, resolution: app.activeDocument.resolution, mode: "RGBColorMode" });
    await app.batchPlay([{ "_obj": "paste", "antiAlias": True }], {});

    // Trim transparent pixels
    await app.batchPlay([{ "_obj": "trim", "trimBasedOn": {"_enum": "trimBasedOn", "_value": "TRIMTRANSPARENT"}, "top": True, "bottom": True, "left": True, "right": True }], {});

    // Save to a temp file as PNG
    const fs = require('uxp').storage.localFileSystem;
    const folder = await fs.getTemporaryFolder();
    const file = await folder.createFile("selection.png", { overwrite: true });
    await app.activeDocument.saveAs.png(file, { compression: 6, interlaced: false });
    // Read back as data URL
    const bin = await file.read({ format: require('uxp').storage.formats.binary });
    const base64 = btoa(String.fromCharCode(...new Uint8Array(bin)));
    pngData = "data:image/png;base64," + base64;

    // Close temp doc without saving, return to original
    await app.activeDocument.closeWithoutSaving();
    await app.documents[0].activate();
  }, { commandName: "Export Selection PNG" });
  return pngData;
}

/** Send prediction start to Replicate */
async function startPrediction(token, model, input) {
  const body = {
    version: model.version,
    input: {
      prompt: input.prompt,
      image: input.image
    }
  };
  const res = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + token
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error("Replicate error: " + t);
  }
  return await res.json();
}

/** Poll prediction until terminal state */
async function pollPrediction(token, id) {
  while (true) {
    const res = await fetch("https://api.replicate.com/v1/predictions/" + id, {
      headers: { "Authorization": "Token " + token }
    });
    if (!res.ok) throw new Error("Polling failed: " + await res.text());
    const data = await res.json();
    if (data.status === "succeeded" || data.status === "failed" || data.status === "canceled") {
      return data;
    }
    await new Promise(r => setTimeout(r, 1500));
  }
}

/** Extract a single image URL from Replicate output */
function extractFirstImageURL(pred) {
  if (!pred || !pred.output) return "";
  if (Array.isArray(pred.output)) {
    const first = pred.output.find(x => typeof x === "string" && (x.startsWith("http") || x.startsWith("data:")));
    if (first) return first;
  }
  if (typeof pred.output === "string") return pred.output;
  if (pred.output && pred.output.image) return pred.output.image;
  return "";
}

/** Insert image URL into document, masked to the current selection if requested. */
async function insertResultIntoSelection(url, onlySelection) {
  await core.executeAsModal(async () => {
    const doc = app.activeDocument;
    if (!doc) throw new Error("Open a document first.");
    // Place the image
    const placed = await app.placeURL({ url });
    const layer = doc.activeLayers[0];

    if (onlySelection) {
      // Create layer mask from current selection
      try {
        await app.batchPlay([{ "_obj": "make", "_target": [{ "_ref": "channel" }], "new": { "_class": "channel" }, "at": { "_ref": "channel", "_enum": "channel", "_value": "mask" }, "using": { "_ref": "channel", "_enum": "channel", "_value": "selection" }, "reveal": True }], {});
      } catch (e) {
        // If no selection, create from layer transparency (fallback)
        await app.batchPlay([{ "_obj": "make", "_target": [{ "_ref": "channel" }], "at": { "_ref": "channel", "_enum": "channel", "_value": "mask" }, "using": { "_ref": "channel", "_enum": "channel", "_value": "transparencyEnum" }, "reveal": True }], {});
      }
    }
  }, { commandName: "Insert Replicate Result" });
}

document.addEventListener("DOMContentLoaded", loadState);

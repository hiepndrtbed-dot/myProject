# Replicate Multi-Model Photoshop Plugin (UXP)

This Photoshop UXP panel lets you:
- Send the current selection (or full canvas) to multiple Replicate models in parallel
- Preview each result
- Insert the chosen result back into your document, masked to the selection

> Note: You must paste valid Replicate model **version** hashes for each model. Version IDs change over time; grab them from replicate.com on the model page.

## Install (Developer Mode)

1. In Photoshop, go to **Plugins → Development → Enable Developer Mode**.
2. Click **Plugins → Development → Load Plugin...** and select this folder.
3. Open **Plugins → Replicate Generator** to show the panel.

## Setup

- Paste your **Replicate API token** (starts with `r8_...`) into the panel.
- Configure one or more models:
  - Label: any friendly name (e.g., Nano Banana)
  - Owner: the model owner on Replicate
  - Name: the model name on Replicate
  - Version: the specific version hash (from the model page's API section)
- Enter your prompt.

## Usage

1. Make a selection in Photoshop (marquee/lasso/etc.).
2. Click **Run on Models**.
3. Wait for previews to appear in the Results grid.
4. Click **Insert** for the version you like; it will be added as a new layer (masked to the selection if that option is checked).
5. You can **Re-run** individual models or all at once.

## Notes & Limitations

- This uses Replicate's generic `/v1/predictions` endpoint. Different models accept different input keys. The default assumes models that take an `image` and a `prompt`. For models that use `mask` or other keys, you can tweak `startPrediction` in `main.js` to pass additional inputs.
- Because model version hashes change, this template **does not** hardcode version IDs. Paste the correct version for each model you want to use (e.g., Nano Banana, Qwen Edit, Flux).
- The "Only selection" option masks the placed result to your current selection. Ensure a selection exists for best results.

## Troubleshooting

- If you see `Replicate error: ...`, double-check your token and version hash.
- If nothing inserts, confirm the output includes a valid image URL.
- UXP permissions: this plugin requests network access to `api.replicate.com` only.

## Customization

- Add more model cards in the panel via **+ Add Model**; they're saved locally.
- Modify `startPrediction` if your chosen models require other parameters (e.g., guidance, steps, seed, mask).

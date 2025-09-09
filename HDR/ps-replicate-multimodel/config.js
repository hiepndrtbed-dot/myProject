// Configure models here. Each entry can use either (owner, name, version)
// OR use a direct 'model' and 'version' for POST /v1/predictions.
// You MUST supply a 'version' hash from replicate.com for reliability.
export const DEFAULT_MODELS = [
  // Example: Nano Banana (placeholder values — paste your current version hash)
  { label: "Nano Banana", owner: "banana-dev", name: "nanobanana", version: "<PASTE_VERSION_HASH>" },
  // Example: Qwen edit (placeholder)
  { label: "Qwen Edit", owner: "qwen", name: "qwen-image-edit", version: "<PASTE_VERSION_HASH>" },
  // Example: Flux (placeholder)
  { label: "Flux", owner: "black-forest-labs", name: "flux", version: "<PASTE_VERSION_HASH>" }
];

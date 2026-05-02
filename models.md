# Model Notes

This project is a static openHASP JSONL viewer/editor. Keep the public editor generic and move user-specific Home Assistant data into external configuration files.

## Core Files

- `viewer.html`: single-page browser editor.
- `server.mjs`: local static server.
- `config/resolutions.json`: common openHASP hardware resolutions.
- `config/project.example.json`: example project-level settings.
- `config/bindings.openhasp.example.json`: example mapping between openHASP objects and automation targets.

## Design Direction

- UI text should stay in English.
- The editor should work without Home Assistant or MQTT.
- Home Assistant automation generation should be driven by config/bindings, not hardcoded entities.
- Preserve undo/redo for destructive editor actions.
- GitHub Pages deployment is static and serves `index.html` plus `viewer.html`.

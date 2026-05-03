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
- Home Assistant export should be driven by config/bindings, not hardcoded entities.
- Keep both export paths available: openHASP HACS config for the custom component and plain MQTT automations as a fallback.
- The Binding Mapper is a friendly editor for common entity/service fields; keep the raw JSON textarea for advanced service data.
- Element icon editing uses the documented openHASP 0.7.0 icon list and a searchable picker; keep keyboard support for Enter, Space, and Escape.
- Screen zoom defaults to auto-fit against the available preview area, with manual zoom still available when disabled.
- Preserve undo/redo for destructive editor actions.
- GitHub Pages deployment is static and serves `index.html` plus `viewer.html`.

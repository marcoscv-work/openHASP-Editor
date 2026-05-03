# openHASP Editor

Static browser viewer and editor for openHASP JSONL page files.

It draws an LVGL-like preview, lets you inspect object IDs and MQTT topic hints, edit page and element properties, drag objects, add or delete pages and elements, undo accidental changes, auto-fit the screen preview, and export a modified JSONL file.

## Start Locally

```bash
npm start
```

Then open:

```text
http://localhost:8787/viewer.html
```

To use another port:

```bash
PORT=8788 npm start
```

The editor can also be served as a static site. `index.html` redirects to `viewer.html`.

## GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`.

After pushing to `main`, enable GitHub Pages in the repository settings with GitHub Actions as the source. Future pushes to `main` will deploy the static editor automatically.

## Home Assistant Export

The export modal uses one shared bindings map and can generate:

- `openHASP HACS Config`: an `openhasp:` YAML configuration with object `properties` and `event` handlers for the openHASP Home Assistant custom component.
- `MQTT Automations`: plain Home Assistant automations that publish/consume openHASP MQTT topics directly.

Use `Detect Bindings` to scan the current JSONL pages and create a starter map. The visual Binding Mapper can edit common `object -> entity/service` mappings without leaving the editor, while the raw JSON remains available for advanced service data.

## Files

- `viewer.html`: complete browser editor.
- `server.mjs`: dependency-free local static server.
- `config/resolutions.json`: common openHASP display presets.
- `config/project.example.json`: reusable project configuration example.
- `config/bindings.openhasp.example.json`: example object-to-Home-Assistant bindings.
- `pages_*.jsonl`: sample openHASP pages.
- `sample-assets/`: sample assets for `L:/...` image paths.

## Notes

This is a visual editor and preview tool, not a full LVGL/openHASP emulator. Fonts, antialiasing, active states, MQTT runtime values, LVGL layout behavior, and firmware default styles can differ from the real device.

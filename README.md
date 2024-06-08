Bitburner TypeScript Project Template
=====================================

This repo provides a bare-bones starting point for developing [Bitburner](https://github.com/bitburner-official/bitburner-src) scripts using TypeScript.

Getting Started
---------------


This project references the official Bitburner typescript definitions using a Git submodule.
You may need to run the following after cloning:

```
git submodule init
git submodule update --recursive
```

Ensure you have all of the required dev dependencies with:

```
npm ci
```

You can build using VSCode (Ctrl-Shift-B by default) or manually on the command line with:

```
npx tsc && node build.mjs
```

This project comes with a single script, `pull.js` which can be used to automatically update scripts from Bitburner.  Manually copy the `pull.js` file using:


```
[somewhere /else/] home
[home /]> nano pull.js
```

The files will, by default, be pulled from `http://localhost:8080`. To start the local development server, run:

```
npm start
```

With the http server running, you can run, e.g.

```
[home /]> alias pull="run pull.js"
[home /]> pull
```

This will automatically download all new and updated scripts to your `home` computer.

Folder Structure
----------------

- `src/` Base folder for scripts.  You can create scripts or subfolders here.
    - `src/shared/` Scripts in this folder are not distributed directly, but are bundled as needed.
- `lib/` Contains the Git submodule for the NetscriptDefinitions.
- `dist/` Compilation output folder, and the root for the HTTP development server.

File Template
-------------

```
import { NS } from "@NS/NetscriptDefinitions";
import { MyType } from "@shared/common";

/** @param {NS} ns */
export async function main(ns: NS) {
  
}
```

import { NS } from "@NS/NetscriptDefinitions";

/** @param {NS} ns */
export async function main(ns: NS) {
  const attempts = 3;
  const delayTime = 2000;

  if (ns.getHostname() != 'home') {
    ns.tprint("Must be run on home.");
    return;
  }

  let baseUrl = ns.args[0];
  if (typeof baseUrl != 'string') {
    baseUrl = 'http://localhost:8080';
  }

  ns.tprint("Pulling from ", baseUrl, "...");

  async function update() {
    let anyUpdated = false;
    let cacheBust = '?date=' + Date.now();
    if (await ns.wget(baseUrl + '/manifest.txt' + cacheBust, 'manifest.txt', 'home')) {
      let manifest = ns.read('manifest.txt').split('\n');
      ns.rm('manifest.txt', 'home');
      for (let file of manifest) {
        let url = baseUrl + file + cacheBust;
        let path = file.replace(/^\//, '');
        let content = ns.read(path);
        if (await ns.wget(url, path, 'home')) {
          let updated = ns.read(path);
          if (updated != content) {
            anyUpdated = true;
            if (content) {
              ns.tprint("Updated ", path);
            } else {
              ns.tprint("Added ", path);
            }
          }
        } else {
          ns.tprint("Error downloading ", url);
        }
      }
    } else {
      ns.tprint("Error downloading manifest.");
    }
    return anyUpdated;
  }

  let changes = false;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    changes = await update();
    if (changes) break;
    if (attempt < attempts - 1) {
      if (attempt == 1) {
        ns.tprint("Watching for changes...");
      }
      await ns.sleep(delayTime);
    }
  }

  if (!changes) {
    ns.tprint("No changes.");
  }
}

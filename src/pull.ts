import { NS } from "@NS/NetscriptDefinitions";

/** @param {NS} ns */
export async function main(ns: NS) {
  let baseUrl = ns.args[0];
  if (typeof baseUrl != 'string') {
    baseUrl = 'http://localhost:8080';
  }
  
  let cacheBust = '?date=' + Date.now();
  ns.tprint("Pulling from ", baseUrl, "...");
  if (await ns.wget(baseUrl + '/manifest.txt' + cacheBust, 'manifest.txt', 'home')) {
    let manifest = ns.read('manifest.txt').split('\n');
    for (let file of manifest) {
      let url = baseUrl + file + cacheBust;
      let path = file.replace(/^\//, '');
      let content = ns.read(path);
      if (await ns.wget(url, path, 'home')) {
        let updated = ns.read(path);
        if (updated != content) {
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
}

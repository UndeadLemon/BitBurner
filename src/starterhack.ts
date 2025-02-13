import { NS } from "@NS/NetscriptDefinitions";

/** @param {NS} ns */
export async function main(ns:NS) {
    let target : string = ns.getHostname()
    while(true) {
        if(ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)){
            await ns.weaken(target)
        }
        else if(ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target)){
            await ns.grow(target)
        }
        else{
            await ns.hack(target)
        }
    }
}
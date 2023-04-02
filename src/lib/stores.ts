import { writable } from "svelte/store";

export const siteTitle = writable('grifstuf');

siteTitle.subscribe((...args) => {console.log(args[0])})

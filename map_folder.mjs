#!/usr/bin/env zx

const map = JSON.parse(process.argv[3])
const pwd = process.argv[4]
Object.entries(map).every(([path, value]) => pwd.includes(path) ? console.log(value) : true)

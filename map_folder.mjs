#!/usr/bin/env zx

import yaml from 'js-yaml'

const map = yaml.load(process.argv[3])
const pwd = process.argv[4]
Object.entries(map).every(([path, value]) => pwd.includes(path) ? console.log(value) : true)

#!/usr/bin/env zx

import yaml from 'js-yaml'

const errorStop = e => {
  console.error(chalk.red(`ERROR: ${e}`))
  process.exit(1)
}

// Arguments
const shellCommand = process.argv[3];
const envType = process.argv[4];

if (!['sftp', 'ssh'].includes(shellCommand)) {
  errorStop("Didn't enter correct shell command")
} else if (!envType) {
  errorStop("Didn't enter in an environment type")
}

// Fetch Aliases
let aliasesConfig;
try {
  aliasesConfig = await $`lando drush site:alias`;
} catch (p) {
  errorStop("Drush failed to return aliases, you're probably not in a Drupal codebase")
}

const aliases = yaml.load(aliasesConfig)
const selectedAliases = Object.entries(aliases).filter(([ alias ]) => alias.endsWith(envType));
if (selectedAliases.length !== 1) {
  errorStop("Didn't find a matching alias for arguments")
}

// Enter the shell
const [, { user, host }] = selectedAliases[0];
await $`${shellCommand} ${user}@${host}`;

# dotfiles

## Current Features:
- bash aliases
- vim config
- tmux config
- vscode settings

## Features:
- `_A` will commit new aliases to the proper bucket
- every sourcing will check for new updates and pull them in
- each environment only gets the config and aliases it needs
    - based on the value in a hidden file created on repo init
- symlinks between files in repo and where the OS needs them to be


## Future Features:
- only do an automated pull down from repo once a day
    - check on date stored in a hidden file with the current day before pulling down
- upon initialization installs desired environment tooling
    - fzf
    - neovim


## Future Future Features:
- getting zsh to work and figuring what it is
- upon initialization installs desired environment tooling
    - a better terminal filesystem?
    - docker?
    - docker-compose?
    - lando?


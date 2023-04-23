#!/bin/bash

ssh -tt person@box.grifstuf.com << EOF
  cd ~/grifstuf
  git fetch && git pull
  cd ./backend
  sudo docker compose down
  sudo docker compose up -d
  exit
EOF

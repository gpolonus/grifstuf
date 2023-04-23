#!/bin/bash

ssh person@box.grifstuf.com << EOF
cd ~/grifstuf
git fetch && git pull
cd ./backend
docker compose down
docker compose up -d
EOF

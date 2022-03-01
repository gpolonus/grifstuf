export VISUAL=vim
export EDITOR="$VISUAL"

alias day-date="date +%m-%d-%Y"

cd ~/dotfiles
if [ -f ".date" -a "$(day-date)" != "$(cat .date)" ]; then
        git fetch && git pull
fi;
day-date > .date
for f in $(cat .env); do source ~/dotfiles/aliases/$f; done
cd -

_A() {
  echo "alias $2=\"$3\"" >> ~/dotfiles/aliases/$1 && _push_up_alias_changes
  source ~/.bash_aliases
}

_D() {
  _A $1 $2 "cd $(pwd)"
}

_push_up_alias_changes() {
        cd ~/dotfiles
        git commit -a -m "Automated Alias Changes"
        git push
        cd -
}

alias ea="vim ~/.bash_aliases"
alias sa="source ~/.bash_aliases"
alias va="cat ~/.bash_aliases"

alias npr="npm run "

alias frep="find ./ -type f | grep"
zcd() {
        cd $(find ./ -type d | fzf)
}
alias fcd="cd ~/project**"
alias fzd="find ./ -type d | fzf"

lert() {
    printf "\e[48;5;196m%03d $1"
    printf '\e[0m'
    echo
}

# colors() {
#         for((i=16; i<256; i++)); do
#         printf "\e[48;5;${i}m%03d" $i;
#         printf '\e[0m';
#         [ ! $((($i - 15) % 6)) -eq 0 ] && printf ' ' || printf '\n'
#         done;
# }


export VISUAL=vim
export EDITOR="$VISUAL"

### DEFAULTS

_load_vars() {
        GIT_BRANCH_PREFIX=""
        JIRA_TICKET_PREFIX=""
        GIT_MAIN_BRANCH="main"
        GIT_DEV_BRANCH="develop"
}

### END DEFAULTS

alias day-date="date +%m-%d-%Y"

cd ~/dotfiles
if [ -f ".date" -a "$(day-date)" != "$(cat .date)" ]; then
        git fetch && git pull
fi;
day-date > .date

LOCAL_ENV_NAME=''
for f in $(cat .env); do
        source ~/dotfiles/aliases/$f
        LOCAL_ENV_NAME="$f"
done
cd -

# Create alias from terminal
# $1 location
# $2 name
# $3 command
_A() {
        if [ -z "$3" ]; then
                ENV="$LOCAL_ENV_NAME"
        else
                ENV="$1"
        fi

        if [ "$1" = "aliases" ]; then
                echo "\nalias $2=\"$3\"" >> ~/dotfiles/bash_aliases && _push_up_alias_changes
                return 1;
        fi

        echo "\nalias $2=\"$3\"" >> ~/dotfiles/aliases/$ENV && _push_up_alias_changes
}

_D() {
        _A $1 "cd $(pwd)"
}

alias ea="code ~/dotfiles"
alias sa="source ~/.bash_aliases"
va() {
        cat ~/aliases/$1
}

_push_up_alias_changes() {
        cd ~/dotfiles
        git add .
        git commit -m "Automated Alias Changes"
        git push
        cd -
        sa
}

mkcd() {
	mkdir $1
	cd $1
}

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

alias dotfiles="cd ~/dotfiles"

empty() {
  [ -z "$1" ]
}

alias lrep="ls | grep "

# things that dont work

# getoption() {
#   while getopts ":$1:" option; do
#     case $option in
#       l)
#         echo "$option"
#         exit;;
#     esac
#   done
# }

# colors() {
#         for((i=16; i<256; i++)); do
#         printf "\e[48;5;${i}m%03d" $i;
#         printf '\e[0m';
#         [ ! $((($i - 15) % 6)) -eq 0 ] && printf ' ' || printf '\n'
#         done;
# }


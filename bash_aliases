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

# Create alias from terminal
# $1 location
# $2 name
# $3 command
_A() {
        if [ -z "$3" ]; then
                echo "Forgot to include some params"
                return 1;
        fi

        if [ "$1" = "aliases" ]; then
                echo "alias $2=\"$3\"" >> ~/dotfiles/bash_aliases && _push_up_alias_changes
                return 1;
        fi

        echo "alias $2=\"$3\"" >> ~/dotfiles/aliases/$1 && _push_up_alias_changes
}

_D() {
        _A $1 $2 "cd $(pwd)"
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

# $1 is the folder-value map as a zsh associative array
# $2 is the working directory from where this command was called
# TODO: Figure out how to pass associative array into this function
# map_folder_to_value() {
#         echo $1
#         declare -A arr
#         arr=${(P)$(echo $1)}
#         # echo $arr
#         echo ${(k)arr}
#         echo ${(k)GIT_BRANCH_PREFIX_MAP}
#         echo ${(v)arr}
#         echo $arr["$(pwd)"]
# }

empty() {
  [ -z "$1" ]
}


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

alias lrep="ls | grep "

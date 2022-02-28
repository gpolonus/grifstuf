export VISUAL=vim
export EDITOR="$VISUAL"

cd ~/dotfiles
git fetch && git pull 
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
alias shared="cd /home/ide/project/docroot/sites/default/modules/shared-components"
alias project="cd /home/ide/project"
alias proj="cd /home/ide/project"
alias theme="cd /home/ide/project/docroot/sites/default/themes/shared-themes"
alias frep="find ./ -type f | grep"
zcd() {
        cd $(find ./ -type d | fzf)
}

latest() {
        theme
        git checkout develop
        gpod
        shared
        git checkout develop
        gpod
        proj
        git checkout develop
        gpod
}


alias ide="cd /home/ide/project"
alias fcd="cd ~/project**"
alias fzd="find ./ -type d | fzf"


alias asdf="cat ~/project/docroot/asdf.txt"
alias casdf="rm ~/project/docroot/asdf.txt"
alias zgco='git co $(git branch | fzf)'
alias gcnvm="git commit --no-verify -m "
alias gacnvm="git add . && git commit --no-verify -m "
alias gitnp="git --no-pager"
alias gd="gitnp diff"
alias sax="cat ~/.ax-status"

eax() {
        echo $1 > ~/.ax-status
}

lert() {
    printf "\e[48;5;196m%03d $1"
    printf '\e[0m'
    echo
}

colors() {
for((i=16; i<256; i++)); do
    printf "\e[48;5;${i}m%03d" $i;
    printf '\e[0m';
    [ ! $((($i - 15) % 6)) -eq 0 ] && printf ' ' || printf '\n'
done;
}

gchbs() {
latest
theme
gchb "$1" && git pull
shared
gchb "$1" && git pull
ide
gchb "$1" && git pull
}



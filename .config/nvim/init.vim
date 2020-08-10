
set tabstop=2       " number of visual spaces per TAB
set softtabstop=2   " number of spaces in tab when editing
set shiftwidth=2    " number of spaces to use for autoindent
set expandtab       " tabs are space
set autoindent
set copyindent

set rtp+=/home/linuxbrew/.linuxbrew/opt/fzf

set number

nnoremap <C-b> :ls<CR>:p<Space>

nnoremap <C-l> :bnext<CR>
nnoremap <C-h> :bprevious<CR>
nnoremap <C-k> :bfirst<CR>
nnoremap <C-j> :blast<CR>

nnoremap <A-j> :m .+1<CR>==
nnoremap <A-k> :m .-2<CR>==


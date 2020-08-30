
set tabstop=2       " number of visual spaces per TAB
set softtabstop=2   " number of spaces in tab when editing
set shiftwidth=2    " number of spaces to use for autoindent
set expandtab       " tabs are space
set autoindent
set copyindent

set number


set hidden

nnoremap <C-h> :bnext<cr>
nnoremap <C-l> :bprev<cr>

nnoremap <Space> i_<Esc>r

nnoremap z vexi
nnoremap Z vexp

nnoremap <C-p> "*p 
nnoremap <C-P> "*P 

autocmd FileType svelte setlocal commentstring=<!-- %s -->

call plug#begin()

Plug 'sheerun/vim-polyglot'
Plug 'evanleck/vim-svelte', {'branch': 'main'}
Plug 'plasticboy/vim-markdown'
Plug 'stephpy/vim-yaml' 
Plug 'tpope/vim-surround' 
Plug 'tpope/vim-commentary'
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }

call plug#end()





set tabstop=2       " number of visual spaces per TAB
set softtabstop=2   " number of spaces in tab when editing
set shiftwidth=2    " number of spaces to use for autoindent
set expandtab       " tabs are space
set autoindent
set copyindent

set number
set nofoldenable    " disable folding
set hidden

nnoremap <C-Left> :bnext<cr>
nnoremap <C-Right> :bprev<cr>

nnoremap <Space> i_<Esc>r

nnoremap <C-p> "*p 
nnoremap <C-P> "*P 

" put asterisks around line
nnoremap <S-\>* I*<Esc>A*<Esc>

" put asterisks around selection
vnoremap \* c**<ESC>P

" put double quotes around line
nnoremap <S-\> I"<Esc>A"<Esc>

" put double quote around selection
vnoremap \" c""<ESC>P

" put parens around line
vnoremap \( I(<Esc>A)<Esc>

" put parens around selection 
nnoremap <S-\>( c()<ESC>P

" put brackets around line
vnoremap \{ I{<Esc>A}<Esc>

" put brackets around selection 
nnoremap <S-\>{ c{}<ESC>P

nnoremap <leader>sv :source ~/.config/nvim/init.vim<CR>

:command Wd write|bdelete

call plug#begin()

Plug 'sheerun/vim-polyglot'
Plug 'evanleck/vim-svelte', {'branch': 'main'}
Plug 'plasticboy/vim-markdown'
Plug 'pangloss/vim-javascript'
Plug 'leafgarland/typescript-vim'
Plug 'maxmellon/vim-jsx-pretty'
Plug 'stephpy/vim-yaml' 
Plug 'tpope/vim-surround' 
Plug 'tpope/vim-commentary'
" Plug 'prettier/vim-prettier', { 'do': 'npm install' }
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
" Plug 'vim-scripts/asmM6502.vim'
Plug 'neoclide/coc.nvim', {'branch': 'release'}

call plug#end()

" Getting prettier to work
command! -nargs=0 Prettier :CocCommand prettier.formatFile
command! -nargs=0 P :CocCommand prettier.formatFile
" nmap <leader>f  <Plug>(coc-format-selected)
nnoremap <leader>f :Prettier


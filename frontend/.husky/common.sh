export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"

if [ -s "$HOME/.nvm/nvm.sh" ]; then
  . "$HOME/.nvm/nvm.sh"
elif [ -x "$HOME/.fnm/fnm" ]; then
  eval "$("$HOME/.fnm/fnm" env)"
fi

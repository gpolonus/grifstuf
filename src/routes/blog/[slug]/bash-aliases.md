---
layout: blog
---

# What is your favorite part of your Bash Aliases?

## Answer

Simply put, the ability to make more aliases. Let me show you what I mean:
```
_A() {
  echo "alias $1=\\"$2\\"" >> ~/.bash_aliases
  source ~/.bash_aliases
}
```

This simple little function gives me the ability to quickly add new things to my bash aliases without ever having to open up the actual file. Just use it like this:
```
_A npr "npm run"
```

Now you never have to type those extra four characters again! What a luxury!

You can even use this to make better aliases:
```
_D() {
  _A "$1" "cd $(pwd)"
}
```
This will create aliases for your so you don't have to type `cd ./path/to/directory` anymore! Just go there once and run it:
```
cd ./path/to/anywhere
_D anywhere
```

And **boom**: you have just shaved milliseconds of typing each day. I'm sure it adds up. Enjoy impressing all your developer friends with your cool new superpower 😎.

# Design

This is a portfolio site to start with. There are some ideas that will be implemented in the future, but that is not at all MVP by definition.

## Functional Needs

- Fast
- Routing
- low js overhead

### Mustache

Previous needs led to using custom Mustache build along with a dead-simple MVC style state management function that will work well with canvases and makes no assumptions on how it will be used.

### Mustache Build Design

- Homepage get's list of links dynamically built based on what ~~folders are present~~
    - configuration instead of present folders
    - makes it easier to have draft content

## MVP

- List out things I've done
    - Canvas things
        - graphTheory.html
        - hills
            - 3
        - leeannsThing.html
        -  mirrormouse
            - 2
            - fix 3
        - morphing stuff
            - get rid of the haiku at the beginning, it's weird
        - nextLine.html
        - playCanvas
            - i love the idea of being able to draw something then have it drawable somewhere else
                - this requires some fixing
        - randomPaths.html
        - spinning thing
            - 1 and 2
        - starsTest
        - thing
        - thing1
            - give some instructions
        - zombieGame
            - maybe 2 as well
    - knot stuff?
        - absolutely
    - previous homepages
    - poem thing
        - keep this as firebase?
            - for now
    - conway?
- About me page
    - resume ish stuff
        - job history?
        - programming languages
        - hobbies
        - frameworks
    - means of contacting me
        - linkedin
        - twitter
        - email
        - dwitter
        - medium?
            - nah
        - dev.to?
            - nah
        - github
        - gitlab?
            - probably?

### Features

- SEO
- Mustache builds
- quiet naviagtion on every page


### Questions

- Do I want whitescreen between loads?
    - AKA SPA or mustache templates?
        - MUSTACHE
            - lots of nice features
            - parcel integrations
            - caching for SEO
            - routing OOTB
            - doesn't give all the JS features I might want
        - HYPERAPP
            - nice state management
            - JSX is a huge win
            - Typescript integration
            - not as small as it used to be
            - Needs routing though, and that repo has been archived as read-only
    - Choice goes to ***mustache*** since it gets more of what I want without bringing in what I don't need



## Future State

- Web Dev Blog
- Food Blog
- Making Robots Series
- Game of Ur from Lua Love to Web
- carpathia for sure
    - need to base this on the same service as Skrapter
- Skrapter
    - doesnt make any sense as a PWA
    - I don't want to manage a Socket Server for this thing, so I'm thinking that I'll try to get P2P connections to work for it. Put the onerous on the network of the user instead of mine
        - quick tips:
            - do what jackbox games does and give the user a random short passcode then they can give that to those that are going to connect
            - have a starfish network pattern to limit the number of open connections for everyone
                - could even have a split-starfish to have two or more hubs
                    - spanning tree algorithm?
                    - spanning tree based on ping connection?
                        - oh shit this one is interesting
            - great application of redis?
    - also includes tool for writing the script
        - autosave?
            - in a cookie?
            - on the server?
            - redis?
- smart mancala player
- budgetting tool
    - if this is getting out there, then there needs to be some kind of user-specific data and the express detail that there is no security around this thing

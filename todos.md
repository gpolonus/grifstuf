
# Today's Todos

1. [x] Figure out what you want
2. [x] Go do that
3. [] Write an outline of a blog post
4. [] design what the stuff will be
5. [] make the stuff functionality
6. [] finish the blog post
7. [] deploy
8. [] think about what you want the front end to be

## What do I want?

In order of priority:

1. I want a wicked fast site.

1. I want creating content to be wicked easy.

1. I want refactoring to be wicked easy.

1. I want a site with content in it.

1. I want a cool site.

1. I want all content to be subjected to the same tagging system

1. I want omni-search

## How do I do these things?

### A Wicked Fast Site

[x] Statically generated site.

[] Images are nice and optimized.

[] As close to 100s on Lighthouse as Possible


### Creating Content To Be Wicked Easy

[x] Blog posts are MD

[x] minimal amount of configuration goes into creating content
- contentful

[] Blog posts can be MD or MDX


### Refactoring To Be Wicked Easy

[x] React

[x] TypeScript


### A Site With Content In It

[] Make stuf design

[] Make stuf in ~~Contentful~~ the codebase
- when code is the content, best to just serve it from the code

[] outline some blog posts

[] fill them with content


### A Cool Site

[] Neat front end design


### All Content To Be Subjected To The Same Tagging System

[] add tag enum (content type of a title field)

[] add tag field to all content types


### Omni Search

[] Contentful?

[] Lunr?
- fueled by lunr
  - index generated on BE and search results generated on FE (or BE)?
    - could use a serverless function to grab the index, run the query, then return the results to the front end and be processed by a React component
    - SSR?






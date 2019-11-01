
# This Site's Stack

_"A journey of a thousand miles begins with a single step."_ - Chinese Proverb

I made a site for my blog and other stuf. I wanted something that would be flexible and let me do whatever I need to with this site. This setup might not be the best for a portfolio or blog, and it might not have been the easiest, but I had fun making it.

## Requirements

Well, I don't have requirements so much as I have things that I _really_ want on this site.

### Content

I will have a few different types of content on this site, each with different structures and build processes. So far I know I want blog posts and other random JavaScript creations. Both of these types will contain specifically different content of radically different structures, so I need the ability to support those. And later on if I find other types of content that I want to display, I need the freedom and flexibility to add and display those.

### Flexibility

The landscape of web development seems to be changing faster than I can write this article. If I want a site that shows off what I've done previously along with featuring any new work, I need a framework and platform that allows for that.

Frameworks have their place and time. Keeping complexity managable while giving developers the flexibility to add new features is a framework's bread and butter. For a lone developer, however, a framework is just one more thing holding back the vision. At any given time, you are only as flexible as your tools allow you to be.

### Fast and Bullet-Proof

Wicked-fast. As an occasional website user myself, I cannot stand when a site that is supposed to fulfill a need fails to do so. Something that takes too long to load or always fails in weird ways is not something I am ever going to use again. Since I would like people to view my site several times instead of once and then never again, wicked-fast is a necessity.

Because of this, reducing JavaScript and CSS KBs are going to be a __main__ concern of this site.

### Low-Cost

I am not made of money. With all of the free static site hosting that is available, you better bet your bottom dollar that I am going to take advantage of that. Google got me the domain that I wanted for $2 per month, DigitalOcean gives VPS's for $5 per month, and MongoCloud Atlas gives 500 MB of storage for free! I will for sure take that advantage of those resources and other low-cost options instead of going for something fancy.

### Fun

Who wants to work on something boring?

## Decision

I am one person working on this one project to fulfill several self-imposed needs. Someone else would more than likely make a different choice, but this is mine.

### Hosting

I went with Zeit for a few reasons. I have used Netlify some, and I haven't had any issues with it, but I want to be able to compare the two. The bulk of my projects have been hosted on Google Firebase and I am a big fan of their Firestore realtime database. For this, I don't need all of what Google Firebase offers, so why not try something different?

### Site Architecture

Going with Zeit means I have some static files that I need to serve up.

They created Next.js for React Server-Side rendering, so they obviously know how to serve React sites well. My site doesn't need the interactivity of React, though. And reducing KB's is a __main__ concern. React Router DOM is 37 KB GZIPed, I don't think I need that.

Some other static-site generator could be the way to go. Hugo, Gatsby, or one of the other thousands out there could be a great choice. Burdened by choice, I don't want to get buyer's remorse on my first purchase. I also don't want to start using something new only to find out what I really want can't be done.

I have simple content. It can absolutely be built in a simple way. All I really need is some markdown rendering and some HTML templating, then let the content speak for itself.

For this reason, I made the most influential decision of this site:

### Mustache, Showdown, and Everything in Between

For the HTML that gets repeated, Mustache does a great job of holding onto that and putting data where I need it to go in a very simple and readable way. Mustache allows for you to build in other integrations, which works perfectly for Showdown to slide in and render my Markdown files.

To get Mustache to build my static content, I created a [potato script](/blog/potato-scripts) in Node to run all of my content through Mustache templates and partials to create my site. The site metadata is currently held in a JSON file. The hope is to make some sort of admin UI to make edits easier and more streamlined if I haven't landed on a static-site generator yet.

For local developement, I have the onchange and live-server Node CLI tools running to pick up changes, build the site, then refresh the local dev server. I'd like to configure Parcel with a Mustache plugin, but I won't include that for the start.

## Rationalization

I'm sure that there are plenty of marketing departments of multiple open-source projects that would do a perfect job of explaining to me why their solution is the perfect solution for me. I'm also sure that they are probably right. And until one changes my mind, I'll grow this potato until it cannot fit in my yard anymore.

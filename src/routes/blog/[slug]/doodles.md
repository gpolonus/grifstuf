---
layout: blog
---

# Why Doodles?

## Answer

Distractions during my work day when I am trying to be productive make me feel like someone who is trying to quit cigarettes. And waiting for my unit tests to run during a pre-push git hook is like hanging out in the smoking section of a Bennigan's.

I have my phone and the internet at my fingertips at all times and when my job is to wait for a process to run that takes maybe two minutes, it's tough to resist the urge to go take a look at something else. Maybe I'll take a look at some new [JS framework](https://svelte.dev/), [some wacky keyboard parts](https://spacecat.design/collections/pcbs-cases-kits/products/alpha28-pcbs), or search what [dopamine addiction](https://letmegooglethat.com/?q=dopamine+addiction) is.

Doing research on these things isn't inherently bad, my problem is that they all take my attention away for longer than my unit tests (or compilation or whatever process) takes to run. In the desire to not waste time when something else is running, I have found an activity that doesn't take more time than it should and is fun: **doodling**.

Whenever my computer needs to run a short process, I pick up my drawing utencil and make whatever picture comes to mind. I am able to be creative throughout my day and I don't get so distracted from what I was doing that I go down a rabbit hole of what [pirate movies](https://www.stuff.tv/news/25-best-pirate-movies-ever-0) are the best. I'd highly recommend it to anyone that falls into the chasm of distraction like I do.

## Implementation

One problem does remain, how do I share said doodles with the world? I don't really want to put them on a social media site because I don't need the feedback from my aunt about how my little drawings are getting much better. I'd like to just put them in a place where I can see them and share them with specific individuals as I see fit. Thus I needed to be able to quickly and easily add them to my own personal site.

With some tooling and scripting, all I need is to take a photo of a doodle, put it in the correct directory, run a script and I'm good! After downloading the picture file from Google Photos, I move the doodle file into a directory in my site repo. Then, I run a bash script that puts the image metadata into a YAML file, resizes the image into a few different sizes using Image Magick, and makes a git commit to my repo. After all that I do a bit of user-acceptance testing to ensure that everything was generated correctly and finish it off with a `git push` to start up the production deployment pipeline set up by the Vercel platform where my site is hosted.

Thanks to the infrasture I have created, I have been able to add many doodles to this site, so that everyone can see what I'm up to when my laptop is heating up due to hundreds of unit tests passing.

# Newtab Widgets

A Chrome extension that replaces the default New Tab page with a cute background and some simple cards that display information from various APIs.
This repo is an improved version of a similar project that I did as an initial foray into (vanilla) JavaScript. 

This extension is intended for my own personal use, however if you want to check it out for yourself:
1. Clone the repository to have a local copy of it on your computer.
2. Sign up for the OpenWeather API and the Merriam-Webster Dictionary API to obtain your own API keys. (It's free!)
3. In the directory `assets/js/`, create a new file called `secrets.js`, and define two variables `WEATHER_KEY` and `WORD_KEY` for the respective API keys.
4. At this point, you should be able to see what the replacement New Tab page looks like by opening `index.html` in your web browser.
5. If you want to actually install and use the extension, run the command `./build.sh`. Note that you must have npm/npx installed.
6. This should generate a directory called `build` that contains all the necessary files. Rename and/or move this folder however you want, then load it into Google Chrome as an unpacked extension.

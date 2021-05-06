#!/bin/bash

mkdir -p build/assets
cp index.html ./build/index.html
cp manifest.json ./build/manifest.json
cp -r ./assets/img ./build/assets
cp -r ./assets/js ./build/assets

NODE_ENV=production npx tailwindcss-cli@latest build ./assets/css/style.css -o ./build/assets/css/tailwind.css

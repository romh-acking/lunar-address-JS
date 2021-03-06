# Lunar Address JS

![picture](screenshot.png)

## About
This is a JavaScript port of [Lunar Address](https://www.romhacking.net/utilities/26/) and was made with the ReactJS framework. All settings are stored in local storage for persistence.

Lunar Address, being made by FuSoYa, is closed source. After asking about how SNES address conversions work multiple times and never getting a clear cut answer, I decided to take it upon myself to reverse engineer Lunar Address. I used IDA Pro seriously for the first time; fortunately, Lunar Address is small enough for this task to be relatively simple. Per [Klarth](https://github.com/stevemonaco)'s suggestion, I made this app cross-platform and hosted it on GitHub.

This app can be accessed in your browser with the link below:

https://romh-acking.github.io/lunar-address-JS/

## Code Files of Interest
* /lib/autodetect.js: Contains logic to identify a rom's memory map type.
* /lib/conversion/: Contains multiple JavaScipt files for the address conversions.

## Special Thanks
* Klarth: Guidance, bug testing
* Tipiak75: Bug testing

## References
* https://github.com/sanderdebr/react-usereducer-context-tutorial/ (dark mode example)
* https://www.youtube.com/watch?v=CVnSrLZ_HaQ (snackbar)
* https://medium.com/mobile-web-dev/how-to-build-and-deploy-a-react-app-to-github-pages-in-less-than-5-minutes-d6c4ffd30f14

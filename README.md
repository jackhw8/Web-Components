<p align="center"><img src="lannister-logo.png" alt="Team 6 Logo" width=100><br/></p>
<p align="center">This is a library of interchangeable web components based on ElementUI!</p>
<p align="center">
  <a href="https://travis-ci.com/ucsd-cse112/team6"><img src="https://travis-ci.com/ucsd-cse112/team6.svg?token=9sQiopNr8YmCX4xj3GFq&branch=master" alt="Travis Build"><img src="https://api.codeclimate.com/v1/badges/d7879f033179d610db07/maintainability" alt="Code Climate Maintainability"><img src="https://api.codeclimate.com/v1/badges/d7879f033179d610db07/test_coverage" alt="Code Climate Test Coverage"></a>
</p>

<hr>

# Lannister Web Component

Features
------------

* **Complete Documentation** — With extensive functional documentation allowing you to have vast knowledge on Lannister component. This will allow you to easily integrate Lannister components to *any* frameworks you know and love.
* **High performance** — With Lannister component, you will get blazing fast load time, thanks to minified vanilla Javascript.
* **<5 minutes quickstart** — With our quickstart docs, get lannister component loaded to your project in no time.
* **Industry standard pipeline** — Take comfort in knowing that our component will not fail under normal circumstances. Our unit testing covers input cleaning and crossbrowser integration.
* **CDN Hosted Content** — Providing easy to use component. You no longer need to download any files manually.

Getting Started with Lannister Component
------------
### Prerequisites
You're going to need:
- **Browser** — Any version of *Chrome* or *Firefox*. Currently not fully support *Safari*,*IE*,and *Opera*.
- **Laptop** — Any operating system would be fine.
- **Text Editor** — *TextEdit* or *Notepad* works just fine.

### Getting Set Up
To get the component working in your site, you will need to put this script to the bottom of your HTML file.
```
  <script src="https://unpkg.com/lannister-component@latest/bundle.js"></script>
```

Next, you can load up your desired component above the script.
```
  <lan-button>Lannister Button</lan-button>
```

Other Documentation
------------
* [Manuals](https://ucsd-cse112.github.io/team6/manual/index.html) — Detailed definition on every component.
* [Comprehensive](https://ucsd-cse112.github.io/team6) — Complete documentation on each functions.
* [Notion Internal Documentations](https://notion.so/cse112sp19team6) — The internal documentation. (login using gmail account: email: teamlannister6@gmail.com , password:team6password)
* [Add New Tests](https://www.notion.so/Testing-fdf860cbf6e94104825bf10d701fa361) — Small tutorial on how to add more tests

Contributions
------------
We accept contributions in the form of pull requests.

You will only need to do the following:

1. Fork this library
2. Make pull requests
3. Give details on what you are doing on that PR.

## To run the full suite:
1. Install [npm](https://www.npmjs.com/get-npm).
2. Install [Chrome](https://www.google.com/chrome/).
3. Install [Firefox](https://www.mozilla.org/en-US/firefox/new/).
4. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
5. Install [Java](https://www.java.com/download).
6. Add Java to the PATH environment variable.
7. `git clone https://github.com/ucsd-cse112/team6.git` into your preferred directory.
8. Navigate to the team6 folder.
9. `npm install`
10. `npm update`
11. `npm run lint`
12. `npm install bower`
13. For Mac/Linux: `./node_modules/.bin/bower install --save-dev web-component-tester`

    For Windows: `node_modules\.bin\bower.cmd install --save-dev web-component-tester`

14. `npm run test`
15. `npm run doc`

### Troubleshooting:
#### `npm run test`
If you're getting an installation error along the lines of "could not request header," go to `package.json` and navigate to `scripts` then `test`. Change `wct` to `wct --skip-selenium-install`.

On Mac, try going to `node_modules/wct-local/selenium-overrides.js` and change the version from `3.12.0` to `3.14.0`. For more info, visit the [Polymer web-component-tester repo](https://github.com/Polymer/tools/tree/master/packages/web-component-tester).

## Have fun humans!

## FAQ
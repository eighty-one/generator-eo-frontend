# generator-eo-genfed

Yeoman generator for scaffolding a front end workflow. The tool will build a front end directory structure and install build tools to handle js, css, icon optimisation including compression, linting, joining etc. It also enables watching on front end assets changes and forces live reloading via BrowserSync.

# Install

Prior to installing you must ensure you have the following packages installed on your machine globally via npm.
* Node.js
* Gulp.js
* Grunt.js
* Yeoman

and Sass via Ruby gem

```
npm install -g generator-eo-frontend
```

# Usage

## Running the generator

Create a new directory somewhere where your project will live. Make a directory for that project and change directory into it
```
mkdir myproject
cd myproject
```

To scaffold a directory structure for a static site:
```
yo eo-frontend
```

To scaffold a directory structure and install a SilverStripe instance run
```
yo eo-frontend --silverstripe
```

## Running build tools

Full build - will run css, js, icon tasks.
```
gulp build
```

Watching - will start browser-sync to live reload your browser and will keep an eye on css, js, SilverStripe template, and standard html changes.
```
gulp watch
```

Run JS tasks only
```
gulp js
```

Run CSS tasks only
```
gulp css
```

Run Icon tasks only
```
gulp icon
```




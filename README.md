# incoding.profiler

> Profiling devtools for [Incoding.Framework](https://github.com/Incoding-Software/Incoding-Framework).


## Browser support
This extension uses [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/) and currently supports this browsers:

- Chrome
- Microsoft Edge (Chrome)
- Firefox 

## Installation

You can download latest build archive for all available platforms from [latest release](https://github.com/nice-nickname/incoding.profiler/releases/latest).

But, if you want to create your own build, you'll need to run following commands:

```bash
# Install dependencies
npm ci

# Build extension in production mode
npm run prod:<your_browser>
```

The above command will build the app in production mode, output files are placed in `prod/<your_browser>` folder.

## Run development mode

In order to build the app for development, run the following command:

```bash
# Run build and watch for changes
npm run dev:<your_browser>
```

This will build extension in developer mode and watch for local changes. Use this option only if you want to make any changes in extension sources. Output files will be in `debug/<your_browser>` folder.

## Installation in browser

After you downloaded latest release and choosed desired browser (or created your own build), use output folder with source files and follow these steps:
- Open browser extensions manager
- Select **Manage extensions**
- Check **Developer mode**
- Click **Load packed** and select build folder

### Reloading extension in development mode

If you're running **development** mode, and there is code changes to be applied, just re-open browser devtools, and all files will be updated.

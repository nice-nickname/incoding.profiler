## incoding.profiler

Profiling devtools for [Incoding.Framework](https://github.com/Incoding-Software/Incoding-Framework).


## Browser support
This extension uses [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/) and currently supports this platforms:

- Chrome 
- Microsoft Edge (Chrome)


## Installation in browser

Download latest build archive from [latest release](https://github.com/nice-nickname/incoding.profiler/releases/latest).

Then, simply follow these steps:
- Open browser extensions manager
- Select __Manage extensions__
- Check __Developer mode__ 
- Click __Load packed__ and select build folder


## Building from sources

First, you need to download sources:

```bash
git clone this@repo
```

Then, choose target browser from list of supported browsers and eval:

```bash
npm run prod:<target>
```

This will build extension in `prod/<target>` folder.

### Contributing & building debug version

This project uses `webpack` for project build. To start a debug session with devserver watching changes in code, just type in:
```bash
npm run dev:<target>
```

This will build extension in `debug/<target>` folder, which you can load as unpacked extension 

# Convert WSL Paths for Hyper

### **Caution: This is pretty new 😬**

If you're using Windows Subsystem for Linux and like pasting Windows paths or dragging and dropping files into Hyper, this plugin is for you!

## Install
This plugin is only for Windows.

Open up a PowerShell window and run:

`hyper install hyper-convert-wsl-paths`

## Features

- Converts Windows paths to WSL paths
    - e.g., `C:\boo\urns.txt` => `/c/boo/urns.txt`
- Converts Windows shortcuts to the original paths
    - e.g., `C:\Users\me\app.lnk` => `'/c/Program Data/App.exe'`

## Customization

At the moment there is a single option under `convertWslPaths.skiplinkResolution`:

```js
module.exports = {
    config: {
        convertWslPaths: {
            // Skip resolving *.lnk to the target file
            skipLinkResolution: true
        }
    }
}
```

## Testing

1. `yarn install`
2. `yarn test`

There are two environment variables that are customizable:
- `WSL_ROOT` - Defaults to an empty string (corresponding to `/`), but will be `/mnt` if you haven't set the root in `/etc/wsl.conf`
- `WINDOWS_ROOT` - Defaults to `C:`, but should be set to wherever an accessible drive is if not C:\
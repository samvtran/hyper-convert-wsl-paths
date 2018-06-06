# Changelog

## 0.1.2 - 0.1.3

- Fixing an issue where a shortcut like `'C:\Users\sam\a link with spaces.lnk'` would not be treated as a link and would not resolve.

## 0.1.1

- Updating npm metadata and adding placeholder AppVeyor script (though not building until they add WSL support)

## 0.1.0

- Resolves Windows paths to WSL paths
- Resolves *.lnk files to the target file (if it exists)
- Options via `convertWslPaths` object.

Following configuration added:
| Key | Default | Description |
| --- | ------- | ----------- |
| skipLinkResolution | false | Whether to skip resolving *.lnk files to the target file. Useful if you actually use the lnk files |
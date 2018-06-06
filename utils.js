const exec = require('child_process').execSync;
const path = require('path');

const isWindowsPath = (testPath) => /['"]?[a-zA-Z]:\\/.test(testPath);

const isLink = (testPath) => /\.lnk['"]?$/.test(testPath);

const escapeForWslpath = (str) => str
    .replace(/\\/g, '\\\\\\\\')
    .replace(/(^['"])|(['"]$)/g, '');

const convertToWSLPath = (windowsPath) => exec(`wsl.exe wslpath "${windowsPath}"`).toString().replace(/\r|\n/g, '');

const convertToWindowsPath = (windowsPath) => exec(`wsl.exe wslpath -w "${windowsPath}"`).toString().replace(/\r|\n/g, '');

const scriptPath = escapeForWslpath(convertToWindowsPath(escapeForWslpath(path.join(__dirname, 'resolve-link.ps1'))));

const resolveLink = (link) => {
    const cmd = `powershell.exe ${scriptPath} -path "${link}"`
    try {
        const result = exec(cmd).toString().replace(/\r|\n/g, '');
        if (result) {
            return escapeForWslpath(result);
        }
    } catch (e) {
        console.log(e)
    }

    return link;
}

module.exports = {
    isWindowsPath,
    isLink,
    escapeForWslpath,
    resolveLink,
    convertToWSLPath,
    convertToWindowsPath
}
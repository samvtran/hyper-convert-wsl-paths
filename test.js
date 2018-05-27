const {
    isWindowsPath,
    isLink,
    escapeForWslpath,
    resolveLink,
    convertToWSLPath,
    convertToWindowsPath
} = require('./utils.js');

// Configurable in the /etc/wsl.conf file. Defaulting to root.
const WSL_ROOT = process.env.WSL_ROOT || '';
const WINDOWS_ROOT = process.env.WINDOWS_ROOT || 'C:';

const testUnixPath = `${WSL_ROOT}/c/test/path`;
const testWindowsPath = `${WINDOWS_ROOT}\\test\\path`

describe('isWindowsPath', () => {

    it('should return false for *nix paths', () => {
        expect(isWindowsPath(testUnixPath)).toEqual(false);
    });

    it('should retun true for Windows paths', () => {
        expect(isWindowsPath(testWindowsPath)).toEqual(true);
    });
});

describe('isLink', () => {
    it('should return false for a file that does not end with .lnk', () => {
        [
            'C:\\alnk',
            'C:\\a.lnk.test',
            'C:\\a.exe'
        ].forEach(p => {
            expect(isLink(p)).toEqual(false);
        });
    });

    it('should return true for files that end in .lnk', () => {
        [
            'C:\\a.lnk',
            'C:\\a.test.lnk'
        ].forEach(p => {
            expect(isLink(p)).toEqual(true);
        });
    });
});

describe('escapeForWslpath', () => {
    it('should properly escape paths for command execution', () => {
        expect(escapeForWslpath("C:\\a.txt")).toEqual("C:\\\\\\\\a.txt");
    });

    it('should strip and double quotes', () => {
        expect(escapeForWslpath('"C:\\a.txt"')).toEqual("C:\\\\\\\\a.txt");
    });

    it('should strip single quotes', () => {
        expect(escapeForWslpath("'C:\\a.txt'")).toEqual("C:\\\\\\\\a.txt");
    })
});

describe('resolveLink', () => {
    it('should return the link if the link is not available', () => {
        const testLink = escapeForWslpath(`${WINDOWS_ROOT}test\\link\\does\\not\\exist.lnk`);
        expect(resolveLink(testLink)).toEqual(testLink);
    });
});

describe('convertToWindowsPath', () => {
    it('should convert a WSL path to a Windows path', () => {
        expect(convertToWindowsPath(escapeForWslpath(testUnixPath))).toEqual(testWindowsPath);
    });
});

describe('convertToWSLPath', () => {
    it('should convert paths for *nix and strip extraneous characters', () => {
        const escaped = escapeForWslpath(testWindowsPath);
        expect(convertToWSLPath(escaped)).toEqual(testUnixPath);
    });
});
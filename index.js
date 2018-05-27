const electron = require('electron');
const isWindows = process.platform === 'win32';

const { isWindowsPath, isLink, escapeForWslpath, resolveLink, convertToWSLPath } = require('./utils.js');

const Actions = {
    userData: 'SESSION_USER_DATA',
    configLoad: 'CONFIG_LOAD'
}

let shouldResolveLinks = true;

if (isWindows) {
    exports.middleware = store => next => action => {
        if (action.type === Actions.configLoad && action.config && action.config.convertWslPaths) {
            const options = action.config.convertWslPaths;

            if (options.skipLinkResolution) {
                shouldResolveLinks = false;
            }
        } else if (action.type === Actions.userData && action.data && isWindowsPath(action.data)) {
            try {
                let escapedPath = escapeForWslpath(action.data);

                // Try to resolve a link so we have something useful
                if (isLink(escapedPath) && shouldResolveLinks) {
                    escapedPath = resolveLink(escapedPath);
                }

                const result = convertToWSLPath(escapedPath);

                if (result) {
                    // Override the effect to write the converted WSL path to the terminal.
                    action.effect = () => {
                        rpc.emit('data', {
                            uid: store.getState().sessions.activeUid,
                            data: result,
                            escaped: true
                        });
                    }
                }
            } catch (e) {
                // If the path failed to convert, leave it as is
                // console.log(e);
            }
        }

        next(action);
    };
}
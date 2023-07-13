#!/bin/gjs

const GLib = imports.gi.GLib;
const Notify = imports.gi.Notify;
const ByteArray = imports.byteArray;

function extensionChangeText(text) {
    // If you have extension "Simple Message"
    // https://github.com/freddez/gnome-shell-simple-message
    // this function push new text to him
    try {
        const filename = "extension.sh";
        const file = GLib.build_filenamev([GLib.get_current_dir(), filename]);
        const [, , stderr, status] = GLib.spawn_command_line_sync(`${file} "${text}"`);

        if (status !== 0) {
            if (stderr instanceof Uint8Array)
                throw new Error(ByteArray.toString(stderr));
        }
    } catch (e) {
        logError(e);
    }
}

const filename = "dictionary.json";
const file = GLib.build_filenamev([GLib.get_current_dir(), filename]);

const [ok, contents] = GLib.file_get_contents(file);

if (ok) {
    const utf8decoder = new TextDecoder();
    const str = utf8decoder.decode(contents)
    const map = JSON.parse(str);

    const dictionaryLength = map.length;
    const wordIndex = Math.floor(Math.random() * dictionaryLength);
    const word = map[wordIndex];

    Notify.init("message");

    const notify = {
        summary: word.summary,
        body: word.body,
        "icon-name": "dialog-information"
    }

    const message = new Notify.Notification(notify);
    message.show();
    extensionChangeText(`${word.summary} ${word.body}`);
}

#!/bin/gjs -m


import GLib from 'gi://GLib';
import Notify from "gi://Notify"
import system from "system";


const project_dir = GLib.path_get_dirname(import.meta.url).slice(7);


function extensionChangeText(text) {
    // If you have extension "Simple Message"
    // this function push new text to him
    const command = 'dconf write ' 
    + '/org/gnome/shell/extensions/simple-message/message'
    + ` '"${text}"'`;
    GLib.spawn_command_line_sync(command);
}


const filename = "dictionary.json";
const file = GLib.build_filenamev([project_dir, filename]);


if (GLib.access(file, "R_OK") !== 0) {
    system.exit(1);
}


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

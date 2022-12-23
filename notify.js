#!/usr/bin/env gjs

const GLib = imports.gi.GLib;
const Notify = imports.gi.Notify;

const [ok, contents] = GLib.file_get_contents("dictionary.json");

if (ok) {
    const utf8decoder = new TextDecoder();
    const str = utf8decoder.decode(contents)
    const map = JSON.parse(str);

    const dictionaryLength = map.length;
    const wordIndex = Math.floor(Math.random() * dictionaryLength);
    const word = map[wordIndex];

    Notify.init("learn");

    const notify = {
        summary: word.summary,
        body: word.body,
        "icon-name": "dialog-information"
    }

    const learn = new Notify.Notification(notify);
    learn.show();
}

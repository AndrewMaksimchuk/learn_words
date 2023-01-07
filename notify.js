#!/bin/gjs

const GLib = imports.gi.GLib;
const Notify = imports.gi.Notify;

const file = "/home/andrew/Code/learn_words/dictionary.json";

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
}

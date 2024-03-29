#!/bin/gjs -m
import GLib from 'gi://GLib';
import Notify from "gi://Notify"
import system from "system";

function extensionChangeText(text = "") {
  // If you have extension "Simple Message"
  // this function push new text to him

  const normalizeText = text
    .trim()
    .replaceAll("'", "`");

  const command = 'dconf write '
    + '/org/gnome/shell/extensions/simple-message/message'
    + ` '"${normalizeText}"'`;
  GLib.spawn_command_line_sync(command);
}

const FILENAME = "dictionary.json";
const project_dir = GLib.path_get_dirname(import.meta.url).slice(7);
const file = GLib.build_filenamev([project_dir, FILENAME]);

export function notifyShow() {
  // From lib <unistd.h>
  // #define	R_OK	4		/* Test for read permission.  */
  const R_OK = 4;
  if (GLib.access(file, R_OK) !== 0) {
    system.exit(1);
  }

  const [ok, contents] = GLib.file_get_contents(file);

  if (false === ok) return;

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

notifyShow();

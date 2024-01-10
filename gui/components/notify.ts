/* Copy from source file: "../../notify.js" */
import GLib from "gi://GLib";
import Notify from "gi://Notify";
import { dictionaryFilePath } from "../variables.js";

function extensionChangeText(text = "") {
  // If you have extension "Simple Message"
  // this function push new text to him

  const normalizeText = text.trim().replaceAll("'", "`");

  const command =
    "dconf write " +
    "/org/gnome/shell/extensions/simple-message/message" +
    ` '"${normalizeText}"'`;
  GLib.spawn_command_line_sync(command);
}

export function notifyShow() {
  // From lib <unistd.h>
  // #define	R_OK	4		/* Test for read permission.  */
  const R_OK = 4;
  if (GLib.access(dictionaryFilePath, R_OK) !== 0) {
    return;
  }

  const [ok, contents] = GLib.file_get_contents(dictionaryFilePath);

  if (false === ok) return;

  const utf8decoder = new TextDecoder();
  const str = utf8decoder.decode(contents);
  const map = JSON.parse(str);

  const dictionaryLength = map.length;
  const wordIndex = Math.floor(Math.random() * dictionaryLength);
  const word = map[wordIndex];

  Notify.init("message");

  const notify = {
    summary: word.summary,
    body: word.body,
    "icon-name": "dialog-information",
  };

  const message = new Notify.Notification(notify);
  message.show();
  extensionChangeText(`${word.summary} ${word.body}`);
}

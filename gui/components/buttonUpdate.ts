import Gtk from "gi://Gtk?version=3.0";
import Gio from "gi://Gio"

interface Props {
  entryUpdate: Gtk.Entry
  outputStream: Gio.FileOutputStream
  statusBar: Gtk.Statusbar
  win: Gtk.Window
}

export const createButtonUpdate = ({
  entryUpdate,
  outputStream,
  statusBar,
  win,
}: Props) => {
  const buttonUpdate = new Gtk.Button({
    label: "Update word",
  });
  buttonUpdate.connect("clicked", () => {
    const inputText = entryUpdate.get_buffer().text;
    if (Boolean(inputText) === false) return;

    outputStream.write(`\n${inputText}`, null);

    statusBar.push(0, `Dictionary updated: ${inputText}`);
    entryUpdate.set_text("");
    win.set_focus(entryUpdate);
  });
  return buttonUpdate;
};

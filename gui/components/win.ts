import Gtk from "gi://Gtk?version=3.0";
import Gio from "gi://Gio";
import { TITLE, DEFAULT_WIDTH } from "./settings.js";

interface Props {
  outputStream: Gio.FileOutputStream;
  currentDir: string;
}

export const createWin = ({ outputStream, currentDir }: Props) => {
  const win = new Gtk.Window({ default_width: DEFAULT_WIDTH });
  win.set_title(TITLE);
  // win.set_icon_from_file(currentDir + "/learnwords-96.png");
  win.set_position(Gtk.WindowPosition.CENTER);
  win.set_decorated(false);
  win.connect("destroy", () => {
    outputStream.close(null);
    Gtk.main_quit();
  });
  return win;
};

import Gtk from "gi://Gtk?version=3.0";
import Gio from "gi://Gio";
import { DEFAULT_WIDTH } from "./settings.js";

interface Props {
  outputStream: Gio.FileOutputStream;
  currentDir: string;
  titlebar: Gtk.HeaderBar
}

export const createWin = ({ outputStream, currentDir, titlebar }: Props) => {
  const win = new Gtk.Window({ default_width: DEFAULT_WIDTH });
  win.set_icon_from_file(currentDir + "/learnwords-96.png");
  win.set_position(Gtk.WindowPosition.CENTER);
  win.set_titlebar(titlebar);

  win.connect("destroy", () => {
    outputStream.close(null);
    Gtk.main_quit();
  });
  
  return win;
};

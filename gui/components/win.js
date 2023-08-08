// import '@girs/gtk-3.0'
import Gtk from 'gi://Gtk?version=3.0'


export const createWin = 
({
  outputStream,
  currentDir,
}) => 
{
  const win = new Gtk.Window({ default_width: 500 })
  win.set_title("Learn words")
  // win.set_icon()
  win.set_icon_from_file(currentDir + "/learnwords-96.png")
  win.set_position(Gtk.WindowPosition. CENTER)
  // win.set_decorated(false)
  win.connect('destroy', () => {
    outputStream.close(null);
    Gtk.main_quit();
  });
  return win;
}

import Gtk from 'gi://Gtk?version=3.0';


export const createStatusBar = () => {
  const statusBar = new Gtk.Statusbar()
  return statusBar;
}

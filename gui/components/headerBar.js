import Gtk from 'gi://Gtk?version=3.0';
import { TITLE } from './settings.js';

export const createHeaderBar = () => {
  const headerBar = new Gtk.HeaderBar();
  headerBar.set_show_close_button(true);
  headerBar.set_title(TITLE);
  return headerBar;
}

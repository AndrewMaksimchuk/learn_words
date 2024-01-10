import Gtk from 'gi://Gtk?version=3.0';
import { notifyShow } from './notify.js';

export const createNotificationButton = () => {
  const button = new Gtk.Button({
    label: "Notification",
  });
  button.connect('clicked', notifyShow);
  return button;
}

import Gtk from 'gi://Gtk?version=3.0';


export const createBoxFirstLine = (children = []) => {
  const box = new Gtk.Box({
    orientation: Gtk.Orientation.HORIZONTAL,
    spacing: 300,
  });
  children.forEach((child) => box.add(child))
  return box;
}

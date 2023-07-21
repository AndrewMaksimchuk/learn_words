import Gtk from 'gi://Gtk?version=3.0';


export const createBox = (children = []) => {
  const box = new Gtk.Box({
    orientation: Gtk.Orientation.VERTICAL,
    spacing: 15
  });
  box.set_border_width(15)
  children.forEach((child) => box.add(child))
  return box;
}

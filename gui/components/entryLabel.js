import Gtk from 'gi://Gtk?version=3.0';


export const createEntryLabel = () => {
  return new Gtk.Label({
    label: "Write new word",
    xalign: 0
  })
}

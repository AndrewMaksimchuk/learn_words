import Gtk from 'gi://Gtk?version=3.0';


export const createEntryUpdateLabel = () => {
  const entryUpdateLabel = new Gtk.Label({
    label: "Change existing word",
    xalign: 0
  });
  return entryUpdateLabel;
}

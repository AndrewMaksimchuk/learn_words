import Gtk from 'gi://Gtk?version=3.0';


export const createEntryUpdate = () => {
  const entryUpdate = new Gtk.Entry({
    buffer: new Gtk.EntryBuffer(),
    placeholder_text: "Enter word for change",
  });
  return entryUpdate;
}

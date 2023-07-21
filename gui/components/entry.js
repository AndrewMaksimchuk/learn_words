import Gtk from 'gi://Gtk?version=3.0';


export const createEntry = () => {
  return new Gtk.Entry({
    buffer: new Gtk.EntryBuffer(),
    placeholder_text:
      "eventually [əˈven(t)SH(o͞o)əlē] зрештою",
  });
}

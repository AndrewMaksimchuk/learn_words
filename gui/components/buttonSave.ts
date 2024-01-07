import Gtk from 'gi://Gtk?version=3.0';
import GLib from 'gi://GLib';

interface Props {
  updateDictionary: string
  statusBar: Gtk.Statusbar
}

export const createButtonSave = ({
  updateDictionary,
  statusBar,
}: Props) => {
  const buttonSave = new Gtk.Button({
    label: 'Update dictionary itself'
  });
  buttonSave.connect('clicked', () => {
    let [, , , status] = GLib
      .spawn_command_line_sync(updateDictionary);
    if (status === 0) {
      statusBar.push(0, `Dictionary updated!`);
    } else {
      const text = `Status ${status}. An error occurred in the dictionary update script.`
      statusBar.push(0, text);
    }
  });
  return buttonSave;
}

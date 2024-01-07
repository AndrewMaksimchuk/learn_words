import Gtk from 'gi://Gtk?version=3.0';
import Gio from "gi://Gio"

interface Props {
  outputStream: Gio.FileOutputStream
}

export const createButtonClose = ({
  outputStream,
}: Props) => {
  const button = new Gtk.Button({
    label: 'Close',
  });
  button.connect('clicked', () => {
    outputStream.close(null)
    Gtk.main_quit()
  })
  return button;
}

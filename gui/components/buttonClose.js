import Gtk from 'gi://Gtk?version=3.0';


export const createButtonClose = ({
  outputStream,
}) => {
  const button = new Gtk.Button({
    label: 'Close',
  });
  button.connect('clicked', () => {
    outputStream.close(null)
    Gtk.main_quit()
  })
  return button;
}

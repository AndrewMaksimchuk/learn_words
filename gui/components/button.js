import Gtk from 'gi://Gtk?version=3.0';


export const createButton = ({
  entry,
  outputStream,
  statusBar,
  win,
}) => {
  const button = new Gtk.Button({
    label: 'Add to dictionary'
  });
  button.connect('clicked', () => {
    const inputText = entry.get_buffer().text;
    if (Boolean(inputText) === false) return;
  
    outputStream.write(`\n${inputText}`, null);
  
    statusBar.push(
      0,
      `Added to dictionary: ${inputText}`
    );
    entry.set_text("");
    win.set_focus(entry);
  });
  return button;
}

import Gtk from 'gi://Gtk?version=3.0';


export const createButtonUpdate = ({
  entryUpdate,
  outputStream,
  statusBar,
  win,
}) => {
  const buttonUpdate = new Gtk.Button({
    label: 'Update word'
  });
  buttonUpdate.connect('clicked', () => {
    const inputText = entryUpdate
      .get_buffer()
      .text;
    if (Boolean(inputText) === false) return;
  
    outputStream.write(`\n${inputText}`, null);
  
    statusBar.push(
      0,
      `Dictionary updated: ${inputText}`
    );
    entryUpdate.set_text("");
    win.set_focus(entryUpdate);
  });
  return buttonUpdate;
}

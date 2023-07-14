#!/usr/bin/env -S gjs -m

import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import Gtk from 'gi://Gtk?version=3.0';


const [filename] = GLib
  .filename_from_uri(import.meta.url);
const currentDir = GLib
  .path_get_dirname(filename);
const updateDictionary = GLib
  .build_filenamev(
    [currentDir, "update_dictionary.js"]
  );
const filepath = GLib.build_filenamev([
  currentDir,
  "words"
]);
const file = Gio.File.new_for_path(filepath);
const outputStream = file.append_to(
  Gio.FileCreateFlags.REPLACE_DESTINATION,
  null
);


Gtk.init(null);


const box = new Gtk.Box({
  orientation: Gtk.Orientation.VERTICAL,
  spacing: 15
});
box.set_border_width(15)


const entryLabel = new Gtk.Label({ 
  label: "Add new word", 
  xalign: 0
});
const entry = new Gtk.Entry({
  buffer: new Gtk.EntryBuffer(),
  placeholder_text: 
  "eventually [əˈven(t)SH(o͞o)əlē] зрештою",
});


const entryUpdateLabel = new Gtk.Label({ 
  label: "Change existing word", 
  xalign: 0
});
const entryUpdate = new Gtk.Entry({
  buffer: new Gtk.EntryBuffer(),
  placeholder_text: "Enter word for change",
});


const statusBar = new Gtk.Statusbar();


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


const buttonSave = new Gtk.Button({ 
  label: 'Update dictionary itself' 
});
buttonSave.connect('clicked', () => {
  let [,,, status] = GLib
    .spawn_command_line_sync(updateDictionary);
  if (status === 0) {
    statusBar.push(0, `Dictionary updated!`);
  } else {
    const text = `Status ${status}. An error occurred in the dictionary update script.`
    statusBar.push(0, text);
  }
});

box.add(entryLabel)
box.add(entry);
box.add(button);
box.add(entryUpdateLabel);
box.add(entryUpdate);
box.add(buttonUpdate);
box.add(buttonSave);
box.add(statusBar);


const win = new Gtk.Window({ defaultWidth: 500 });
win.set_title("Learn words");
win.connect('destroy', () => {
  outputStream.close(null);
  Gtk.main_quit();
});
win.add(box);
win.show_all();


Gtk.main();

#!/usr/bin/env gjs

imports.gi.versions.Gtk = "3.0";
const { Gtk, Gio } = imports.gi;

const file = Gio.File.new_for_path("words");
const outputStream = file.append_to(Gio.FileCreateFlags. REPLACE_DESTINATION, null);

Gtk.init(null);

const box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, spacing: 15 });
box.set_border_width(15)

const entry = new Gtk.Entry({
    buffer: new Gtk.EntryBuffer()
});

const entryUpdate = new Gtk.Entry({
    buffer: new Gtk.EntryBuffer()
});

const statusBar = new Gtk.Statusbar();

const button = new Gtk.Button({ label: 'Add to dictionary!' });
button.connect('clicked', () => {
    const inputText = entry.get_buffer().text;
    if (Boolean(inputText) === false) return;

    outputStream.write(`\n${inputText}`, null);
    
    statusBar.push(0, `У словник додано: ${inputText}`);
    entry.set_text("");
    win.set_focus(entry);
});

const buttonUpdate = new Gtk.Button({ label: 'Update word!' });
buttonUpdate.connect('clicked', () => {
    const inputText = entryUpdate.get_buffer().text;
    if (Boolean(inputText) === false) return;

    outputStream.write(`\n${inputText}`, null);
    
    statusBar.push(0, `Оновлено слово: ${inputText}`);
    entryUpdate.set_text("");
    win.set_focus(entryUpdate);
});

box.add(entry);
box.add(button);
box.add(entryUpdate);
box.add(buttonUpdate);
box.add(statusBar);

const win = new Gtk.Window({ defaultWidth: 500 });
win.set_title("Learn words | Add new word");
win.connect('destroy', () => {
    outputStream.close(null);
    Gtk.main_quit();
});
win.add(box);
win.show_all();

Gtk.main();

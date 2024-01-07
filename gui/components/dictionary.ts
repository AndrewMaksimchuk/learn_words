import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk?version=3.0';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, TITLE_DICTIONARY, SUMMARY_WIDTH_MAX } from './settings.js'
import { dictionaryFilePath } from '../variables.js';
import type { Dictionary } from '../type.js';

let win;
let searchBar;
let searchEntry;

export const dictionaryButtonShow = () => {
  const button = new Gtk.Button({
    label: 'Dictionary',
  });

  button.connect('clicked', () => {
    dictionaryCreateWin();
  });

  return button;
}

const dictionarySearchBarCreate = () => {
  searchBar = new Gtk.SearchBar();
  searchEntry = new Gtk.SearchEntry();

  searchBar.connect_entry(searchEntry);
  return searchBar;
}

const createRow = (word = { summary: "", body: "" }) => {
  const labelSummary = new Gtk.Label();
  labelSummary.set_xalign(0);
  labelSummary.set_width_chars(SUMMARY_WIDTH_MAX);
  labelSummary.set_max_width_chars(SUMMARY_WIDTH_MAX);
  labelSummary.set_ellipsize(3);
  labelSummary.set_text(word.summary);

  const labelBody = new Gtk.Label();
  labelBody.set_xalign(0);
  labelBody.set_ellipsize(3);
  labelBody.set_text(word.body);

  const box = new Gtk.Box();
  box.add(labelSummary);
  box.add(labelBody);

  const tableRow = new Gtk.ListBoxRow();
  tableRow.add(box);
  return tableRow;
}

const readDictionary = () => {
  const dictionaryFile = Gio.File.new_for_path(dictionaryFilePath);
  const [ok, contents] = dictionaryFile.load_contents(null);
  const utf8decoder = new TextDecoder();
  const str = utf8decoder.decode(contents)
  return JSON.parse(str) as Dictionary;
}

const dictionarySortFn = (row1: Gtk.ListBoxRow, row2: Gtk.ListBoxRow) => {
  const text1 = row1.get_child()?.get_children()[0]?.get_text();
  const text2 = row2.get_child()?.get_children()[0]?.get_text();
  return Number(text1 > text2);
}

const dictionaryCreateWin = () => {
  win = new Gtk.Window({ default_width: DEFAULT_WIDTH, default_height: DEFAULT_HEIGHT });
  win.set_title(TITLE_DICTIONARY);

  const scrolledWindow = new Gtk.ScrolledWindow();
  const table = new Gtk.ListBox();
  table.set_sort_func(dictionarySortFn);

  const dict = readDictionary();
  dict.forEach(element => {
    table.prepend(createRow(element));
  });

  scrolledWindow.add(table);
  win.add(scrolledWindow);
  win.show_all();
  return win;
}

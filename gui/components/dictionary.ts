import type { Dictionary, DictionaryItem } from "../type.js";
import Gio from "gi://Gio";
import Gtk from "gi://Gtk?version=3.0";
import Gdk from "gi://Gdk?version=3.0";
import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  TITLE_DICTIONARY,
  SUMMARY_WIDTH_MAX,
} from "./settings.js";
import { dictionaryFilePath } from "../variables.js";
import { filterText, createSearchBar } from "./search.js";

interface AppBox extends Gtk.Box {
  get_children(): Gtk.Label[];
}

let win: Gtk.Window;
let searchBar: Gtk.SearchBar;
let buttonSearch: Gtk.ToggleButton;

export const dictionaryButtonShow = () => {
  const button = new Gtk.Button({
    label: "Dictionary",
  });

  button.connect("clicked", () => {
    dictionaryCreateWin();
  });

  return button;
};

const createSearchButton = () => {
  const imageSearch = new Gtk.Image({
    icon_name: "edit-find-symbolic",
    icon_size: Gtk.IconSize.SMALL_TOOLBAR,
  });
  buttonSearch = new Gtk.ToggleButton({ image: imageSearch });
  buttonSearch.connect("clicked", () => {
    if (buttonSearch.get_active()) {
      searchBar.set_search_mode(true);
    } else {
      searchBar.set_search_mode(false);
    }
  });
  return buttonSearch;
};

const createTitleBar = () => {
  const titleBar = new Gtk.HeaderBar();
  titleBar.set_show_close_button(true);
  titleBar.set_title(TITLE_DICTIONARY);
  titleBar.add(createSearchButton());
  return titleBar;
};

const createRow = (word: DictionaryItem) => {
  // +- Gtk.ListBoxRow---+
  // | + Gtk.Box-------+ |
  // | |    Gtk.Label  | |
  // | |    Gtk.Label  | |
  // | +---------------+ |
  // +-------------------+
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

  const box = new Gtk.Box(); // it`s AppBox interface
  box.add(labelSummary);
  box.add(labelBody);

  const tableRow = new Gtk.ListBoxRow();
  tableRow.add(box);
  return tableRow;
};

const readDictionary = () => {
  const dictionaryFile = Gio.File.new_for_path(dictionaryFilePath);
  const [ok, contents] = dictionaryFile.load_contents(null);
  const utf8decoder = new TextDecoder();
  const str = utf8decoder.decode(contents);
  return JSON.parse(str) as Dictionary;
};

const dictionarySortFn = (row1: Gtk.ListBoxRow, row2: Gtk.ListBoxRow) => {
  const text1 = (row1.get_child() as AppBox)?.get_children()[0]?.get_text();
  const text2 = (row2.get_child() as AppBox)?.get_children()[0]?.get_text();
  return Number(text1 > text2);
};

const tableFilter = (row: Gtk.ListBoxRow) => {
  const labelText = (row.get_child() as AppBox)?.get_children()[0]?.get_text();
  if (filterText === "") return true;
  return labelText.indexOf(filterText) === -1 ? false : true;
};

const getKeyVal = (event: Gdk.Event) => {
  return event.get_keyval()[1];
};

const isKeyEsc = (event: Gdk.Event) => {
  const key = getKeyVal(event);
  return Gdk.KEY_Escape === key;
};

const isKeyControl = (event: Gdk.Event) => {
  const key = getKeyVal(event);
  return Gdk.KEY_Control_R === key || Gdk.KEY_Control_L === key;
};

const isKeyF = (event: Gdk.Event) => {
  const key = getKeyVal(event);
  return Gdk.KEY_f === key;
};

const buttonSearchToggled = () => {
  const state = buttonSearch.get_active();
  if (state) {
    return buttonSearch.set_active(false);
  }
  buttonSearch.set_active(true);
};

const dictionaryKeyPressEventCreateHandler = () => {
  let isControlPress = false;
  let isFPress = false;

  return (_widget: any, event: Gdk.Event) => {
    if (isKeyEsc(event)) {
      isControlPress = false;
      isFPress = false;
      return buttonSearch.set_active(false);
    }

    if (false === isControlPress) {
      return (isControlPress = isKeyControl(event));
    }

    if (isControlPress) {
      isFPress = isKeyF(event);

      if (false === isFPress) {
        return (isControlPress = false);
      }

      buttonSearchToggled();
      isControlPress = false;
      isFPress = false;
    }
  };
};

const dictionaryCreateWin = () => {
  win = new Gtk.Window({
    default_width: DEFAULT_WIDTH,
    default_height: DEFAULT_HEIGHT,
  });
  win.set_title(TITLE_DICTIONARY);
  win.set_titlebar(createTitleBar());
  win.connect("key-press-event", dictionaryKeyPressEventCreateHandler());

  const table = new Gtk.ListBox();
  table.set_sort_func(dictionarySortFn);
  table.set_filter_func(tableFilter);

  searchBar = createSearchBar(table);

  const scrolledWindow = new Gtk.ScrolledWindow();
  scrolledWindow.set_vexpand(true);
  scrolledWindow.add(table);

  const dict = readDictionary();
  dict.forEach((element) => {
    table.prepend(createRow(element));
  });

  const tableConteiner = new Gtk.Box({
    orientation: Gtk.Orientation.VERTICAL,
  });
  tableConteiner.set_vexpand(true);
  tableConteiner.add(searchBar);
  tableConteiner.add(scrolledWindow);

  win.add(tableConteiner);
  win.show_all();
  return win;
};

#!/usr/bin/env -S gjs -m
import Gtk from 'gi://Gtk?version=3.0';
import {
  updateDictionary,
  outputStream,
  currentDir,
} from "./variables.js";
import { createBox } from './components/box.js';
import { createEntryLabel } from './components/entryLabel.js';
import { createEntry } from './components/entry.js';
import { createEntryUpdateLabel } from './components/entryUpdateLabel.js';
import { createEntryUpdate } from './components/entryUpdate.js';
import { createStatusBar } from './components/statusBar.js';
import { createButton } from './components/button.js';
import { createButtonUpdate } from './components/buttonUpdate.js';
import { createButtonSave } from './components/buttonSave.js';
import { createButtonClose } from './components/buttonClose.js';
import { createWin } from './components/win.js';
import { createBoxFirstLine } from './components/boxFirstLine.js';
import { createHeaderBar } from "./components/headerBar.js";

Gtk.init(null);
const titlebar = createHeaderBar();
const win = createWin({
  outputStream,
  currentDir,
  titlebar
})
const entryLabel = createEntryLabel()
const entry = createEntry()
const entryUpdateLabel = createEntryUpdateLabel()
const entryUpdate = createEntryUpdate()
const statusBar = createStatusBar()
const button = createButton({
  entry, 
  outputStream, 
  statusBar, 
  win,
})
const buttonUpdate = createButtonUpdate({
  entryUpdate,
  outputStream,
  statusBar,
  win,
})
const buttonSave = createButtonSave({
  updateDictionary,
  statusBar,
})
const buttonClose = createButtonClose({
  outputStream,
})

const box = createBox([
  entryLabel,
  entry,
  button,
  entryUpdateLabel,
  entryUpdate,
  buttonUpdate,
  buttonSave,
  statusBar,
])

const boxMain = createBox([
  box,
]);
boxMain.set_border_width(0);

win.add(boxMain);
win.show_all();
Gtk.main();

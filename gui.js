#!/usr/bin/env -S gjs -m
import Gtk from 'gi://Gtk?version=3.0';
import {
  updateDictionary,
  outputStream
} from "./variables.js";
import { createBox } from './gui/components/box.js';
import { createEntryLabel } from './gui/components/entryLabel.js';
import { createEntry } from './gui/components/entry.js';
import { createEntryUpdateLabel } from './gui/components/entryUpdateLabel.js';
import { createEntryUpdate } from './gui/components/entryUpdate.js';
import { createStatusBar } from './gui/components/statusBar.js';
import { createButton } from './gui/components/button.js';
import { createButtonUpdate } from './gui/components/buttonUpdate.js';
import { createButtonSave } from './gui/components/buttonSave.js';
import { createButtonClose } from './gui/components/buttonClose.js';
import { createWin } from './gui/components/win.js';
import { createBoxFirstLine } from './gui/components/boxFirstLine.js';


Gtk.init(null);
const win = createWin({
  outputStream,
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
win.add(box);
win.show_all();
Gtk.main();

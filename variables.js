import Gio from 'gi://Gio';
import GLib from 'gi://GLib';


export const [filename] = GLib
  .filename_from_uri(import.meta.url)

export const currentDir = GLib
  .path_get_dirname(filename)

export const updateDictionary = GLib
  .build_filenamev(
    [currentDir, "update_dictionary.js"]
  )

export const filepath = GLib.build_filenamev([
  currentDir,
  "words"
])

export const file = Gio.File.new_for_path(filepath)

export const outputStream = file.append_to(
  Gio.FileCreateFlags.REPLACE_DESTINATION,
  null
)

export const dictionaryFilePath = GLib.build_filenamev([
  currentDir,
  "dictionary.json"
])

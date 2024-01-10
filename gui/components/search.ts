import Gtk from 'gi://Gtk?version=3.0';

export let filterText = "";

export const createSearchEntry = (table:  Gtk.ListBox) => {
    const searchEntry = new Gtk.SearchEntry();
    searchEntry.set_hexpand(true);
    searchEntry.set_max_width_chars(50);
    searchEntry.show();

    searchEntry.connect('search-changed', () => {
        filterText = searchEntry.get_text();
        table.invalidate_filter();
    });

    return searchEntry;
}
export const createSearchBar = (table:  Gtk.ListBox) => {
    const searchBar = new Gtk.SearchBar();
    searchBar.show();
    
    const searchEntry = createSearchEntry(table);
   
    searchBar.connect_entry(searchEntry);
    searchBar.add(searchEntry);

    return searchBar;
}

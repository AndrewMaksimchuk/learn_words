## Show notification on Gnome shell

### Usage

For first time run in this directory in terminal  
`sudo ./install.bash` for add path to this  
application in global scope, add desktop entry  
and add shell complition to.  

After that you can run "learnwords" in terminal.  
Or run from desktop menu.

### dictionary.json
```
{
        "summary": "thing",
        "body": "річ"
    },
    {
        "summary": "entirely",
        "body": "повністю"
    },
    {
        "summary": "afterwards",
        "body": "згодом"
    }
]
```

### words - csv format  
Column name: "summary body"
```
thing річ
entirely повністю
afterwards згодом
```
|summary   |body    |
|----------|--------|
|thing     |річ     |
|entirely  |повністю|
|afterwards|згодом  |

### Commands  
`run` - run application in background.    
`update` - get "words" file content and add to  
"dictionary.json" file with transformation that  
needed.  
`open` - run gui  

`./learn_words.bash &` - run application in  
background process. Application repeat each 5  
minutes.  
`kill %1` - terminate background process, when  
number 1 is a process number that return in  
terminal after running previus command.  

For write "words" file, is made possible use  
gui application.  
Run `./gui.js`.  
![gui application](gui.png)  

For update one word from terminal use:  
`./updateWord.js enveriable "навколишнє середовище"`  

If you have 
[Simple Message](https://github.com/freddez/gnome-shell-simple-message) 
extension this application push to him text to show.  
Details in `extensionChangeText` function.  

### GUI

Build on GTK3 and GJS

#### GUI Resources

- https://gjs.guide/guides/
- https://gjs-docs.gnome.org/gtk30~3.0/
- https://gjs-docs.gnome.org/gio20~2.0/gio.file
- https://rmnvgr.gitlab.io/gtk4-gjs-book/application/
- https://gitlab.gnome.org/GNOME/gjs/tree/HEAD/examples
- https://gitlab.gnome.org/BrainBlasted/gi-typescript-definitions/-/tree/eb2a87a25c5e2fb580b605fbec0bd312fe34c492
- https://gitlab.gnome.org/World/vocalis

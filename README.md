## Show notification on Gnome shell

### Usage

For first time run in this directory in terminal  
`sudo ./install.bash` for add path to this  
application in global scope and add shell  
complition to.  

After that you can run "learnwords" in terminal.  

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

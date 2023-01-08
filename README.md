Show notification on Gnome gui

dictionary.json
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

words - csv format  
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

"Makefile" containe all commands for work.  
`make run` - show one notification message.    
`make update` - get "words" file content and add to "dictionary.json" file with transformation that needed.  

`./run.sh &` - run application in background process. Application repeat each 15 minutes.   
`kill %1` - terminate background process, when number 1 is a process number that return in terminal after running previus command.  

For write "words" file, is made possible use gui application.  
Run `./gui.js`.  
![gui application](gui.png)

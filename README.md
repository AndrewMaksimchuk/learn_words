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

words - csv
```
thing річ
entirely повністю
afterwards згодом
```
"Makefile" containe all commands for work.  
`make run` - show one notification message.    
`make update` - get "words" file content and add to "dictionary.json" file with transformation that needed.  

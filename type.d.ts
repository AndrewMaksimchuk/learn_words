interface Notify {
    summary: string
    body: string
    "icon-name": string
}

type DictionaryItem = Omit<Notify, "icon-name">

type Dictionary = DictionaryItem[]

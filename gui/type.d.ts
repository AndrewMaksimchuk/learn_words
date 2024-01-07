export interface Notify {
    summary: string
    body: string
    "icon-name": string
}

export type DictionaryItem = Omit<Notify, "icon-name">

export type Dictionary = DictionaryItem[]

const isAdded = (dictionary, addedWords) => {
    const keyName = "summary";
    const onlySummary = dictionary.reduce((previous, current) => {
        const key = current[keyName];
        return { ...previous, [key]: true };
    }, {});
    const needAdded = addedWords.filter((value) => !onlySummary[value[keyName]]);
    return needAdded.length > 0 ? needAdded : undefined;
}

module.exports = { isAdded }

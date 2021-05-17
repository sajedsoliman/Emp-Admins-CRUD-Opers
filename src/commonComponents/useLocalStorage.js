import { useState, useEffect } from "react";

function getInitialValue(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) return savedValue;

    console.log(initialValue)

    return initialValue;
}

export default function useLocalStorage(key, initialValue = []) {
    const [value, setValue] = useState(() => getInitialValue(key, initialValue))

    const updateValue = (item, operation) => {
        let values;
        const isExist = value.some(itm => itm.id == item.id)
        if (isExist) {
            if (operation == "delete")
                values = value.filter(value => value.id !== item.id)
            else
                values = value.map(itm => itm.id == item.id ? item : itm)
        } else {
            values = [...value, { ...item, id: new Date().getTime() }]
        }

        setValue(values)
    }

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, updateValue]
}
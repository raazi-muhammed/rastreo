import { useEffect, useState } from "react";

function getSavedValues(key: string, initialData: any) {
    try {
        const data = window.localStorage.getItem(key);

        if (!data) return initialData;
        return JSON.parse(data);
    } catch (error) {
        window.localStorage.removeItem(key);
        return null;
    }
}

export default function useLocalStorage<T>(
    key: string,
    initialData: T
): [T, React.Dispatch<React.SetStateAction<T>>, () => void, () => void] {
    const [data, setData] = useState(() => getSavedValues(key, initialData));

    const clearLocalStorage = () => {
        window.localStorage.removeItem(key);
    };

    const saveToLocalStorage = () => {
        window.localStorage.setItem(key, JSON.stringify(data));
    };

    useEffect(() => {
        saveToLocalStorage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return [data, setData, saveToLocalStorage, clearLocalStorage];
}

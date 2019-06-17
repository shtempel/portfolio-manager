const LocalStorageService = () => {
    return {
        setItem(key: string, value: object) {
            localStorage.setItem(key, JSON.stringify(value));
        },

        getItem(key: string) {
            const storageData = localStorage.getItem(key);

            return storageData ? JSON.parse(storageData) : null;
        }
    };
};

export default LocalStorageService();

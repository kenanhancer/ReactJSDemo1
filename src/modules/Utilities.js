export const UID_PREFIX = 'new';

export default class Utilities {
    
    static filterList(dataList, filter) {
        var filteredData = dataList;
        if (filteredData && filteredData.length>0 && filter && filter.length > 0) {
            filteredData = filter.reduce((list, nextFilter) => {
                return list.filter(row => {
                    if (nextFilter.id in row && nextFilter.value !== null)
                        return (row[nextFilter.id] === nextFilter.value);
                    else
                        return true;    
                });
            }, filteredData);
        }
        return filteredData;
    }

    static generateUuid() {
        return UID_PREFIX + Date.now();
    }

    static round(value, decimal) {
        const op = Math.pow(10, decimal);
        return Math.round(value * op) / op;
    }

    static isChecked(value) {
        return (value === "Y" || value === "YES" || value === 1 || value);
    }
}
export function deepCopy(arr): any {
    const copy = [];
    arr.forEach(elem => {
        if (Array.isArray(elem)) {
            copy.push(deepCopy(elem))
        } else {
            if (typeof elem === 'object') {
                copy.push(deepCopyObject(elem));
            } else {
                copy.push(elem);
            }
        }
    });
    return copy;
}

// Helper function to deal with Objects
export function deepCopyObject(obj): any {
    const tempObj = {};
    for (const [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
            tempObj[key] = deepCopy(value);
        } else {
            if (typeof value === 'object') {
                tempObj[key] = deepCopyObject(value);
            } else {
                tempObj[key] = value;
            }
        }
    }
    return tempObj;
}
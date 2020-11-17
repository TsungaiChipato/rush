export const getLastIndexArray = (array) => {
    return array.length - 1;
}

export const getLastFromArray = (array) =>{
    return array[getLastIndexArray(array)];
}

export const randomBetween = (min, max) => {
    const minimum = Math.ceil(min);
    const maximum = Math.floor(max);

    return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

export const getRandom = (array) =>{
    return array[randomBetween(0, getLastIndexArray(array))];
}

export const empty = (array) =>{
    array.splice(0, array.length);
}

export const addAll = (items, array) =>{
    items.forEach((item) => {
        array.push(item);
    });
}

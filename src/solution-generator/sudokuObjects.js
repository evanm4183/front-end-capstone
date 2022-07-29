let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

export const getBoard = () => {
    return board.map(row => [...row])
}

export const resetAvailableNumbers = () => { 
    return {1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true}
}

export const convertToArray = (availableNumbers) => { 
    let availableNumsArray = [] //might be an issue

    for (let i = 1; i < 10; i++) {
        if (availableNumbers[i]) {
            availableNumsArray.push(i)
        }
    }

    return availableNumsArray
}
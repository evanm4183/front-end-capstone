export const PuzzleGridForm = ({boardArr, updateArr, idName, isSolution, updateEditedIndex}) => {

    const determineValue = (num) => {
        if (num === 0) {
            return ""
        }
            
        return num
    }

    const determineClass = (index) => {
        if ((index % 9 === 2 || index % 9 === 5) && ((index >= 18 && index <= 26) || (index >= 45 && index <= 53))) {
            return "corner-cell"
        } else if (index % 9 === 2 || index % 9 === 5) {
            return "side-border-cell"
        } else if ((index >= 18 && index <= 26) || (index >= 45 && index <= 53)) {
            return "bottom-border-cell"
        }

        return "regular-cell"
    }

    const invalidInput = (char) => {
        const validChars = [49, 50, 51, 52, 53, 54, 55, 56, 57, 95]

        return !validChars.includes(char.charCodeAt(0))
    }

    return (
        <article className="grid-container">
            {
                boardArr.map((cell, index) => {
                    return (
                        <input 
                            type="text" 
                            className={determineClass(index)} 
                            value={determineValue(cell)}
                            id={`${idName}--${index}`}
                            key={index}
                            maxLength="1"
                            autoComplete="off"
                            onChange={
                                (e) => {
                                    if (isNaN(e.target.value.charCodeAt(0))) { //prevents NaN from being input in arr when backspace is used
                                        const copy = [...boardArr]
                                        copy[index] = 0
                                        updateArr(copy)

                                        return
                                    } else if (invalidInput(e.target.value)) { //checks to make sure the input is not anything other than 1-9 and _
                                        window.alert("Invalid Input")
                                        return
                                    }

                                    const copy = [...boardArr]
                                    isNaN(e.target.value) 
                                        ? copy[index] = e.target.value 
                                        : copy[index] = parseInt(e.target.value)
                                    updateArr(copy)

                                    if (isSolution) {
                                        updateEditedIndex(index)
                                    }
                                }
                            }
                        ></input>
                    )
                })
            }
        </article>
    )
}
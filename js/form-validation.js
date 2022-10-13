class FormValidation {
    /**
     * Checks validity of name
     * @returns T/F 
     */
    checkNameValidity() {
        const name = document.getElementById("name");
        const nameError = document.querySelector("#name + p.error");

        if (name.checkValidity()) {
            nameError.textContent = "";
            nameError.className = "error";
            return true;
        }
    
        if (name.validity.valueMissing) {
            nameError.textContent = "Please enter a name.";
        } else if (name.validity.patternMismatch) {
            nameError.textContent = "Name must be alphabetic.";
        }
        nameError.className = "error active";
        return false;
    }

    /**
     * Checks validity of rows
     * @returns T/F
     */
    checkRowsValidity() {
        const rows = document.getElementById("rows");
        const rowsError = document.querySelector("#rows + p.error");

        if (rows.checkValidity()) {
            rowsError.textContent = "";
            rowsError.className = "error";
            return true;
        }
    
        if (rows.validity.valueMissing) {
            rowsError.textContent = "Please enter a number of rows.";
        } else if (rows.validity.rangeUnderflow) {
            rowsError.textContent = "Row number must be a positive integer greater than 2.";
        } else if (rows.validity.patternMismatch) {
            rowsError.textContent = "Row number must be a positive integer.";
        }
        rowsError.className = "error active";
        return false;
    }

    /**
     * Checks validity of cols
     * @returns T/F
     */
    checkColsValidity() {
        const cols = document.getElementById("cols");
        const colsError = document.querySelector("#cols + p.error");

        if (cols.checkValidity()) {
            colsError.textContent = "";
            colsError.className = "error";
            return true;
        }
    
        if (cols.validity.valueMissing) {
            colsError.textContent = "Please enter a number of columns.";
        } else if (cols.validity.rangeUnderflow) {
            colsError.textContent = "Column number must be a positive integer greater than 2.";
        } else if (cols.validity.patternMismatch) {
            colsError.textContent = "Column number must be a positive integer.";
        }
        colsError.className = "error active";
        return false;
    }

    /**
     * Checks validity of levels
     * @returns T/F
     */
    checkLevelsValidity() {
        const levels = document.getElementById("levels");
        const levelsError = document.querySelector("#levels + p.error");

        if (levels.checkValidity()) {
            levelsError.textContent = "";
            levelsError.className = "error";
            return true;
        }
    
        if (levels.validity.valueMissing) {
            levelsError.textContent = "Please enter a number of levels.";
        } else if (levels.validity.rangeUnderflow) {
            levelsError.textContent = "Level number must be a positive integer.";
        } else if (levels.validity.patternMismatch) {
            levelsError.textContent = "Level number must be a positive integer.";
        }
        levelsError.className = "error active";
        return false;
    }

    /**
     * Checks validity of load name
     * @returns T/F
     */
    checkPrevNameValidity() {
        const prevName = document.getElementById("prevName");
        const prevNameError = document.querySelector("#prevName + p.error");

        if (prevName.checkValidity()) {
            prevNameError.textContent = "";
            prevNameError.className = "error";
            return true;
        }
    
        if (prevName.validity.valueMissing) {
            prevNameError.textContent = "Please enter a name.";
        } else if (prevName.validity.patternMismatch) {
            prevNameError.textContent = "Name must be alphabetic.";
        }
        prevNameError.className = "error active";
        return false;
    }
}

export default FormValidation;
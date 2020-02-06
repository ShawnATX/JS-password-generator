
// 

let generateBtn = document.querySelector("#generate");
let passwordArea = document.querySelector("#password");



function newPassword() {
    //Removing focus from Generate button after click to prevent accidentally triggering it again before user has a chance to copy it.
    generateBtn.blur();
    let length = "0";
    let lengthInt = 0;

    //Collecting the desired length of the new password, with checks for NaN and length under 8 or over 128. Returns number of desired length.
    function getLength() {
        length = prompt("Please indicate your desired password length with a numeric value between 8 and 128");
        //catch if user clicks 'Cancel' and ends password 
        if (!(length)){
            return 0;
        }
        lengthInt = parseInt(length);
        if (isNaN(lengthInt)){
            getLength();
        }
        else if ((lengthInt < 8) || (lengthInt > 128)){
            getLength();
        }
        return lengthInt;
    }
    
//Prompts to collect password criteria.
    lengthInt = getLength();
    if (lengthInt === 0){
        return;
    }
    let includeLowercase = false;
    let includeUppercase = false;
    let includeNumeric = false;
    let includeSpecialCharacters = false;

//Gather the character types to include, and validate that at least one is selected
    while (!(includeNumeric) && !(includeLowercase) && !(includeUppercase) && !(includeSpecialCharacters)){
        alert("You will need to select at least one character type to include in your password.")
        includeLowercase = confirm("Would you like to include lowercase characters? Cancel = No")
        includeUppercase = confirm("Would you like to include  uppercase characters? Cancel = No")
        includeNumeric = confirm("Would you like to include  numeric characters? Cancel = No")
        includeSpecialCharacters = confirm("Would you like to include  special characters? Cancel = No")
    }

//Using a fixed array of arrays which contains all possible characters
    function processUserCriteria (lengthInt, includeLowercase, includeUppercase, includeNumeric, includeSpecialCharacters){
        let userPassword = "";
        let availableCharacters = "";
        //possibleCharacters[0] = lower case characters;
        //possibleCharacters[1] = upper case characters;
        //possibleCharacters[3] = numeric characters;
        //possibleCharacters[4] = special characters;
        let possibleCharacters = [["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], ["!", "\"", "/", "@", "#", "$", "%", "^", "&", "*", ",", ".", "?", "~", "`", "(", ")", "+", "-", "_", "=", "[", "]", "{", "}", "|", ":", ";"]];
                                


        // Would not be random character selection if we were to choose an array element, then choose a character in that sub-array. In this case I will build a string of possible characters and randomly select a single character from that string
        //This block builds the string of available characters to build the password with, based on user input.
        if (includeSpecialCharacters === true) {
            for (var i = 0; i < possibleCharacters[3].length; i++){
                availableCharacters = availableCharacters.concat(possibleCharacters[3][i]);
            }
        }
        if (includeNumeric === true) {
            for (var i = 0; i < possibleCharacters[2].length; i++){
                availableCharacters = availableCharacters.concat(possibleCharacters[2][i]);
            }
        }
        if (includeUppercase === true) {
            for (var i = 0; i < possibleCharacters[1].length; i++){
                availableCharacters = availableCharacters.concat(possibleCharacters[1][i]);
            }
        }
        if (includeLowercase === true) {
            for (var i = 0; i < possibleCharacters[0].length; i++){
                availableCharacters = availableCharacters.concat(possibleCharacters[0][i]);
            }
        }

        //looping through the length of the desired password to add a single random character at a time.
        for (var i = 0; i < lengthInt; i++){
            nextCharacter = availableCharacters.charAt(Math.floor(Math.random()*availableCharacters.length+1));
            userPassword = userPassword.concat(nextCharacter);
        }
        return userPassword;
    }

    //function which calls the processUserCriteria function directly and displays it in the browser.
    function showPassword() {
        let passwordBox = document.querySelector("#password");
        passwordBox.textContent = processUserCriteria(lengthInt, includeLowercase, includeUppercase, includeNumeric, includeSpecialCharacters);
      }  

    //Execute function to generate new password, display it on the screen, and finally exit the main newPassword function
    showPassword();
    
    return;
}

//Copy password to user system clipboard when the user clicks in the text box
function copyToClipboard() {
    let passwordArea = document.getElementById("password");
    //check if password has been generated yet, if not simply do nothing.
    if (!(passwordArea.innerHTML)){
        alert("Click 'Generate Password' first")
        return;
    }

    passwordArea.select();
    document.execCommand("copy");
    passwordArea.blur();
    alertCopySuccess();
    return;
}

function alertCopySuccess(){
    alert("Password successfully copied to clipboard. Use Ctrl+V or Command+V to paste.");
    return;
}

// // Add event listener to generate button
generateBtn.addEventListener("click", newPassword);

//Add event listener to text area for copy function
passwordArea.addEventListener("click", copyToClipboard);
//passswordArea.set

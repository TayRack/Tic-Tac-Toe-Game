//open edit player name overlay
function openPlayerConfig(event) {
    const selectedPlayerId= +event.target.dataset.playerid;  //The playerid value 1 or 2 // + '1' -> 1 // if data.plyer-id, to access properties on javascript objects -> dataset['player-id']
    editedPlayer = selectedPlayerId;
    playerConfigOverlayElement.style.display = "block";
    backdropElement.style.display = "block";
}

// Close edit name overlay
function closePlayerConfig() {
    playerConfigOverlayElement.style.display = "none";
    backdropElement.style.display = "none";
    formElement.firstElementChild.classList.remove('error');
    errorsOutputElement.textContent = '';
    formElement.firstElementChild.lastElementChild.value = ''
}

// Save player name when hitting the confirm button. Access the form and the name property of the input element

function savePlayerConfig(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredPlayerName = formData.get('playername').trim();

    //Validating input

    if (!enteredPlayerName) { //enteredPlayername === ''
        event.target.firstElementChild.classList.add('error');
        errorsOutputElement.textContent = 'Please enter a valid name!'
        return; // return used to pass a value where the function was executed. Also stops the execution of the function where you call it.
    }
    
    // Change H3 element to the player named that was inputed. 
    const updatedPlayerDataElement = document.getElementById('player-' + editedPlayer + '-data');
    // access the children of the article element in html containing the H3 element
    updatedPlayerDataElement.children[1].textContent = enteredPlayerName;

 /*  If (editedPlayer === 1) {
        players[0]
     else {
        players[1].name = enteredPlayerName;  */

    players[editedPlayer-1].name = enteredPlayerName;  // Store player name in players.name 

    closePlayerConfig();
}


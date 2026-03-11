const anchorTag = document.getElementById("click-here"); // get the anchor tag by its id, in this case it is <a>
const numberRolled = document.getElementById("number-rolled"); // get the h1 tag by its id, in this case it is <h1>
const numberRolled2 = document.getElementById("number-rolled-2"); // get the h2 tag by its id, in this case it is <h2>
//console.log(anchorTag); // print for debugging 

//numberRolled.innerText = "!"

const randomNumber = () => {
    let randomNumber = Math.random() * 6 + 1; // random number between 1 and 6
    let rounded = Math.floor(randomNumber);
    return rounded;
}

anchorTag.onclick = () => { // on click, log "Clicked" to the console
    //console.log(randomNumber());
    numberRolled.innerText = randomNumber();
    numberRolled2.innerText = randomNumber();
}
/*

Il computer deve generare 16 numeri casuali e inserirli in un array, 
in base al range della difficoltà prescelta 
(se abbiamo scelto facile l'array conterrà numeri casuali da 1 a 100,
 se invece abbiamo scelto difficile l'array dovrà contenerne da 1 a 49): 
 questi rappreseranno le posizioni delle nostre bombe.
Attenzione: nella stessa cella può essere posizionata al massimo una bomba, 
perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: 
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - 
la cella si colora di rosso e la partita termina. 
Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba 
o quando raggiunge il numero massimo possibile di numeri consentiti 
(ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, 
cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

BONUS 1
Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.

BONUS 2
Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.


*/


const playButton = document.querySelector("#play-button");

// alla pressione del pulsante play, lanciamo la funzione play()
// notare come qui il nome della funzione non abbia le tonde alla fine
// perchè in js, OGNI VOLTA che viene letto del codice con delle tonde
// viene SUBITO eseguita la sua istruzione
// provate infatti ad inserire le tonde dopo play e vedrete
// che il gioco si avvia immediatamente senza bisogno di premere il pulsante
playButton.addEventListener("click", play);



// funzione che gestisce tutta la logica del gioco
function play() {
    console.log("play")

    // mi salvo la griglia in una variabile
    const gridElement = document.querySelector("#grid");

    // elemento del punteggio
    const pointsElement = document.querySelector("#points");

    // elemento per il game over
    const gameOverElement = document.querySelector("#game-over");

    // faccio sparire il gameOverElement in caso fosse visualizzato
    gameOverElement.style.display = "none";
    // resetto il testo del punteggio
    pointsElement.innerText = "";


    // inzializzo un array vuoto dove mi salverò i numeri cliccati
    const clickedNumbers = [];

    // inizializzo una variabile booleana che controlla quando c'è il game over
    let gameOver = false;


    // codice per generare la griglia
    let cellNumber;

    // test: stampiamo il valore della select
    const selectElement = document.querySelector("#difficulty");
    console.log(selectElement.value)



    



    // cambio il numero di celle da creare in base alla difficoltà
    if(selectElement.value == "easy") {
        cellNumber = 100;
    } else if (selectElement.value == "medium") {
        cellNumber = 81;
    } else {
        cellNumber = 49;
    }

    // imposto la classe della griglia in base alla difficoltà
    // questa verrà gestita dal css per ridimensionare correttamente i quadrattini
    gridElement.className = selectElement.value;


    // resetto la griglia in modo che alla nuova pressione del pulsante
    // non aggiunga le griglie una sotto l'altra
    gridElement.innerHTML = "";

    // facciamo comparire la griglia
    gridElement.style.display = "flex";


    // genero un array di 16 bombe
    const bombs = getRandomNumbersArray(16, cellNumber);
    console.log("bombe: ", bombs)


    for(let i = 0; i < cellNumber; i++) {

        // creo un elemento
        const newElement = document.createElement("div");
        // do la classe cell
        newElement.classList.add("cell");
        // ci scrivo dentro il numero 
        newElement.innerHTML = i + 1;
        // lo aggiungo alla griglia
        gridElement.append(newElement);


        // aggiungo un event listener del click ad ogni cella
        newElement.addEventListener("click", function() {

            if(!gameOver) {

                // emetto un messaggio in console con il numero della cella cliccata
                console.log(this.innerText);

                // se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - 

                if(bombs.includes(Number(this.innerText))) {
                    // ho cliccato una bomba

                    // console.log("pestata una bomba");
                    this.classList.add("bomb");


                    // gestisco il gameOver
                    endGame(gameOverElement, clickedNumbers.length, gridElement, bombs);

                    // setto gameOver a true
                    gameOver = true;

                } else if( ! clickedNumbers.includes(this.innerText)) {
                    // ho cliccato su una casella libera
                    
                    // aggiungo la classe all'elemento cliccato
                    this.classList.add("clicked");

                    // aggiungo il numero cliccato all'array di numeri cliccati
                    clickedNumbers.push(this.innerText);

                    pointsElement.innerText = "Punteggio: " + clickedNumbers.length
                }

                console.log("numeri cliccati", clickedNumbers)

            }
            
        });


    }

}




function endGame(gameOverElement, points, gridElement, bombs) {

    console.log("game over");

    gameOverElement.style.display = "block";
    gameOverElement.innerHTML = "Game Over<br><small>Punteggio: " + points + "</small>";


    // mi salvo tutte le celle della griglia in un array
    const everyCellList = gridElement.querySelectorAll(".cell");
    
    for(let i = 0; i < everyCellList.length; i++) {
        // per ogni cella della griglia

        if(bombs.includes(Number(everyCellList[i].innerText))) {
            everyCellList[i].classList.add("bomb");
        }
    }


}




// funzione che genera un numero casuale in base ad un valore massimo dato come parametro
// da 1 a max

function getRandomNumber(max) {
    const randomNumber = Math.floor(Math.random() * max + 1)
    
    return randomNumber;
}



// console.log(getRandomNumbersArray(16, 49));

// data una lunghezza, genera un array con tot numeri casuali tutti diversi tra loro
// questa funzione ha bisogno della funzione getRandomNumber
function getRandomNumbersArray(quantity, highestNumber) {

    // dichiariamo un array vuoto
    const numbersArray = [];

    let iterazioni = 0;

    // avvio un ciclo while
    do {
        // generiamo un numero casuale
        const newNumber = getRandomNumber(highestNumber);

        if( ! numbersArray.includes(newNumber)) {
            // solo se il numero generato non è presente nell'array

            // se il numero casuale non è presente nell'array lo inseriamo
            numbersArray.push(newNumber);

        }


        iterazioni++;
        // continuiamo a fare tutto SINCHè la lunghezza dell'array è quella indicata
    } while (numbersArray.length < quantity && iterazioni < 1000);


    return numbersArray;

}
/*****************************************************************************
 * BINGO GAME REFACTOR
 * 
 * Description:
 * - Randomly draw, store, and display bingo balls.
 *
 * JS Dependencies:
 * - None. Vanilla JS.
 *
 * DOM Dependencies:
 * - .js-draw     : draw button
 * - .js-reset    : reset button
 * - .js-card     : card button
 * - .js-history  : <ol> drawn balls
 * - .js-last-num : <span> last drawn ball
 *
 * @var {Object} BINGO - Global namespace.
 *
 * @author Scott Currell
 ****************************************************************************/

'use strict';
var drawButton_count = 0
var drawButton_call = 0
window.onload = () => {
    document.querySelector("#openModal").click();
}
function account() {
    document.querySelector("#openAccountModal").click();
}
function home(){
    window.location.href="landing.html";
}
function proceed_to_game() {    
    
    if(document.getElementById('move_1').checked){
        var radio_value = document.getElementById('move_1').value;
        console.log(radio_value)
        var myModalEl = document.getElementById('exampleModal');
        var modal = bootstrap.Modal.getInstance(myModalEl)
         
        drawButton_call = radio_value;
       
        var user_address_key =  document.getElementById("address_key_user").value;

        document.getElementById("disp").innerHTML   
            = radio_value  
            + " Click game mode is selected" + " Your Crypto Address Key is: " + user_address_key; 
            modal.hide();
    }else if(document.getElementById('move_2').checked){
        var radio_value = document.getElementById('move_2').value;
        console.log(radio_value)
        var myModalEl = document.getElementById('exampleModal');
        var modal = bootstrap.Modal.getInstance(myModalEl)
         
        drawButton_call = radio_value;
        var user_address_key =  document.getElementById("address_key_user").value;

        document.getElementById("disp").innerHTML   
            = radio_value   
            + " Click game mode is selected" + " Your Crypto Address Key is: " + user_address_key; 
            modal.hide();
        
    }     
    else{
        document.getElementById("error").innerHTML   
            = "*You have not selected any game mode";
    }  
    
} 

function coinbase_button() {
    alert('Feature in development :)')
} 
var BINGO = BINGO || {};

var selected = ["FREE"];

BINGO.ballCount;
BINGO.ballsArr  = [];
BINGO.cardCells = document.getElementsByClassName( 'js-card-cell' );
BINGO.domElems  = {
    drawButton  : document.getElementById( 'js-draw' ),
    resetButton : document.getElementById( 'js-reset' ),
    cardButton  : document.getElementById( 'js-card' ),
    drawHistory : document.getElementById( 'js-history' ),
    drawnLast   : document.getElementById( 'js-last-num' )
};

/******************************************************************************
 * POPULATE BALLS
 * Populates ballsArr[] with 75 balls ranging from B-1 to O-75.
 *****************************************************************************/
BINGO.populateBallsArray = () => {

    for ( let i = BINGO.ballCount; i >= 1; i-- ) {

        if ( i >= 1  && i <= 15 ) BINGO.ballsArr.push( 'B-' + i );
        if ( i >= 16 && i <= 30 ) BINGO.ballsArr.push( 'I-' + i );
        if ( i >= 31 && i <= 45 ) BINGO.ballsArr.push( 'N-' + i );
        if ( i >= 46 && i <= 60 ) BINGO.ballsArr.push( 'G-' + i );
        if ( i >= 61 && i <= 75 ) BINGO.ballsArr.push( 'O-' + i );

    }

};

/******************************************************************************
 * ADD CLASS ON CLICK
 * Receives an HTMLCollection and a CSS class. Adds a click handler that
 * toggles the passed class on the clicked el.
 * @param {Object} obj - HTMLCollection
 * @param {String} cl  - CSS class
 *****************************************************************************/
BINGO.addClassOnClick = ( obj, cl ) => {

    [ ...obj ].map( el => {

        el.addEventListener( 'click', () => {

            el.classList.contains( cl ) ? el.classList.remove( cl ) : el.classList.add( cl );

        } );

    });

};

/******************************************************************************
 * INITIALIZER ( IIFE )
 * Kicks things off.
 *****************************************************************************/
(BINGO.init = () => {

    BINGO.ballCount = 75;

    BINGO.populateBallsArray();
    BINGO.addClassOnClick( BINGO.cardCells, 'marked' );

})();

/******************************************************************************
 * IS VALID NUMBER
 * Validation check. See if a passed number already exists in an array.
 * @param  {Int}   num - number to check against the array
 * @param  {Array} arr - existing numbers
 * @return {Bool}
 *****************************************************************************/
BINGO.isValidNumber = ( num, arr = [] ) => {

    if ( !arr.includes( num ) ) {

        return true;

    } else {

        return false;

    }

};

/******************************************************************************
 * RANDOM NUMBER GENERATOR
 * Generates and returns a random number between and including a min/max range
 * (passed as parameters). Minimum and maximum inclusive.
 * @param  {int}   max - maximum value
 * @param  {int}   min - minimum value
 * @param  {Array} arr - for validation check
 * @return {Int} randomized number from min to max inclusive
 *****************************************************************************/
BINGO.generateRandomNumber = ( max, min = 0, arr = [] ) => {

    const _max = Math.floor( max );
    const _min = Math.ceil( min );
    const _arr = arr;
    // random number between and including range
    const _num = Math.floor( Math.random() * ( _max - _min + 1 ) ) + _min;

    // Make sure random number doesn't already exist in the array
    if ( BINGO.isValidNumber( _num, _arr ) ) {

        _arr.push( _num );

        return _num;

    } else {

        // recursive call if invalid
        return BINGO.generateRandomNumber( _max, _min, _arr );

    }

};

/******************************************************************************
 * RANDOM BALL SELECTOR
 * Randomly selects and returns a ball from ballsArr[].
 * @return {String} randomized ball number from B-1 to O-75
 *****************************************************************************/
BINGO.randomBallSelector = () => {

    const _ballCount  = BINGO.ballsArr.length;
    const _randomBall = BINGO.generateRandomNumber( _ballCount - 1 );

    return BINGO.ballsArr[ _randomBall ];

};

/******************************************************************************
 * POP BALL
 * Receives a randomized ball number and removes it from ballsArr[].
 * @param  {String} ball  - randomized ball number from B-1 to O-75
 * @return {Object} BINGO - makes method chaining possible
 *****************************************************************************/
BINGO.popBall = ball => {

    const _ballIndex = BINGO.ballsArr.indexOf( ball );

    if ( _ballIndex > -1 ) BINGO.ballsArr.splice( _ballIndex, 1 );

    return BINGO;

};

/******************************************************************************
 * UPDATE DRAW HISTORY
 * Receives a randomized ball number. Creates an 'li' that contains the
 * randomized ball number and appends it to the draw history in the DOM.
 * Also scrolls to the bottom of the list when a new ball is drawn.
 * @param  {String} ball  - randomized ball number from B-1 to O-75
 * @return {Object} BINGO - makes method chaining possible
 *****************************************************************************/
BINGO.updateDrawHistory = ball => {

    const _node     = document.createElement( 'li' );
    const _textnode = document.createTextNode( ball );

    // append ball number to 'li'
    _node.appendChild( _textnode );

    // update the DOM
    BINGO.domElems.drawHistory.appendChild( _node );

    // scroll to the bottom of the list in the DOM
    BINGO.domElems.drawHistory.scrollTop = BINGO.domElems.drawHistory.scrollHeight;

    return BINGO;

};

/******************************************************************************
 * UPDATE LAST DRAWN
 * Receives a randomized ball number and updates the last drawn number in the
 * DOM.
 * @param  {String} ball  - randomized ball number from B-1 to O-75
 * @return {Object} BINGO - makes method chaining possible
 *****************************************************************************/
BINGO.updateLastDrawn = ball => {

    BINGO.domElems.drawnLast.innerHTML = ball;

    return BINGO;

};

/******************************************************************************
 * HIGHLIGHT DRAWN BALLS
 * Receives a randomized ball number and highlights the corresponding value
 * in the DOM table.
 * @param  {String} ball  - randomized ball number from B-1 to O-75
 * @return {Object} BINGO - makes method chaining possible
 *****************************************************************************/
BINGO.highlightDrawnBall = ball => {

    // last ball drawn
    const _drawnBalls = document.getElementsByClassName( 'last' );

    for ( let i = _drawnBalls.length - 1; i >= 0; i-- ) {

        // remove special highlighting
        _drawnBalls[ i ].classList.remove( 'last' );

    }

    // highlight the drawn ball in the bingo caller table
    document.getElementById( 'js-caller-' + ball ).classList.add( 'drawn', 'last' );

    return BINGO;

};

/******************************************************************************
 * HIGHLIGHT CARD CELL
 * Receives a ball number then finds and highlights the corresponding cell in
 * the playing card.
 * @param  {Int}    number - Between 1 - 75
 * @return {Object} BINGO  - makes method chaining possible
 *****************************************************************************/
BINGO.highlightCardCell = number => {

    let _cell = document.getElementById( 'js-card-' + number );

    if ( !!_cell ) _cell.classList.add( 'marked' );

    return BINGO;

};


/******************************************************************************
 * CHECK WINNER
 * Declare a winner array
 * Receives a ball number
 * push number to selected array
 * check the number present in the winner array
 * alert winner if found
 * @return {Object} BINGO  - makes method chaining possible
 *****************************************************************************/

BINGO.checkWinner = number => {
    // winner array
    const arr = [[BINGO.cardCells[0].id,BINGO.cardCells[5].id,BINGO.cardCells[10].id,BINGO.cardCells[14].id,BINGO.cardCells[19].id],
                 [BINGO.cardCells[1].id,BINGO.cardCells[6].id,BINGO.cardCells[11].id,BINGO.cardCells[15].id,BINGO.cardCells[20].id],
                 [BINGO.cardCells[2].id,BINGO.cardCells[7].id,"FREE",BINGO.cardCells[16].id,BINGO.cardCells[21].id],
                 [BINGO.cardCells[3].id,BINGO.cardCells[8].id,BINGO.cardCells[12].id,BINGO.cardCells[17].id,BINGO.cardCells[22].id],
                 [BINGO.cardCells[4].id,BINGO.cardCells[9].id,BINGO.cardCells[13].id,BINGO.cardCells[18].id,BINGO.cardCells[23].id],
                 [BINGO.cardCells[0].id,BINGO.cardCells[1].id,BINGO.cardCells[2].id,BINGO.cardCells[3].id,BINGO.cardCells[4].id],
                 [BINGO.cardCells[5].id,BINGO.cardCells[6].id,BINGO.cardCells[7].id,BINGO.cardCells[8].id,BINGO.cardCells[9].id],
                 [BINGO.cardCells[10].id,BINGO.cardCells[11].id,"FREE",BINGO.cardCells[12].id,BINGO.cardCells[13].id],
                 [BINGO.cardCells[14].id,BINGO.cardCells[15].id,BINGO.cardCells[16].id,BINGO.cardCells[17].id,BINGO.cardCells[18].id],
                 [BINGO.cardCells[19].id,BINGO.cardCells[20].id,BINGO.cardCells[21].id,BINGO.cardCells[22].id,BINGO.cardCells[23].id],
                 [BINGO.cardCells[0].id,BINGO.cardCells[6].id,"FREE",BINGO.cardCells[17].id,BINGO.cardCells[23].id],
                 [BINGO.cardCells[19].id,BINGO.cardCells[15].id,"FREE",BINGO.cardCells[8].id,BINGO.cardCells[4].id]
                ];

    var possibleWinners = arr.length;
    //console.log(arr);
    //console.log(possibleWinners)
    selected.push( 'js-card-' + number );
    //console.log(selected)
    // Compare winners array to selected array for matches
    for(var i = 0; i < possibleWinners; i++) {
        var cellExists = 0;

        for(var j = 0; j < 5; j++) {
            if(selected.indexOf(arr[i][j]) > -1) {
                cellExists++;
            }

        }
        //console.log(cellExists)
        // If all 5 winner cells exist in selected array alert success message
        if(cellExists == 5) {
            Swal.fire({
                icon: 'success',
                title: 'Winner',
                text: 'Congratulations on winning! Go to settlement page to receive your token.'
              }).then(function() {
                window.location = "http://130.211.202.185:3000/settle.html"});
        }
    }
    return BINGO;
}
/******************************************************************************
 * RESET GAME
 * Clear all game data, draw history, and ball highlighting.
 * Hide the reset button.
 * Re-enable and set focus on the draw button.
 * Re-initialize the game.
 *****************************************************************************/
BINGO.resetGame = () => {

    const _tds  = document.getElementsByClassName( 'drawn' );

    // reset global vars
    BINGO.ballsArr = [];
    BINGO.domElems.drawnLast.innerHTML = 'Click to Draw';
    BINGO.domElems.drawHistory.innerHTML = '';

    // reset all the CSS styles for the drawn balls
    for ( let i = _tds.length - 1; i >= 0; i-- ) {

        _tds[ i ].classList.remove( 'drawn', 'last' );

    }

    // hide the rest button
    BINGO.domElems.resetButton.classList.add( 'display-none' );

    // re-enable draw button
    BINGO.domElems.drawButton.disabled = false;
    BINGO.domElems.drawButton.classList.remove( 'disabled' );

    // set focus on the draw button
    BINGO.domElems.drawButton.focus();

    // re-initialize
    BINGO.init();

}

/******************************************************************************
 * POPULATE CARD
 * Clears and populates the playing card with random numbers.
 *****************************************************************************/
BINGO.populateCard = () => {

    let _cardNumsArr = [];

    for ( let i = BINGO.cardCells.length - 1; i >= 0; i-- ) {

        let _randomNumber = BINGO.generateRandomNumber( BINGO.cardCells[ i ].dataset.max,
                                                        BINGO.cardCells[ i ].dataset.min,
                                                        _cardNumsArr );

        BINGO.cardCells[ i ].classList.remove( 'marked' );
        BINGO.cardCells[ i ].innerHTML = _randomNumber;
        BINGO.cardCells[ i ].id = 'js-card-' + _randomNumber;

    }

};

BINGO.checkbox = () => {

}

BINGO.isFourCorners = function( radio ) {

    let _value = radio.value;

    console.log( _value );

};

/******************************************************************************
 * DRAW BALL
 * Do all the things:
 *     - draw a random ball
 *     - pop it from ballsArr[]
 *     - update the DOM (text and highlighting)
 *     - decrement the ball count
 *     - disable draw button
 *     - show reset button
 *****************************************************************************/
BINGO.drawBall = () => {
    console.log(drawButton_call);
    drawButton_count = drawButton_count + 1
    console.log(drawButton_count)

    if(drawButton_count <=  drawButton_call){
        const _ball = BINGO.randomBallSelector();
        const _drawnNumber = parseInt( _ball.split( '-' )[ 1 ] );

        if( BINGO.ballCount > 0 ) {

            BINGO.popBall( _ball )
                .updateDrawHistory( _ball )
                .updateLastDrawn( _ball )
                .highlightDrawnBall( _ball )
                .highlightCardCell( _drawnNumber )
                .checkWinner(_drawnNumber);

            BINGO.ballCount--;

            if( BINGO.ballCount === 0 ) {

                // disable draw button
                BINGO.domElems.drawButton.disabled = true;
                BINGO.domElems.drawButton.classList.add( 'disabled' );
                // show the reset button
                BINGO.domElems.resetButton.classList.remove( 'display-none' );

            }
        }
    }
    else if(drawButton_call == 0){
        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: 'Please select your draw balls limit!'
          });
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'You Lost',
            text: 'You have used all of your draw balls limit! Go to Settlement page for token settlement'
          }).then(function() {
            window.location = "http://130.211.202.185:3000/settle_1.html"});
    }

};

BINGO.domElems.drawButton.addEventListener( 'click', BINGO.drawBall );
BINGO.domElems.resetButton.addEventListener( 'click', BINGO.resetGame );
BINGO.domElems.cardButton.addEventListener( 'click', BINGO.populateCard );


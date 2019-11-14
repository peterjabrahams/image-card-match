/* React Task10 Capstone project */
/* Card component for the game */

import React from 'react';

// import the card flip component installed for npm - npm install --save react-card-flip
// to use the card flipping animation.
// props recieved from the game component isFlipped will flip the card open or closed 
import ReactCardFlip from "react-card-flip";

function Card(props) { 
    //console.log(props);
   if (props.openCards !== true) {
       return (null);
   }

    // Layout of cards is via "grid-container" in Game component
    return (
        <ReactCardFlip isFlipped={props.isFlipped} flipSpeedBackToFront={.5} 
           flipSpeedFrontToBack={.5} flipDirection="vertical">
           <button id={props.id} title="Click Card" className={`card card-front ${props.cardSymbol !== -1 ? "" : "hide-card"}`} 
                onClick={props.handleClick} key="front">
           </button>

           <button id={props.id} className={`card card-back ${props.cardSymbol !== -1 ? "" : "hide-card"}`} 
                onClick={props.handleClick} key="back">
                    { props.cardSymbol }
           </button>
        </ReactCardFlip>
    );
}

export default Card;
/* React Task10 Capstone project */
/* Game Help component */

import React from 'react';

// Setup of Help for the App component
function GameHelp(props) {
    return (
    <div className='gameheader'>
      <h2>
        <span>Guide to playing the game</span>
      </h2>
      <p>This is a memory based game where you will try and match the symbols behind the cards.</p>
      <p>When the cards are matched they will disappear from the board. There are 3 levels to the game.</p>
      <p>Level 1 has 16 cards, Level 2, 20 cards and Level 3, 24 cards</p>
        <b>Rules of the game</b>
      <p><b>1.</b> Each card can only be turned three times. 
        On the third attempt, if the card does not match the previously open card, you have lost the game.</p>
      <p><b>2.</b> You win the game by matching all the cards.</p>
      <p><b>3.</b> Select the level you want to play and Click <b>"Start Game"</b> to begin</p>
      <p><b>Good Luck Playing</b></p>
    </div>
    );
}

export default GameHelp;
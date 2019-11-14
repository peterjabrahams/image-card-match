/* React Task10 Capstone project */
/* GameOver component for display of game result, to restart or quit the game */

import React from 'react';

// props from Game component
class GameOver extends React.Component {
  state = {
    prevgameover: this.props.gameover,
    prevrestartgame: this.props.restartgame,
    prevresetall: this.props.resetall,
    prevcolour: this.props.colour,
    prevcardMessage: this.props.cardMessage
  }

  static getDerivedStateFromProps(props, state) {
    if (props.gameover !==  state.prevgameover) {
        return {
            prevgameover: props.gameover
        };
    }
        return null;
  }

  // Functions in main App to restart the game
  restartgame = () => {
    this.props.setCards();
    this.props.restartgame(); 
  }

 // Functions in main App to quit the game
  quitgame = () => {
    this.props.resetall();
  }

  //Function to reset game over in Game component
  resetGameOver = () => {
    this.props.resetGameOver();
  }

  // Render game result and restart and quit bottons
  render() {
    
    if (this.props.gameover !== true) {
        return(null); 
    }  
  
    return(
        <div>
            <h1 style={{color: this.props.colour}}> Game Over! {this.props.cardMessage} </h1>
            <h3>Would you like to try Again</h3>
            <button className="start-help-button restart-button"
                    onClick={this.restartgame}>Restart Game</button>
            <button className="start-help-button"
                    onClick={this.quitgame}>Quit Game</button>
      
        </div>
    );
  }
}
export default GameOver;
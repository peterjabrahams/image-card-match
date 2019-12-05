/* React Task10 Capstone project */
/* Main App component for the game */
import React from 'react';

/* import of Game and Help Components */
import Game from './Components/Game';
import GameHelp from './Components/GameHelp';

/*import the CSS styling for the game*/
import './Components/Styles/Main.css';

// Setup the controls switches of the game component
class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = ({
          startgame: false,
          gamehelp: false,
          opencards: false,
          gamesymbols: [],
          gamelevel: '0',
          unmatchedcount: 0,
          level: '1'
      });
    }

    // Handle the select game level
    handleChange = event => {
      this.setState({level: event.target.value})
    };

    // handle the "Start Game" button and set the state of startgame, level, game symbols and umatched count,
    // the opencards state and game help.
    handleStart = () => {
      const symbols = ['🐫','🐎','🐗','🐒','🐘','🐢','🐯','🐑']
      this.setState({
          startgame: true,
          opencards: true,
          gamehelp: false,
      });

      if (this.state.level === '1') {
        this.setState ({
          gamelevel: 16,
          gamesymbols: symbols,
          unmatchedcount: 8,
        })
      };

      if (this.state.level === '2') {
        symbols.push('🐮','🐭')
        this.setState ({
          gamelevel: 20,
          gamesymbols: symbols,
          unmatchedcount: 10,
        })
      };
      
      if (this.state.level === '3') {
        symbols.push('🐮','🐭','🐼','🐻')
        this.setState ({
          gamelevel: 24,
          gamesymbols: symbols,
          unmatchedcount: 12,
        })
      };
    };

   // handle the help button and reset to start of game
    handleHelp = () => {
      this.setState({
        gamehelp: true,
        startgame: false,
        opencards: false,
      });
    };

    // Set the opencards switch when game is started.
    setCards  = () => {
      this.setState({
        opencards: true,
      });
    };

    // reset the cards in gameover component
    resetCards = () => {
      this.setState({
        opencards: false,
      });
    };

    // reset all switches on "Quiting Game" in gameover comp.
    resetAll = () => {
      this.setState ({
        startgame: false,
        gamehelp: false,
        opencards: false,
      });
    };

    // Render the game header and level select and game start, help bottuns.
    // disable the select if start button active.
    render() {
      return (
        <div className='gameheader justify-center'>
          <h3>
          <span>Card Image Mind Game</span>
          </h3>
          <div>
              <label>
                <b>Select Game Level: </b>
                  <select disabled={this.state.startgame} value={this.state.value} onChange={this.handleChange}>
                     <option value="1">Level 1</option>
                     <option value="2">Level 2</option>
                     <option value="3">Level 3</option>
                  </select>
              </label>          
            <button className="start-help-button" disabled={this.state.startgame}onClick={this.handleStart}>Start Game</button>
            <button className="start-help-button" onClick={this.handleHelp}>Help</button> 
          </div>
        <div>
           {this.state.gamehelp === true ?  <GameHelp resethelp={this.resetHelp}/> : (null)}
        </div>
        <div>
         {this.state.startgame === true ? <Game start={this.state.startgame}
                                                opencards={this.state.opencards}
                                                resetCards={this.resetCards} 
                                                setCards={this.setCards}
                                                resetAll={this.resetAll}
                                                gamesymbols={this.state.gamesymbols}
                                                gamelevel={this.state.gamelevel}
                                                unmatchedcount={this.state.unmatchedcount}
                                          /> : (null) }
        </div>
      </div>
      );
    };
}
// Export the App
export default App;
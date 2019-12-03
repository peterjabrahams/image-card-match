/* React Task10 Capstone project */
/* Game component for the game */

import React from 'react';

// import needed components
import Card from './Card';
import GameOver from './GameOver';
import GameStats from './GameStats';

//Setup required state area for card component
class Game extends React.Component {
    constructor(props) {
      super(props);
      //console.log(props);
        this.state = { 
          isFlipped: Array(this.props.gamelevel).fill(false),
          shuffledCard: Game.duplicateCard(this.props.gamesymbols).sort(() => Math.random() - 0.5), 
          cardClicks: Array(this.props.gamelevel).fill(0),
          clickCount: 1,
          prevSelectedCard: -1,
          prevCardId: -1,
          matchCount: 0,
          unmatchCount: this.props.unmatchedcount,
          colour: 'green',
          cardMessage: 'You Lose',
          gameover: false,
        };
      }   

    // Load the game symbols from passed prop
    static duplicateCard = (gamesymbols) => {
      return gamesymbols.reduce((preValue, current, index, array) => {
      return preValue.concat([current, current])
      },[]);
 
    };

    // handle the card click event store the first card. update the no of times a card has been clicked.
    // passed as prop to card.
    handleClick = event => {
      event.preventDefault();
      const cardId = event.target.id;
      const newFlipps = this.state.isFlipped.slice();
      const cardClicksCount = this.state.cardClicks.slice();
   
      this.setState({
          prevSelectedCard: this.state.shuffledCard[cardId],
          prevCardId: cardId
      });
  
      if (newFlipps[cardId] === false) {
        newFlipps[cardId] = !newFlipps[cardId];
        cardClicksCount[cardId] = cardClicksCount[cardId] + 1;
  
        this.setState(prevState => ({ 
          isFlipped: newFlipps,
          cardClicks: cardClicksCount,
          clickCount: this.state.clickCount + 1,
        }));

        if (this.state.clickCount === 2) {
          this.setState({ clickCount: 1 });
          const prevCardId = this.state.prevCardId;
          const newCard = this.state.shuffledCard[cardId];
          const previousCard = this.state.prevSelectedCard;

          this.isCardMatch(previousCard, newCard, prevCardId, cardId);
        }
      }
    };

    // Check if the cards match. flipped cards back if no match after 1000 mms. remove cards if matched.
    // increase the match count and decrease the unmatch count
  
    isCardMatch = (card1, card2, card1Id, card2Id) => {
    //  if (card1Id = card2Id) {
    //    return();
    //  }
        if (card1 === card2 && card1Id !== card2Id) {
            const match =  this.state.matchCount + 1
            const unmatch =  this.state.unmatchCount - 1
            this.setState ({
                matchCount: match,
                unmatchCount: unmatch,
                });
            // hide the cards if they match
            const hideCard = this.state.shuffledCard.slice();
            hideCard[card1Id] = -1;
            hideCard[card2Id] = -1;
          setTimeout(() => {
              this.setState(prevState => ({
              shuffledCard: hideCard
               }))
            }, 300);
        } else {
          const flipBack = this.state.isFlipped.slice();
            flipBack[card1Id] = false;
            flipBack[card2Id] = false;
            setTimeout(() => {
              this.setState(prevState => ({ isFlipped: flipBack }));
            }, 500);
        }
        const matchcnt = this.state.matchCount;
        const unmatchcnt = this.props.unmatchedcount -1;
        this.isGameOver(card1, card2, card1Id, card2Id, matchcnt, unmatchcnt);
    };
  
    // Check if game is over. game is over if all cards are matched or 
    // any cards has been turned 3 times with now match
    isGameOver = (card1, card2, card1Id, card2Id, match, unmatch) => {
        if (this.state.cardClicks[card1Id] > 2 || this.state.cardClicks[card2Id] > 2) {
            if (card1 !== card2) {
                this.setState({
                  colour: 'red',
                  cardMessage: 'You Lose',
                  gameover: true,
                });
                this.props.resetCards();
            }
        }

        if (match === unmatch) {
            this.setState({
              gameover: true,
              colour: 'green',
              cardMessage: 'You Are A Winner',
            });  
        }
    };

    // restart the game state from the gameover component.
    restartGame = () => {
      this.setState({
        isFlipped: Array(this.props.gamelevel).fill(false),
        shuffledCard: Game.duplicateCard(this.props.gamesymbols).sort(() => Math.random() - 0.5),
        cardClicks: Array(this.props.gamelevel).fill(0),
        clickCount: 1,
        prevSelectedCard: -1,
        prevCardId: -1,
        matchCount: 0,
        unmatchCount: this.props.unmatchedcount,
        gameover: false,
      });
    }

    //reset the gamover flag from gameover component
    resetGameOver = () => {
      this.setState({
        gameover: false,
      });
    }

  // Render the Card and gameover component and game stats
  render() {
    return (
        <div>

          <GameOver gameover={this.state.gameover}
                    restartgame={this.restartGame}
                    resetall={this.props.resetAll}
                    resetGameOver={this.resetGameOver}
                    setCards={this.props.setCards}
                    colour={this.state.colour}
                    cardMessage={this.state.cardMessage} />
          <div className="grid-container">
            {
              this.state.shuffledCard.map((cardSymbol, index) => 
                <Card
                  key={index} 
                  id={index} 
                  cardSymbol={cardSymbol} 
                  isFlipped={this.state.isFlipped[index]} 
                  openCards={this.props.opencards}
                  handleClick={this.handleClick}   
                />
              )
            }
          </div>
            <GameStats matchcount={this.state.matchCount} unmatchcount={this.state.unmatchCount}/>
        </div>
        );  
    }
}
  
export default Game;
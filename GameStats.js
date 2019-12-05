/* React Task10 Capstone project */
/* GameStats component for the game. Displays the number of matched and unmatched cards pairs*/
import React from 'react';

// Matched and unmatched values are props from Game component
class GameStats extends React.Component {
  state = {
    prevunmatchcount: this.props.unmatchcount,
    prevmatchedcount: this.props.matchcount,
  }

  static getDerivedStateFromProps(props, state) {
    //console.log(props);
    if (props.unmatchcount !==  state.prevunmatchcount) {
        return {
            prevunmatchcount: props.unmatchcount
        };
    }
        return null;
  }

  // Render the game stats matched and unmatched
   render() { 
    if (this.props.unmatchcount === 0) {
        return(null); 
    }  
    return(
        <div>
          <br></br>
          <button className="start-help-button stats-button"><b>unmatched: {this.props.unmatchcount}</b></button>
          <button className="start-help-button stats-button"><b>matched: {this.props.matchcount}</b></button>
        </div>
    );
  }
}
export default GameStats;
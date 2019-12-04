class Child extends React.Component {
  componentWillMount() {
    this.props.logItem('component will mount');
  }
  componentWillUnmount() {
    this.props.logItem('component will unmount');
  }
  render() {
    return (
      <div id="component">
        React component!
      </div>
    );
  }
}

class Parent extends React.Component {
  state = {
    showChild: false,
    log: [],
  };
  handleOnChange = (event) => {
    this.setState({ showChild: !this.state.showChild });
  };
  logItem = (item) => {
    this.setState({ log: [ ...this.state.log, item ] });
  };
  clearLog = () => {
    this.setState({ log: [] });
  };
  render() {
    const { showChild, log } = this.state;
    const childElement = showChild ? <Child logItem={this.logItem}/> : null;
    const logItems = log.map((item, index) => <div key={index}>{item}</div>);
    return (
      <div id="container">
        <section>
        <label>Display React component?</label>
        <input
          id="showChild"
          type="checkbox"
          checked={this.state.showChild}
          onChange={this.handleOnChange}
         />
        {childElement}
        </section>
        <section>
          <button
            id="clearLog"
            type="button"
            onClick={this.clearLog}
          >
            Clear log
          </button>
          <div>
            {logItems}
          </div>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<Parent />, document.getElementById('app'));
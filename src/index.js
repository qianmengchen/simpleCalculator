import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Number(props) {
  return (
    <button className="number" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Operator(props) {
  return (
    <button className="number" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      save: 0,
      ans: '0',
      op: '=',
      nextNum: false
    };
  }

  handleNum(i) {
    if (this.state.nextNum) {
      this.setState({ans: '0'});
      this.setState({nextNum: false});
      this.setState({ans: String(i)});
    } else {
      if (i === '.' && this.state.ans.indexOf('.') !== -1)
        return;
      if (this.state.ans === '0') {
        this.setState({ans: String(i)});
      } else {
        this.setState({ans: this.state.ans+String(i)});
      }
    }
  }

  handleOp(newOp) {
    if (newOp === 'AC') {
      this.setState({save: 0,ans: '0',op: '=', nextNum: false});
      return;
    }
    if (this.state.op === '=') {
      this.setState({save: parseFloat(this.state.ans)});
    } else if (this.state.op === '+') {
      this.setState({save: this.state.save + parseFloat(this.state.ans)});
      this.setState({ans: this.state.save + parseFloat(this.state.ans)});
    } else if (this.state.op === '-') {
      this.setState({save: this.state.save - parseFloat(this.state.ans)});
      this.setState({ans: this.state.save - parseFloat(this.state.ans)});
    } else if (this.state.op === '*') {
      this.setState({save: this.state.save * parseFloat(this.state.ans)});
      this.setState({ans: this.state.save * parseFloat(this.state.ans)});
    } else if (this.state.op === '/') {
      this.setState({save: this.state.save / parseFloat(this.state.ans)});
      this.setState({ans: this.state.save / parseFloat(this.state.ans)});
    }
    this.setState({op: newOp});
    this.setState({nextNum: true});
  }

  renderNumber(i) {
    return (
      <Number
        value={i}
        onClick={() => this.handleNum(i)}
      />
    );
  }

  renderOperator(s) {
    return (
      <Operator
        value = {s}
        onClick={() => this.handleOp(s)}
      />
    );
  }

  render() {

    return (
      <div>
        <div className="result">{this.state.ans}</div>
        <div className="nums-row">
          {this.renderNumber(1)}{this.renderNumber(2)}{this.renderNumber(3)}{this.renderOperator('+')}
        </div>
        <div className="nums-row">
          {this.renderNumber(4)}{this.renderNumber(5)}{this.renderNumber(6)}{this.renderOperator('-')}
        </div>
        <div className="nums-row">
          {this.renderNumber(7)}{this.renderNumber(8)}{this.renderNumber(9)}{this.renderOperator('*')}
        </div>
        <div className="nums-row">
          {this.renderNumber('.')}{this.renderNumber(0)}{this.renderOperator('=')}{this.renderOperator('/')}
        </div>
        {this.renderOperator('AC')}
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="calculator">
          <Calculator />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
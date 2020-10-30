import './App.css';
import React from 'react';

function App() {
  return (
    <Game />
  );
}

class GameGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      squares: Array(9).fill(null),
      message: null,
      log: null
    };
  }

  componentDidMount() {
    this.fetchData('check');
  }

  renderSquare(i) {
    return (
      <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} index={i}/>
    );
  }

  fetchData(params) {
    try {
      fetch('http://localhost:3001/'+params)
        .then((response) => {
          if(!response.ok){
            console.log(response);
            this.setState({squares:this.state.squares, message: response, log:this.state.log});
            return null;
          }
          return response;
        }).then(response=>response.json())
        .then((json) => {
          console.log(json);
          if(json.state) {
            this.setState({squares:json.state, message:json.message, log:json.log});
          }else {
            let msg=json.message;
            if(!msg)
              msg='Unknown error';

            this.setState({squares:this.state.squares, message:msg, log:this.state.log});
          }
        });
    }catch(err) {
      console.log(err);
      this.setState({squares:this.state.squares, message: err, log:this.state.log});
    }
  }
  
  handleClick(i) {
    this.fetchData('move?square='+i);
  }

  renderLog() {
    if(!this.state.log)
      return;

    const items=[];
    for(const logMsg of this.state.log) {
      items.push(<li key={items.length}>{logMsg}</li>);
    }
    return (
      <div>
        <ul>
          {items}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="status">{this.state.message}</div>
        <button onClick={() => {this.fetchData('reset')}}>Reset</button>
        <div className='log' id="logScrollView">
          {this.renderLog()}
        </div>
      </div>
    );
  }
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      value:null,
    };
  }
  render() {
    return (
      <button className="square" onClick={()=>this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <GameGrid />
        </div>
      </div>
    );
  }
}

export default App;

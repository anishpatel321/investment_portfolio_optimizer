import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = { message: '' };
  }

  componentDidMount() {
    axios.get('http://localhost:5000')
      .then(response => this.setState({ message: response.data }));
  }

  render() {
    const { message } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>{message}</p>
        </header>

      </div>
    );
  }
}

export default App;

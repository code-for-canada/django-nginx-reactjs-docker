import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

const headers = new Headers({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

class App extends Component {
  componentWillMount() {
    this.testBackend();
  }

  state = {
    test: 'nothing.',
  }

  testBackend = async () => {
    const test = await fetch('http://localhost:80/api/', {
      method: 'GET',
      headers,
      cache: 'default',
    });
    const testJson = await test.json();
    if (testJson && testJson.status) {
      this.setState({ test: testJson.status });
    }
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            The backend says: {this.state.test}
          </p>
          <form>
            <div>
              <label>*Username:</label>
              <input type="text" id="username" />
              <br/>
              <label>*Password:</label>
              <input type="text" id="password" />
              <br/>
              <label>*Given name:</label>
              <input type="text" id="givenname" />
              <br/>
              <label>*Family Name:</label>
              <input type="text" id="familyname" />
              <br/>
              <label>*Email:</label>
              <input type="text" id="email" />
            </div>
            <br/>
            <input style={ { float: 'right' } } type="submit" value="Send to DB" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;

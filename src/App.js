import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MessagesView } from './messages-list';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Smokeball Helpdesk
        </p>
        <MessagesView></MessagesView>
      </header>
    </div>
  );
}

export default App;

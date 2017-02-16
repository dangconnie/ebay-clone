import React, { Component } from 'react';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">

       {this.props.children}
   		{/*home will show up b/c it it's in the app in the router*/}
        
      </div>
    );
  }
}

export default App;

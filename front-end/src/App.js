import React, { Component } from 'react';
import './styles.css'; //changed this to import css file from compass


class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Brand</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"><a href="#">Stats</a></li>
               <li className="inactive"><a href="#">Omens</a></li>
               <li className="inactive"><a href="#">Items</a></li>
               <li className="inactive"><a href="#">Events</a></li>
               <li className="inactive"><a href="#">Tiles</a></li>
              </ul>
              <form className="navbar-form navbar-right">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search" />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Login</a></li>
                <li className="register">
                  <a href="#" className="register" role="button" aria-haspopup="true" aria-expanded="false">Register</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>*/}


      	<h2>The Omen</h2>
<nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Brand</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"><a href="#">Stats</a></li>
               <li className="inactive"><a href="#">Omens</a></li>
               <li className="inactive"><a href="#">Items</a></li>
               <li className="inactive"><a href="#">Events</a></li>
               <li className="inactive"><a href="#">Tiles</a></li>
              </ul>
              <form className="navbar-form navbar-right">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search" />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Login</a></li>
                <li className="register">
                  <a href="#" className="register" role="button" aria-haspopup="true" aria-expanded="false">Register</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      
       {this.props.children}
   		{/*home will show up b/c it it's in the app in the router*/}
   
      </div>
    );
  }
}

export default App;

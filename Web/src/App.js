import React, { Component } from 'react';
import './App.css';
import {
  Route,
  Switch,
  NavLink,
  BrowserRouter as Router,
} from "react-router-dom";

import lodable from "react-loadable";
import Dashboard from './dashboard';
// const Contact = lodable({
//   loader:() => import("./disabled"),
//   loading:() => <div>Loading....</div>
// });

const Home = lodable({
  loader:() => import("./Home"),
  loading:() => <div style = {inputuser}>Loading....</div>
});

const Login = lodable({
  loader:() => import("./login"),
  loading:() => <div style = {inputuser} >Loading....</div>
})

const createUser = lodable({
  loader:() => import("./createuser"),
  loading:() => <div style = {inputuser}>Loading....</div>
})

const Stuff = lodable({
  loader:() => import("./link"),
  loading:() => <div style = {inputuser}>Loading....</div>
})

const Contact = lodable({
  loader:() => import("./disabled"),
  loading:() => <div style = {inputuser}>Loading....</div>
})


const updateUser = lodable({
  loader:() => import("./updateuser"),
  loading:() => <div style = {inputuser}>Loading....</div>
})


class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary navbar-fixed-top">
  <a className="navbar-brand" href="#">GPRS ADAPTER</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
              </li>
      <li className="nav-item">
      <NavLink to="/createuser">createuser</NavLink>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0">
    <button onClick= {this.logout}>Logout</button>
    </form>
  </div>
</nav>
          </div>        
      <div><Switch>
        <Route  path ="/" exact component ={Home}/>
        <Route  path ="/login" exact component ={Login}/>
        <Route  path ="/createuser" exact component ={createUser}/>
        <Route path="/link" component={Stuff}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/updateuser" component={updateUser}/></Switch>
      </div>
      </Router>
    );
  }
}

const inputuser = {
  width: '310px',           /* Set this to your convenience */
  height: '210px',          /* Set this to your convenience */
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: '-100px',     /* Half of height */
  marginLeft: '-150px',     /* Half of width */
}

export default App;






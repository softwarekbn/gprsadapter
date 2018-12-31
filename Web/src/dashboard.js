import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import {PostData} from './service/PostData';
import lodable from "react-loadable";
import {
    Route,
    NavLink,
    BrowserRouter as Router,
    HashRouter,
    Link,
    Switch,
  } from "react-router-dom";
import createUser from "./createuser";
import Home from "./Home";
const Stuff = lodable({
    loader:() => import("./link"),
    loading:() => <div>Loading....</div>
  })
  
  const Contact = lodable({
    loader:() => import("./disabled"),
    loading:() => <div>Loading....</div>
  })
class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            redirect:false,
            role: "admin",
        }
        this.logout = this.logout.bind(this);
        
    }
    componentDidMount(){
        if(sessionStorage.getItem('userData')){
            console.log('user logged in')
            // console.log(window.sessionStorage.getItem("userData"));
            var b = window.sessionStorage.getItem("userData")
            var movies2 = JSON.parse(b);
            var useremail = (movies2.data.user_data.email)
            console.log(useremail);
            var username = (movies2.data.user_data.userName)
            console.log(username);
            this.role = (movies2.data.user_data.role)
            console.log(this.role);           
        }
        else{
            this.setState({redirect:true});
        }
    }
  logout(){
      console.log("Logout Clicked");
      sessionStorage.setItem("userData", '');
      sessionStorage.clear();
      this.setState({redirect:true});
  }

    render() {     
        if (this.state.redirect){
            return (<Redirect to ={'/login'}/>);
        }
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

<div style = {sidenav}>
<NavLink to="/">Home</NavLink><br/>
<NavLink to="/createuser">stuff</NavLink><br/>
<NavLink to="/stuff">stuff</NavLink><br/>
  <a href="#clients">Clients</a><br/>
  <a href="#contact">Contact</a>
</div>

       <div className="content" className="col" id="main"><Switch>
            <Route path="/createuser" component={createUser}/>
            <Route path="/stuff" component={Stuff}/></Switch>
          </div>
        
    </div>
        </Router>
    );
  }
}





const sidenav = {
    marginTop:'56px',
    height:'100%',
    width: '160px',
    position: 'fixed',
    zIndex: '1',
    top: 0,
    left: 0,
    backgroundColor: '#111',
    overflowX: 'hidden',
    paddingTop:'20px',
  }
  


export default Dashboard;
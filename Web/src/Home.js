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
import Dashboard from "./dashboard";
class Home extends Component {
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
    <div>
        <Dashboard/>

    </div>
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
  


export default Home;
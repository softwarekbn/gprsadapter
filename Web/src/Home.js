import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
// import lodable from "react-loadable";
// import {
//     Route,
//     NavLink,
//     HashRouter,
//     Switch,
//   } from "react-router-dom";


class Home extends Component {

    constructor(){
        super();
        this.state={
            redirect:false,

        }

        this.logout = this.logout.bind(this);


    }
  
    componentDidMount(){
        if(sessionStorage.getItem('userData')){
            console.log('user logged in')
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
        <button onClick= {this.logout}>Logout</button>
        </div>
      
    );
  }
}
 
export default Home;
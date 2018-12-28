import React, { Component } from "react";
import './App.css';
import {PostData} from './service/PostData';
import {Redirect} from 'react-router-dom';
class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            userName:'',
            password:'',
            redirect: false,
        }
        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
    }
    login(){
        console.log("Login Working");
        PostData(this.state).then((result)=> {
            let responseJson = result;
            console.log(responseJson);
            if(responseJson.token){
                sessionStorage.setItem('userData' , responseJson);
                this.setState({redirect:true});
            }
            else{
                console.log("Login Error");
            }
        })
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
        console.log(this.state);
    }
  render() {
    if (this.state.redirect){
        return (<Redirect to ={'/'}/>);
    }
    if(sessionStorage.getItem('useData')){
        return(<Redirect to ={'/'}/>);
    }
    return (
    <div>
    {/* <img src={require('./images/bluebg.jpg')}  height ="640" width = "1400"/> */}
        <div style ={inputuser}>
        {/* login form */}
        <form>
           <p>
               <label style = {usernameinput}>
                   <b>Username</b>
               </label>
               <input type = "text" name = "userName" onChange ={this.onChange}   style = {round}/>
           </p>
           <p>
               <label style = {passwordinput}>
                   <b>Password</b>
               </label>
               <input type = "password" name = "password" onChange ={this.onChange}  style = {round}/>
           </p>
            <p >
               <input type = "button" name = "login" onClick ={this.login} style = {loginbutton} value = "Login" />
           </p>
        </form>
    </div>
    </div>
    );
  }
}
  const bg = {
    backgroundColor:'red',
}
 const inputuser = {
    width: '310px',           /* Set this to your convenience */
    height: '210px',          /* Set this to your convenience */
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-100px',     /* Half of height */
    marginLeft: '-150px',     /* Half of width */
    border: '1px solid black',
    borderRadius:'30px',
    backgroundColor:'',
    boxShadow: "2px 3px 2px #000000",
 }
 const usernameinput = {
     marginTop:'20px',
     marginLeft:'10px',
     fontSize:"20px",
     textShadow: "1px 1px 1px #000000",
 }
 const passwordinput = {
    marginLeft:'10px',
    fontSize:"20px",
    textShadow: "1px 1px 1px #000000",
}
const loginbutton = {
    marginLeft:'40%',
    border: '1px solid black',
    borderRadius:'10px',
    boxShadow: "3px 5px 2px #000000",
    backgroundColor:"green",
    color:"white",
    hover:"black",
}

const round = {
    marginTop:'20px',
    marginLeft:'10px',
    textShadow: "1px 1px 1px #000000",
    border: '1px solid black',
    borderRadius:'10px',
    boxShadow: "3px 5px 2px #000000",
}
export default Login;
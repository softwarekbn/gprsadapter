import React, { Component } from "react";
import './App.css';
import {PostData} from './service/PostData';
import {Redirect} from 'react-router-dom';
import { black } from "ansi-colors";
class updateUser extends Component {
    render() {
        return ( 

        <div>
        {/* <img src={require('./images/bluebg.jpg')}  height ="640" width = "1400"/> */}
        {/* login form */}
        <form>
    <div style = {inputuser}>
    <h3 style = {heading}>Edit User Details</h3>
    <label ><b>UserId</b></label>
    <input type="text"  name="email" style = {UserId} required/><br/>
    <label style = {Firstnamel}><b>FirstName</b></label>
    <input type="text"  name="email" style = {Firstname} required/><br/>
    <label style = {Lastnamel}><b>LastName</b></label>
    <input type="password"  name="psw" style = {Lastname} required/><br/>
    <label style = {Phonenumberl}><b>Phonenumber</b></label>
    <input type="password"  name="psw-repeat" style = {Phonenumber} required/><br/>
    <label style = {Addressl}><b>Address</b></label>
    <input type="password"  name="psw-repeat" style = {Address} required/><br/>
    <label style = {IsActivatedl}><b>IsActivated</b></label>
    <input type="checkbox" name="remember" style = {IsActivated}></input><br/>
    <label style = {Usernamel}><b>UserName</b></label>
    <input type="password"  name="psw-repeat" style = {Username} required/><br/>
    <label style = {EmailAddressl}><b>EmailAddress</b></label>
    <input type="password"  name="psw-repeat" style = {EmailAddress} required/><br/>
    <label style = {passwordinputl}><b>Password</b></label>
    <input type="password"  name="psw-repeat" style = {passwordinput} required/><br/>
    <label style = {Roledropdownl}><b>Role dropdown</b></label>
    <input type="password"  name="psw-repeat" style = {Roledropdown} required/><br/>
    <div className="clearfix">
      <button type="button" className="signupbtn" style = {loginbutton}>Update User</button>
    </div>
  </div>
</form>
    </div>
 );
}
}

const bg = {
    backgroundColor:'red',
 }
 const inputuser = {
    width: '410px',           /* Set this to your convenience */
    height: '510px',          /* Set this to your convenience */
    position: 'absolute',
    top: '20%',
    left: '40%',
    marginTop: '-100px',     /* Half of height */
    marginLeft: '-150px',     /* Half of width */
    border: '1px solid black',
    borderRadius:'20px',
    backgroundColor:'sky',
    boxShadow: "2px 3px 2px #000000",
 }
 const heading = {
     marginLeft:'100px',
 }
 const UserId = {
    marginLeft:'78px',
    border: '1px solid black',
    borderRadius:'10px',
    boxShadow: "2px 3px 2px #000000",
}

const Firstname = {
    marginLeft:'46px',
    border: '1px solid black',
    borderRadius:'10px',
    boxShadow: "2px 3px 2px #000000",
}
const Lastname = {
    marginLeft:'48px',
    border: '1px solid black',
    borderRadius:'10px',
    boxShadow: "2px 3px 2px #000000",
}
const Phonenumber = {
    marginLeft:'18px',
    border: '1px solid black',
    borderRadius:'10px',
    boxShadow: "2px 3px 2px #000000",
}
const Address = {
    marginLeft:'63px',
    border: '1px solid black',
    borderRadius:'10px',
    boxShadow: "2px 3px 2px #000000",
}
const IsActivated = {
    marginLeft:'38px',
    border: '1px solid black',
    borderRadius:'10px',
    boxShadow: "2px 3px 2px #000000",
}
const Username = {
    marginLeft:'42px',
    border: '1px solid black',
    borderRadius:'10px',
    boxShadow: "2px 3px 2px #000000",
}
const EmailAddress = {
    marginLeft:'18px',
    border: '1px solid black',
    borderRadius:'10px',
    boxShadow: "2px 3px 2px #000000",
}
const passwordinput = {
    marginLeft:'48px',
    border: '1px solid black',
    borderRadius:'10px',
    boxShadow: "2px 3px 2px #000000",
}
const loginbutton = {
    marginLeft:'35%',
    border: '1px solid black',
    borderRadius:'10px',
    boxShadow: "2px 3px 2px #000000",
    backgroundColor:"green",
    color:"white",
}
const Roledropdown = {
    marginLeft:'5px',
    border: '1px solid black',
    borderRadius:'10px',
    boxShadow: "2px 3px 2px #000000",
}
const Firstnamel = {
    marginLeft:'4px',
}
const Lastnamel = {
    marginLeft:'4px',
}
const Phonenumberl = {
    marginLeft:'4px',
}
const Addressl = {
    marginLeft:'4px',
}
const IsActivatedl = {
    marginLeft:'4px',
}
const Usernamel = {
    marginLeft:'4px',
}
const EmailAddressl = {
    marginLeft:'4px',
}
const passwordinputl = {
    marginLeft:'4px',
}
const loginbuttonl = {
    marginLeft:'35%',
}
const Roledropdownl = {
    marginLeft:'4px',
}
export default updateUser;
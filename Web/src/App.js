// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Login from './login';
// import {
//   Route,
//   NavLink,
//   HashRouter,
//   Switch,
// } from "react-router-dom";

// import lodable from "react-loadable";
// const Contact = lodable({
//   loader:() => import("./disabled"),
//   loading:() => <div>Loading....</div>
// });

// const Home = lodable({
//   loader:() => import("./Home"),
//   loading:() => <div>Loading....</div>
// });

// const Stuff = lodable({
//   loader:() => import("./link"),
//   loading:() => <div>Loading....</div>
// })



// class App extends Component {
//   render() {
//     return (
//       <HashRouter>
//       <div>
//       <nav class="navbar navbar-expand-lg navbar-light bg-success">
//      <NavLink class = "text-dark " to="/">Home</NavLink>
//   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span class="navbar-toggler-icon"></span>
//   </button>

//   <div class="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul class="navbar-nav mr-auto">
//       <li class="nav-item margin-right:2px ">
//       <NavLink class = "text-dark " to="/stuff">Stuff</NavLink>
//       </li>
//       <li class="nav-item margin-left:10px">
//       <NavLink class = "text-dark NavLink" to="/contact">Contact</NavLink>
//       </li>
//     </ul>
//     <form class="form-inline my-2 my-lg-0">
//       <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
//       <button class="btn btn-outline-dark my-2 my-sm-0 text-dark" type="submit">Search</button></form></div></nav>
//       <div className="content">
//       <Switch>
//       <Route exact path="/" component={Home}/>
//       <Route path="/stuff" component={Stuff}/>
//       <Route path="/contact" component={Contact}/>
//       <Route exact path="/login" component={Login}/></Switch>
//           </div>
//       </div>
//       </HashRouter>
      
//     );
//   }
// }

// export default App;





import React, { Component } from 'react';
import './App.css';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

import lodable from "react-loadable";
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






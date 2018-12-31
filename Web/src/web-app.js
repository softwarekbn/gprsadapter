import App from './app.jsx';

import {
    Route,
    Switch,
    browserHistory,
    BrowserRouter as Router,
  } from "react-router-dom";
  
  import lodable from "react-loadable";
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

ReactDOM.render(
  <Router history = {browserHistory}>
    <Route path = "/" component = {App}/>
      <Route path = "/first" component = {FirstPage}/>
      <Route path = "/second" component = {SecondPage}/>
  </Router>
);
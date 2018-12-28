import React, { Component } from "react";
 
class Stuff extends Component {
    constructor(){
        super();
        this.state={
           result: [],
           isLoading: false,
           error: null,
         }
      }
      
      componentDidMount(){
        this.setState({
           isLoading: true
          })
        fetch('http://192.168.43.52:5000/controller')
        .then(response => {
             if(response.ok){
             return response.json()
            }else{
            throw new Error('Something went wrong...')
          }
       })
        .then(data => this.setState({
          result: data.result,
          isLoading: false
        }))
        .catch(error => this.setState({
           error: null, 
           isLoading: false
        }))
       }
      
      render(){
      const {result, isLoading, error} = this.state;
      
          if(isLoading){
            return <p>Loading ... </p>
          }
          if(error){
            return <p>{error.message}</p>
           }
      return(
<div>

       <table class="table table-hover" >
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">batteryVoltage</th>
      <th scope="col">chargingCurrent</th>
      <th scope="col">daily</th>
      <th scope="col">latitude</th>
      <th scope="col">longitude</th>
      <th scope="col">mode</th>
      <th scope="col">monthly</th>
      <th scope="col">percent</th>
      <th scope="col">solarVoltage</th>
    </tr>
  </thead>
  <tbody>
  {result.map(data => 
    <tr key={data.gId}> 
      <th scope="row" >{data.gId}</th>
      <td>{data.batteryVoltage}</td>
      <td>{data.chargingCurrent}</td>
      <td>{data.daily}</td>
      <td>{data.latitude}</td>
      <td>{data.longitude}</td>
      <td>{data.mode}</td>
      <td>{data.monthly}</td>
      <td>{data.percent}</td>
      <td>{data.solarVoltage}</td>
      </tr>)}
</tbody></table></div>
         )
        }
      }

export default Stuff;
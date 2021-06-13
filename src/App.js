import React from 'react';
import axios from 'axios';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      locData:'',
      errMsg:'',
      displayErrMsg: false,
      displayMap:false
    }
  }
  getLocation = async(event) =>{
    event.preventDefault();
    let seachQuery = event.target.searchQuery.value;
    let locURL = `https://us1.locationiq.com/v1/search.php?key=pk.738c0a83616e5492e270f2f87e200f35&q=${seachQuery}&format=json`;
    try {
      let locResult = await axios.get(locURL);
      console.log(locResult.data);
      this.setState({
        locData:locResult.data[0],
        displayMap:true
      })
    }
    catch {
      this.setState({
        errMsg: 'error this is a bad response',
        displayErrMsg:true
      })
    }
    
  }

  render(){
    return(
      <div>
        <h1>React axios app</h1>
        {/* <button onClick={this.getLocation}>search</button> */}
        <form onSubmit={this.getLocation}>
          <input type='text' placeholder='city name' name='searchQuery' />
          <input type='submit' value='search' />
        </form>
        <p>{this.state.locData.display_name}</p>
        <p>{this.state.locData.lon}</p>
        <p>{this.state.locData.lat}</p>
        {this.state.displayMap &&  <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.43fed3791d35ddb76aa14f749c6d3080&center=${this.state.locData.lat},${this.state.locData.lon}`} alt='map'/> }
        { this.state.displayErrMsg && this.state.errMsg}
      </div>
    )
  }
}

export default App;
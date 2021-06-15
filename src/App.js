import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locData: '',
      errMsg: '',
      displayErrMsg: false,
      displayMap: false
    }
  }
  getLocation = async (event) => {
    event.preventDefault();
    let seachQuery = event.target.searchQuery.value;
    let locURL = `https://us1.locationiq.com/v1/search.php?key=pk.738c0a83616e5492e270f2f87e200f35&q=${seachQuery}&format=json`;
    try {
      let locResult = await axios.get(locURL);
      console.log(locResult.data);
      this.setState({
        locData: locResult.data[0],
        displayMap: true,
        displayErrMsg: false
      })
    }
    catch {
      this.setState({
        errMsg: 'error this is a bad response',
        displayErrMsg: true,
        displayMap: false

      })
    }




  }
  // https://city-explorer-api2.herokuapp.com/getDatepra?dates=2021-04-07

  render() {
    return (
      <div>
        <Form onSubmit={this.getLocation}>
          <InputGroup className="mb-3">
            <Button type='submit' value='search' variant="outline-secondary" id="button-addon1">
              Search
            </Button>
            <FormControl
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              type='text' placeholder='city name' name='searchQuery'
            />


          </InputGroup>
        </Form>

        <Card style={{ width: '18rem' }}>

          {this.state.displayMap && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.43fed3791d35ddb76aa14f749c6d3080&center=${this.state.locData.lat},${this.state.locData.lon}`} alt='map' />}
          <Card.Body>
            <Card.Title> {this.state.displayMap && this.state.locData.display_name
            }</Card.Title>
            <Card.Text>

              {this.state.displayMap && this.state.locData.lon}
              {this.state.displayMap && this.state.locData.lat}
              {this.state.displayErrMsg && this.state.errMsg}


            </Card.Text>
          </Card.Body >
        </Card >



      </div >
    )
  }
}

export default App;



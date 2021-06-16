import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
// import Card from 'react-bootstrap/Card';
import Weather from './components/weather'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locData: '',
      errMsg: '',
      locDatadate: '',
      errMsgdate: '',
      displayErrMsg: false,
      displayMap: false,
      weatherData: []
    }
  }
  //localhost:3001/weather?searchQuery=amman

  getLocation = async (event) => {
    event.preventDefault();
    let sQuery = event.target.searchQuery.value;
    const SERVER_LINK = 'http://localhost:3001';

    let locURL = `${SERVER_LINK}/weather?searchQuery=${sQuery}`;

    axios.get(locURL)
      .then(weatherArray => {
        this.setState({
          weatherData: weatherArray.data

        })
        console.log(this.state.weatherData);

      })
      .catch(err => {
        console.log("errorrrrr", err.message);
        this.setState({
          error: err.message
        })
      })

  }

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
        <Weather weatherData={this.state.weatherData} />

      </div >
    )
  }
}

export default App;

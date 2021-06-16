import React from 'react';
import axios from 'axios';
import Weather from './components/Weather';
import Movies from './components/Movies';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      cityData: '',
      showMap: false,
      errMsg: false,
      err: '',
      weatherArr: [],
      showWeather: false,
      lat: '',
      lon: '',
      moviesArr: [],
      showMovies: false
    }
  }
  getCity = async (event) => {
    event.preventDefault();

    let cityUrl = `https://eu1.locationiq.com/v1/search.php?key=pk.d23c6e6184e88db391adb051f39a989c&q=${this.state.searchQuery}&format=json`;
    try {
      let cityResult = await axios.get(cityUrl);
      this.setState({
        cityData: cityResult.data[0],
        showMap: true,
        errMsg: false,
        // weatherItem:importedData.data,
        // showWeather:true,
        lat: cityResult.data[0].lat,
        lon: cityResult.data[0].lon
      })
    }
    catch (error) {
      this.setState({
        showMap: false,
        errMsg: true,
        err: error,
        // showWeather:false
      })
      console.log(this);
    }
    //-----------------------------------------------------------PartWeather-------------------------------------------------------------
    try {
      // const url = `http://localhost:3001/weather?city=amman&lon=35.9239625&lat=31.9515694`;
      //  const url = `${serverRoute}/weather?city=${this.state.searchQuery}&lon=${this.state.longitude}&lat=${this.state.latitude}`;
      let importedWeatherData = await axios.get(`http://localhost:9000/weather?city=${this.state.searchQuery}`);
      this.setState({
        weatherArr: importedWeatherData.data,
        showWeather: true,
        // latitude: this.state.cityData.lat,
        // longitude: this.state.cityData.lon
      })
    } catch (error) {
      this.setState({
        weatherArr: error.response,
        showWeather: false
      })
    }
    try {
      let importedMoviesData = await axios.get(`http://localhost:9000/movie?`, { params: { city: this.state.searchQuery } });
      this.setState({
        moviesArr: importedMoviesData.data,
        showMovies: true,
      })
    } catch (err) {
      this.setState({
        moviesArr: err.message,
        showMovies: false
      })
    }
  }
  updateSearchQuery = (event) => {
    this.setState({
      searchQuery: event.target.value
    })
  }
  render() {
    return (
      <>

        <h1>City Explorer</h1>
        <Form onSubmit={this.getCity}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Enter City Name" onChange={this.updateSearchQuery} size="sm" />
          </Form.Group>
          <Button variant="dark" type="submit" size="sm">
            Explore!
          </Button>
        </Form>

        {this.state.showMap &&
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=pk.ac59253e8de69d4b78490835a252e7bb&center=${this.state.cityData.lat},${this.state.cityData.lon}`} />
            <Card.Body>
              <Card.Title>{this.state.cityData.display_name}</Card.Title>
              <Card.Text>
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup>latitude {this.state.cityData.lat}</ListGroup>
              <ListGroup>longitude {this.state.cityData.lon}</ListGroup>
            </ListGroup>
          </Card>
        }

        {this.state.errMsg &&
          <div>
            {this.state.err.response.status}
          </div>}
        {this.state.showMap && <Weather weatherData={this.state.weatherArr} showWeather={this.state.showWeather}></Weather>}
        {this.state.showMap && <Movies moviesData={this.state.moviesArr} showMovies={this.state.showMovies}></Movies>}
      </>
    );
  }
}
export default App;
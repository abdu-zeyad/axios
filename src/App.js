import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [],
      error: '',
      lat: '',
      lon: '',

    }
  }


  getweather = (e) => {
    // localhost:3001/photo?searchQuery=book
    e.preventDefault();
    const searchQ = e.target.searchQ.value;
    let locURL = `https://us1.locationiq.com/v1/search.php?key=pk.738c0a83616e5492e270f2f87e200f35&q=${searchQ}&format=json`;

    axios.get(locURL).then(nameArray =>
      this.setState({
        lat: nameArray.data[0].lat,
        lon: nameArray.data[0].lon,

      })
    )
      .catch(err => {
        this.setState({
          error: err.message
        })
      }
      )
    console.log(searchQ);



    const SERVER_LINK = 'http://localhost:3001';
    const url = `${SERVER_LINK}/weather?lat=${this.state.lat}&lon=${this.state.lon}`;

    console.log(this.state.lat, this.state.lon);
    console.log(url);
    console.log(this.state.weather);
  }

  render() {
    return (
      <>
        <Form onSubmit={this.getweather}>
          <Form.Group controlId="searchQuery">
            <Form.Label>enter a city </Form.Label>
            <Form.Control type="text" placeholder="Enter a search term" name='searchQ' />
          </Form.Group>
          <Button type="submit">
            Submit
          </Button>
        </Form>
        {/* {
          this.state.weather.map((photo, idx) => {
            return (
              <div key={idx}>
                <p>Number of Likes: {photo.numLikes}</p>
                <p>URL: {photo.imgUrl}</p>
              </div>
            )
          })
        }

        {this.state.error} */}
      </>
    )
  }
}

export default App;

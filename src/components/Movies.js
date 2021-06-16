import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardDeck from 'react-bootstrap/CardDeck'
import { Container, Row, } from 'react-bootstrap'

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieArr: this.props.weatherData
    }
  }

  render() {
    return (
      <>
        {this.props.moviesData.length !== 0 && this.props.showMovies &&
          <div className='gird'>
            <h1>Movies List</h1>
            <Container>
              <Row md={"auto"}>
                {this.props.moviesData.map((day, i) => (

                  <CardDeck style={{ width: "50%" }}>
                    <Card >
                      <Card.Img style={{ width: "100%", height: "40%" }} variant="top" alt={"Movie Img"} src={this.props.moviesData[i].image_url} />
                      <Card.Body>
                        <Card.Title style={{ margin: "25%" }}>{this.props.moviesData[i].title}</Card.Title>
                        <ListGroup variant="Secondary">
                          <ListGroup.Item>Title: {this.props.moviesData[i].title}</ListGroup.Item>
                          <ListGroup.Item>Overview: {this.props.moviesData[i].overview}</ListGroup.Item>
                          <ListGroup.Item>Popularity: {this.props.moviesData[i].popularity}</ListGroup.Item>
                        </ListGroup>


                        <Card.Footer>
                          <small className="text-muted" Item>Release Date: {this.props.moviesData[i].released_on} , {<br></br>}</small>
                          <small className="text-muted" Item>Average Votes: {this.props.moviesData[i].average_votes}, {<br></br>}</small>
                          <small className="text-muted" Item>Total Votes: {this.props.moviesData[i].total_votes}</small>

                        </Card.Footer>
                      </Card.Body>
                    </Card>
                  </CardDeck>
                ))
                } </Row>
            </Container>

          </div>
        }
        {this.props.showMovies === false &&
          <ListGroup variant="danger">
            <ListGroup.Item>Title:  {this.props.moviesData}</ListGroup.Item>
          </ListGroup>
        }
      </>
    )
  }
}
export default Movies;
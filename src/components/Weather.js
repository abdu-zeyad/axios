import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'


class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecastArr: this.props.weatherData
    }
  }
  
  render() {
    return (
      <>
      <h1>Weather</h1>
        {this.props.weatherData.length !== 0 && this.props.showWeather &&
          <div className='gird'>
            {this.props.weatherData.map((day, i) => (

              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Date</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i}</td>
                    <td>{this.props.weatherData[i].date}</td>
                    <td>{this.props.weatherData[i].description}</td>
                  </tr>
                </tbody>
              </Table>

            ))
            }
          </div>
        }
        {this.props.showWeather === false &&
          <Table>
            <thead action variant="danger">
              <tr>
              {this.props.weatherData.data}
              </tr>
            </thead>
          
          </Table>
        }
      </>
    )
  }
}
export default Weather;
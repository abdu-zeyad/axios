import React from 'react';
// import axios from 'axios';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Button from 'react-bootstrap/Button';
// import FormControl from 'react-bootstrap/FormControl';

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





    render() {
        return (
            <div>


                {
                    this.props.weatherData.map(value => {
                        return (
                            <p>
                                {value.descriptionWeather}
                                <br />
                                {value.dateWeather}
                            </p>
                        )
                    })
                }



            </div >
        )
    }
}

export default App;

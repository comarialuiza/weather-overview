import React, { useState, Fragment } from 'react';
import axios from 'axios';

import './style.css'

function App() {
  const [ city, setCity ] = useState('');
  const [ cityName, setCityName ] = useState('');
  const [ temperature, setTemperature ] = useState('');
  const [ weatherDescription, setWeatherDescription ] = useState('');
  const [ isDay, setIsDay ] = useState('');

  const [ background, setBackground ] = useState('');

  const GetWeather = async (e) => {
    e.preventDefault();

    const userCity = e.target.elements.city.value;

    try {
      const params = {
        access_key: '863dd42240a51c295b21d392e52e6899',
        query: userCity
      }
  
      const res = await axios.get('http://api.weatherstack.com/current', { params });
      const city = res.data.location;

      const data = res.data.current;
      const temperature = data.temperature;
      const weather = data.weather_descriptions;
      const isDay = data.is_day;

      console.log(weather);

      switch(data.weather_descriptions[0]) {
        case 'Sunny': 
          setBackground('sunny');
          break;
        case 'Clear':
          setBackground('clear');
          break;
        case 'Partly cloudy':
          setBackground('partlyCloudy');
          break;
        default:
          setBackground('undefined');
      }

      setCity(data);
      setCityName(city);
      setTemperature(temperature);
      setWeatherDescription(weather);
      setIsDay(isDay);

    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div id="mainContainer">
      <div className="container">
        <div className="contentForm">
          <h1 className="mainTitle">Get weather info about your city!</h1>
          <form onSubmit={ GetWeather }>
            <input type="text" 
              placeholder="City name" 
              name="city"
            />
            <button type="submit">Get weather!</button>
          </form>
        </div>

        <div className="contentWeatherInfo">
          { city 
            ? 
              <div className="weatherInfo" id={ background }>
                <h2 className="weatherDescription">{ weatherDescription }</h2>
                <h3 className="cityName">{ cityName.name }</h3>

                <p className="weatherTemperature">{ temperature } °C</p>

                { isDay 
                  ? 
                    <p>It's day!</p> 
                  : 
                    <p>It's night!</p>
                }
              </div>
            : <Fragment /> 
          }
        </div>
      </div>
    </div>
  );
}

export default App;

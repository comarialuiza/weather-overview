import React, { useState, Fragment } from 'react';
import axios from 'axios';

import FeatherIcon from 'feather-icons-react';

import './style.css'

function App() {
  const [ city, setCity ] = useState('');
  const [ cityName, setCityName ] = useState('');
  const [ temperature, setTemperature ] = useState('');
  const [ weatherDescription, setWeatherDescription ] = useState('');
  const [ isDay, setIsDay ] = useState('');

  const [ loader, setLoader ] = useState('');
  
  const [ background, setBackground ] = useState('');

  const [ icon, setIcon ] = useState('');

  const GetWeather = async (e) => {
    e.preventDefault();

    let userCity = e.target.elements.city.value;
    
    try {
      setLoader(true);

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

      let icon = '';

      switch(weather[0]) {
        case 'Sunny': 
          setBackground('sunny');
          icon = 'sun';
          break;
        case 'Clear':
          setBackground('clear');
          icon = 'cloud-off'
          break;
        case 'Partly cloudy':
          setBackground('partlyCloudy');
          icon = 'cloud';
          break;
        case 'Cloudy': 
          setBackground('cloudy');
          icon = 'cloud';
          break;
        case 'Overcast':
          setBackground('cloudy');
          icon = 'cloud';
          break;
        case 'Haze':
          setBackground('misty');
          icon = 'cloud-drizzle';
          break;
        case 'Mist':
          setBackground('misty');
          icon = 'cloud-drizzle';
          break;
        case 'Shower In Vicinity':
          setBackground('rainy');
          icon = 'cloud-rain'
          break;
        case 'Patchy heavy snow':
          setBackground('snowy');
          icon = 'cloud-snow';
          break;
        default:
          setBackground('undefined');
          icon = 'sun';
        }
        
      setCity(data);
      setCityName(city);
      setTemperature(temperature);
      setWeatherDescription(weather);
      setIsDay(isDay);
      setIcon(icon);
      setLoader(false);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div id="mainContainer" className={ isDay }>
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

        { loader 
          ? 
            <div className="loaderContainer">
              <div className="loader"></div>
            </div>
          : <Fragment />
        }

        <div className="contentWeatherInfo">
          { city && !loader
            ? 
              <div className="weatherInfo" id={ background }>

                <FeatherIcon icon={ icon } />              

                <h2 className="weatherDescription">{ weatherDescription }</h2>

                <h3 className="cityName">{ cityName.name }</h3>

                <p className="weatherTemperature">{ temperature } °C</p>

                <div className="dayInfo">
                  { isDay === 'yes' 
                    ? 
                      <FeatherIcon icon="sun" /> 
                    : 
                      <FeatherIcon icon="moon" />
                  }
                </div>
              </div>
            : <Fragment /> 
          }
        </div>
      </div>
    </div>
  );
}

export default App;

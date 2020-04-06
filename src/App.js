import React, { useState, Fragment } from 'react';
import axios from 'axios';

function App() {
  const [ city, setCity ] = useState('');

  const GetWeather = async (e) => {
    e.preventDefault();

    const userCity = e.target.elements.city.value;

    try {
      const params = {
        access_key: '863dd42240a51c295b21d392e52e6899',
        query: userCity
      }
  
      const res = await axios.get('http://api.weatherstack.com/current', { params });
      const data = res.data.current;
      console.log(data);
      setCity(data);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div id="mainContainer">
      <form onSubmit={ GetWeather }>
        <input type="text" 
          placeholder="City name" 
          name="city"
        />
        <button type="submit">Get weather!</button>
      </form>

      { city 
        ? <p> { city.temperature } </p>
        : <Fragment /> 
      }
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import cloud_icon from '../Assets/cloud.png';
import maxtempe from '../Assets/maxtempe.png';
import mintempe from '../Assets/mintempe.png';

const WeatherApp = () => {

    let api_key = "99f74f446fc4536011af417209bbd61a";

    const [wicon, setWicon] = React.useState('cloud_icon');
    const [dailyData, setDailyData] = useState([]);

    const search = async () => {
        const element = document.getElementsByClassName('cityInput');
        if(element[0].value === '')
        {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName('humidity-percent');
        const wind = document.getElementsByClassName('wind-rate');
        const temprature = document.getElementsByClassName('weather-temp');
        const location = document.getElementsByClassName('weather-location');
        const mintemp = document.getElementsByClassName('min-temp');
        const maxtemp = document.getElementsByClassName('max-temp');

        humidity[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
        temprature[0].innerHTML = Math.floor(data.main.temp) + "°C";
        location[0].innerHTML = data.name + ", " + data.sys.country;
        mintemp[0].innerHTML = Math.floor(data.main.temp_min) + "°C";
        maxtemp[0].innerHTML = Math.floor(data.main.temp_max) + "°C";

        //daily data
        let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${element[0].value}&units=Metric&appid=${api_key}`;
        let d_response = await fetch(url2);
        let d_data = await d_response.json();

        if (d_data && d_data.list) {
            setDailyData(d_data.list.slice(0, 8)); // Adjust the slice as needed
            setDailyData(d_data.list);
        }
        
        //icons
        if(data.weather[0].icon === '01d' || data.weather[0].icon === '01n')
        {
            setWicon(clear_icon);
        }
        else if(data.weather[0].icon === '02d' || data.weather[0].icon === '02n')
        {
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon === '03d' || data.weather[0].icon === '03n')
        {
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon === '04d' || data.weather[0].icon === '04n')
        {
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon === '09d' || data.weather[0].icon === '09n')
        {
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon === '10d' || data.weather[0].icon === '10n')
        {
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon === '13d' || data.weather[0].icon === '13n')
        {
            setWicon(snow_icon);
        }
        else{
            setWicon(clear_icon);
        }

    };

    useEffect(() => {
        search();
      }, []);

    return (
        <div className='container d-flex flex-column align-item-center justify-content-center'>
            <div className="top-bar d-flex text-center align-items-center justify-content-center">
                <input type="text" className="cityInput px-4" placeholder='search'/>
                <div className="search-icon p-3" onClick={()=>{search()}}>
                    <img src={search_icon} alt="" className='img-fluid d-flex aligh-items-center rounded-circle'/>
                </div>
            </div>
            <div className="weather-image d-flex justify-content-center">
                <img src={wicon} alt="" className='img-fluid'/>
            </div>
            <div className="weather-temp">--°C</div>
            <div className="weather-location">------</div>
            <div className="data-container">
                <div className="col d-flex my-5">
                    <div className="element py-3">
                        <img src={mintempe} alt="" className="icon" />
                        <div className="data">
                            <div className="min-temp">--</div>
                            <div className="text">Min. Temperature</div>
                        </div>
                    </div>
                    <div className="element py-3">
                        <img src={maxtempe} alt="" className="icon" />
                        <div className="data">
                            <div className="max-temp">--</div>
                            <div className="text">Max. Temperature</div>
                        </div>
                    </div>
                </div>
                <div className="col d-flex my-5">
                    <div className="element py-3">
                        <img src={humidity_icon} alt="" className="icon" />
                        <div className="data">
                            <div className="humidity-percent">--</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element py-3">
                        <img src={wind_icon} alt="" className="icon" />
                        <div className="data">
                            <div className="wind-rate">--</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>  
                </div>  
            </div>

            <div className="daily_data d-flex overflow-auto text-white mt-5 pb-4">
                {dailyData.map((item, index) => (
                    <div key={index} className="daily-element">
                        <div className="data px-4">
                            <div className="d-w" style={{ fontSize: '1em' }}>{Math.floor(item.main.temp)}°C</div>
                            <div className="text" style={{ fontSize: '0.4em' }}>{item.dt_txt}</div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default WeatherApp;

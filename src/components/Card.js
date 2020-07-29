import React from 'react';
import sunny from './icons/sunny.svg';
import cloudy from './icons/cloudy.svg';
import rain from './icons/rain.svg';

const Card = ({temperature}) => {
    let unixFormat = temperature.dt;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const whichDay = new Date(unixFormat * 1000);
    const dayNo =  whichDay.getDay()
    let getIcon = temperature.weather[0].main.toLowerCase();
    return (
        
                <div className = 'week day 1'>
                    <div className="weekday">
                        <p> {days[dayNo]} </p>
                    </div>
                    <div className="temp">
                        <p>{Math.floor(temperature.temp.max)}<span>&#176;</span></p>
                        {/* <p className="light">{temperature.temp.max - Math.floor(temperature.temp.max)}<span>&#176;</span></p>  */}
                        
                    </div>
                    <div className="weather">
                        
                           
                                <span className = 'weather-icon'><img src= {rain} alt="" /></span>
                            
                        
                        <p className = 'light'> {temperature.weather[0].main} </p>
                    </div>
                </div> 
        
     
    )
}

export default Card;

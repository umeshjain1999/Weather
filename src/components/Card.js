import React from 'react';

//Thunderstorm  Drizzle Rain Snow Clear Clouds



const Card = ({temperature}) => {
    let unixFormat = temperature.dt;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const whichDay = new Date(unixFormat * 1000);
    const dayNo =  whichDay.getDay();
    let knowWeather = temperature.weather[0].main;
    let getIcon = temperature.weather[0].main.toLowerCase();
    let source_image = '';
    const atmosphere = [
        'Mist',
        'Smoke',	
        'Haze',
        'Dust',	
        'Fog'	,
        'Sand',	
        'Dust',	
        'Ash'	,
        'Squall',
        'Tornado']

    if (knowWeather in atmosphere ) {
        source_image = "./weather-icons/foggy.svg" 
    }
    else {
    source_image = "./weather-icons/" + getIcon + ".svg"
    }


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
                        
                           
                                <span className = 'weather-icon'><img src= {source_image} alt="" /></span>
                            
                        
                        <p className = 'light'> {temperature.weather[0].main} </p>
                    </div>
                </div> 
        
     
    )
}

export default Card;

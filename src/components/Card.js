import React  from 'react';


//Thunderstorm  Drizzle Rain Snow Clear Clouds



const Card = ({temperature,index , giveMeIndex}) => {

    

  


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

    if (atmosphere.includes(knowWeather) ) {
        source_image = "./weather-icons/foggy.svg" 
    }
    else {
    source_image = "./weather-icons/" + getIcon + ".svg"
    }

   
const indexNo = () => {
    const x = document.querySelectorAll('.week');
    x.forEach(function(el) {
        el.classList.remove("haha")
      })
    document.querySelector('.day'+ index).classList.add('haha');
    giveMeIndex(index);
    
}
const decimalNo = Number(temperature.temp.day - Math.floor(temperature.temp.day)).toFixed(2);
 
    return (
        
                <div className = {'week day' + index } onClick = {indexNo} 
                
                
                >
                    <div className = 'week-day-container'>
                        
                        <div className="weekday">
                            <p> {days[dayNo]} </p>
                        </div>
                        <div className="temp">
                            <p>{Math.floor(temperature.temp.day)}<span>&#176;</span></p>
                                
                            
                            <p className="light">{decimalNo*100}<span>&#176;</span></p> 
                            
                        </div>
                        <div className="weather">
                            
                            
                                    <span className = 'weather-icon'><img src= {source_image} alt= {getIcon} /></span>
                                
                            
                            <p className = 'light'> {temperature.weather[0].main} </p>
                        </div>
                    </div>
                </div> 
                
        
     
    )
}

export default Card;

import React from 'react';
import { Line } from 'react-chartjs-2';

const Daily = ({dailyTemp , hourTemp , temperature_weekly ,indexOfCard}) => {


    let knowWeather = dailyTemp.weather[0].main;
    let getIcon = dailyTemp.weather[0].main.toLowerCase();
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

    if (atmosphere.includes(knowWeather)) {
        source_image = "./weather-icons/foggy.svg" ;
    }
    else {
    source_image = "./weather-icons/" + getIcon + ".svg";
    }

//hours here....


let hour_temperature = [];

hourTemp.forEach(element => {
    hour_temperature.push(element.temp);
});

let first_half = hour_temperature.slice(0,24)

let second_half = hour_temperature.slice(24,)
let chart_hours;
if(indexOfCard  === 0) {
     chart_hours = first_half;
}
else if (indexOfCard % 2 === 0) {
     chart_hours = first_half;
}
else {
     chart_hours = second_half;
}

// Temperature chart

const dataTemp = {
    labels: [ "1pm", "2pm",
    "3pm", "4pm", "5pm","6pm", "7pm", "8pm",
    "9pm", "10pm", "11pm","12am" , 
    "1am", "2am","3am", "4am", "5am", "6am", "7am", "8am", 
    "9am", "10am", "11am", "12pm",],
    datasets: [
      {
        label: '',
        data: chart_hours, //timing hourly based
        fill: false,
        borderColor: '#6fceed',
        pointBackgroundColor:"rgb(255, 255, 255)",
        pointBorderColor:"#6fceed",
        pointRadius : 10,
        pointHoverRadius: 10
      }
    ]
  };
  const legendTemp = {
      display : false,
  };
  const optionsTemp = {
     maintainAspectRatio: false ,

     scales: {
        xAxes: [{
           scaleLabel: {
              display: false,
              
           },
           gridLines: {
              display: true,
              drawBorder: false 
           },
           ticks : {
               display : true,
           }
        }],
        yAxes: [{
           gridLines: {
              display: false,
              drawBorder: false 
           },
           ticks : {
               display :false,
           },
        }]
     }

  };

// Chart for sunrise sunset

const dataSun = {
    labels: ["6am", "7am", "8am", 
    "9am", "10am", "11am", "12pm", "1pm", "2pm",
    "3pm", "4pm", "5pm","6pm", "7pm", "8pm"],
    datasets: [
    
      {
        label: '',
        data: [-6,0,1,2,3,4,5,6,5,4,3,2,1,0,-6], 
        fill : true,
        lineTension : 0.1,
        backgorundColor : '#ffe634',
        borderColor: '#ffe634',
        pointBackgroundColor:"#ffe634",
        pointBorderColor:"#ffe634",
        pointRadius : 1,
        pointHoverRadius: 1
      }
    ]
  };
    const legendSun = {
        display : false,
    };

  const optionsSun = {
    maintainAspectRatio: false ,

    
    scales: {
        xAxes: [{
           scaleLabel: {
              display: false,
              
           },
           gridLines: {
              display: false,
              drawBorder: false 
           },
           ticks : {
               display : false,
           }
        }],
        yAxes: [{
           gridLines: {
              display: false,
              drawBorder: false 
           },
           ticks : {
               display :false,
           },
        }]
     }
  };

const sunTiming = (value) => {
    let date = new Date(value * 1000); 
    let hour = date.getHours(); 
    let min = date.getMinutes(); 

    if(hour === 0){
        hour = 12;
      }
      else if( hour > 12)
       {
         hour = hour - 12;
       }
       else
       {
         hour = hour;
       }


       let time = {
           hour : hour,
           min : min
       }

      
      
      
      return time
    
    
} 
    return (
        <div className = 'daily'>
           <div className="temp-degree">
                <div className="temp-value">
                            <p> {Math.floor(temperature_weekly[indexOfCard].temp.max)} <span>&#176;</span>C</p>
                </div>
                <span className="weather-icon"><img src= {source_image} alt= {getIcon}/></span>
           </div>
           <div className="chart">
               <div className="temp-chart">
                        <Line
                                data={dataTemp}
                                width={100}
                                height={300}
                                legend = {legendTemp}
                                options={optionsTemp}
                                />
               </div>
           </div>
           <div className="properties">
                <div className="prop pressure">
                    <p>Pressure</p>
                    <div> {temperature_weekly[indexOfCard].pressure} <span className = 'pressure-unit'>hpa</span></div>
                </div>
                <div className="prop humidity">
                    <p>Humidity</p>
                    <div> {temperature_weekly[indexOfCard].humidity} <span className = 'humidity-unit'>%</span></div>
                </div>
           </div>
           <div className="sun-rise-set">
               <div className="sun-timing">
                        <div className="sun am">
                            <p>Sunrise</p>
                            <div> {sunTiming(temperature_weekly[indexOfCard].sunrise).hour + ":" + sunTiming(temperature_weekly[indexOfCard].sunrise).min} <span className = 'pressure-unit'>am</span></div>
                        </div>
                        <div className="sun pm">
                            <p>Sunset</p>
                            <div> {sunTiming(temperature_weekly[indexOfCard].sunset).hour + ":" + sunTiming(temperature_weekly[indexOfCard].sunset).min} <span className = 'humidity-unit'>pm</span></div>
                        </div>
                        
               </div>
               <div className="sunchart">
                   <Line
                   data = {dataSun}
                   width={50}
                   height={150}
                   legend = {legendSun}
                   options = {optionsSun} 
                   />
               </div>
           </div>
        </div>
    )
}

export default Daily;

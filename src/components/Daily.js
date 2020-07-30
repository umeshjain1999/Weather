import React from 'react';
// import sunny from './icons/cloudy.svg';
import { Line } from 'react-chartjs-2';

const Daily = ({dailyTemp , hourTemp}) => {


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


let hour_temperature = [];

hourTemp.forEach(element => {
    hour_temperature.push(element.temp);
});

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
        data: hour_temperature, //timing hourly based
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

// const dataSun = {
//     labels: ["6am", "7am", "8am", 
//     "9am", "10am", "11am", "12pm", "1pm", "2pm",
//     "3pm", "4pm", "5pm","6pm", "7pm", "8pm"],
//     datasets: [
//       {
//         label: '',
//         data: [0,50,0], //timing hourly based
//         fill: false,
//         borderColor: '#6fceed',
//         pointBackgroundColor:"rgb(255, 255, 255)",
//         pointBorderColor:"#6fceed",
//         pointRadius : 10,
//         pointHoverRadius: 10
//       }
//     ]
//   };
//     const legendSun = {
//         display : false,
//     };

//   const optionsSun = {
//     maintainAspectRatio: false ,

    
//     scales: {
//         xAxes: [{
//            scaleLabel: {
//               display: false,
              
//            },
//            gridLines: {
//               display: false,
//               drawBorder: false 
//            },
//            ticks : {
//                display : true,
//            }
//         }],
//         yAxes: [{
//            gridLines: {
//               display: false,
//               drawBorder: false 
//            },
//            ticks : {
//                display :false,
//            },
//         }]
//      }
//   };


    return (
        <div className = 'daily'>
           <div className="temp-degree">
                <div className="temp-value">
                            <p> {Math.floor(dailyTemp.temp)} <span>&#176;</span>C</p>
                </div>
                <span className="weather-icon"><img src= {source_image} alt=""/></span>
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
                    <div> {dailyTemp.pressure} <span className = 'pressure-unit'>hpa</span></div>
                </div>
                <div className="prop humidity">
                    <p>Humidity</p>
                    <div> {dailyTemp.humidity} <span className = 'humidity-unit'>%</span></div>
                </div>
           </div>
           {/* <div className="sun-rise-set">
               <div className="sunchart">
                   <Line
                   data = {dataSun}
                   width={100}
                   height={300}
                   legend = {legendSun}
                   options = {optionsSun} 
                   />
               </div>
           </div> */}
        </div>
    )
}

export default Daily;

import React , {useState , useEffect} from 'react';
import Daily from './Daily';
import Card from './Card'

export const Week = ({locationCurrent}) => {
    const [isLoading , setLoading] = useState(true);
    const [temperature ,setTemperature] = useState([]);
    const [dailyTemp , setdailyTemp] = useState([]);
    const [hourTemp , sethourTemp] = useState([]);
    let lat = locationCurrent.latitude;
    let lon = locationCurrent.longitude;




    useEffect(() => {
       if (lat != null || lon !=null){
                let weather = fetchWeather()
                weather.then((week_temp) => {
                    
                    setTemperature(week_temp.daily);
                    setdailyTemp(week_temp.current);
                    sethourTemp(week_temp.hourly);
                    setLoading(false);

                }).catch((error) => console.log(error)) 
       }
       else {
           console.log('Location is null');
       }

    },[locationCurrent]);

// Fetching data from Openweather API
    const fetchWeather = async () => {
        const data = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + 
        "&units=metric&appid=f8421952e2b44732a95ded031763159e");
        const response = data.json();
        return response;
    }
    
       
    // https://api.openweathermap.org/data/2.5/onecall?lat=19.31064&lon=72.859329&units=metric&appid=f8421952e2b44732a95ded031763159e
    return (
       <div>
            {(isLoading ) ? (
                <div
                style = {{
                    height: '50vh',
                    display : 'grid',
                    placeItems : 'center'
                  }}
                >
                     <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
       <defs>
           <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
               <stop stopColor="#192a56" stopOpacity="0" offset="0%"/>
               <stop stopColor="#192a56" stopOpacity=".631" offset="63.146%"/>
               <stop stopColor="#192a56" offset="100%"/>
           </linearGradient>
       </defs>
       <g fill="none" fillRule="evenodd">
           <g transform="translate(1 1)">
               <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth="2">
                   <animateTransform
                       attributeName="transform"
                       type="rotate"
                       from="0 18 18"
                       to="360 18 18"
                       dur="0.9s"
                       repeatCount="indefinite" />
               </path>
               <circle fill="#fff" cx="36" cy="18" r="1">
                   <animateTransform
                       attributeName="transform"
                       type="rotate"
                       from="0 18 18"
                       to="360 18 18"
                       dur="0.9s"
                       repeatCount="indefinite" />
               </circle>
           </g>
       </g>
   </svg>
                </div>
            ) : (
                        <div>
                                <div className = 'week-container'>

                                    <div className="week-section">
                                                                {temperature.length ?(temperature.map((temperature_day , index) => (


                                                                <Card key = {index} temperature = {temperature_day}/>
                                                                ))

                                                                )


                                                                : ''}

                                    </div>
                            
                            </div>
                            <Daily dailyTemp = {dailyTemp} hourTemp = {hourTemp}/>
                        </div>
            )}

       </div>


    )
}


export default Week;
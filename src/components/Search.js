import React , {useState, useEffect} from 'react';
import search from './icons/search.svg';
import gps from './icons/gps.svg';
import '../App.css';
import { findByLabelText } from '@testing-library/react';


const Search = ({getLocation}) => {

    const [value , setvalue] = useState('');
    const [showOption, setshowOption] = useState(false);
    const [cityNames, setcityNames] = useState([]);
    const [isLoading, setisLoading] = useState(true);


    
  

    const giveMeBorder = () => {
        document.querySelector('.search-bar').classList.add('give-me-border');
    }
 

    const onSubmitForm = (event) => {


        event.preventDefault();
       

        if(!value) return;

        getLocation(value);
        setshowOption(false);
        document.querySelector('.search-bar').classList.remove('give-me-border');
    }

    const handleChange = (e) => {
        setvalue(e.target.value);
        if (e.target.value === ''){setshowOption(false)}
        else {
            setshowOption(true)
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
            const apiURL = proxyUrl + "https://www.metaweather.com/api/location/search/?query=" + e.target.value;
            const check = fetchLocation(apiURL);

            check.then(
                (msg)=> {
                   


                    setcityNames(msg.slice(0,5));
                 

                    setisLoading(false);

                    
                } 
            )
            .catch(()=>console.log('Fetching error'))
        
        }
    }

    const fetchLocation = async (endpoint) => {
        const res = await fetch(endpoint);
        const data = res.json();
        return data
    }

    const valueFun = (cityClick) => {
            setvalue(cityClick)
    }

    const afterClickDropdownState = () => {
        setshowOption(false)
    }
    


    return (
        <div className = 'search-dropdown'>
            <div className = 'search'>

                <div className = 'search-bar'>
                    <div className="search-location"><img src={gps} alt="" /></div>
                    <form className = 'search-form' onSubmit = {onSubmitForm}>
                                <input className = 'search-input' type="text" onChange = {handleChange} value = {value} onClick= {giveMeBorder} placeholder = 'Search'/>
                    </form>
                    <div className="search-glass"><img src={search} alt="" /></div>
                </div>
            </div>
            {showOption && <div>
                    {(isLoading)?(<div></div>):(<div className="dropdown">
                                    {
                                        cityNames.map((name , index) => {
                                            return ((isLoading)?(<div
                                            style = {{
                                                color : 'grey',
                                            }}
                                            >Loading...</div>):(<Dropdown key = {index} name = {name.title} latt_long = {name.latt_long} value_submit = {valueFun} 
                                            afterClickDropdownState = {afterClickDropdownState}  getLocation = {getLocation} 
                                            />))
                                        })
                                    }
                                </div>)}
                            </div>
                            
                            }
        </div>
    );
}


function Dropdown(props) {
const [temp, settemp] = useState(null);
const [weather_icon , setweather_icon] = useState(null);
const [check , setcheck] = useState(true);




    const blah = () => {
        props.value_submit(props.name);
        props.afterClickDropdownState();
        props.getLocation(props.name);
        document.querySelector('.search-bar').classList.remove('give-me-border');
        }


    useEffect(() => {
                            

                            const location = props.latt_long;
                            const loc_arr = location.split(',');
                            

                            const fetchWeather = async () => {
                                const data = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + parseInt(loc_arr[0]) + "&lon=" + parseInt(loc_arr[1]) + 
                                "&units=metric&appid=e91d990e106eaa805869a51fd82265f5" );
                                const response = data.json();
                                return response;
                            }

                            let weather = fetchWeather()
                             weather.then((week_temp) => {
                                
                                settemp(week_temp.current.temp);
                                setweather_icon(week_temp.current.weather[0].main);
                            
                                setcheck(false);
                                

                            })   

                       
   
    },[])




return (

    <div className = 'city-name' onClick = {blah}>
       

        <div className="dropdown-city-name"> {props.name} </div>
        {(check)?(
            <div><span className = 'light'>&#8634;</span></div>
        ):(
        
        <div className="dropdown-city-temp">
            <div className="dropdown-icon">
                <span><img src= {'./weather-icons/'+ weather_icon.toLowerCase() +'.svg'} alt=""/></span>
                <div className = 'dropdown-weather light'>{weather_icon}</div>
            </div>
            <p>{Math.floor(temp)}<span>&#176;</span>C</p>
        </div>)
        }
        
    </div>
  
)
}

export default Search;




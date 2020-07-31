import React , {useState, useEffect} from 'react';
import search from './icons/search.svg';
import gps from './icons/gps.svg';
import '../App.css';
import { findByLabelText } from '@testing-library/react';


const Search = ({getLocation}) => {

    const [value , setvalue] = useState('');
    const [showOption, setshowOption] = useState(false);
    const [cityNames, setcityNames] = useState([]);

 

    const onSubmitForm = (event) => {


        event.preventDefault();
       

        if(!value) return;

        getLocation(value);
        setshowOption(false);
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
                    console.log(msg.slice(0,5));

                    setcityNames(msg.slice(0,5));

                    
                } 
            )
            .catch(()=>console.log('purrrr'))
        
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
                                <input className = 'search-input' type="text" onChange = {handleChange} value = {value} />
                    </form>
                    <div className="search-glass"><img src={search} alt="" /></div>
                </div>
            </div>
            {showOption && <div className="dropdown">
                        {
                            cityNames.map((name , index) => {
                                return <Dropdown key = {index} name = {name.title} value = {valueFun} 
                                afterClickDropdownState = {afterClickDropdownState} woeid = {name.woeid} getLocation = {getLocation}/>
                            })
                        }
                            </div>}
        </div>
    );
}


function Dropdown(props) {
const [temp, settemp] = useState(null);


    const blah = () => {
        props.value(props.name)
        props.afterClickDropdownState()
        props.getLocation(props.name)
        }


    useEffect(() => {
        const fetchTemp = async (endpoint) => {       
            const res_woeid = await fetch(endpoint);
            const data_woeid = res_woeid.json();
            return data_woeid;
        }
        const proxyUrlwoeid = 'https://cors-anywhere.herokuapp.com/';
        const apiURLwoeid = proxyUrlwoeid + "https://www.metaweather.com/api/location/" + props.woeid;
        const getTemp = fetchTemp(apiURLwoeid)
        getTemp.then(
            (msg) => {
                    console.log(msg.consolidated_weather[0].the_temp);
                    const convertToFloor = Math.floor(msg.consolidated_weather[0].the_temp);
                    settemp(convertToFloor)

            }
        )
        .catch(() => console.log('Could not fetch temperature'))
    },[])




return (

    <div className = 'city-name' onClick = {blah}>

        <div className="dropdown-city-name"> {props.name} </div>
        <div className="dropdown-city-temp"><p>{temp}<span>&#176;</span>C</p></div>
        
    </div>
  
)
}

export default Search;




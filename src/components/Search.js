import React , {useState, useEffect} from 'react';
import search from './icons/search.svg';
import gps from './icons/gps.svg';
import '../App.css';
import { findByLabelText } from '@testing-library/react';


const Search = ({getLocation}) => {

    const [value , setvalue] = useState('');
    const [showOption, setshowOption] = useState(false);
    const [cityNames, setcityNames] = useState([]);
    const [isLoading, setisLoading] = useState(true)

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
            {showOption && <div className="dropdown">
                        {
                            cityNames.map((name , index) => {
                                return ((isLoading)?(<div
                                style = {{
                                    color : 'grey',
                                }}
                                >Loading...</div>):(<Dropdown key = {index} name = {name.title} value = {valueFun} 
                                afterClickDropdownState = {afterClickDropdownState} woeid = {name.woeid} getLocation = {getLocation}/>))
                            })
                        }
                            </div>}
        </div>
    );
}


function Dropdown(props) {
const [temp, settemp] = useState(null);
const [check , setcheck] = useState(true);


    const blah = () => {
        props.value(props.name);
        props.afterClickDropdownState();
        props.getLocation(props.name);
        document.querySelector('.search-bar').classList.remove('give-me-border');
        }


    useEffect(() => {
        //to remove border of selected card
        //     const x = document.querySelectorAll('.week');
        // x.forEach(function(el) {
        //     el.classList.remove("haha")
        // })
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
                
                    const convertToFloor = Math.floor(msg.consolidated_weather[0].the_temp);
                    settemp(convertToFloor);
                    setcheck(false);

            }
        )
        .catch(() => console.log('Could not fetch temperature'))
    },[])




return (

    <div className = 'city-name' onClick = {blah}>

        <div className="dropdown-city-name"> {props.name} </div>
        {(check)?(
            <div>🦄</div>
        ):(<div className="dropdown-city-temp"><p>{temp}<span>&#176;</span>C</p></div>)}
        
    </div>
  
)
}

export default Search;




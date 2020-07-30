import React , {useState} from 'react';
import search from './icons/search.svg';
import gps from './icons/gps.svg';
import '../App.css';


const Search = ({getLocation}) => {

    const [value , setvalue] = useState('');
    const [showOption, setshowOption] = useState(false);
    const options = [
        'Mukono Town',	
        'Mulhouse',	
        'Multan',	 
        'Mumbai',
        'Munger',
        'Munich'	, 
        'Münster',	 
        'Muntinlupa',
        'New Delhi'	 ,
        'New Haven'	 ,
        'New Orleans' ,
        'New York'	 ,
        'Newark ',
        'London',	  
        'Londrina',	
        'Long Beach',	 
        'Longjing',
        'Longkou'

    ];

    const onSubmitForm = (event) => {


        event.preventDefault();
       

        if(!value) return;

        getLocation(value);
        setshowOption(false);
    }

    const handleChange = (e) => {
        setvalue(e.target.value);
        if (e.target.value === ''){setshowOption(false)}
        else {setshowOption(false)}
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
                            options.map((name , index) => {
                                return <Dropdown key = {index} name = {name}/>
                            })
                        }
            </div>}
        </div>
    );
}


function Dropdown(props) {
return (
    <div className = 'city-name'>
        {props.name}
    </div>
  
)
}

export default Search;




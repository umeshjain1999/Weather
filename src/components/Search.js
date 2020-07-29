import React , {useState} from 'react';
import search from './icons/search.svg';
import gps from './icons/gps.svg';
import '../App.css';

const Search = ({getLocation}) => {

    const [value , setvalue] = useState('');

    const onSubmitForm = (event) => {


        event.preventDefault();
       
        const resetvalue = () => setvalue(" ")

        if(!value) return;

        getLocation(value);

        resetvalue();

    }

    const getCityName = (e) => {
        setvalue(e.target.value);
    }

    return (
        <div className = 'search'>

            <div className = 'search-bar'>
                <div className="search-location"><img src={gps} alt="" /></div>
                <form className = 'search-form' onSubmit = {onSubmitForm}>
                            <input className = 'search-input' type="text" onChange = {getCityName} value = {value} />
                </form>
                <div className="search-glass"><img src={search} alt="" /></div>
            </div>
        </div>
    )
}

export default Search;

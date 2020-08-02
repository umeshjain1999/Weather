import React , {useState , useEffect} from 'react';
import Search from './components/Search';
import Week from './components/Week';
import './App.css';

function App() {
  const initialLocation = {
    latitude : null,
    longitude : null
  }
const [isLoading , setLoading] = useState(true);
const [latlon , setlatlon] = useState(initialLocation);
const [location , setLocation] = useState(initialLocation);
const [isSearch , setSearch] = useState (false);
//https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=f8421952e2b44732a95ded031763159e




const getLocationName = (value) => {
  const new_value = value


  const fetchLatLon = async () => {
          
          const data = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
                                    new_value + 
                                    "&units=metric&appid=e91d990e106eaa805869a51fd82265f5");
          const response = data.json();
          
          return response
          
  }

  const name = fetchLatLon();

  name.then(
    (name_data) => {
      setlatlon({latitude :  name_data.coord.lat , longitude : name_data.coord.lon}); 
      setSearch(true);
    }
  ).catch(() => alert('Uh sorry try some other name'))

}



useEffect(() => {
  
  if ("geolocation" in navigator) {
            // check if geolocation is supported/enabled on current browser
            navigator.geolocation.getCurrentPosition(
            function success(position) {
              // for when getting location is a success
              setLocation({latitude :  position.coords.latitude , longitude :  position.coords.longitude});
              setLoading(false);
           },
            function error(error_message) {
              // for when getting location results in an error
              console.error('An error has occured while retrieving location', error_message);
                    
            }  
          );

} 
  
  else {
    // geolocation is not supported
    // get your location some other way
    console.log('geolocation is not enabled on this browser')
    alert('Give access to your location');
    setLoading(false)
  }

},[])

  return (
  
   <div>
      {(isLoading)? (
     <div 
     style = {{
       height: '100vh',
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
    ):(
      <div className="App">
       <Search getLocation = {getLocationName}/>
       <Week locationCurrent = {
         (isSearch)? (latlon) : (location)
       }/>
       </div>
    )
    
    }
   </div>
   
  );
}

export default App;

## Weather App 🌩
With one click to enable GPS location and receive the weather condition in your current location.<br/>
Weather provides detailed current weather forecasts and weather observations for all the cities around the world. Weather also provides sunrise/sunset times according to city, atmospheric pressure, and humidity. This application allows you to find out a detailed forecast wherever you are, for any time of the day or for next the <b>7 days</b> just by tapping on a specific day. 
#### [here](https://weather-umeshjain.netlify.app/)


### Motivation
This weather application was the assignment given to me by some company that I had to complete within 2 days. It was an amazing experience and I learned many things.

### Technology 
- <b>Built with</b> -> [Reactjs](https://reactjs.org/)
- <b>Other libraries</b> -> [Chartjs](https://github.com/jerairrest/react-chartjs-2), [Highlight words](https://www.npmjs.com/package/react-highlight-words)
- <b>API used for fetching weather details</b> -> [OpenWeather](https://openweathermap.org/api), [MetaWeather](https://www.metaweather.com/api/)
- <b>Editor used</b> -> [vscode](https://code.visualstudio.com/) , [codesandbox](https://codesandbox.io/)
- <b>Hosting</b> -> [netlify](https://app.netlify.com/)

### Features
- Using GPS this app provides you a detailed forecast of your current location.
- Using the search bar of this app you can search for any city around the world.
- Different types of weather also visualize using icons.
- While searching for the city it gives you the suggestion of other related cities based on the matching letters.
- This Suggestion of cities also provides quick temperature information.
- Weather app provides a forecast of the next 7 days by just tapping on a particular day.
- The weather app also provides a detailed forecast for any time of the day which is shown via a beautiful and responsive graph.
- This app also provides pressure, humidity, sunrise/sunset timing for all the searches.

### How I created this project
- All-weather information are fetched using Weather API. 
- I have used useState and useEffect to manage the data across the components in Reactjs.
- The suggestion of the city in the search bar is fetched from API and Highlighting specific words is done by a [library](https://www.npmjs.com/package/react-highlight-words).
- To get current location of the user <br>
```
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
```
### Credits
Wonderful weather icons - [Rasmus Nielsen](https://www.iconfinder.com/iconsets/weatherful?utm_source=sharing-feature&utm_medium=social&utm_campaign=sharing-feature&utm_content=link) <br>
Loading spinner - [Sam Herbert](https://github.com/SamHerbert/SVG-Loaders) on github.<br>
Font - [Open Sans](https://fonts.google.com/specimen/Open+Sans?selection.family=Open+Sans) (400,600,700) Designed by Steve Matteson



### License
MIT

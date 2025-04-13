import '../App.css';
import cityTimezoneMap from '../utils/cityTimezoneMap';
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon"; // Import Luxon for time manipulation


const Home = () => {

    const [timezones, setTimezones] = useState([]); // Keep track of added timezones
    const [selectedPalette, setSelectedPalette] = useState(""); // Track the selected palette
    const [selectedCity, setSelectedCity] = useState("");

    const handleAddTimezone = () => {
        if (timezones.length >= 8) {
          alert("You can only add up to 8 timezones.");
          return;
        }
        if (selectedCity) {
            // Check for duplicates
            const alreadyExists = timezones.some((tz) => tz.city === selectedCity);
            if (alreadyExists) return;
        
            const tz = cityTimezoneMap[selectedCity]; //get selected city from user input
            const currentTime = DateTime.now().setZone(tz).toFormat("hh:mm a"); // Get current time in 12-hour AM/PM format
            const currentDayAndDate = DateTime.now().setZone(tz).toFormat("ccc. dd'th'"); // Get day and date in the format "Wed. 26th"

            setTimezones([...timezones, { city: selectedCity, tz, currentTime, currentDayAndDate }]);
            setSelectedCity("");// reset dropdown
          }
      };

        // This function handles removing a timezone from the list
  const handleDeleteTimezone = (index) => {
    const updatedTimezones = timezones.filter((_, i) => i !== index);
    setTimezones(updatedTimezones); // Update the state with the new timezone list
  };
      

  // Update the time every minute for each timezone
  useEffect(() => {
    const interval = setInterval(() => {
      setTimezones((prevTimezones) =>
        prevTimezones.map((tz) => {
          const newTime = DateTime.now().setZone(tz.tz).toFormat("HH:mm a");
          const newDayAndDate = DateTime.now().setZone(tz.tz).toFormat("ccc. dd'th'");

          return { ...tz, currentTime: newTime, currentDayAndDate: newDayAndDate }; // Update the time
        })
      );
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval); // Clear the interval on unmount
  }, []);

  //checks the URl params for palette
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
  
    const paletteParam = params.get("palette");
    if (paletteParam) setSelectedPalette(paletteParam);
  
    const citiesParam = params.get("cities");
    if (citiesParam) {
      const cityList = citiesParam.split(",");
      const validCities = cityList.filter(city => cityTimezoneMap[city]);
      const tzObjects = validCities.map(city => {
        const tz = cityTimezoneMap[city];
        const currentTime = DateTime.now().setZone(tz).toFormat("hh:mm a");
        const currentDayAndDate = DateTime.now().setZone(tz).toFormat("ccc. dd'th'");
        return { city, tz, currentTime, currentDayAndDate };
      });
      setTimezones(tzObjects);
    }
  }, []);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
  
    if (timezones.length > 0) {
      const cityList = timezones.map(tz => tz.city).join(",");
      params.set("cities", cityList);
    } else {
      params.delete("cities");
    }
  
    if (selectedPalette) {
      params.set("palette", selectedPalette);
    } else {
      params.delete("palette");
    }
  
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [timezones, selectedPalette]);
  

    //   const handleChoosePalette = (event) => {
    //     setSelectedPalette(event.target.value); // Set the selected palette value
    //   };

      const handleChoosePalette = (event) => {
        const value = event.target.value;
        setSelectedPalette(value); // Set the selected palette value
      
        // Update URL
        const params = new URLSearchParams(window.location.search);
        if (value) {
          params.set("palette", value);
        } else {
          params.delete("palette");
        }
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, "", newUrl);
      };

return(
   <div className="home-page-container">
      <div className="action-bar">
        <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="timezone-dropdown"
        >
            <option value="" disabled>Select a city</option>
                {Object.keys(cityTimezoneMap).map((city) => (
            <option key={city} value={city}>
                {city}
            </option>
            ))}
        </select>
        
        <button onClick={handleAddTimezone} className="action-buttons">
            Add
        </button>

              {/* Dropdown to select the palette */}
      <select onChange={handleChoosePalette} value={selectedPalette} className="palette-dropdown">
        <option value="">Select a Palette</option>
        <option value="palette-1">Palette 1</option>
        <option value="palette-2">Palette 2</option>
        <option value="palette-3">Palette 3</option>
      </select>
</div>

   <div className="column-container">

<div className={`timezone-container-wrapper ${selectedPalette}`}>

{timezones.length > 0 ? (
  timezones.map((item, index) => (
    <div key={index} className="timezone-container">

      <div className="timezone-city">{item.city}</div> 
      <div className="timezone-time">{item.currentTime}</div>
      <div className="timezone-date">{item.currentDayAndDate}</div>


      <button 
        onClick={() => handleDeleteTimezone(index)} 
        className="delete-btn"
      >
        Delete
      </button>
    </div>
  ))
) : (
  <div>No timezones added</div>
)}

</div>
    
    </div>
</div>
)

}

export default Home;

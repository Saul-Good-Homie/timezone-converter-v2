import '../App.css';
import cityTimezoneMap from '../utils/cityTimezoneMap';
import React, { useState } from "react";

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
        
            const tz = cityTimezoneMap[selectedCity];
            setTimezones([...timezones, { city: selectedCity, tz }]);
            setSelectedCity("");// reset dropdown
          }
      };
      

      //finds and deletes the timezone from the array
      const handleDeleteTimezone = (index) => {
        const updatedTimezones = timezones.filter((_, i) => i !== index);
        setTimezones(updatedTimezones); // Update the state with the new timezone list
      };


      const handleChoosePalette = (event) => {
        setSelectedPalette(event.target.value); // Set the selected palette value
      };

return(
    <div className="home-container">

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

<div className={`timezone-container-wrapper ${selectedPalette}`}>

{timezones.length > 0 ? (
  timezones.map((item, index) => (
    <div key={index} className="timezone-container">
      {item.city}
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

)

}

export default Home;

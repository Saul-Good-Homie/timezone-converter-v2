import '../App.css';
import React, { useState } from "react";

const Home = () => {

    const [timezones, setTimezones] = useState([]); // Keep track of added timezones
    const [selectedPalette, setSelectedPalette] = useState(""); // Track the selected palette


    //user input to add timezone
    const handleAddTimezone = () => {
        if (timezones.length >= 8) {
            alert("You can only add up to 8 timezones.");
            return; // Prevent adding more timezones
          }

        const tz = prompt("Enter a timezone (e.g. America/New_York)");
        if (tz) {
          setTimezones([...timezones, tz]);
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
             <button
        onClick={handleAddTimezone}
        className="action-buttons"
      >
        Add Timezone
      </button>

      {/* Dropdown to select the palette */}
      <select onChange={handleChoosePalette} value={selectedPalette} className="palette-dropdown">
        <option value="">Select a Palette</option>
        <option value="palette-1">Palette 1</option>
        <option value="palette-2">Palette 2</option>
        <option value="palette-3">Palette 3</option>
      </select>

      {/* {timezones.length > 0 ? (
          timezones.map((tz, index) => (
            <div className={`timezone-container ${selectedPalette}`}>
              {tz}
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
        )} */}

    {/* Wrapper for the timezone containers */}
<div className={`timezone-container-wrapper ${selectedPalette}`}>
  {timezones.length > 0 ? (
    timezones.map((tz, index) => (
      <div key={index} className="timezone-container">
        {tz}
        <button onClick={() => handleDeleteTimezone(index)} className="delete-btn">
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

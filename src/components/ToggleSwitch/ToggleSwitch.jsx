import { useContext, useState } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  // const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  // const handleTempChange = (e) => {
  //   currentTemperatureUnit === "C"
  //     ? setCurrentTemperatureUnit("F")
  //     : setCurrentTemperatureUnit("C");

  //   console.log(currentTemperatureUnit);
  // };

  return (
    <label htmlFor="" className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
}

export default ToggleSwitch;

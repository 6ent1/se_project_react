import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "",
  handelToggleSwitchChange: () => {},
});

export { CurrentTemperatureUnitContext };

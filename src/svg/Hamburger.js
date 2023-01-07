import React from "react";
import Svg, { Path } from "react-native-svg"
function Hamburger(color) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="15"
      fill="none"
      viewBox="0 0 23 15"
    >
      <Path
        fill="#fff"
        d="M15.125 14.75H.625v-2.417h14.5v2.417zm7.25-6.042H.625V6.292h21.75v2.416zm-7.25-6.041H.625V.25h14.5v2.417z"
      ></Path>
    </Svg>
  );
}

export default Hamburger;
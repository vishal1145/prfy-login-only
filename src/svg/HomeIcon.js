import React from "react";
import Svg, { Path } from "react-native-svg"
function HomeIcon({color,size}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      <Path
        fill={color ? color : colors.lightGray}
        d="M23.032 10.822L12.574.372a.811.811 0 00-1.148 0L.968 10.821a1.626 1.626 0 001.148 2.775h1.101v7.458c0 .45.364.812.813.812h6.345V16.18h2.844v5.687h6.751c.45 0 .813-.363.813-.812v-7.457h1.102a1.627 1.627 0 001.148-2.775z"
      ></Path>
    </Svg>
  );
}

export default HomeIcon;
import React from "react";
import Svg, { Path } from "react-native-svg"


function CrossIcon({color='black',size=24,}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      data-name="24x24/On Light/Cross"
      viewBox={`0 0 ${size} ${size}`}
    >
      <Path fill="none" d="M0 0H24V24H0z"></Path>
      <Path
        fill={color}
        d="M9.291 10.352l-4-4-4.005 4A.75.75 0 11.22 9.291l4.005-4L.22 1.281A.75.75 0 011.281.22l4.005 4.005 4-4.005a.75.75 0 111.061 1.061l-4 4.005 4 4a.75.75 0 01-1.061 1.061z"
        transform="translate(6.629 6.8)"
      ></Path>
    </Svg>
  );
}

export default CrossIcon;
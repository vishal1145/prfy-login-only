import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Pen = (props) => (
  <Svg
    width={17}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      opacity={0.4}
      d="M15.443 2.545 14.33 1.432a1.917 1.917 0 0 0-1.318-.557c-.469 0-.967.205-1.319.557L9.496 3.629l-.996.996-7.148 7.148L1 15.113a.67.67 0 0 0 .674.762h.088l3.34-.352 7.148-7.148.996-.996 2.197-2.197a1.857 1.857 0 0 0 0-2.637ZM4.457 14.175l-1.963.206.205-1.963 6.768-6.797.908-.908L12.162 6.5l-.908.908-6.797 6.768Zm9.99-9.99-1.289 1.319-1.787-1.787 1.319-1.29a.5.5 0 0 1 .322-.146.5.5 0 0 1 .322.147l1.113 1.113a.46.46 0 0 1 0 .645Z"
      fill="#696B74"
    />
  </Svg>
)

export default Pen;
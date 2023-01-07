import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const Electric = (props) => (
  <Svg
    width={17}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M4.28 13.992c-1.259-1.206-1.627-2.879-1.627-4.078 0-1.822 1.092-2.65 2.288-3.21V6.01C3.383 6.81.664 7.205.664 10.08c0 1.2.369 2.873 1.624 4.081 1.208 1.255 2.882 1.624 4.08 1.624.482 0 .894-.077 1.249-.213-1.086-.13-2.364-.564-3.337-1.58Z"
        fill="#CAC5EF"
      />
      <Path
        d="M16.788 1.288 16.376.91a1.321 1.321 0 0 0-1.846.043l-4.24 4.293a.378.378 0 0 1-.415.09.376.376 0 0 1-.253-.332c-.026-.359 0-.688.073-.923A1.703 1.703 0 0 0 9.48 2.58a1.776 1.776 0 0 0-1.354-.76c-.435-.024-1.066.162-1.54.747-.333.411-.569.92-.798 1.41-.199.432-.408.88-.61 1.077l-.01.01c-.286.285-.874.52-1.495.773-.78.316-1.667.67-2.377 1.285C.435 7.866 0 8.862 0 10.081c0 .84.176 2.965 1.82 4.548 1.583 1.64 3.708 1.82 4.548 1.82 1.219 0 2.212-.435 2.955-1.298.615-.711.97-1.598 1.285-2.378.25-.62.495-1.215.78-1.5.197-.203.645-.412 1.076-.611.492-.23 1-.465 1.412-.797.584-.475.77-1.106.747-1.541a1.767 1.767 0 0 0-.76-1.355 1.702 1.702 0 0 0-1.502-.215.665.665 0 0 0-.431.833c.11.349.485.541.833.432a.374.374 0 0 1 .342.043c.11.076.183.206.19.335 0 .003.01.226-.256.438-.282.23-.717.429-1.136.625-.568.262-1.102.51-1.47.89-.475.478-.76 1.185-1.06 1.932-.69 1.716-1.275 2.845-3.008 2.845-.67 0-2.367-.14-3.603-1.42l-.02-.02c-1.278-1.24-1.414-2.936-1.414-3.606 0-1.737 1.126-2.318 2.846-3.009.747-.302 1.454-.584 1.932-1.059.382-.368.628-.903.89-1.47.196-.42.395-.854.624-1.136.216-.266.438-.256.438-.256.127.007.26.08.336.19.07.099.083.215.043.341-.126.402-.173.893-.133 1.428.05.674.478 1.238 1.116 1.474.64.236 1.335.083 1.816-.402l4.24-4.3.412.38a.662.662 0 1 0 .9-.974Z"
        fill="#3444F1"
      />
      <Path
        d="M6.893 6.956a.665.665 0 0 0 0 .94L8.55 9.553a.662.662 0 0 0 .936 0 .665.665 0 0 0 0-.94L7.83 6.956a.661.661 0 0 0-.936 0Z"
        fill="#3444F1"
      />
      <Path
        d="M7.165 11.638a.662.662 0 0 1-.468-.196L5.04 9.785a.665.665 0 0 1 .94-.94l1.657 1.657a.665.665 0 0 1-.472 1.136ZM5.775 13.3a.665.665 0 0 0 0-.94l-1.658-1.656a.665.665 0 0 0-.94.94L4.835 13.3a.662.662 0 0 0 .94 0Z"
        fill="#FFB31F"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h17v17H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default Electric

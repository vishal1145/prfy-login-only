import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'

const Gradient = () => {
  return (
    <LinearGradient
    colors={["#4F4469", "#1E1832"]}
    style={{
        height:200,
        width: "100%",
        position: "absolute",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        zIndex:-2
      }}
  />
  )
}

export default Gradient
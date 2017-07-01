import React, { Component } from 'react'
import { View, Sphere } from 'react-vr'

class SphereObject extends Component {
  render() {
    return (
      <Sphere
      radius={0.5}
      widthSegments={20}
      heightSegments={12}
      style = {{
        color: '#fff'
      }}
      />
    )
  }
}

export default SphereObject

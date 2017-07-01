import React from 'react';
import { AppRegistry, asset, Pano, VideoPano, Text, View, Sphere, PointLight, Animated } from 'react-vr';

import SphereObject from './vr/components/SphereObject.js'

class TheSphere extends React.Component {
  componentDidMount() {
    Animated.createAnimatedComponent(this)
  }
  render() {
    return (
      <Sphere
      onEnter = {() => console.log(this.props.origin)}
      radius={0.5}
      widthSegments={20}
      heightSegments={12}
      lit = {true}
      style = {{
        color: '#3d3d3d',
        transform: [
          {
            translate: [this.props.origin, 0, -5]
          },
          {
            rotateY: this.props.currentRotation
          }
        ]
      }}
      />
    )
  }
}

export default class reactVRDemo extends React.Component {
  constructor() {
    super()
    this.state = {
      rotation: 130
    }
    this.lastUpdate = Date.now();

    this.rotate = this.rotate.bind(this);

  }

  //rotate function that will be called every frame through the requestAnimationFrame function, updating the rotation on a time measurement basis:
  rotate() {
    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;
    this.setState({
      rotation: this.state.rotation + delta / 10
    });
    this.frameHandle = requestAnimationFrame(this.rotate);

  }
  componentDidMount() {
    this.rotate()
  }
  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  render() {
    return (
      <View>
        <PointLight intensity = {5} decay = {2}/>
        <Sphere
      onEnter = {() => this.setState({
        currentlyRotating: true
      })}
      onExit = {() => this.setState({
        currentlyRotating: false
      })}
      radius={0.5}
      widthSegments={20}
      heightSegments={12}
      lit = {true}
      texture = 'http://i.imgur.com/zNBDyNj.png'
      style = {{
        color: '#3d3d3d',
        transform: [
          {
            translate: [0, 1, -2]
          },
          {
            rotateY: this.state.currentlyRotating ? this.state.rotation : 0
          },
          {
            rotateZ: this.state.currentlyRotating ? this.state.rotation : 0
          },
          {
            rotateX: this.state.currentlyRotating ? this.state.rotation : 0
          }
        ]
      }}
      />
<VideoPano source={{
        uri: ('../static_assets/space2.mp4')
      }}></VideoPano>
      </View>
      );
  }
}

AppRegistry.registerComponent('reactVRDemo', () => reactVRDemo);

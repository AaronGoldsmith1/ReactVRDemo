import React from 'react';
import { AppRegistry, asset, Pano, Text, View, Box, PointLight, Animated } from 'react-vr';

import BoxObject from './vr/components/BoxObject.js'

class TheBox extends React.Component {
  componentDidMount() {
    Animated.createAnimatedComponent(this)
  }
  render() {
    return (
      <Box
      onEnter = {() => console.log(this.props.origin)}
      dimWidth = {.2}
      dimHeight = {.2}
      dimDepth = {.2}
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
        <PointLight
      intensity = {5}
      decay = {2}
      />
        <Box
      onEnter = {() => this.setState({
        currentlyRotating: true
      })}
      onExit = {() => this.setState({
        currentlyRotating: false
      })}
      dimWidth = {.9}
      dimHeight = {.9}
      dimDepth = {.9}
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

      </View>
      );
  }
}

AppRegistry.registerComponent('reactVRDemo', () => reactVRDemo);

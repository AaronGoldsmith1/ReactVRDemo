import React from 'react';
import { AppRegistry, asset, Pano, VideoPano, Text, View, Sphere, PointLight, AmbientLight, Animated } from 'react-vr';


export default class reactVRDemo extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.rotation = new Animated.Value(0)
    this.lastUpdate = Date.now();
    this.rotate = this.rotate.bind(this);
  }

  //rotate function that will be called every frame through the requestAnimationFrame function,
  // updating the rotation on a time measurement basis:
  rotate() {
    const now = Date.now();
    // const delta = now - this.lastUpdate;
    // this.lastUpdate = now;
    // this.setState({
    //   rotation: this.state.rotation + delta / 10
    // });
    // this.frameHandle = requestAnimationFrame(this.rotate);

  }

  componentDidMount() {
    // this.rotate()
    // Animated.interpolate({
    //   inputRange: [],
    //   outputRange: []
    // }).start
    // Animated.createAnimatedComponent(Sphere)
    Animated.timing(
      this.state.rotation,
      {
        toValue: 90,
        duration: 2000
      }
    ).start();
  }

  // componentWillUnmount() {
  //   if (this.frameHandle) {
  //     cancelAnimationFrame(this.frameHandle);
  //     this.frameHandle = null;
  //   }

  //   Animated.createAnimatedComponent
  // }

  render() {
    return (
      <View>
        <AmbientLight intensity = {.5}/>
        { /*<PointLight intensity = {5} decay = {2}/>*/ }
        <Sphere
      onEnter = {() => this.setState({
        currentlyRotating: true
      })}
      onExit = {() => this.setState({
        currentlyRotating: false
      })}
      widthSegments={50}
      heightSegments={20}
      lit = {true}
      texture = 'http://i.imgur.com/zNBDyNj.png'
      style = {{
        transform: [{
          translate: [0, 0, -3]
        },
          {
            rotateY: this.state.rotation
          },
        ]
      }}
      />
        <VideoPano loop = {true} source={{
        uri: ('../static_assets/space.mp4')
      }}></VideoPano>
      </View>
      );
  }
}

AppRegistry.registerComponent('reactVRDemo', () => reactVRDemo);

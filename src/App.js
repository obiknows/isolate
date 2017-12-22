import React from 'react';
import { Text, View, TouchableOpacity, Vibration } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';

export class CameraExample extends React.Component {
  state = {
    hasCameraPermissision: null,  // dont ask for permissions
    type: Camera.Constants.Type.back, // use the back camera
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermissision: status === 'granted' });
  }

  snap = function() {
    if (this.camera) {
      this.camera.takePictureAsync().then(
        data => { console.log('ayy: ' + data.uri) }
      );
    }
  }

  render() {
    const { hasCameraPermissision } = this.state;
    if ( hasCameraPermissision === null ) {
      return <View />;
    } else if ( hasCameraPermissision === false ) {
      return <Text>No access to the camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera 
            style={{ flex: 1}}
            type={this.state.type}
            ref={ref => { this.camera = ref; }}
            >
            <View style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row'
            }}>
            <TouchableOpacity 
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center'
              }}
              
              onPress={() => {
                this.setState({
                  type: this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                });
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white'}}>
                {'  '}Flip{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'flex-start'
              }}
              
              onPress={this.snap.bind(this)}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white'}}>
                {' '}Snap{' '}
              </Text>
            </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }

  }
}


export default class App extends React.Component {
  render() {
    return (
      <CameraExample />
    );
  }
}



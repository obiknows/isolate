import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

export class CameraExample extends React.Component {
  state = {
    hasCameraPermissision: null,  // dont ask for permissions
    type: Camera.Constants.Type.back, // use the back camera
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermissision: status === 'granted' });
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
          <Camera  style={{ flex: 1}} type={this.state.type}>
            
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



import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Camera, CameraType } from 'expo-camera'

export default function App() {
  const [tipoCamera, setTipoCamera] = useState(Camera.Constants.Type.front)

  useEffect(() => {
    ( async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync()
    })();
  }, [])

  return (
    <View style={styles.container}>
      <Camera 
        type={tipoCamera}
        style={ styles.camera }  
        
        ratio={'16:9'}
      >
        <View style={ styles.viewFlip }>
          <TouchableOpacity style={ styles.btnFlip } onPress={ () => setTipoCamera( tipoCamera == CameraType.front ? CameraType.back : CameraType.front )}>
            <Text style={ styles.txtFlip }>Trocar</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera : {
    flex : 1,
    width : '100%',
    height : '80%'
  },
  viewFlip : {
    flex : 1,
    backgroundColor : 'transparent',
    flexDirection : 'row',
    alignItems : 'flex-end',
    justifyContent : 'center'
  },
  btnFlip : {
    padding : 15
  },
  txtFlip : {
    fontSize : 20,
    color : '#fff',
    marginBottom : 20
  }
});

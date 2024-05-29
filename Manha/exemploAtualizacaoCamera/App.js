import { useState, useEffect, useRef } from "react";

// import FontAwesome from '@expo/vector-icons'
import * as MediaLibrary from "expo-media-library";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from "react-native";

export default function App() {
  const cameraRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [capturePhoto, setCapturePhoto] = useState(null);

  const [camera, setCamera] = useState("front");
  const [permissionCamera, requestPermissionCamera] = useCameraPermissions();
  const [permissionGaleria, requestPermissionGaleria] =
    MediaLibrary.usePermissions();

  useEffect(() => {
    (async () => {
      // Verificando se há a permissão da camera na aplicacao
      if (!permissionCamera) {
        await requestPermissionCamera();
      }

      // Verificando se há a permissão de acesso a galeria
      if (MediaLibrary.PermissionStatus.DENIED) {
        await requestPermissionGaleria();
      }
    })();
  }, []);

  function toggleCameraType() {
    // setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    setCamera((current) => (current === "back" ? "front" : "back"));
  }

  async function takePhoto() {
    if (cameraRef) {
      const data = await cameraRef.current.takePictureAsync();
      setCapturePhoto(data.uri);
      setOpen(true);

      console.log(data);
    }
  }

  async function savePicture() {
    await MediaLibrary.createAssetAsync(capturePhoto)
      .then(() => {
        alert("salvo");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      {/* <Camera style={styles.camera} facing={type}> */}
      <CameraView style={styles.camera} facing={camera} ref={cameraRef}>
        <View style={styles.vwFlip}>
          <TouchableOpacity
            styles={styles.btnFlip}
            onPress={() => toggleCameraType()}
          >
            <Text style={{ fontSize: 22, marginBottom: 15, color: "#FFF" }}>
              Trocar
            </Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      <TouchableOpacity style={styles.btnCapture} onPress={ () => takePhoto() }>
          {/* <FontAwesome name="camera" size={23} color="#fff"/> */}
          <Text style={{ fontSize: 20, color: "#FFF" }}>
              Capturar
            </Text>
        </TouchableOpacity>
      {/* </Camera> */}

      {/* Mostrar modal com a imagem */}
      {capturePhoto && (
        <Modal animationType="slide" transparent={false} visible={open}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
            }}
          >
            <View style={{ margin: 10, flexDirection: "row" }}>
              <TouchableOpacity
                style={{ margin: 20 }}
                onPress={() => setOpen(false)}
              >
                {/* <FontAwesome name="window-close" size={50} color="#ff0000" /> */}
                <Text style={{ fontSize: 20, marginBottom: 15, color: "#ff0000" }}>
                  Fechar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ margin: 20 }}
                onPress={() => savePicture()}
              >
                {/* <FontAwesome name="upload" size={50} color="#121212" /> */}
                <Text style={{ fontSize: 20, marginBottom: 15, color: "#121212" }}>
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>

            <Image
              style={{ width: "100%", height: 500, borderRadius: 20 }}
              source={{ uri: capturePhoto }}
            />
          </View>
        </Modal>
      )}
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
  vwFlip : { 
    flex : 1,
    backgroundColor : 'transparent',
    flexDirection : 'row',
    alignItems : 'flex-end',
    justifyContent : 'center'
  },
  btnFlip : {
    position : 'absolute',
    bottom : 20,
    left : 20
  },
  btnCapture : { 
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#121212',
    margin : 20,
    padding : 20,
    borderRadius : 10
  }
});

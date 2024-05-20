import { useState, useEffect, useRef } from "react";
import { Modal, StyleSheet, Text } from "react-native";
import { FontAwesome, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'

import {
  CameraContent,
  ModalContent,
  ViewOptions,
  Options,
  CaptureView,
  CancelButton,
  LastPhoto
} from "./Style";
import { ButtonModal, ButtonSecondary } from "../Button/Style";
import { ButtonTitle, ButtonSecondaryTitle } from "../ButtonTitle/Style";

const CameraModal = ({ visible, setShowCameraModal, setUriCameraCapture, getMediaLibrary = false,...rest }) => {
  const cameraRef = useRef(null);
  const [capturePhoto, setCapturePhoto] = useState(null); // Salvar a foto capturada | selecionada da galeria
  const [typeCamera, setTypeCamera] = useState(CameraType.front); // Capturando o tipo da camera frontal/dianteira
  const [latestPhoto, setLatestPhoto] = useState(null) // Salva a ultima foto da galeria

  async function CapturePhoto(){
    if (cameraRef) {
      const data = await cameraRef.current.takePictureAsync();
      await setCapturePhoto(data.uri);
    }
  }

  async function SendFormPhoto(){
    await setUriCameraCapture( capturePhoto )

    handleClose()
  }

  function handleClose(){
    setShowCameraModal(false)
  }

  async function GetLastPhoto(){
    const { assets } = await MediaLibrary.getAssetsAsync({ sortBy : [[MediaLibrary.SortBy.creationTime, false]], first : 1 });

    if(assets.length > 0){
      setLatestPhoto( assets[0].uri )
    }
  }

  async function SelectImageGallery(){
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes : ImagePicker.MediaTypeOptions.Images,
      quality : 1
    });

    if( !result.canceled ){
      setCapturePhoto( result.assets[0].uri );
    }
  }

  useEffect(() => {
    setCapturePhoto(null)

    // Verificar se mostra a parte da galeria
    if(getMediaLibrary){
      GetLastPhoto();
    }
  }, [visible])

  return (
    <Modal {...rest} visible={visible}>
      <CameraContent>
        <ModalContent>
          {/* Caso a foto nao tenha sido confirmada */}
          {capturePhoto == null ? (
            <Camera
              style={styles.camera}
              ref={cameraRef}
              autoFocus={Camera.Constants.AutoFocus.on}
              type={typeCamera}
              ratio="16:9" // Proporção de aspecto da câmera
            >
              <ViewOptions>
                <Options onPress={() => SelectImageGallery()}>
                  {
                    latestPhoto != null
                      ? (
                        <LastPhoto
                          source={{ uri : latestPhoto }}
                        />
                      )
                      : <LastPhoto />
                  }
                </Options>

                <Options onPress={() => CapturePhoto()}>
                  <FontAwesome name="circle" size={70} color="#fbfbfb" />
                </Options>

                <Options
                  onPress={() =>
                    setTypeCamera(
                      typeCamera == CameraType.back
                        ? CameraType.front
                        : CameraType.back
                    )
                  }
                >
                  <MaterialCommunityIcons
                    name="camera-retake"
                    size={30}
                    color="white"
                  />
                </Options>
              </ViewOptions>
            </Camera>
          ) : (
            <>
            <CancelButton onPress={ () => handleClose() }>
              <AntDesign
                name="arrowleft"
                size={30}
                color="#34898F"
              />
            </CancelButton>

              <CaptureView source={{ uri: capturePhoto }} />

              <ButtonModal onPress={ () => SendFormPhoto() }>
                <ButtonTitle>Confirmar</ButtonTitle>
              </ButtonModal>

              <ButtonSecondary onPress={ () => setCapturePhoto(null) }>
                <ButtonSecondaryTitle>Refazer</ButtonSecondaryTitle>
              </ButtonSecondary>
            </>
          )}
        </ModalContent>
      </CameraContent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: "100%",
    height: 500,
    alignItems: "center",
    justifyContent: "flex-end",
  }
});

export default CameraModal;

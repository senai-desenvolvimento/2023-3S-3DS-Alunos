import { useState, useEffect, useRef } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { MapContainer } from "./Style";

import {
  requestForegroundPermissionsAsync, // Solicita a permissao de localizacao
  getCurrentPositionAsync, // captura a localizacao do usuario
} from "expo-location";

import MapView, {
  PROVIDER_GOOGLE,
  Marker, // Marcadores de endereço no mapa
} from "react-native-maps";

// Component para aplicar a rota dentro do mapa
import MapViewDirections from "react-native-maps-directions";

// Chave da api de comunicação com o Goggle maps
import { mapskey } from "../../utils/MapsKey";

// Capturando a posição inicial do usuário
const LocationAppointment = ({ latitude, longitude }) => {
  const mapReference = useRef(null);
  const [initialPosition, setInitialPosition] = useState(null);
  const [finalPosition, setFinalPosition] = useState({
    latitude: latitude,
    longitude: longitude,
  });

  // Primeiro passo, solicitar a permissao de localizacao
  async function requestLocation() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();

      await setInitialPosition(currentPosition);

      await SetMapReference();
    }
  }

  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    SetMapReference();
  }, [initialPosition]);

  async function SetMapReference() {
    if (mapReference.current && initialPosition != null) {
      // Ajustar a região do mapa para incluir os limites calculados
      await mapReference.current.fitToCoordinates(
        [
          {
            latitude: initialPosition.coords.latitude,
            longitude: initialPosition.coords.longitude,
          },
          {
            latitude: finalPosition.latitude,
            longitude: finalPosition.longitude,
          },
        ],
        {
          edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
          animated: true,
        }
      );
    }
  }

  return (
    <MapContainer>
      {initialPosition != null ? (
        <MapView
          ref={mapReference}
          initialRegion={{
            latitude: initialPosition.coords.latitude,
            longitude: initialPosition.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={grayMapStyle}
        >
          <Marker
            coordinate={{
              latitude: initialPosition.coords.latitude,
              longitude: initialPosition.coords.longitude,
            }}
            title={"Origem"}
            description={"Descrição da Origem"}
            pinColor={"blue"} // Cor do marcador (opcional)
          />

          <MapViewDirections
            origin={initialPosition.coords}
            destination={{
              latitude: finalPosition.latitude,
              longitude: finalPosition.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            strokeWidth={5}
            strokeColor="#496BBA"
            apikey={mapskey}
          />

          {/* Marcador para o destino */}
          <Marker
            coordinate={{
              latitude: finalPosition.latitude,
              longitude: finalPosition.longitude,
            }}
            title={"Destino"}
            description={"Descrição do Destino"}
            pinColor={"red"} // Cor do marcador (opcional)
          />
        </MapView>
      ) : (
        <ActivityIndicator color="#496BBA" />
      )}
    </MapContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: "100%",
  },
});

const grayMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#E1E0E7",
      },
    ],
  },
  {
    elementType: "geometry.fill",
    stylers: [
      {
        saturation: -5,
      },
      {
        lightness: -5,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#FBFBFB",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#33303E",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#66DA9F",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1B1B1B",
      },
    ],
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#C6C5CE",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#FBFBFB",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#ACABB7",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#8C8A97",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#8C8A97",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#8EA5D9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
];

export default LocationAppointment;

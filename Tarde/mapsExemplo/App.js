import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

import {
  requestForegroundPermissionsAsync, // Solicita a permissao de localizacao
  getCurrentPositionAsync // Captura a localizacao atual
} from 'expo-location'

import MapViewDirections from 'react-native-maps-directions'

import { mapskey } from './utils/mapsKey';

export default function App() {
  const [initialPosition, setInitialPosition] = useState(null)

  async function CapturarLocalizacao(){
    const { granted } = await requestForegroundPermissionsAsync()

    if( granted ){
      const currentPosition = await getCurrentPositionAsync()

      await setInitialPosition( currentPosition )

      console.log( initialPosition )
    }
  }

  useEffect(() => {
    CapturarLocalizacao()
  }, [10000])

  return (
    <View style={styles.container}>
      {
        initialPosition != null
        ? (
          <MapView 
            initialRegion={{
              latitude : initialPosition.coords.latitude,
              longitude : initialPosition.coords.longitude,
              latitudeDelta : 0.005,
              longitudeDelta : 0.005
            }}
            provider={PROVIDER_GOOGLE}
            style={ styles.map }
            customMapStyle={grayMapStyle}
          >
            {/* Criando um marcador no mapa */}
            <Marker 
              coordinate={{
                latitude : initialPosition.coords.latitude,
                longitude : initialPosition.coords.longitude
              }}
              title='Exemplo de local'
              description='Qualquer lugar no meu mapa'
              pinColor='blue'
            />

            <MapViewDirections
              origin={ 
                initialPosition.coords
              }

              destination={{
                latitude: -23.2447,
                longitude: -46.2640,
                latitudeDelta : 0.005,
                longitudeDelta : 0.005
              }}
              apikey={mapskey}

              strokeWidth={5}
              strokeColor='#496BBA'
            />

            {/* Criando um marcador no mapa */}
            <Marker 
              coordinate={{
                latitude: -23.2447,
                longitude: -46.2640,
              }}
              title='Outro local'
              description='Qualquer outro lugar no meu mapa'
              pinColor='red'
            />
          </MapView>
        ) : (
          <>
            <Text>Localização não encontrada</Text>

            <ActivityIndicator/>
          </>
        )
      }
      
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
  map : {
    flex : 1,
    width : '100%'
  }
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
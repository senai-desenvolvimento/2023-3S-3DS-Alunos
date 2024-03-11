import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

// Importando dependencia do mapa
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

import { 
  requestForegroundPermissionsAsync, // Solicita o acesso a localizacao
  getCurrentPositionAsync // Recebe a localizacao atual
} from 'expo-location'

import MapViewDirections from 'react-native-maps-directions'

import { mapskey } from './utils/mapsApiKey'

export default function App() {
  const [initialPosition, setInitialPosition] = useState(null)

  async function CapturarLocalizacao(){
    const { granted } = await requestForegroundPermissionsAsync()

    if ( granted ) {
      const captureLocation = await getCurrentPositionAsync()

      setInitialPosition( captureLocation )

      console.log( initialPosition )
    }
  }

  useEffect(() => {
    CapturarLocalizacao()
  }, [1000])

  return (
    <View style={styles.container}>
      {
        initialPosition != null 
        ? (
          <MapView 
            // marcar o ponto de inicio de visualizacao
            initialRegion={{
              latitude : initialPosition.coords.latitude,
              longitude : initialPosition.coords.longitude,
              latitudeDelta : 0.005,
              longitudeDelta : 0.005,
            }}
            provider={PROVIDER_GOOGLE}
            customMapStyle={ grayMapStyle }
            style={ styles.map }
          >
            <Marker
              coordinate={{ 
                latitude : initialPosition.coords.latitude,
                longitude : initialPosition.coords.longitude,
              }}
              title='Posição inicial'
              description='Estou aqui'
              pinColor={'blue'}
            />

            <MapViewDirections 
              origin={ initialPosition.coords }
              destination={{
                latitude : -23.5329,
                longitude : -46.7926,
                latitudeDelta : 0.005,
                longitudeDelta : 0.005,
              }}
              strokeWidth={5}
              strokeColor='#496BBA'
              apikey={mapskey}
            />

            <Marker
              coordinate={{ 
                latitude : -23.5329,
                longitude : -46.7926
              }}
              title='Destino'
              description='Preciso ir pra lá'
              pinColor={'red'}
            />
          </MapView>
        ) : (
          <>
            <Text>Localizacao nao encontrada</Text>

            <ActivityIndicator />
          </>
        )
      }
      
    </View>

    // npx create-expo-app nomeapp
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

import { StyleSheet, Text, View } from "react-native";

const Person = ({name, age}) => {
    return (
       <View style={styles.container}>
            <Text style={styles.text}>Nome: {name}</Text>
            <Text style={styles.text}>Idade: {age}</Text>
       </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#c1c1c1',
        padding:10,
        margin: 10,
        borderRadius:5
    },
    text : {
        fontFamily:'SingleDay_400Regular',
        fontSize:24
    }
})

export default Person; 
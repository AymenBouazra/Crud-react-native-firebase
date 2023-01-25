import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const HomeScreen = () => {
    const navigation = useNavigation()
    const handlePress = () => {
        navigation.navigate('Add Todo')
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handlePress} style={styles.button} >
                    <Text style={styles.buttonText}>Add Todo</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    button: {
        width: '30%',
        backgroundColor: '#ac3',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white'
    },
});

export default HomeScreen
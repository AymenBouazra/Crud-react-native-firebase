import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

const AddTodo = () => {
    return (
        <SafeAreaView style={styles.container}>

            <Text>Add to do </Text>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AddTodo
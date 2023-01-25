import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
const AddTodo = () => {
    const navigation = useNavigation()
    const [form, setForm] = useState({
        title: '',
        description: ''
    });
    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }
    const handlePress = async () => {
        await axios.post('http://10.0.2.2:3000/todos', form)
        navigation.navigate('Home')
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.formGroup}>
                <View style={styles.inputGroup}>
                    <Text style={styles.title}>Name:</Text>
                    <TextInput style={styles.input} value={form.title} onChangeText={(text) => handleChange('title', text)} placeholder='Task1' />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.title}>Description:</Text>
                    <TextInput style={styles.input} value={form.description} onChangeText={(text) => handleChange('description', text)} id='description' placeholder='Description' />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={styles.buttonText}> Create </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formGroup: {
        marginHorizontal: 30,
    },
    inputGroup: {
        paddingTop: 20
    },
    title: {
        marginVertical: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
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

export default AddTodo
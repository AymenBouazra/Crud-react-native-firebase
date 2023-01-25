import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const AddTodo = () => {
    const [form,setForm] = useState({
        title:'',
        description:''
    });
    const handleChange = (value) => {
        setForm({...form,[name]:value})
        console.log(form);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formGroup}>
                <View style={styles.inputGroup}>
                    <Text style={styles.title}>Name:</Text>
                    <TextInput style={styles.input} onChangeText={(text)=>handleChange(text)} name='title' placeholder='Task1' />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.title}>Description:</Text>
                    <TextInput style={styles.input} onChangeText={(text)=>handleChange(text)} name='description' placeholder='Description' />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}> Create </Text>
                    </TouchableOpacity>
                </View>
            </View>

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
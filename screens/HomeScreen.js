import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const HomeScreen = () => {
    const navigation = useNavigation()
    const [subscribed, setSubscribed] = useState(true)
    const [search, setSearch] = useState('')
    const [todos, setTodos] = useState([])
    const filteredTodos = todos.filter((todo) => todo.title.toLowerCase().includes(search))
    const getTodos = async () => {
        axios.get('http://10.0.2.2:3000/todos').then((response) => {
            subscribed && setTodos(response.data)
        }).catch((error) => console.log(error))
    }
    const handleDelete = async (id) => {
        Alert.alert('Delete', 'Are you sure you want to delete ? ',
            [{
                text: 'Cancel',
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: async () => {
                    await axios.delete('http://10.0.2.2:3000/todos/' + id)
                    getTodos()
                },
                style: 'default'
            }])
    }
    useEffect(() => {
        setSubscribed(true)
        getTodos()
        return () => setSubscribed(false)
    }, [search])
    const handlePress = () => {
        navigation.navigate('AddTodo')
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                <View style={styles.searchContainer}>
                    <TextInput placeholder='Search by title' style={styles.search} value={search} onChangeText={(text) => {
                        setSearch(text)
                    }} />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handlePress} style={styles.button} >
                        <Text style={styles.buttonText}>Add Todo</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardsContainer}>
                    {filteredTodos.length > 0 ? filteredTodos.map((todo) => {
                        return (
                            <View key={todo.id} style={styles.card} >
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>Title: </Text>
                                    {todo.title},
                                    <Text style={{ fontWeight: 'bold' }}>Description: </Text>
                                    {todo.description}
                                </Text>
                                <View style={{ alignItems: 'flex-end', width: '100%' }}>
                                    <TouchableOpacity
                                        style={{ backgroundColor: '#f74', padding: 4, borderRadius: 10 }}
                                        onPress={() => handleDelete(todo.id)}
                                    ><Text style={{ color: 'white' }}> Delete</Text></TouchableOpacity>
                                </View>
                            </View>
                        )
                    }) : <Text>No data available with {search}</Text>}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    search: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#efd',
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
    cardsContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        marginBottom: 16,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderColor: '#ccc',
        borderRadius: 10,
        borderWidth: 1,
        width: '90%',
    },
});

export default HomeScreen
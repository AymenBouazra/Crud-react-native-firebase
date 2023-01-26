import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Button, KeyboardAvoidingView, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const HomeScreen = () => {
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    const [subscribed, setSubscribed] = useState(true)
    const [search, setSearch] = useState('')
    const [todos, setTodos] = useState([])
    const [form, setForm] = useState({
        title: '',
        description: ''
    });
    const filteredTodos = todos.filter((todo) => todo.title.toLowerCase().includes(search))
    const getTodos = async () => {
        axios.get('http://10.0.2.2:3000/todos').then((response) => {
            subscribed && setTodos(response.data)
        }).catch((error) => console.log(error))
    }
    const showModal = (id) => {
        axios.get('http://10.0.2.2:3000/todos/' + id).then((response) => {
            setForm(response.data)
        }).catch((error) => console.log(error))
        setModalVisible(true)
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
    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }
    const handleUpdate = async (id) => {
        await axios.put('http://10.0.2.2:3000/todos/' + id, form)
        setModalVisible(false)
        getTodos()
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
                                        style={{ backgroundColor: '#EF5B0C', padding: 4, borderRadius: 10 }}
                                        onPress={() => handleDelete(todo.id)}
                                    ><Text style={{ color: 'white' }}><Icon name='delete' size={20} color='white' /></Text></TouchableOpacity>
                                    <Pressable
                                        style={styles.buttonUpdate}
                                        onPress={() => showModal(todo.id)}>
                                        <Text style={styles.textStyle}><Icon name='edit' size={20} color='white' /></Text>
                                    </Pressable>
                                </View>
                            </View>
                        )
                    }) : <Text>No data available with {search}</Text>}
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}

                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.closeButtonContainer}>
                                <Pressable
                                    style={styles.buttonClose}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>X</Text>
                                </Pressable>
                            </View>
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
                                    <TouchableOpacity style={styles.button} onPress={() => handleUpdate(form.id)}>
                                        <Text style={styles.buttonText}>Update</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
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
        backgroundColor: '#ffd',
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
        backgroundColor: '#3CCF4E',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonUpdate: {
        backgroundColor: '#3CCF4E',
        borderRadius: 10,
        paddingHorizontal: 4,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    closeButtonContainer: {
        alignItems: 'flex-end'
    },
    buttonClose: {
        backgroundColor: '#ccc',
        width: 20,
        borderRadius: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
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
});

export default HomeScreen
import React, {useState} from "react";
import {StyleSheet, View, Text, Button, FlatList,Image, TouchableOpacity, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

export default function Entretenimiento() {
    const [title, setTitle]= useState('');
    const [movieData, setMovieData]= useState(null);
    const [error, setError]= useState('');

    const API_KEY ='4cb6f12f'

    const buscador = () => {
        if (!title) return;

        axios  
            .get(`https://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`)
            .then((response)=>{
                if (response.data.Response === 'True') {
                    setMovieData(response.data);
                    setError('');
                } else {
                    setMovieData(null);
                    setError('Película no encontrada.');
                }
            })
            .catch( () =>{
                setMovieData(null)
                setError('Error al realizar la búsqueda.')
            });
    };

    return (
        <SafeAreaView style= {styles.container}>
            <Text style={styles.title}> Entretenimiento: Buscador de películas </Text>
            <TextInput 
                style={styles.input}
                placeholder="Ingrese el título"
                value={title}
                onChangeText={setTitle}
            />
            
            <Button title='Buscar' onPress={buscador} color={'#FF0364'}/>

            {error ? <Text style={styles.errorText}>{error}</Text>:null}

            {movieData && (
                <View style={styles.movie}>
                    <Image source={{uri: movieData.Poster}} style={styles.poster}/>
                    <Text style={styles.title}>{movieData.Title}</Text>
                    <Text style={styles.plot}>{movieData.Plot}</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex:1,
        padding: 20,
        backgroundColor: '#BCADB2'
    },
    title: {
        fontSize: 24, 
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderColor: '#65062A',
        borderWidth: 1, 
        marginBottom: 20,
        textAlign: 'center'
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 8,
    },
    movie: {
        alignItems: 'center',
        marginTop: 20,
    },
    poster: {
        width: 200,
        height: 300,
        marginBottom: 15, 
        borderRadius: 5, 
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    }, 
    plot: {
        fontSize:16, 
        textAlign: 'center',
        color: '#FF0364',
    },
})
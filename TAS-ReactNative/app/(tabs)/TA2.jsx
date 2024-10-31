import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text, Button, FlatList,Image, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const images = [
    {id: '1', uri:'https://www.solofondos.com/wp-content/uploads/2016/09/los-mejores-paisajes-del-mundo-para-fondo-de-pantalla-hd-1.jpg'},
    {id:'2', uri:'https://www.shuomingshu.cn/wp-content/uploads/images/2024/04/04/553bdb8a16d341e79eb794f3c699e1b6~noop_ked0ibvqodq.jpg'},
    {id:'3', uri:'https://th.bing.com/th/id/OIP.WjTU9ZAe_7AYomlV4H_JBwHaEU?rs=1&pid=ImgDetMain'},
];
export default function TA2() {
    const [imageIndex, setImageIndex] = useState(0);
    const ref = useRef(null);


    const nextImage =() =>{
        const nextIndex =((imageIndex + 1) % images.length);
        setImageIndex(nextIndex);
        ref.current?.scrollToIndex({animated: true, index: nextIndex});

    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.allImagesContainer}>
                <FlatList 
                    ref= {ref}
                    data={images}
                    horizontal
                    keyExtractor={(item)=> item.id}
                    renderItem={({item})=> (
                        <View style={styles.imageContainer}>
                            <Image source={{uri: item.uri}} style={styles.image} />
                            <Text style={styles.imageText}>{item.description}</Text>
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={styles.changingImageContainer}>
                <Image source={{uri: images[imageIndex].uri}} style={styles.image} />
                <Text style={styles.imageText}>{images[imageIndex].description}</Text>
                <TouchableOpacity onPress={nextImage} style={styles.button}>
                    <Text style={styles.buttonText}>Siguiente imagen</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    allImagesContainer: {
        marginBottom: 16,
    },
    imageContainer: {
        marginTop: 50,
        alignItems: 'center',
        marginRight: 16,
    },
    image: {
        width: 150,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    imageText: {
        fontSize: 16,
        marginTop: 8,
        textAlign: 'center',
        color: 'aqua',
    },
    changingImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


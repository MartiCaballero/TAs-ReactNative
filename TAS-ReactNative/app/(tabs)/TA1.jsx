import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Button, FlatList, TouchableOpacity} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TA1() {
    const [text, setText] = useState('');
    const [tasks, setTasks] = useState([]);
    const [count, setCount] = useState(0);

    const addTask = () => {
        if (text.trim() !== '') {
            setTasks([...tasks, {id: Date.now().toString(), text}]);
            setText('');
        }
    };
    
    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const increment = () => {
        setCount(count + 1);
    };
    const decrement = () => {
        setCount(count>0 ? count - 1 : 0);
    };


    return(
        <SafeAreaView style={styles.container}>
            <View style={{flex:1}}>
                <ThemedView style={styles.inputcontainer}>
                    <ThemedText style={styles.inputcontainer}>Buenas Noches 🫶 </ThemedText>
                </ThemedView>
                <ThemedView>
                    <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                    placeholder="Agregar tarea"
                    />
                    <TouchableOpacity onPress={addTask} style={styles.genericButton}>
                        <ThemedText>Agregar tarea</ThemedText>
                    </TouchableOpacity>
                </ThemedView>

                <ThemedView  style= {styles.listContainer}>
                    <FlatList
                        data={tasks}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <View style={styles.taskItem}>
                                <ThemedText>{item.text}</ThemedText>
                                <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
                                    <ThemedText style={styles.deleteText}>Borrar</ThemedText>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </ThemedView>

                <ThemedView style={styles.counterContainer}>
                    <ThemedText style={styles.counterText}>Tareas completas: {count}</ThemedText>
                    <View style={styles.counterButtons}>
                    <TouchableOpacity onPress={increment} style={styles.genericButton}>
                        <ThemedText>+</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={decrement} style={styles.genericButton}>
                        <ThemedText>-</ThemedText>
                    </TouchableOpacity>
                    </View>
                </ThemedView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 16,
    },
    inputcontainer: {
        marginTop: 16,
        marginBottom: 16,
        fontSize: 24,
    },
    input: {
        borderWidth: 1,
        padding: 8,
        borderRadius: 4,
        marginBottom: 16,
    },
    listContainer: {
        flex: 1,
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 1,
        
    },
    genericButton: {
        backgroundColor: 'purple',
        padding: 8,
        borderRadius: 4,
        marginBottom: 16,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 4,
    },
    deleteText: {
        color: 'white',
    },
    counterContainer: {
        fontSize: 18,
        marginBottom: 16,
    },
    counterText: {
        fontSize: 18,
        marginBottom: 16,
        alignContent: 'center',
    },
    counterButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        gap: 16,
    }
});
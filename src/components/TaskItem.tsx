import React, { useRef, useState, useEffect } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet, 
    TextInput
} from "react-native";

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import { EditTaskProps } from "../pages/Home";
import { Task } from './TasksList';
import editIcon from '../assets/icons/pen.png'

interface TaskItemProps {
    item: Task;
    index: number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (item : EditTaskProps) => void;
}

export function TaskItem({ item, index, toggleTaskDone, removeTask, editTask} : TaskItemProps) {
    const [isEditing, setEditing] = useState(false);
    const [title, setTitle] = useState(item.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setEditing(true);
    }

    function handleCancelEditing() {
        setTitle(item.title);
        setEditing(false);
    }

    function handleSubmitEditing () {
        editTask({ taskId: item.id , taskNewTItle: title})
        setEditing(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
          if (isEditing) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
      }, [isEditing])

    return (
        <>
        <View style={styles.textView}>
            <TouchableOpacity
            testID={`button-${index}`}
            activeOpacity={0.7}
            style={styles.taskButton}
            onPress={() => {toggleTaskDone(item.id)}}
            >
            <View 
                testID={`marker-${index}`}
                style={item.done === true ? styles.taskMarkerDone : styles.taskMarker}
            >
                { item.done && (
                <Icon 
                    name="check"
                    size={12}
                    color="#FFF"
                />
                )}
            </View>
            <TextInput
                value={title}
                onChangeText={setTitle}
                editable={isEditing}
                onSubmitEditing={handleSubmitEditing}
                style={ item.done ? styles.taskTextDone : styles.taskText}
                ref={textInputRef}
            />
            </TouchableOpacity>
        </View>
        <View
            style={styles.iconsView}
        >
            <View>
                { isEditing ? (
                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >
                        <Icon name="x" size={24} color="#b2b2b2"/>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleStartEditing}
                    >
                        <Image source={editIcon} style={styles.iconImage}/>
                    </TouchableOpacity>
                )
                }
            </View>
            <View
                style={ styles.iconsDivider }
            />
            <TouchableOpacity
                onPress={() => removeTask(item.id)}
                activeOpacity={isEditing ? 0 : 1}
                disabled={isEditing}
            >
                <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1}} />
            </TouchableOpacity>
        </View>


        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 3,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    textView: {
        maxWidth: '60%'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium',
    },
    iconImage: {
        width: 24,
        height: 24
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal: 14
    },
    iconsView: {
        flexDirection: "row",
        marginRight: 20
    }
  })
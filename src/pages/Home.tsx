import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTaskProps {
  taskId: number;
  taskNewTItle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundTask = tasks.find(task => task.title === newTaskTitle);
    if (foundTask) {
      Alert.alert('Você não pode cadastrar uma task com o mesmo nome');
    } else {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks([...tasks, data])
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({...task}));
    updatedTasks.find((task) => {
      if (task.id === id) {
        task.done = task.done === true ? false : true;
      }
    });
    setTasks(updatedTasks)
  }

  function handleEditTaks({ taskId, taskNewTItle} : EditTaskProps) {
    const updatedTasks = tasks.map(task => ({...task}));
    updatedTasks.find((task) => {
      if (task.id === taskId) {
        task.title = taskNewTItle;
      }
    })
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Sim', 
          onPress: () => setTasks(tasks.filter(task => task.id !== id))
        },
        {
          text: 'Não'
        },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTaks}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
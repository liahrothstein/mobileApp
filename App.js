import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableHighlight, ScrollView } from 'react-native';
import activeTodo from './assets/active.png';
import completeTodo from './assets/complete.png';
import deleteTodo from './assets/delete.png';

export default function App() {
  const [activeTodos, setActiveTodos] = useState(0);
  const [doneTodos, setDoneTodos] = useState(0);

  const [search, setSearch] = useState('');
  const [activeButton, setActiveButton] = useState(1);

  const [addTodo, setAddTodo] = useState('');
  const [data, setData] = useState([]);

  const pushTodo = (TodoName) => {
    setAddTodo('');
    setActiveTodos(activeTodos + 1);

    return (
      setData((todos) => todos.concat({ name: TodoName, status: 'active' }))
    );
  }

  const activeToComplete = (status, index, todoName) => {
    if (status === 'active') {
      setActiveTodos(activeTodos - 1);
      setDoneTodos(doneTodos + 1);
    }

    return (
      setData((todo) => (todo.slice(0, index).concat({ name: todoName, status: 'complete' }).concat(todo.slice(index + 1))))
    );
  }
  // console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerOfHeader}>Список дел</Text>
        <View style={styles.amount}>
          <View>
            <Text style={styles.amountText}>Ещё {activeTodos} {(activeTodos === 0) ? 'дел' : (activeTodos === 1) ? 'дело' : 'дел(-а)'}, которые нужно сделать, </Text>
          </View>
          <View>
            <Text style={styles.amountText}>{doneTodos} выполнено</Text>
          </View>
        </View>
      </View>
      {/* Header */}

      <View style={styles.filter}>
        <TextInput
          style={styles.filterInput}
          placeholder='Введите сюда для поиска'
          value={search}
          onChangeText={setSearch} />
        <View style={styles.filterButtons}>
          <Button
            title='Все'
            color={(activeButton === 1) ? '#17a2b8' : 'gray'}
            onPress={() => (setActiveButton(1))} />
          <Button
            title='Активные'
            color={(activeButton === 2) ? '#17a2b8' : 'gray'}
            onPress={() => (setActiveButton(2))} />
          <Button
            title='Выполненные'
            color={(activeButton === 3) ? '#17a2b8' : 'gray'}
            onPress={() => (setActiveButton(3))} />
        </View>
      </View>
      {/* Filter */}

      <ScrollView style={styles.todos}>
        {data.map((e, i) => (
          <View style={styles.todo} key={i}>
            <Text style={styles.todoName}>{e.name}</Text>
            <View style={styles.todoButtons}>
              <TouchableHighlight onPress={() => (activeToComplete(e.status, i, e.name))}>
                <Image source={(e.status === 'active') ? activeTodo : completeTodo} />
              </TouchableHighlight>
              <TouchableHighlight onPress={() => (setData((todo) => (todo.slice(0, i).concat(todo.slice(i + 1)))))} style={styles.deleteButton}>
                <Image source={deleteTodo} />
              </TouchableHighlight>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* Todos */}

      <View style={styles.addTodo}>
        <TextInput
          style={styles.addTodoInput}
          placeholder='Что нужно сделать?'
          value={addTodo}
          onChangeText={setAddTodo} />
        <Button
          title='Добавить задачу'
          onPress={() => (pushTodo(addTodo))}
          color={(addTodo !== '') ? '#17a2b8' : 'gray'}
          disabled={(addTodo === '') ? true : false} />
      </View>
      {/* AddTodo */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: 50,
  },
  amountText: {
    fontSize: 22,
    fontWeight: 500
  },
  amount: {
    width: '45%'
  },
  headerOfHeader: {
    fontWeight: 'bold',
    fontSize: 26,
    width: '45%'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  filterInput: {
    width: '45%',
    borderColor: 'grey',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    fontSize: 16,
    height: 40
  },
  filterButtons: {
    width: '45%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  filter: {
    marginTop: 20,
    marginBottom: 8,
    width: '100%',
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  addTodo: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    marginBottom: '20%'
  },
  addTodoInput: {
    width: '45%',
    paddingLeft: 15,
    marginRight: '10%',
    fontSize: 16,
    borderRadius: 5,
    borderColor: 'grey',
    borderStyle: 'solid',
    borderWidth: 1
  },
  todos: {
    marginTop: 10,
    height: '55%',
    width: '100%',
    // overflow: 'scroll'
  },
  todo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: '1%',
    marginTop: 20
  },
  todoButtons: {
    display: 'flex',
    flexDirection: 'row'
  },
  todoName: {
    fontWeight: 500,
    fontSize: 20
  },
  deleteButton: {
    marginLeft: 5
  }
});

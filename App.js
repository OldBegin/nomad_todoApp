import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import Todo from './Todo';
import uuidv1 from 'uuid/v1';
import AsyncStorage from '@react-native-community/async-storage';

const {width} = Dimensions.get('window');

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: '',
      loadedTodos: false,
      toDos: {},
    };
  }
  componentDidMount = () => {
    console.log(
      'componentDidMount was called and state is: ',
      this.state.loadedTodos,
    );
    this._loadTodos();
  };

  render() {
    const {newTodo, loadedTodos, toDos} = this.state;
    console.log('App start running', this.state);
    if (!loadedTodos) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loding........</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Todo App</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={'New To Do'}
            value={newTodo}
            onChangeText={this._setNewTodo}
            returnKeyType={'done'}
            autoCorrect={false}
            onSubmitEditing={this._addTodo}
          />
          <ScrollView style={styles.scrollView}>
            {Object.values(toDos)
              .reverse()
              .map(todo => (
                <Todo
                  key={todo.id}
                  {...todo}
                  onDeleteTodo={this._deleteTodo}
                  onChangeComplete={this._changeComplete}
                  onChangeUncomplete={this._changeUncomplete}
                  onTodoUpdate={this._todoUpdate}
                />
              ))}
          </ScrollView>
        </View>
      </View>
    );
  }
  // Store data: state 의 toDos 오브젝트를 스트링으로 형변환하여 디스크에 저장 //
  _saveTodos = async newTodos => {
    console.log('async _saveTodos() was called');
    try {
      console.log('saveTodos: ', this.state.loadedTodos);
      await AsyncStorage.setItem('toDos', JSON.stringify(newTodos));
    } catch (e) {
      console.log(e);
    }
  };

  // Read data: 디스크에 저장된 스트링형태의 toDos를 오브젝트로 파싱하여 setState
  _loadTodos = async () => {
    console.log('async _loadTodos() was called');
    try {
      const value = await AsyncStorage.getItem('toDos');
      if (value !== null) {
        console.log('getting data from async Storage');
        const parsedTodos = JSON.parse(value);
        this.setState({loadedTodos: true, toDos: parsedTodos});
      }
      this.setState({loadedTodos: true});
    } catch (err) {
      console.log(err);
    }
  };

  _todoUpdate = (id, updatedText) => {
    console.log('_todoUpdate() was called');
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            text: updatedText,
          },
        },
      };
      this._saveTodos(newState.toDos);
      return {...newState};
    });
  };
  _changeUncomplete = id => {
    console.log('here is Uncomplete', id);
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false,
          },
        },
      };
      this._saveTodos(newState.todos);
      return {...newState};
    });
  };
  _changeComplete = id => {
    console.log('here is Complete');
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true,
          },
        },
      };
      this._saveTodos(newState.toDos);
      return {...newState};
    });
  };
  _setNewTodo = text => {
    this.setState({newTodo: text});
  };
  _deleteTodo = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos,
      };
      this._saveTodos(newState.toDos);
      return {
        ...newState,
      };
    });
  };
  _addTodo = () => {
    const {newTodo} = this.state;
    if (newTodo !== '') {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newTodo,
            createdAt: Date.now(),
          },
        };
        const newState = {
          ...prevState,
          newTodo: '',
          toDos: {
            ...prevState.toDos,
            ...newToDoObject,
          },
        };
        this._saveTodos(newState.toDos);
        return {...newState};
      });
    }
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f23657',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 72,
    fontWeight: '400',
    color: 'red',
  },
  title: {
    fontSize: 36,
    marginTop: 50,
    fontWeight: '200',
    color: 'white',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'white',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderColor: '#000000',
    width: width - 25,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowOffset: {
          width: 1,
          height: -1,
        },
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  input: {
    paddingLeft: 20,
    fontSize: 24,
    height: 60,

    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
  },
  scrollView: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
export default App;

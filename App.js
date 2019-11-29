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
    this._loadTodos();
  };

  render() {
    const {newTodo, loadedTodos, toDos} = this.state;
    console.log('todos in App:', toDos);
    if (!loadedTodos) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loding....</Text>
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
            {Object.values(toDos).map(todo => (
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
  _todoUpdate = (id, updatedText) => {
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
      return {...newState};
    });
  };
  _setNewTodo = text => {
    console.log('state: ', this.state.newTodo);
    this.setState({newTodo: text});
  };
  _loadTodos = () => {
    this.setState({loadedTodos: true});
  };
  _deleteTodo = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos,
      };
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

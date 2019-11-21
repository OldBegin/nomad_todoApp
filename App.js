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
const {height, width} = Dimensions.get('window');

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: '',
    };
  }

  render() {
    const {newTodo} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="Light-content" />
        <Text style={styles.title}>Todo App</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={'New To Do'}
            value={newTodo}
            onChangeText={this._controlNewTodo}
            returnKeyType={'done'}
            autoCorrect={false}
          />
          <ScrollView />
        </View>
      </View>
    );
  }
  _controlNewTodo = text => {
    console.log('state: ', this.state.newTodo);
    this.setState({newTodo: text});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f23657',
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
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
    fontSize: 24,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
  },
});
export default App;

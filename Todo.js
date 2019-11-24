import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';

const {width, height} = Dimensions.get('window');

class Todo extends Component {
  state = {
    isEditing: false,
    isCompleted: false,
    todoValue: '',
  };
  render() {
    const {isCompleted, isEditing, todoValue} = this.state;
    const {text} = this.props;
    console.log('state:', this.state);
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._onToggleComplete}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.unCompletedCircle,
              ]}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              onChangeText={this._onInputTodoText}
              style={[
                styles.input,
                styles.text,
                isCompleted ? styles.completedText : styles.unCompletedText,
              ]}
              multiline={true}
              value={todoValue}
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.unCompletedText,
              ]}>
              {text}
            </Text>
          )}
        </View>
        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPress={this._onFinishEditing}>
              <View style={styles.actionContainer}>
                <Text>✅</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPress={this._onStartEditing}>
              <View style={styles.actionContainer}>
                <Text>✏️</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.actionContainer}>
                <Text>❌</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
  _onToggleComplete = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted,
      };
    });
  };
  _onStartEditing = () => {
    this.setState({isEditing: true});
  };
  _onFinishEditing = () => {
    this.setState({isEditing: false});
  };
  _onInputTodoText = text => {
    this.setState({todoValue: text});
  };
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width - 30,
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 24,
    marginVertical: 20,
    marginLeft: 10,
  },
  completedText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  unCompletedText: {
    color: '#000000',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 3,
  },
  completedCircle: {
    borderColor: '#bbb',
  },
  unCompletedCircle: {
    borderColor: 'red',
  },
  column: {
    flexDirection: 'row',
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  input: {
    width: width / 2,
  },
});
export default Todo;

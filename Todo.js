import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

const {width} = Dimensions.get('window');

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      todoValue: props.text,
    };
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  };

  render() {
    console.log('state:', this.state);
    const {isCompleted, isEditing, todoValue} = this.state;
    const {text} = this.props;

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
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText : styles.unCompletedText,
              ]}
              multiline={true}
              value={todoValue}
              onChangeText={this._onInputTodoText}
              onBlur={this._onFinishEditing}
              returnKeyType={'done'}
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
    marginVertical: 10,
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
  },
  actions: {
    flexDirection: 'row',
  },
  actionContainer: {
    marginVertical: 30,
    marginHorizontal: 10,
  },
  input: {
    width: width / 2,
    paddingLeft: 5,
  },
});
export default Todo;

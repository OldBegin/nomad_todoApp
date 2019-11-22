import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

class Todo extends Component {
  state = {
    isEditing: false,
    isCompleted: false,
  };
  render() {
    const {isCompleted} = this.state;
    console.log('state:', isCompleted);
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
          <Text
            style={[
              styles.text,
              isCompleted ? styles.completedText : styles.unCompletedText,
            ]}>
            first todo
          </Text>
        </View>
        <View style={styles.column}>
          <View style={styles.actionContainer}>
            <TouchableOpacity>
              <Text style={styles.actionText}>✏️</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity>
              <Text style={styles.actionText}>❌</Text>
            </TouchableOpacity>
          </View>
        </View>
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
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width - 30,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#bbb',
    alignItems: 'center',
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
});
export default Todo;

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
    isEdit: '',
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.circle} />
        </TouchableOpacity>
        <Text style={styles.text}>first todo</Text>
      </View>
    );
  }
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
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 3,
    borderColor: 'red',
  },
});
export default Todo;

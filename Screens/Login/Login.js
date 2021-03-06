import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  Image
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateEmail, updatePassword, login, getUser } from '../../redux/actions/user'
import Firebase from '../../config/Firebase'


class Login extends React.Component {
  componentDidMount = () => {
    Firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.props.getUser(user.uid)
            if (this.props.user != null) {
                this.props.navigation.navigate('TabNavigator')
            }
        }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
              style={ {
                width: 250,
                borderRadius: 10,
                height: 180,
                padding: 20,
                marginLeft: 10,
                marginRight: 15,
                marginTop: 10,
                marginBottom: 20}}
              source={{
                uri: 'https://i.ibb.co/S7bDKPM/Screen-Shot-2020-09-09-at-9-30-54-PM.png',
              }}
            />
        <TextInput
          style={styles.inputBox}
          value={this.props.user.email}
          onChangeText={(email) => this.props.updateEmail(email)}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputBox}
          value={this.props.user.password}
          onChangeText={(password) => this.props.updatePassword(password)}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.props.login()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Button
          title="Sign up"
          onPress={() => this.props.navigation.navigate("Signup")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "tomato",
    borderColor: "tomato",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonSignup: {
    fontSize: 12,
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateEmail, updatePassword, login, getUser }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import * as React from "react";
import {
  Text,
  View,
  requireNativeComponent,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as barberActions from "../redux/actions/barbers";

const actions = {
  ...barberActions,
};


class BarbersScreen extends React.Component {

  componentDidMount() {
    this.props.actions.fetchBarbers();
  } 

  render() {
    const Barber = this.props.barbers.data.map((barber) => (
      <Marker
          coordinate={{
            latitude: barber.latitude,
            longitude: barber.longlitude,
            
          }}
        >
          <Callout
          onPress={() =>
            this.props.navigation.navigate("ServicesScreen", {
              otherParam: barber,
            })
          }>
            <Button
              title={barber.name}
            />
          </Callout>
        </Marker>
    ));
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 40.736527,
          longitude: -73.920816,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
       {Barber}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});     

const mapStateToProps = (state) => {
  return {
    user: state.user,
    barbers: state.barbers,
  };
};

export default connect(mapStateToProps, mapDispatchToProps,
  )(BarbersScreen);

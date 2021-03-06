import * as React from "react";
import { Text, View, Button, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { connect } from "react-redux";
import { material } from 'react-native-typography';
import { List } from 'react-native-paper';



class BarberCard extends React.Component {
  state = {
    date: null,
    time: null,
    Expanded: false
	};

  submitButton = () => {
    if (this.state.time !== null) {
      return (
      <>
      <Button style={{fontSize: 150}} title="Book Now" onPress={this.postAppointment}></Button>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={material.caption}>{this.state.date}</Text>
      <Text style={material.caption}>{this.state.time}</Text>
      </View>
      </>
     );
    }
  };

  handlePress = () => this.setState({
    Expanded: true
  })
  
  setTime = (time)=> {
    this.setState({
      time: time
    })
  }

  postAppointment = () => {
    fetch("http://localhost:3000/appointments", {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        date: this.state.date,
        time: this.state.time,
        barber_id: this.props.route.params.otherParam.id,
        user_id: this.props.user.uid,
      }),
    }).then(resp => resp.json())
    .then(appt=>this.postCart(appt.id))
  };


  postCart = (id) => {
    fetch("http://localhost:3000/carts", {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        service_id: this.props.route.params.servicesParam.id,
        user_id: this.props.user.uid,
        appointment_id: id
      }),
    })
    .then(() => this.props.navigation.navigate("ConfirmationScreen"))
  }

  timeAccordion=()=>{
    if (this.state.date !== null) {
      return (
        <>
        <Text style={material.caption}>Available Times For:</Text><List.Section title={this.state.date}>
      <List.Accordion
        theme={{ colors: { primary: 'tomato' }}}
        title="Morning"
        left={props => <List.Icon {...props} icon="weather-sunny" />}>
        <List.Item title="9:00 AM" onPress={()=>this.setTime('9:00 AM')}/>
        <List.Item title="10:00 AM" onPress={()=>this.setTime('10:00 AM')}/>
        <List.Item title="11:00 AM" onPress={()=>this.setTime('11:00 AM')}/>
      </List.Accordion>
      <List.Accordion
        theme={{ colors: { primary: 'tomato' }}}
        title="Afternoon"
        left={props => <List.Icon {...props} icon="weather-hazy" />}
        expanded={this.state.expanded}
        onPress={this.handlePress}>
        <List.Item title="12:00 PM" onPress={()=>this.setTime('12:00 PM')}/>
        <List.Item title="1:00 PM" onPress={()=>this.setTime('1:00 PM')}/>
        <List.Item title="2:00 PM" onPress={()=>this.setTime('2:00 PM')}/>
        <List.Item title="3:00 PM" onPress={()=>this.setTime('3:00 PM')}/>
        <List.Item title="4:00 PM" onPress={()=>this.setTime('4:00 PM')}/>
      </List.Accordion>
      <List.Accordion
        theme={{ colors: { primary: 'tomato' }}}
        title="Evening"
        left={props => <List.Icon {...props} icon="weather-night" />}
        expanded={this.state.expanded}
        onPress={this.handlePress}>
        <List.Item title="5:00 PM" onPress={()=>this.setTime('5:00 PM')}/>
        <List.Item title="6:00 PM" onPress={()=>this.setTime('6:00 PM')}/>
        <List.Item title="7:00 PM" onPress={()=>this.setTime('7:00 PM')}/>
      </List.Accordion>
    </List.Section>
        </>)
    }
  }
  
  render() {
    return (
      <>
       <View
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Text style={material.headline}>{this.props.route.params.otherParam.name}</Text>
        </View>
        <ScrollView>
          <Text style={material.caption}>Pick a Date</Text>
        <Calendar
           theme={{
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: 'tomato',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'tomato',
            disabledArrowColor: '#d9e1e8',
            indicatorColor: 'tomato',
          }}
          minDate={Date()}
          onDayPress={(day) => {
            this.setState({
              date: day.dateString,
            });
          }}
        />
        
        {this.timeAccordion()}
        </ScrollView>
        {this.submitButton()}

      </>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(BarberCard);

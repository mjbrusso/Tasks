import React, { Component } from "react"
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  TextInput,
  DatePickerIOS,
  DatePickerAndroid,
  TouchableWithoutFeedback,
  Alert,
  Platform
} from "react-native"
import moment from "moment"
import CommonStyles from "../CommonStyles"

const initialState = {
  description: "",
  date: new Date()
}

export default class AddTask extends Component {
  state = { ...initialState }

  save = () => {
    if (!this.state.description)
      Alert.alert("Atenção", "Informe uma descrição!")
    else {
      const data = { ...this.state }
      this.props.onSave(data)
      this.setState({ ...initialState })
    }
  }

  handleDateAndroidChange = () => {
    DatePickerAndroid.open({ date: this.state.date }).then(e => {
      if (e.action !== DatePickerAndroid.dismissedAction)
        this.setState({ date: new Date(e.year, e.month, e.day) })
    })
  }

  render() {
    const datePicker =
      Platform.OS === "ios" ? (
        <DatePickerIOS
          mode="date"
          date={this.state.date}
          onDateChange={date => this.setState({ date })}
        />
      ) : (
        <TouchableOpacity onPress={this.handleDateAndroidChange}>
          <Text style={styles.date}>
            {moment(this.state.date).format("dddd, D [de] MMMM [de] Y")}
          </Text>
        </TouchableOpacity>
      )

    return (
      <Modal
        onRequestClose={this.props.onCancel}
        visible={this.props.isVisible}
        animationType="slide"
        transparent={true}>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.offset} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Nova Tarefa</Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            onChangeText={description => this.setState({ description })}
            value={this.state.description}
          />
          {datePicker}
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.offset} />
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "space-between"
  },
  offset: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: CommonStyles.colors.default
  },
  header: {
    fontFamily: CommonStyles.fontFamily,
    backgroundColor: CommonStyles.colors.default,
    color: CommonStyles.colors.secondary,
    textAlign: "center",
    padding: 15,
    fontSize: 15
  },
  input: {
    fontFamily: CommonStyles.fontFamily,
    width: "90%",
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 6
  },
  date: {
    fontFamily: CommonStyles.fontFamily,
    fontSize: 15,
    marginLeft: 10,
    marginTop: 10,
    textAlign: "center"
  }
})

import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Platform
} from "react-native"
import moment from "moment"
import "moment/locale/pt-br"
import CommonStyles from "../CommonStyles"
import Task from "../components/Task"
import Icon from "react-native-vector-icons/FontAwesome"
import ActionButton from "react-native-action-button"
import AddTask from "../screens/AddTask"
import AsyncStorage from "@react-native-community/async-storage"

export default class Agenda extends Component {
  state = {
    tasks: [],
    visibleTasks: [],
    isDoneTasksVisible: true,
    isAddTaskVisible: false
  }

  addTask = task => {
    const tasks = [
      ...this.state.tasks,
      {
        id: Math.random(),
        description: task.description,
        estimatedDate: task.date,
        doneOn: null
      }
    ]
    this.setState({ tasks, isAddTaskVisible: false }, this.filterTasks)
  }

  deleteTask = id => {
    const tasks = this.state.tasks.filter(task => task.id != id)
    this.setState({ tasks }, this.filterTasks)
  }

  toogleTask = id => {
    const tasks = this.state.tasks.map(task => {
      if (task.id === id) {
        task = { ...task }
        task.doneOn = task.doneOn ? null : new Date()
      }
      return task
    })
    this.setState({ tasks }, this.filterTasks)
  }

  filterTasks = () => {
    const visibleTasks = this.state.isDoneTasksVisible
      ? [...this.state.tasks]
      : this.state.tasks.filter(task => task.doneOn === null)
    this.setState({ visibleTasks })
    AsyncStorage.setItem("task", JSON.stringify(this.state.tasks))
  }

  toogleFilter = () => {
    this.setState(
      { isDoneTasksVisible: !this.state.isDoneTasksVisible },
      this.filterTasks
    )
  }

  componentDidMount = async () => {
    const data = await AsyncStorage.getItem("tasks")
    const tasks = JSON.parse(data) || []
    this.setState({ tasks }, this.filterTasks)
  }

  render() {
    return (
      <View style={styles.container}>
        <AddTask
          isVisible={this.state.isAddTaskVisible}
          onSave={this.addTask}
          onCancel={() => this.setState({ isAddTaskVisible: false })}
        />
        <ImageBackground
          source={require("../../assets/imgs/today.jpg")}
          style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toogleFilter}>
              <Icon
                name={this.state.isDoneTasksVisible ? "eye" : "eye-slash"}
                size={20}
                color={CommonStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>
              {moment()
                .locale("pt-br")
                .format("ddd, D [de] MMMM")}
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.taskContainer}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => (
              <Task
                {...item}
                onToogleTask={this.toogleTask}
                onDelete={this.deleteTask}
              />
            )}
          />
        </View>
        <ActionButton
          buttonColor={CommonStyles.colors.today}
          onPress={() => this.setState({ isAddTaskVisible: true })}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 3 },
  titleBar: { flex: 1, justifyContent: "flex-end" },
  title: {
    fontFamily: CommonStyles.fontFamily,
    color: CommonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 10
  },
  subtitle: {
    fontFamily: CommonStyles.fontFamily,
    color: CommonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 10
  },
  taskContainer: { flex: 7 },
  iconBar: {
    marginTop: Platform.OS === "ios" ? 30 : 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
})

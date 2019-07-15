import React from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import moment from "moment"
import "moment/locale/pt-br"
import Swipeable from "react-native-swipeable"
import CommonStyles from "../CommonStyles"

export default props => {
  const check =
    props.doneOn !== null ? (
      <View style={styles.done}>
        <Icon name="check" size={20} style={CommonStyles.colors.secondary} />
      </View>
    ) : (
      <View style={styles.pending} />
    )

  const deskStyle =
    props.doneOn !== null ? { textDecorationLine: "line-through" } : {}

  const leftContent = (
    <View style={styles.exclude}>
      <Icon name="trash" size={20} color="#FFFFFF" />
      <Text style={styles.excludeText}>Excluir</Text>
    </View>
  )

  const rightContent = [
    <TouchableOpacity
      style={[styles.exclude, { justifyContent: "flex-start", padding: 20 }]}
      onPress={() => props.onDelete(props.id)}>
      <Icon name="trash" size={30} color="#FFFFFF" />
    </TouchableOpacity>
  ]

  return (
    <Swipeable
      leftActionActivationDistance={200}
      onLeftActionActivate={() => props.onDelete(props.id)}
      leftContent={leftContent}
      rightButtons={rightContent}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.onToogleTask(props.id)}>
          <View style={styles.checkContainer}>{check}</View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={[styles.description, deskStyle]}>
            {props.description}
          </Text>
          <Text style={styles.date}>
            {moment(props.estimatedDate)
              .locale("pt-br")
              .format("dddd, D [de] MMMM [de] Y")}
          </Text>
        </View>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#AAA"
  },
  checkContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%"
  },
  done: {
    height: 25,
    width: 25,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#4D7031",
    alignItems: "center",
    justifyContent: "center"
  },
  pending: {
    height: 25,
    width: 25,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#555"
  },
  description: {
    fontFamily: CommonStyles.fontFamily,
    color: CommonStyles.colors.mainText,
    fontSize: 15
  },
  date: {
    fontFamily: CommonStyles.fontFamily,
    color: CommonStyles.colors.subText,
    fontSize: 12
  },
  exclude: {
    flex: 1,
    backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  excludeText: {
    fontFamily: CommonStyles.fontFamily,
    color: "#FFF",
    fontSize: 20,
    margin: 10
  }
})

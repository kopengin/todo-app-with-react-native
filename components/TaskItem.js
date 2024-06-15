import React from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Icon } from "react-native-elements";

const TaskItem = ( {item, handleEdit, handleDelete} ) => {
  return (
    <ThemedView style={styles.task}>
      <ThemedText style={[styles.taskText, { userSelect: "text" }]}>{item.text}</ThemedText>
      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleEdit(item.id, item.text)}>
          <Icon name="edit" color="teal">
            編集
          </Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Icon name="delete" color="coral">
            削除
          </Icon>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "silver",
  },
  taskText: {
    maxWidth: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});

export default TaskItem;

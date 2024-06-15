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

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { Icon } from "react-native-elements";

import TaskItem from "../../components/TaskItem";

export default function HomeScreen() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([] as { id: string; text: string }[]);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const handleSaveTask = () => {
    if (!taskText.trim()) return;

    if (isEditing) {
      setTasks(tasks.map((task) => (task.id === isEditing ? { ...task, text: taskText } : task)));
      setIsEditing(null);
    } else {
      const newTask = { id: Date.now().toString(), text: taskText };
      setTasks([...tasks, newTask]);
    }

    setTaskText("");
  };
  const handleEdit = (id: string, text: string) => {
    setTaskText(text);
    setIsEditing(id);
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const renderTask: ListRenderItem<{ id: string; text: string }> = ({ item }) => {
    return <TaskItem item={item} handleEdit={handleEdit} handleDelete={handleDelete}/>;
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.title, { userSelect: "text" }]}>Todoアプリ</ThemedText>
      <TextInput
        placeholder="タスクを入力"
        style={styles.input}
        onChangeText={setTaskText}
        value={taskText}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
        <ThemedText style={[styles.saveButtonText, { userSelect: "text" }]}>
          {isEditing ? "編集" : "追加"}
        </ThemedText>
      </TouchableOpacity>
      <FlatList data={tasks} renderItem={renderTask} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderColor: "ffffff",
    backgroundColor: "gray",
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  saveButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
  },
  saveButtonText: {
    textAlign: "center",
  },
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

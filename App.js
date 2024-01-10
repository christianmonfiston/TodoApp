import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const renderItem = ({ item }) => (
    <Item title={item.title} onDelete={() => onDeleteTask(item.id)} />
  );

  const Item = ({ title, onDelete }) => (
    <View style={styles.renderedList}>
      <View style={styles.textHolder}>
        <Text style={{ color: "white" }}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <View style={styles.deleteButton}>
          <Text style={{ fontSize: 15, color: "white" }}>X</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const onChangeText = (inputText) => {
    setText(inputText);
  };

  const onPressAdd = () => {
    if (text.trim() !== "") {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now().toString(), title: text },
      ]);
      setText("");
    }
  };

  const onDeleteTask = (taskId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== taskId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>Todo</Text>
        </View>
        <View style={styles.topContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Add your goal here"
              value={text}
              onChangeText={onChangeText}
            />
          </View>
          <TouchableOpacity onPress={onPressAdd}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Add</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: "#FFB700",
    width: 60,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  renderedList: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: "light",
    color: "#ff3646",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  inputContainer: {
    width: 250,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#ff3646",
    borderRadius: 9,
    width: 100,
    height: 50,
    paddingHorizontal: 10,
    marginLeft: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  textHolder: {
    backgroundColor: "#0082FF",
    borderRadius: 10,
    width: 250,
    height: 50,
    marginLeft: -19,
    justifyContent: "center",
    marginVertical: 10,
    alignItems: "center",
    margin: 10,
    marginHorizontal: 10,
  },
});

import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import Card from "../components/Card";

const StartGameScreen = props => {
	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Start a New Game</Text>
			<Card style={styles.inputContain}>
				<Text>Select a Number</Text>
				<TextInput />
				<View style={styles.buttonContain}>
					<View style={styles.button}>
						<Button title="Reset" onPress={() => {}} color="red" />
					</View>
					<View style={styles.button}>
						<Button title="Confirm" onPress={() => {}} />
					</View>
				</View>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center"
	},
	buttonContain: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		paddingHorizontal: 15
	},
	title: {
		fontSize: 20,
		marginVertical: 10
	},
	inputContain: {
		width: 300,
		maxWidth: "80%",
		alignItems: "center"
	},
	button: {
		width: 100
	}
});

export default StartGameScreen;

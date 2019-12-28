import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = props => {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();

	const inputHandler = inputText => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ""));
	};

	const resetInputHandler = () => {
		setEnteredValue("");
		setConfirmed(false);
	};

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert("Invalid number!", "Number has to be in range 1 and 99.", [
				{ text: "Okay", style: "destructive", onPress: resetInputHandler }
			]);
			return;
		}
		setConfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue("");
		Keyboard.dismiss();
	};

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<Text>You Selected</Text>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<Button title="START GAME"></Button>
			</Card>
		);
	}
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.screen}>
				<Text style={styles.title}>Start a New Game</Text>
				<Card style={styles.inputContain}>
					<Text>Select a Number</Text>
					<Input
						style={styles.input}
						blurOnSubmit
						autoCaptilize="none"
						autoCorrect={false}
						keyboardType="number-pad"
						maxLength={2}
						onChangeText={inputHandler}
						value={enteredValue}
					/>
					<View style={styles.buttonContain}>
						<View style={styles.button}>
							<Button title="Reset" onPress={resetInputHandler} color="red" />
						</View>
						<View style={styles.button}>
							<Button title="Confirm" onPress={confirmInputHandler} />
						</View>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
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
	},
	input: {
		width: 50,
		textAlign: "center"
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: "center"
	}
});

export default StartGameScreen;

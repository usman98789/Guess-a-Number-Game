import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;

	if (rndNum === exclude) {
		return generateRandBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

const GameScreen = props => {
	const [currGuess, setGuess] = useState(
		generateRandBetween(1, 100, props.userChoice)
	);
	const [rounds, setRounds] = useState(0);
	const currLow = useRef(1);
	const currHigh = useRef(100);

	const { userChoice, OnGameOver } = props;
	useEffect(() => {
		console.log(props.OnGameOver);
		currGuess === userChoice ? props.OnGameOver(rounds) : NaN;
	}, [currGuess, userChoice, OnGameOver]);

	const nextGameHandler = direction => {
		if (
			(direction === "lower" && currGuess < props.userChoice) ||
			(direction === "greater" && currGuess > props.userChoice)
		) {
			Alert.alert("Don't lie!", "You know this is wrong", [
				{ text: "Sorry", style: "cancel" }
			]);
			return;
		}

		if (direction === "lower") {
			currHigh.current = currGuess;
		} else {
			currLow.current = currGuess;
		}
		const nextNum = generateRandBetween(
			currLow.current,
			currHigh.current,
			currGuess
		);
		setGuess(nextNum);
		setRounds(currRounds => currRounds + 1);
	};
	return (
		<View style={styles.screen}>
			<Text>Opponent's Guess</Text>
			<NumberContainer>{currGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<Button
					title="LOWER"
					onPress={nextGameHandler.bind(this, "lower")}
				></Button>
				<Button
					title="GREATER"
					onPress={nextGameHandler.bind(this, "greater")}
				></Button>
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
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		width: 300,
		maxWidth: "80%"
	}
});

export default GameScreen;

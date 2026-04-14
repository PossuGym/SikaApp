import { StyleSheet, View } from "react-native";
import { Card, Switch, Text } from "react-native-paper";
import { useThemeStore } from "../../store/useThemeStore";

export default function ProfileSwitchTheme() {
	const isDark = useThemeStore((state) => state.isDark);
	const toggleTheme = useThemeStore((state) => state.toggleTheme);

	return (
		<Card style={styles.card}>
			<Card.Content style={styles.contentRow}>
				<View>
					<Text variant="titleMedium">Tumma teema</Text>
					<Text variant="bodySmall">Vaihda vaalean ja tumman teeman valilla</Text>
				</View>
				<Switch value={isDark} onValueChange={toggleTheme} />
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	card: {
		marginBottom: 15,
		paddingVertical: 4,
	},
	contentRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});


import { StyleSheet, View } from "react-native";
import { Card, Switch, Text, useTheme } from "react-native-paper";
import { useThemeStore } from "../../store/useThemeStore";

export default function ProfileSwitchTheme() {
	const isDark = useThemeStore((state) => state.isDark);
	const toggleTheme = useThemeStore((state) => state.toggleTheme);

	return (
		<Card mode="elevated" elevation={2}>
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
	contentRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});


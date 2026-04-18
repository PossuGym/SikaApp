import { useEffect, useState } from 'react';
import { Card, TextInput, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { profileService } from '../../services/profileService';

export const ProfileGetEmail = ({ }) => {
	const theme = useTheme();
	const [email, setEmail] = useState('');

	useEffect(() => {
		let mounted = true;

		const fetchEmail = async () => {
			try {
				const userEmail = await profileService.getEmail();
				if (!mounted) return;
				setEmail(userEmail ?? '');
			} catch (err) {
				if (!mounted) return;
				setEmail('');
			}
		};

		fetchEmail();

		return () => {
			mounted = false;
		};
	}, []);

	return (
		<Card mode="elevated" elevation={2}>
			<Card.Title title="Sähköposti" titleVariant='titleMedium'/>
			<Card.Content>
				<View>
					<TextInput
            mode='outlined'
            style={styles.input}
						value={email}
            disabled={true}
						placeholder="Sähköposti"
					/>
				</View>
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
});

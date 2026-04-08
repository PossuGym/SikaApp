import { useEffect, useState } from 'react';
import { Card, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { profileService } from '../../services/profileService';

export const ProfileGetEmail = ({ }) => {
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
		<Card mode="outlined" style={styles.card}>
			<Card.Title title="Sähköposti" titleStyle={styles.title} />
			<Card.Content>
				<View>
					<TextInput
						value={email}
						editable={false}
						placeholder="Sähköposti"
					/>
				</View>
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	card: {
		marginTop: 10,
	},
	title: {
		fontSize: 24,
	},
});

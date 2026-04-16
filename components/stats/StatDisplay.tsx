import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Theme } from '../theme/Colors';

interface Props {
    label: string;
    value: string;
}

export const StatDisplay = ({ label, value }: Props) => {
    const theme = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.surfaceVariant }]}>
            <Text variant="labelLarge" style={{ color: theme.colors.onSurfaceVariant }}>{label}</Text>
            <Text variant="headlineSmall">{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: Theme.spacing.lg,
        borderRadius: Theme.radius.md,
        alignItems: 'center',
        width: '90%',
        marginVertical: Theme.spacing.sm,
    }
});
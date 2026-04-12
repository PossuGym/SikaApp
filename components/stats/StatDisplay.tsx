import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

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
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        width: '90%',
        marginVertical: 8,
    }
});
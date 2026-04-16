import { Card, Text, useTheme } from 'react-native-paper';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Theme } from '../theme/Colors';

interface Props {
  title: string;
  style?: StyleProp<ViewStyle>;
}

export const HeaderCard = ({ title, style }: Props) => {
  const theme = useTheme();

  return (
    <Card 
      mode="elevated"
      elevation={1}
      style={[
        styles.container, 
          { 
            borderColor: theme.colors.outline, 
            backgroundColor: theme.colors.primaryContainer,
          },
          style
        ]}
    >
      <Text variant="titleMedium" style={styles.header}>{title}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.radius.md,
    borderWidth: Theme.borderWidth.thin,
  },
  header: {
    margin: Theme.spacing.lg,
    textAlign: "center",
  },
});
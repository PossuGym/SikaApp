import { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useAuth } from "../hooks/useAuth";
import { useTheme } from 'react-native-paper';
import { Theme } from '../components/theme/Colors';

export default function Auth() {
  const theme = useTheme();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signInWithEmail, signUpWithEmail, authLoading } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>Email</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          style={[styles.input, { borderColor: theme.colors.outline, color: theme.colors.onSurface }]}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity
          style={[styles.button, authLoading && styles.buttonDisabled, { backgroundColor: theme.colors.primary }]}
          onPress={() => signInWithEmail(email, password)}
          disabled={authLoading}
        >
          <Text style={[styles.buttonText, { color: theme.colors.onPrimary }]}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.verticallySpaced}>
        <TouchableOpacity
          style={[styles.button, authLoading && styles.buttonDisabled, { backgroundColor: theme.colors.secondary }]}
          onPress={() => signUpWithEmail(email, password)}
          disabled={authLoading}
        >
          <Text style={[styles.buttonText, { color: theme.colors.onSecondary }]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.xl * 1.5,
    padding: Theme.spacing.md,
  },
  verticallySpaced: {
    paddingTop: Theme.spacing.xs,
    paddingBottom: Theme.spacing.xs,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: Theme.spacing.xl,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: Theme.radius.sm,
    padding: Theme.spacing.md,
    fontSize: 16,
  },
  button: {
    borderRadius: Theme.radius.sm,
    padding: Theme.spacing.md,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
})
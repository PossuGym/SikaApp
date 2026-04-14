import { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useAuth } from "../hooks/useAuth";
import { useTheme } from 'react-native-paper';

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
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  button: {
    borderRadius: 4,
    padding: 12,
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
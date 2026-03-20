import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Text, Card, TextInput } from "react-native-paper";


export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }  

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    }) 

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Tarkista sähköpostisi ja vahvista tilisi ennen kirjautumista.')
    setLoading(false)
  }  

  return ( <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.header}>Kirjaudu</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.inputLabel}>Sähköposti</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize={'none'}
            mode="outlined"
            keyboardType="email-address"
            style={styles.input}
          />
          <Text style={styles.inputLabel}>Salasana</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            autoCapitalize={'none'}
            mode="outlined"
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <Button 
              mode="contained" 
              onPress={signInWithEmail} 
              loading={loading}
              disabled={loading}
              style={styles.mainButton}
            >
              Kirjaudu
            </Button>

            <Text style={styles.subText}>Eikö sinulla ole vielä tiliä?</Text>

            <Button 
              mode="outlined" 
              onPress={signUpWithEmail} 
              disabled={loading}
              style={styles.mainButton}
            >
              Luo tunnus
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  card: {
    padding: 10,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  mainButton: {
    width: '100%',
    marginVertical: 8,
  },
  subText: {
    marginVertical: 10,
    fontWeight: 'bold',
  }
});



import { useEffect, useState } from "react";
import { Alert } from "react-native";
import type { JwtPayload } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

/*
  Kaikki autentikaation käyttämät funktiot
*/

export function useAuth() {
  const [claims, setClaims] = useState<JwtPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getClaims();
      setClaims(data?.claims ?? null);
      setLoading(false);
    };

    load();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      load();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signInWithEmail(email: string, password: string) {
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert(error.message);
    setAuthLoading(false);
  }

  async function signUpWithEmail(email: string, password: string) {
    setAuthLoading(true);
    const { data: { session }, error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert(error.message);
    if (!session) Alert.alert("Please check your inbox for email verification!");
    setAuthLoading(false);
  }

  const handleSignOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert("Sign out failed", error.message);
    setLoading(false);
  };

  return { claims, loading, authLoading, signInWithEmail, signUpWithEmail, handleSignOut };
}
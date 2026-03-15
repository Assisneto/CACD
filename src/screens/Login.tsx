import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import Logo from "../components/Logo";
import { login, loginWithGoogle } from "../services/authService";
import { useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();

function getErrorMessage(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "E-mail ou senha incorretos.";
    case "auth/invalid-email":
      return "Formato de e-mail inválido.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente mais tarde.";
    case "auth/user-disabled":
      return "Esta conta foi desativada.";
    default:
      return "Erro ao fazer login. Tente novamente.";
  }
}

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [_request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      handleGoogleCredential(id_token);
    }
  }, [response]);

  async function handleGoogleCredential(idToken: string) {
    setError("");
    setGoogleLoading(true);
    try {
      await loginWithGoogle(idToken);
      navigation.goBack();
    } catch (err: any) {
      setError("Erro ao entrar com Google. Tente novamente.");
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleLogin() {
    setError("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Preencha o campo de e-mail.");
      return;
    }
    if (!password) {
      setError("Preencha o campo de senha.");
      return;
    }

    setLoading(true);
    try {
      await login(trimmedEmail, password);
      navigation.goBack();
    } catch (err: any) {
      const code = err?.code ?? "";
      setError(getErrorMessage(code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-center px-8">
        <View className="items-center mb-10">
          <Logo width={200} height={100} />
        </View>

        {error !== "" && (
          <View className="bg-red-50 border border-red-300 rounded-lg px-4 py-3 mb-4">
            <Text className="text-red-700 text-sm text-center">{error}</Text>
          </View>
        )}

        <Text className="text-gray-700 font-medium mb-1 ml-1">E-mail</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        <Text className="text-gray-700 font-medium mb-1 ml-1">Senha</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-6 text-base"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        <TouchableOpacity
          className={`rounded-lg py-4 items-center ${
            loading ? "bg-blue-400" : "bg-blue-800"
          }`}
          onPress={handleLogin}
          disabled={loading || googleLoading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-bold text-base">Entrar</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row items-center my-5">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500 text-sm">ou</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <TouchableOpacity
          className={`rounded-lg py-4 items-center flex-row justify-center border ${
            googleLoading ? "border-gray-200 bg-gray-50" : "border-gray-300 bg-white"
          }`}
          onPress={() => promptAsync()}
          disabled={loading || googleLoading}
          activeOpacity={0.8}
        >
          {googleLoading ? (
            <ActivityIndicator color="#4285F4" />
          ) : (
            <>
              <Ionicons name="logo-google" size={20} color="#4285F4" />
              <Text className="text-gray-700 font-bold text-base ml-3">
                Entrar com Google
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

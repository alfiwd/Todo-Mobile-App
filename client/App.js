// Import package
import React from "react";
import "react-native-gesture-handler";
import { NativeBaseProvider, extendTheme } from "native-base";
import { useFonts, Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";

// Import container
import Container from "./Container";

// Import user context provider
import { UserContextProvider } from "./src/context/userContext";

export default function App() {
  // Load font with expo
  let [fontLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  // Setup font
  const fontConfig = {
    Poppins: {
      200: {
        normal: "Poppins_200ExtraLight",
      },
      300: {
        normal: "Poppins_300Light",
      },
      400: {
        normal: "Poppins_400Regular",
      },
      600: {
        normal: "Poppins_600SemiBold",
      },
    },
  };

  // Configuration native base custom theme
  const theme = extendTheme({
    fontConfig,
    fonts: {
      heading: "Poppins",
      body: "Poppins",
      mono: "Poppins",
    },
  });

  if (!fontLoaded) {
    return <AppLoading />;
  } else {
    return (
      <UserContextProvider>
        <NativeBaseProvider theme={theme}>
          <Container />
        </NativeBaseProvider>
      </UserContextProvider>
    );
  }
}

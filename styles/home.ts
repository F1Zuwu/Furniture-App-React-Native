import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: "100%",
    height: 300,
  },
  headline: {
    fontFamily: "DMSans_700Bold",
    fontSize: 40,
    textAlign: "center",
  },
  SignupButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: "#4F63AC",
    height: 60,
    justifyContent: "center",
    width: 303,
    alignItems: "center",
  },
  SignInButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  SignupButtonText: {
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: 16,
    width: 200,
    textAlign: "center",
    color: "#FFFFFF",
  },
  SignInButtonText: {
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: 16,
    color: "#4F63AC",
    width: 200,
    textAlign: "center",
  },
  headlineStrong: {
    fontFamily: "DMSans_700Bold",
    fontSize: 40,
    textAlign: "center",
    textDecorationLine: "underline",
    textDecorationColor: "#FCA34D",
    color: "#FCA34D"
  }
});

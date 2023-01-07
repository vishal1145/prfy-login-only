import React, { useEffect } from "react";
import * as Yup from "yup";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import AppText from "../components/AppText";
import AppForm from "./../components/form/AppForm";
import AppFormField from "./../components/form/AppFormField";
import { colors } from "../theme";
import {
  loginAction,
  clearErrorsAction,
  socialLoginAction,
} from "../redux/actions/userAction";
import SubmitButtonWithLoader from "../components/SubmitButtonWithLoader";
import { Snackbar } from "react-native-paper";
import Logo from "../components/Logo";
import jwt_decode from "jwt-decode";
import AppButton from "../components/AppButton";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { initializeApp } from "firebase/app";

import { AntDesign } from "@expo/vector-icons";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import FullScreenLoader from "../components/FullScreenLoader";
import { getAllCategoriesAction } from "../redux/actions/categoriesActions";

initializeApp("YOUR FB APP CONFIG");

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(0).label("Password"),
});

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const { loading, error, loadUserLoading } = useSelector(
    (state) => state.userInfo
  );

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "YOUR clientId ID",
    androidClientId: "YOUR androidClientId ID",
    iosClientId: "YOUR iosClientId ID",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
      let decoded = jwt_decode(id_token);
      socialLogin(decoded);
    }
  }, [response]);

  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      dispatch(clearErrorsAction());
    }, 3000);
  }, [error]);

  const socialLogin = async (decoded) => {
    let pushToken;

    if (Platform.OS !== "web") {
      pushToken = await sendNotification();
      decoded.pushToken = pushToken;
    }
    console.log(decoded);
    dispatch(
      socialLoginAction(decoded, (justSignedUp) => {
        dispatch(getAllCategoriesAction());
        if (justSignedUp) return navigation.navigate("AllCategory");
        console.log(navigation.getState());
      })
    );
  };

  const loginUser = async (val) => {
    let pushToken;
    if (Platform.OS !== "web") {
      pushToken = await sendNotification();
    }

    if (pushToken) {
      val.pushToken = pushToken;
    }

    dispatch(
      loginAction(
        val,
        () => {
          navigation.navigate("Home");
        },
        () => {
          navigation.navigate("VerifyPhoneNumber");
        }
      )
    );
  };

  return (
    <>
      {loadUserLoading ? (
        <FullScreenLoader />
      ) : (
        <>
          <Header />
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 20,
              paddingVertical: 25,
            }}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.logoContainer}>
              <Logo />
            </View>
            <View style={styles.formContainer}>
              <AppForm
                initialValues={{ email: "", password: "" }}
                onSubmit={loginUser}
                validationSchema={validationSchema}
              >
                <AppFormField
                  placeholderText="Email"
                  name="email"
                  autoCapitalize="none"
                />
                <AppFormField
                  placeholderText="Password"
                  name="password"
                  secureTextEntry
                  autoCapitalize="none"
                />

                <View style={styles.userCheckMeta}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ForgotPassword")}
                  >
                    <AppText style={styles.forgotPass}>
                      Forgot Password ?{" "}
                    </AppText>
                  </TouchableOpacity>
                </View>
                <SubmitButtonWithLoader label="Login" loading={loading} />
              </AppForm>
              <AppButton
                icon={<AntDesign name="google" size={24} color="white" />}
                title="Google SignIn"
                style={{
                  marginTop: 20,
                  dispalay: "flex",
                  flexDirection: "row",
                }}
                onPress={() => {
                  promptAsync();
                }}
              />
            </View>

            <View style={styles.signUpLinkContainer}>
              <View style={styles.signUpTextContainer}>
                <AppText>Don’t have an account?</AppText>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                >
                  <AppText preset="bold" style={styles.link}>
                    Sign Up
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </>
      )}
      {error && <Snackbar visible={error ? true : false}>{error}</Snackbar>}
    </>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 15,
    marginBottom: 50,
    alignItems: "center",
  },
  userCheckMeta: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  forgotPass: {
    textAlign: "right",
    color: colors.black,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    margin: 8,
    color: colors.black,
  },
  loginBtn: {
    marginTop: 20,
  },
  signUpLinkContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    flexDirection: "row",
  },
  signUpTextContainer: {
    flexDirection: "row",
  },
  link: {
    marginLeft: 5,
    color: colors.primary,
  },
});

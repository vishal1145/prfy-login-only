import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Snackbar } from "react-native-paper";
import { colors } from "../theme";
import Header from "./../components/Header";
import AppForm from "./../components/form/AppForm";
import AppFormField from "./../components/form/AppFormField";
import AppText from "./../components/AppText";
import { registerAction, clearErrorsAction } from "../redux/actions/userAction";
import SubmitButtonWithLoader from "../components/SubmitButtonWithLoader";
import { Alert } from "react-native";
import FullScreenLoader from "../components/FullScreenLoader";
import Logo from "../components/Logo";
const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export default function RegisterScreen({ navigation }) {
  const { loading, loadUserLoading, error } = useSelector(
    (state) => state.userInfo
  );

  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      dispatch(clearErrorsAction());
    }, 3000);
  }, [error]);

  let dispatch = useDispatch();

  const handleFormSubmit = (values) => {
    const name = values.name;
    const email = values.email;
    const password = values.password;

    let passwordValdator =
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

    if (!passwordValdator.test(password))
      return Alert.alert(
        "Password Validation Error",
        "Your Password must contain at least one upper case English letter, at least one lower case English letter, at least one numeric, at least one special character and minimum eight in length",
        [{ text: "OK" }]
      );

    dispatch(
      registerAction(
        {
          name,
          email,
          password,
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
        <FullScreenLoader color={colors.primary} size={50} />
      ) : (
        <>
          <Header title="Register"  />

          <KeyboardAwareScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.logoContainer}>
              <Logo />
            </View>
            <View style={styles.formContainer}>
              <AppForm
                initialValues={{ name: "", email: "", password: "" }}
                onSubmit={handleFormSubmit}
                validationSchema={validationSchema}
              >
                <AppFormField placeholderText="Name" name="name" />

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
                <SubmitButtonWithLoader label="Sign Up" loading={loading} />
              </AppForm>
            </View>

            <View style={styles.signUpLinkContainer}>
              <View style={styles.signUpTextContainer}>
                <AppText preset="default">All Ready have an account?</AppText>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <AppText preset="bold" style={styles.link}>
                    Login
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>

          {error && (
            <Snackbar
              visible={error ? true : false}
              // onDismiss={onDismissSnackBar}
            >
              {error}
            </Snackbar>
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 5,
    marginBottom: 50,
    alignItems: "center",
    borderRadius:10
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

import { Platform, Alert } from "react-native";

export const executeOnPhone=(fn)=>{
  if (Platform.OS !== "web") {
   return fn()
  }
}

export const webConfirm = (message, functionToExecute) => {
  if (Platform.OS === "web") {
    let yes = confirm(message);
    if (yes) functionToExecute();
    return;
  }
};

export const nativeConfirm = (title, message, okay, cancel) => {
  Alert.alert(title, message, [
    {
      text: "Cancel",
      onPress: cancel ? cancel : () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    {
      text: "OK",
      onPress: okay ? okay : ()=>console.log("okay Pressed"),
    },
  ]);
};


// export const timeLeft = (deadline)=>{

// }

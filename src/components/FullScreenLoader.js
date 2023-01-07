import { Dimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";
const FullScreenLoader = ({height=Dimensions.get("window").height,...props }) => {
    // const width = Dimensions.get("window").width;
    
  return (
    <ActivityIndicator style={{ height}} animating={true} {...props} />
  );
};

export default FullScreenLoader;

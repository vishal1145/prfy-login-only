import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import AllCoursesScreen from "../screens/AllCoursesScreen";
import QueryDetails from "../screens/QueryDetails";
import EditProfile from "../screens/EditProfile";
import Suggestions from "../screens/Suggestions";
import Pitch from "../screens/Pitch";
import CategoryFeed from "../screens/CategoryFeed";
import AllCategory from "../screens/AllCategory";
import WebviewContent from "../screens/WebviewContent";
import EmailSignature from "../screens/EmailSignature";


const Stack = createNativeStackNavigator();

export default function FeedNavigator({ initialRoute = "PRfy" }) {

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerShown: false,
        }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen name="PRfy" component={Home} />
        <Stack.Screen name="AllQueries" component={AllCoursesScreen} />
        <Stack.Screen name="Pitch" component={Pitch} />
        <Stack.Screen name="CourseDetails" component={QueryDetails} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Suggestions" component={Suggestions} />
        <Stack.Screen name="AllCategory" component={AllCategory} />
        <Stack.Screen name="CategoryFeed" component={CategoryFeed} />
        <Stack.Screen name="content" component={WebviewContent} />
        <Stack.Screen name="EmailSignature" component={EmailSignature} />
      </Stack.Navigator>
    </>
  );
}


 
  // content screen will show privacy policy and terms and condition screen 
 
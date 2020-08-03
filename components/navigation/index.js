import * as React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";
import Home from "../Home";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../../redux/store";
import NavigationService from './NavigationService';
import Quickblox from './../../common/Quickblox';

const Stack = createStackNavigator();
export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: true,
      loading: false,
    };
    Quickblox.intialize();
  }

  render() {
    console.disableYellowBox = true;
    const { showRealApp, mainScreen, checkSession, loading } = this.state;
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer ref={comp => {
              this.navigator = comp;
              NavigationService.setTopLevelNavigator(comp);
            }}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          </NavigationContainer>

          <FlashMessage position="top" />
        </PersistGate>
      </Provider>
    );
  }
}

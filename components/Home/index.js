import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./Drawer";
import { FeedStack } from "./stack";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={FeedStack} />
    </Drawer.Navigator>
  );
}

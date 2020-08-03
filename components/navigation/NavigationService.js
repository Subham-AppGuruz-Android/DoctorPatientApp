// import { NavigationActions, StackActions } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

let _navigator;

// function for set navigation
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

// function for navigate the screen
function navigate(routeName, params) {
  _navigator && _navigator.navigate(routeName, params
    // StackActions.push({
    //   routeName,
    //   params,
    // }),
  );
}

function goBack() {
  _navigator &&  _navigator.goBack(
      // StackActions.push({
      //   routeName,
      //   params,
      // }),
    );
  }

// function for replace the screen
function replace(routeName, params) {
  _navigator.dispatch(
    StackActions.replace({
      routeName,
      params,
    }),
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  replace,
  goBack
};

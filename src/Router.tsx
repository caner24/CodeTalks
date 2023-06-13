import * as React from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import Main from './Pages/Main/Main';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Detail from './Pages/Detail/Detail';
import auth from '@react-native-firebase/auth';
function Router(): JSX.Element {
  const Stack = createNativeStackNavigator();
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();

  const dispatch = useDispatch();

  function onAuthStateChanged(user) {
    setUser(user);
    if (user != null) {
      dispatch({type: 'ADD_USER', payload: {user}});
    }
    if (initializing) setInitializing(false);
  }
  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user == null ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Main}
            options={{
              headerTintColor: 'orange',
              headerTitle: 'Odalar',
              headerBackTitle: 'Geri Dön',
              headerBackVisible: true,
              headerTitleAlign: 'center',
              headerRight: () => (
                <Button
                  onPress={() => auth().signOut()}
                  title="logout"
                  color="black"
                />
              ),
            }}
          />
        )}
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false, headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTitleAlign: 'center',
            headerTintColor: 'orange',
            headerRight: () => (
              <Button
                onPress={() => auth().signOut()}
                title="logout"
                color="black"
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;

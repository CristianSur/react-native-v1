import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiaryPage from "./pages/DiaryPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import { PaperProvider } from "react-native-paper";
import { AppProvider } from "./context/AppContext";


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <AppProvider>
        <PaperProvider> {/* <- Wrap the whole app here */}
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Diary"
                        component={DiaryPage}
                        options={{ headerShown: false }} // manual header in DiaryPage
                    />
                    <Stack.Screen
                        name="Profile"
                        component={ProfilePage}
                        options={{ headerShown: false }} // manual header in ProfilePage
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
        </AppProvider>
        </GestureHandlerRootView>

    );
}

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SessionScreen from "../screens/SessionScreen";
import { LibraryScreen } from "../screens/LibraryScreen";
import StatsScreen from "../screens/stats/StatsScreen";
import NutritionScreen from "../screens/NutritionScreen";
import { Homepage } from "../screens/HomePage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const Tab = createBottomTabNavigator();

function MyTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Workout":
              iconName = "dumbbell";
              break;
            case "Library":
              iconName = "format-list-bulleted";
              break;
            case "Stats":
              iconName = "chart-bar";
              break;
            case "Nutrition":
              iconName = "food-apple";
              break;
            default:
              iconName = "circle";
          }

          return (
            <MaterialCommunityIcons
              name={iconName as any}
              size={focused ? 28 : 22}
              color={color}
            />
          );
        },


        tabBarActiveTintColor: "#f73b3b",
        tabBarInactiveTintColor: "#888",

        tabBarStyle: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: insets.bottom,  // Navigaatio Android-navigointipalkin ylle
          height: 60,           // korkeutta nostettu
          paddingBottom: 8,    // turvallinen marginaali pohjalle
          paddingTop: 0,
          borderTopWidth: 0,
          elevation: 6,
          backgroundColor: "#fff",
        },

        tabBarLabelStyle: {
          fontSize: 12,
          color: "#000",
        },

      })}
    >

      <Tab.Screen name="Home" component={Homepage} />
      <Tab.Screen name="Train" component={SessionScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Nutrion" component={NutritionScreen} />
    </Tab.Navigator>
  )
}
export default MyTabs;
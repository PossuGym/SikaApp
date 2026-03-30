import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SessionScreen from "../screens/SessionScreen";
import { LibraryScreen } from "../screens/LibraryScreen";
import StatsScreen from "../screens/stats/StatsScreen";
import NutritionScreen from "../screens/NutritionScreen";
import { Homepage } from "../screens/HomePage";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';


const Tab = createBottomTabNavigator();

function MyTabs() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Train":
              iconName = "fitness-center";
              break;
            case "Library":
              iconName = "menu-book";
              break;
            case "Stats":
              iconName = "bar-chart";
              break;
            case "Nutrition":
              iconName = "local-dining";
              break;
            default:
              iconName = "help-outline";
          }

          return (
            <MaterialIcons
              name={iconName as any}
              size={focused ? 28 : 22}
              color={color}
            />
          );
        },


        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,

        tabBarStyle: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: insets.bottom,  // Navigaatio Android-navigointipalkin ylle
          height: 60,           // korkeutta nostettu
          paddingBottom: 8,    // turvallinen marginaali pohjalle
          paddingTop: 0,
          borderTopWidth: 1,
          borderTopColor: theme.colors.outlineVariant,
          elevation: 6,
          backgroundColor: theme.colors.surface,
        },

        tabBarLabelStyle: {
          fontSize: 12,
        },

      })}
    >

      <Tab.Screen name="Home" component={Homepage} />
      <Tab.Screen name="Train" component={SessionScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Nutrition" component={NutritionScreen} />
    </Tab.Navigator>
  )
}
export default MyTabs;
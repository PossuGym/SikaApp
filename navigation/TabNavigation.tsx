import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LibraryScreen } from "../screens/LibraryScreen";
import StatsScreen from "../screens/stats/StatsScreen";
import NutritionScreen from "../screens/NutritionScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Homepage } from "../screens/HomePage";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Appbar } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";
import TrainingScreen from "../screens/session/TrainingScreen";

/*
  Navigaatioreitit, jotka ovat bottom tabseissa
  Tänne lisätään 
*/

const Tab = createBottomTabNavigator();

function MyTabs() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({

        headerShown: true,
        
        // Tähän lisäätte oman versionne headerRight: () =>

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
          left: 12,
          right: 12,
          bottom: insets.bottom + 8,  // Navigaatio Android-navigointipalkin ylle
          height: 60,           // korkeutta nostettu
          paddingBottom: 8,    // turvallinen marginaali pohjalle
          borderRadius: 24,
          paddingTop: 0,
          elevation: 6,
          backgroundColor: theme.colors.surface,
        },

        tabBarLabelStyle: {
          fontSize: 12,
        },

       

      })}
    >
      <Tab.Screen name="Home" component={Homepage} />
      <Tab.Screen name="Train" component={TrainingScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Nutrition" component={NutritionScreen} />
      <Tab.Screen name="Profiili" component={ProfileScreen} />
     
     
    
    </Tab.Navigator>
  )
}
export default MyTabs;

/*
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        style={{ marginRight: 15 }}
      >
        <MaterialIcons
          name="account-circle"
          size={28}
          color="#000"
        />
      </TouchableOpacity>
           ),


           /* header: () => (
          <Appbar.Header elevated style={{ backgroundColor: theme.colors.surface }}>
            <Appbar.Content title={route.name} />
            <Appbar.Action
              icon={({ size, color }) => (
                <MaterialIcons name="account-circle" size={size} color={color} />
              )}
              iconColor={theme.colors.onSurface}
              accessibilityLabel="More options"
              onPress={() => navigation.navigate("Profile")}
            />
          </Appbar.Header>
        ),*/
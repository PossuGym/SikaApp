import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LibraryScreen } from "../screens/LibraryScreen";
import StatsScreen from "../screens/stats/StatsScreen";
import NutritionScreen from "../screens/NutritionScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SessionScreen from "../screens/session/SessionScreen";
import TrainingScreen from "../screens/session/TrainingScreen";
import { Homepage } from "../screens/HomePage";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Appbar } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const TrainingStack = createNativeStackNavigator();

// Treeninäkymän oma stack
function TrainingStackScreen() {
  return (
    <TrainingStack.Navigator>
      <TrainingStack.Screen 
        name="TrainingHome" 
        component={TrainingScreen} 
        options={{ headerShown: false }} 
      />
      <TrainingStack.Screen 
        name="TrainingSession" 
        component={SessionScreen} 
        options={{ headerShown: false }} 
      />
    </TrainingStack.Navigator>
  );
}

function MyTabs() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        header: () => (
          <Appbar.Header elevated mode="center-aligned" style={{ backgroundColor: theme.colors.primaryContainer }}>
            <Appbar.Content title={route.name}/>
            <Appbar.Action
              icon="account-circle-outline"
              size={36}
              iconColor={theme.colors.secondary}
              onPress={() => navigation.navigate("Profiili")}
            />
          </Appbar.Header>
        ),

        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          switch (route.name) {
            case "Koti":
              iconName = "home";
              break;
            case "Treeni":
              iconName = "fitness-center";
              break;
            case "Kirjasto":
              iconName = "menu-book";
              break;
            case "Tilastot":
              iconName = "bar-chart";
              break;
            case "Ravinto":
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
          marginHorizontal: 16,
          bottom: insets.bottom + 4,
          height: 60,
          paddingBottom: 8,
          borderRadius: 32,
          paddingTop: 0,
          elevation: 3,
          borderTopWidth: 0,
          backgroundColor: theme.colors.primaryContainer // Alanavigaation taustaväri
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Koti" component={Homepage} />
      <Tab.Screen name="Treeni" component={TrainingStackScreen} />
      <Tab.Screen name="Tilastot" component={StatsScreen} />
      <Tab.Screen name="Kirjasto" component={LibraryScreen} />
      <Tab.Screen name="Ravinto" component={NutritionScreen} />
      <Tab.Screen 
        name="Profiili" 
        component={ProfileScreen}
        options={{ 
          tabBarButton: () => null ,  // Piilottaa tabseista
          tabBarItemStyle: { display: "none" }, // Poistaa tilan tabseista
        }}
      />
    </Tab.Navigator>
  )
}
export default MyTabs;
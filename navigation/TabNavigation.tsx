import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WorkoutScreen from "../screens/WorkoutScreen";
import ExercisesScreen from "../screens/ExercisesScreen";
import StatsScreen from "../screens/StatsScreen";
import NutritionScreen from "../screens/NutritionScreen";
import  { Homepage } from "../screens/HomePage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';



const Tab = createBottomTabNavigator();

function MyTabs() {
    return(
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
                          case "Exercises":
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
                                name={iconName}
                                size={focused? 28:22}
                                color={color}
                            />
                        );
                    },
                    

                    tabBarActiveTintColor: "#333",
                    tabBarInactiveTintColor: "#888",

                    tabBarStyle: {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
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
            <Tab.Screen name="Workout" component={WorkoutScreen} />
            <Tab.Screen name="Stats" component={StatsScreen} />
            <Tab.Screen name="Exercises" component={ExercisesScreen} />
            <Tab.Screen name="Nutrion" component={NutritionScreen} />
        </Tab.Navigator>
    )
}
export default MyTabs;
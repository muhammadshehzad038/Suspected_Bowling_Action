import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Report from '../screens/Report';
import AboutScreen from '../screens/About';
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Report" component={Report} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}
export default MyDrawer;
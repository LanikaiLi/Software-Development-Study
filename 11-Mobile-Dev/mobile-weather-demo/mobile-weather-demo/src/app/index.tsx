import { Text, View} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: '#dff',
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          alignItems: 'center',
        }}>
          <Text>Winnipeg</Text>
          <Text>10°C</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
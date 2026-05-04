import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Weather = () => {
    const [weather, setWeather] = React.useState<any>(null);
    React.useEffect(() => {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=46.253&longitude=20.141&current_weather=true')
            .then(response => response.json())
            .then(data => setWeather(data.current_weather))
            .catch(error => console.error('Error fetching weather data:', error));
    }, []);
    return (
        <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <ThemedText style={{ fontSize: 24, fontWeight: 'bold' }}>Szeged időjárás</ThemedText>
            </SafeAreaView>
            {weather ? (
                <ThemedView style={{ marginTop: 20, alignItems: 'center' }}>
                    <ThemedText style={{ fontSize: 18 }}>Hőmérséklet: {weather.temperature}°C</ThemedText>
                    <ThemedText style={{ fontSize: 16 }}>Szélsebesség: {weather.windspeed} km/h</ThemedText>
                    <ThemedText style={{ fontSize: 16 }}>Szélirány: {weather.winddirection}°</ThemedText>
                </ThemedView>
            ) : (
                <ThemedText>Betöltés...</ThemedText>
            )}
            
        </ThemedView>
        

    );
}

const styles = {
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
}
export default Weather;
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  Animated,
  Easing,
  TouchableWithoutFeedback 
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface League {
  league: string;
  // add other properties if needed
}

const App = () => {
  const [data, setData] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const spinValue = new Animated.Value(0);

  // Dönen animasyon
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  useEffect(() => {
    const fetchLeagues = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8080/matches', {

        });

        // Yanıtı ham metin olarak al
        const text = await response.text();

        // JSON formatına çevir
        const json = JSON.parse(text);
        if (json.success) {
          setData(json.result);
        } else {
          setErrorMessage('Veri alınırken bir hata oluştu');
        }

      } catch (error: unknown) {
        const err = error as Error;
        console.error('API Hatası:', err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  const renderItem = ({ item, index }: { item: League; index: number }) => {
    const scaleAnim = new Animated.Value(1);

    const onPressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableWithoutFeedback
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => console.log('Tıklanan lig:', item.league)}
      >
        <Animated.View 
          style={[
            styles.card,
            {
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={styles.leagueContent}>
            <View style={styles.leagueIcon}>
              <FontAwesome5 
                name="futbol" 
                size={28} 
                color="white" 
              />
            </View>
            <View style={styles.leagueInfo}>
              <Text style={styles.leagueName}>{item.league}</Text>
              <Text style={styles.leagueDetail}>2023-2024 Sezonu</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <Animated.View style={[styles.loadingIcon, { transform: [{ rotate: spin }] }]}>
            <FontAwesome5 
              name="futbol" 
              size={40} 
              color="#E30A17" 
            />
          </Animated.View>
          <Text style={styles.loadingText}>Ligler Yükleniyor...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Futbol Ligleri</Text>
      
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E30A17',
    textAlign: 'center',
    marginVertical: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#E30A17',
  },
  leagueContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leagueIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  leagueInfo: {
    flex: 1,
  },
  leagueName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  leagueDetail: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  separator: {
    height: 12,
  },
  errorText: {
    color: '#E30A17',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    backgroundColor: '#FFE5E5',
    padding: 10,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingIcon: {
    marginBottom: 16,
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
    marginTop: 8,
  },
});

export default App;
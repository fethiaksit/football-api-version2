import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface Match {
  team1: string;
  team2: string;
  score1: string;
  score2: string;
}

const App = () => {
  const [data, setData] = useState<Match[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/matches', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });

        const json = await response.json();
        if (json.success) {
          setData(json.result);
        } else {
          setErrorMessage('Veri alınırken bir hata oluştu');
        }
      } catch (error: unknown) {
        const err = error as Error;
        setErrorMessage(`API Hatası: ${err.message}`);
      }
    };

    fetchData();
  }, []);



  const renderItem = ({ item }: { item: Match }) => (
    <View style={styles.card}>
      <View style={styles.teamsContainer}>
        <Text style={styles.teamName}>{item.team1}</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>{`${item.score1}-${item.score2}`}</Text>
        </View>
        <Text style={styles.teamName}>{item.team2}</Text>
      </View>
      </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trendyol 1. Lig 2024-2025 Sezonu Fikstürü </Text>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E30A17',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#E30A17',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    flex: 1,
    textAlign: 'center',
  },
  scoreContainer: {
    backgroundColor: '#E30A17',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  dateContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 8,
    marginTop: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  separator: {
    height: 16,
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
});

export default App;
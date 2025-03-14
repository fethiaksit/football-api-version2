import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { Card } from "react-native-paper";

const API_URL = "http://192.168.1.164:8081/api/matches";
const API_KEY = "5lh280zbxpz265bVaRpqEu:50SxWSCbug7vJaQswNQQbc";

interface Match {
  homeTeam: string;
  awayTeam: string;
  score: string;
  status: string;
}

const Index = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { "X-API-Key": API_KEY },
      });
      setMatches(response.data);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Match }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.team}>{item.homeTeam} vs {item.awayTeam}</Text>
        <Text style={styles.score}>{item.score}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="blue" /> :
        <FlatList
          data={matches}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  card: {
    marginBottom: 10,
    padding: 10,
  },
  team: {
    fontSize: 18,
    fontWeight: "bold",
  },
  score: {
    fontSize: 16,
    color: "green",
  },
  status: {
    fontSize: 14,
    color: "gray",
  },
});

export default Index;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const App = () => {
  const [data, setData] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.164:8081/api/superlig', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-API-Key': '5lh280zbxpz265bVaRpqEu:50SxWSCbug7vJaQswNQQbc',  // X-API-Key başlığını kullanıyoruz
          }
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
        setErrorMessage(`API Hatası: ${err.message}`);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Süper Lig Verileri:</Text>

      {errorMessage ? (
        <Text style={{ color: 'red' }}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.home} vs {item.away}</Text>
              <Text>Skor: {item.skor}</Text>
              <Text>Tarih: {new Date(item.date).toLocaleString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default App;

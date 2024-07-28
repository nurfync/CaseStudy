import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HomeScreenProps, Promotions, TagType } from '../types/types';
import LoadingIndicator from '../components/LoadingIndicator';
import Header from '../components/Header';
import Tags from '../components/Tags';
import PromotionCard from '../components/PromotionCard';

const HomeScreen = ({ fetchPromotions, fetchTags }: HomeScreenProps) => {

  const [promotions, setPromotions] = useState<Promotions[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const fetchedPromotions = await fetchPromotions();
        setPromotions(fetchedPromotions);
        const fetchedTags = await fetchTags();
        setTags(fetchedTags);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchPromotions, fetchTags]);


  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }
  return (
    <View style={styles.container}>
      <Header></Header>
      <Tags tags={tags} />
      <PromotionCard promotions={promotions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFF'
  },
});

export default HomeScreen;
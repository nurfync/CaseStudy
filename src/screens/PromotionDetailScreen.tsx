import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';
import {PromotionDetailScreenProps} from '../types/types';
import {useAppNavigation} from '../navigation/utils/useAppNaavigation';
import {fetchPromotionDetail} from '../services/api';
import {PromotionResponse} from '../types/types';
import LoadingIndicator from '../components/LoadingIndicator';
import {backIcon} from '../assets';
import { stripHtmlTags } from '../navigation/utils/stripHtmlTags';

const {width: screenWidth} = Dimensions.get('window');


const PromotionDetail = (props: PromotionDetailScreenProps) => {
  const navigation = useAppNavigation();

  const [promotionDetail, setPromotionDetail] =
    useState<PromotionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPromotionDetail = async () => {
      try {
        const {id} = props.route.params;
        setLoading(true);
        const fetchedPromotionDetail = await fetchPromotionDetail(id);
        setPromotionDetail(fetchedPromotionDetail);
      } catch (err) {
        setError('Failed to fetch promotion detail');
      } finally {
        setLoading(false);
      }
    };

    loadPromotionDetail();
  }, [props.route.params.id]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const firstDescription = stripHtmlTags(
    promotionDetail?.PromotionDetailItemAreas?.[0]?.Description || '',
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.imageContainer}>
          <Image
            source={{uri: promotionDetail?.ImageUrl}}
            style={styles.promotionImage}
          />
          <View style={styles.backIconContainer}>
            <Image source={backIcon} style={styles.backIcon} />
          </View>
          <View style={styles.brandIconContainer}>
            <Image
              source={{uri: promotionDetail?.BrandIconUrl}}
              style={styles.brandIcon}
            />
          </View>
          <View style={styles.remainingTextContainer}>
            <Text style={styles.remainingText}>
              son gün {promotionDetail?.RemainingText}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.promotionContent}>
          <Text style={styles.promotionTitle}>
            {stripHtmlTags(promotionDetail?.Title ?? 'N/A')}
          </Text>
          <Text style={styles.promotionDescription}>
            {stripHtmlTags(promotionDetail?.Description ?? 'N/A')}
          </Text>
          <Text style={styles.firstDescription}>{firstDescription}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}>
        <Text style={styles.buttonText}>Hemen Katıl</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PromotionDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  imageContainer: {
    position: 'relative',
  },
  promotionImage: {
    width: screenWidth,
    height: 315,
    resizeMode: 'cover',
    borderBottomLeftRadius: 100,
  },
  brandIconContainer: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
  },
  backIconContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#1D1E1C',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems:'center'
  },
  backIcon: {
    width: 18,
    height: 14,
  },
  brandIcon: {
    borderRadius: 50,
    width: 55,
    height: 55,
  },
  remainingTextContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1D1E1C',
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  remainingText: {
    color: '#fff',
    fontSize: 12,
  },
  promotionContent: {
    padding: 20,
  },
  promotionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  promotionDescription: {
    fontSize: 16,
    color: '#555',
  },
  firstDescription: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#F40000',
    padding: 15,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius:50
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

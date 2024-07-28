import React, { useState, useRef } from 'react';
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Promotions } from '../types/types';
import { useAppNavigation } from '../navigation/utils/useAppNaavigation';
import { stripHtmlTags } from '../navigation/utils/stripHtmlTags';

const { width: screenWidth } = Dimensions.get('window');

interface PromotionCardProps {
  promotions: Promotions[];
}

const PromotionCard = ({ promotions }: PromotionCardProps) => {
  const navigation = useAppNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const openPromotionDetail = (id: number) => {
    navigation.navigate('PromotionDetail', { id });
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderPromotionItem = ({
    item,
    index,
  }: {
    item: Promotions;
    index: number;
  }) => {
    const scale = scrollX.interpolate({
      inputRange: [
        (index - 1) * screenWidth,
        index * screenWidth,
        (index + 1) * screenWidth,
      ],
      outputRange: [1, 1.1, 1],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.promotionItem, { transform: [{ scale }] }]}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => openPromotionDetail(item.Id)}
        >
          <Image source={{ uri: item.ImageUrl }} style={styles.promotionImage} />
          <View style={styles.promotionContent}>
            <View style={styles.brandIconContainer}>
              <Image
                source={{ uri: item.BrandIconUrl }}
                style={styles.brandIcon}
              />
            </View>
            <View style={styles.remainingTextContainer}>
              <Text style={styles.remainingText}>
                son gün {item.RemainingText}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.promotionDescription}>
          {stripHtmlTags(item?.Title)}
        </Text>
        <Text style={[styles.moreText, { color: item.ListButtonTextBackGroudColor }]}>
          Daha Daha
        </Text>
      </Animated.View>
    );
  };

  const renderIndicator = () => (
    <View style={styles.indicatorContainer}>
      {promotions.map((_, index) => {
        const dotWidth = scrollX.interpolate({
          inputRange: [
            (index - 1) * screenWidth,
            index * screenWidth,
            (index + 1) * screenWidth,
          ],
          outputRange: [8, 16, 8],
          extrapolate: 'clamp',
        });

        const dotOpacity = scrollX.interpolate({
          inputRange: [
            (index - 1) * screenWidth,
            index * screenWidth,
            (index + 1) * screenWidth,
          ],
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        const dotColor = activeIndex === index ? promotions[index].ListButtonTextBackGroudColor : '#ccc';

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity: dotOpacity,
                backgroundColor: dotColor,
              },
            ]}
          />
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={promotions}
        horizontal
        pagingEnabled
        snapToInterval={screenWidth - 60}
        decelerationRate="fast"
        renderItem={renderPromotionItem}
        keyExtractor={item => item.Id.toString()}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        contentContainerStyle={styles.contentContainer}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      {renderIndicator()}
    </View>
  );
};

export default PromotionCard;

const styles = StyleSheet.create({
  container: {
    height: 'auto',
  },
  contentContainer: {
    paddingHorizontal: 36,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 30,
  },
  promotionItem: {
    borderWidth: 1,
    borderColor: '#ECEEEF',
    width: screenWidth - 90,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    height: 370,
    marginTop: 20,
    marginBottom: 30,
  },
  promotionImage: {
    width: 300,
    height: 247,
    borderRadius: 30,
    borderBottomLeftRadius: 100,
  },
  promotionContent: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
  },
  brandIcon: {
    borderRadius: 50,
    width: 55,
    height: 55,
  },
  separator: {
    width: 10,
  },
  brandIconContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
  },
  remainingTextContainer: {
    position: 'absolute',
    bottom: 30,
    right: 10,
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
  promotionDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  moreText: {
    fontSize: 14,
    color: '#00f',
    marginTop: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginHorizontal: 4,
  },
});

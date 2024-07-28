import React, {useState, useRef} from 'react';
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
import {Promotions} from '../types/types';
import {useAppNavigation} from '../navigation/utils/useAppNaavigation';

const {width: screenWidth} = Dimensions.get('window');

interface PromotionCardProps {
  promotions: Promotions[];
}

const PromotionCard = ({promotions}: PromotionCardProps) => {
  const navigation = useAppNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const openPromotionDetail = (id: number) => {
    navigation.navigate('PromotionDetail', {id});
  };
  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false},
  );

  const handleViewableItemsChanged = ({viewableItems}: any) => {
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
      <Animated.View style={[styles.promotionItem, {transform: [{scale}]}]}>
        <TouchableOpacity style={{backgroundColor:'red'}} onPress={() => openPromotionDetail(item.Id)}>
          <Image source={{uri: item.ImageUrl}} style={styles.promotionImage} />
          <View style={styles.promotionContent}>
            <Image source={{uri: item.BrandIconUrl}} style={styles.brandIcon} />
            <Text style={styles.remainingText}>
              son {item.RemainingText} gün
            </Text>
            <Text style={styles.moreText}>Daha Daha</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderIndicator = () => {
    return (
      <View style={styles.indicatorContainer}>
        {promotions.map((_, i) => {
          const width = scrollX.interpolate({
            inputRange: [
              (i - 1) * screenWidth,
              i * screenWidth,
              (i + 1) * screenWidth,
            ],
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange: [
              (i - 1) * screenWidth,
              i * screenWidth,
              (i + 1) * screenWidth,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View key={i} style={[styles.dot, {width, opacity}]} />
          );
        })}
      </View>
    );
  };

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
      />
      {renderIndicator()}
    </View>
  );
};

export default PromotionCard;

const styles = StyleSheet.create({
  container: {
    height: 406,
  },
  contentContainer: {
    paddingHorizontal: 36,
  },
  promotionItem: {
    width: screenWidth - 70,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promotionImage: {
    width: 300,
    height: 230,
  },
  promotionContent: {
    padding: 10,
    backgroundColor: '#fff',
  },
  brandIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
  },
  remainingText: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#000',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  promotionText: {
    fontSize: 14,
    color: '#555',
  },
  moreText: {
    fontSize: 14,
    color: '#00f',
    marginTop: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginHorizontal: 4,
  },
});

import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TagType} from '../types/types';

interface TagsProps {
  tags: TagType[];
}

const Tags = ({tags}: TagsProps) => {
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);

  const handleTagPress = (id: number) => {
    setSelectedTagId(prevId => (prevId === id ? null : id));
  };

  const renderTagItem = ({item}: {item: TagType}) => (
    <TouchableOpacity onPress={() => handleTagPress(item.Id)}>
      <View
        style={[
          styles.itemContainer,
          selectedTagId === item.Id && styles.selectedItem,
        ]}>
        <Image source={{uri: item.IconUrl}} style={styles.image} />
        <Text style={styles.text}>{item.Name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.tagView}>
      <FlatList
        data={tags}
        horizontal
        keyExtractor={tag => tag.Id.toString()}
        renderItem={renderTagItem}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({
  tagView: {
    marginVertical: 20,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECEEEF',
  },
  selectedItem: {
    borderColor: '#F40000',
  },
  separator: {
    width: 5,
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
    color: '#1D1E1E',
    fontSize: 12,
    paddingLeft: 2,
  },
});

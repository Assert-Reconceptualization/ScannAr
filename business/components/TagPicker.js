/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Picker, StyleSheet, View } from 'react-native';
import BusinessContext from '../applicationState/BusinessContext';

export default function TagPicker(props) {
  const { currentTag, setCurrentTag } = props;
  const { tags } = useContext(BusinessContext);

  const { picker, pickerContainer } = styles;

  return (
    <View style={pickerContainer}>
      <Picker
        style={picker}
        itemStyle={{ height: 100 }}
        selectedValue={currentTag}
        onValueChange={(pickedTag) => setCurrentTag(pickedTag)}
      >
        <Picker.Item color="white" label="choose tag" value="default" key={0} />
        {tags.map((tag) => (
          <Picker.Item
            key={tag.id}
            label={tag.name}
            value={tag.name}
            color="white"
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    width: 175,
    height: 100,
    backgroundColor: 'transparent',
  },
});

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
        selectedValue={currentTag}
        onValueChange={(pickedTag) => setCurrentTag(pickedTag)}
      >
        <Picker.Item color="white" label="choose tag" value="default" key={0} />
        {tags.map((tag) => (
          <Picker.Item
            key={tag.id}
            label={tag.name}
            value={tag.name}
            color="#EFF6E0"
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    width: 175,
    backgroundColor: 'transparent',
  },
  pickerContainer: {
    marginTop: 10,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#AEC3B0',
    backgroundColor: '#1E241F',
  },
});

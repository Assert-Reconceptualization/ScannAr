import React, { useState, useContext } from 'react';
import { Picker, StyleSheet } from 'react-native';
import BusinessContext from '../applicationState/BusinessContext';

export default function TagPicker(props){
  const { currentTag, setCurrentTag } = props;
  const { tags } = useContext(BusinessContext);

  const { container } = styles;

  return (
    <Picker
      style={container}
      selectedValue={currentTag}
      onValueChange={(pickedTag) => setCurrentTag(pickedTag)}
    >
      <Picker.Item
        label="choose tag"
        value="default"
        key={0}
      />
      {tags.map(tag => (
        <Picker.Item
          key={tag.id}
          label={tag.name}
          value={tag.name}
        />
      ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 175,
    backgroundColor: 'white',
  }
});
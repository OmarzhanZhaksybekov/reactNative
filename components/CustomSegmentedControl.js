import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomSegmentedControl = ({ values, selectedIndex, onChange }) => {
  return (
    <View style={styles.container}>
      {values.map((value, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.segment,
            {
              borderRadius: index === 0 ? 16 : 0,
              borderTopLeftRadius: index === 0 ? 16 : 0,
              borderBottomLeftRadius: index === 0 ? 16 : 0,
              borderBottomRightRadius: index === values.length - 1 ? 16 : 0,
              borderTopRightRadius: index === values.length - 1 ? 16 : 0,
            },
            index === selectedIndex && styles.selectedSegment
          ]}
          onPress={() => onChange(index)}
        >
          <Text style={[
            styles.text,
            index === selectedIndex && styles.selectedText
          ]}>
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSegment: {
    backgroundColor: '#007BFF',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  selectedText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CustomSegmentedControl;

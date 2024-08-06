import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Svg, G, Path, Rect } from 'react-native-svg';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import ImageViewer from 'react-native-image-zoom-viewer';

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
        <TouchableOpacity style={styles.backButton}>
          <Svg version="1.1" width="20" height="20" viewBox="0 0 256 256">
            <G style={{ stroke: 'none', strokeWidth: 0, fill: 'black' }} transform="scale(2.81)">
              <Path d="M 65.75 90 c 0.896 0 1.792 -0.342 2.475 -1.025 c 1.367 -1.366 1.367 -3.583 0 -4.949 L 29.2 45 L 68.225 5.975 c 1.367 -1.367 1.367 -3.583 0 -4.95 c -1.367 -1.366 -3.583 -1.366 -4.95 0 l -41.5 41.5 c -1.367 1.366 -1.367 3.583 0 4.949 l 41.5 41.5 C 63.958 89.658 64.854 90 65.75 90 z" />
            </G>
          </Svg>
        </TouchableOpacity>
        <Text style={styles.title}>Удостоверение личности</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.segmentWrapper}>
          <SegmentedControl
            values={['Документ', 'Реквизиты']}
            selectedIndex={selectedIndex}
            onChange={(event) => {
              setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            style={styles.segment}
            fontStyle={{fontSize: "15px"}}
            textStyle={styles.segmentText}
            selectedTextStyle={styles.selectedSegmentText}
          />
        </View>

        <View style={styles.imageContainer}>
          <Image source={require('./assets/udos.jpg')} style={styles.image} />
        </View>

        <View style={styles.divider} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.showButton}>
            <Text style={styles.buttonText}>Предъявить документ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton}>
            <Text style={{fontSize: 16, color: 'rgb(42, 133, 212)', fontWeight: '600', alignSelf: 'center'}}>Отправить документ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    padding: 16,
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomWidth: 0,
    elevation: 0,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  segmentWrapper: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 16,
    height: 'auto'
  },
  segment: {
    height: 38,
  },
  segmentText: {
    fontSize: 18,
  },
  selectedSegmentText: {
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 16
  },
  imageContainer: {
    width: '125%',
    marginVertical: 16,
    alignSelf: 'center',
    height: 'auto', // Ensure the container has a fixed height
    marginVertical: 16,
    alignSelf: 'center',
    overflow: 'hidden', // Ensure no overflow issues
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain'
  },
  divider: {
    width: '120%', // Full width
    height: 1,     // Height of the divider
    backgroundColor: '#EEEDED',
    marginVertical: 16,
    alignSelf: 'center',
    top: 35,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  showButton: {
    backgroundColor: 'rgb(42, 133, 212)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 55,
    width: '100%',
    justifyContent: 'center',
    top: 34,
  },
  sendButton: {
    backgroundColor: 'white',
    borderColor: 'rgb(42, 133, 212)',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: '100%',
    justifyContent: 'center',
    height: 55,
    top: 35,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    alignSelf: 'center'
  },
});

export default App;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
} from "react-native";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  State,
  PanGestureHandler
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Svg, G, Path } from "react-native-svg";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { withTiming } from "react-native-reanimated";
import { Share } from "react-native";
import QRCode from "react-native-qrcode-svg";

const App = () => {
  const [isModalVisible, setModalVisible] = useState(false)
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const handleGesture = (event) => {
    if (event.nativeEvent.translationY < 100){
      setModalVisible(false)
    }
  }

  const [selectedIndex, setSelectedIndex] = useState(0);
  const slideX = useSharedValue(0)

  const scale = useSharedValue(1); // Текущий масштаб
  const lastScale = useSharedValue(1); // Сохранённый масштаб

  const MIN_SCALE = 0.1; // Минимальный масштаб (исходный)
  const ORG_SCALE = 1;
  const MAX_SCALE = 6; // Максимальный масштаб

  const onPinchEvent = (event) => {
    // Ограничиваем масштаб
    scale.value = Math.max(
      MIN_SCALE,
      Math.min(lastScale.value * event.nativeEvent.scale, MAX_SCALE)
    );
  };

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      // Если масштаб стал меньше 1, сбрасываем масштаб
      if (scale.value < 1) {
        scale.value = withTiming(1, { duration: 300 }); // Плавно возвращаем к исходному размеру
        lastScale.value = 1
      }

      if (scale.value > 1){
        lastScale.value = scale.value
      }
    }
  };
  

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleShareDocument = async () => {
    try{
      const result = await Share.share({
        url: './assets/021105501362-20241107194509046.pdf',
        title: "Отправить документ"
      })
    } catch(error){
      console.error("error". error); 
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
          <TouchableOpacity style={styles.backButton}>
            <Svg version="1.1" width="20" height="20" viewBox="0 0 256 256">
              <G
                style={{ stroke: "none", strokeWidth: 0, fill: "black" }}
                transform="scale(2.81)"
              >
                <Path d="M 65.75 90 c 0.896 0 1.792 -0.342 2.475 -1.025 c 1.367 -1.366 1.367 -3.583 0 -4.949 L 29.2 45 L 68.225 5.975 c 1.367 -1.367 1.367 -3.583 0 -4.95 c -1.367 -1.366 -3.583 -1.366 -4.95 0 l -41.5 41.5 c -1.367 1.366 -1.367 3.583 0 4.949 l 41.5 41.5 C 63.958 89.658 64.854 90 65.75 90 z" />
              </G>
            </Svg>
          </TouchableOpacity>
          <Text style={styles.title}>Удостоверение личности</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.segmentWrapper}>
            <SegmentedControl
              values={["Документ", "Реквизиты"]}
              selectedIndex={selectedIndex}
              style={styles.segment}
              fontStyle={{ fontSize: "15px" }}
              textStyle={styles.segmentText}
              selectedTextStyle={styles.selectedSegmentText}
            />
          </View>

          <View style={styles.zoomContainter}>
            <PinchGestureHandler
              onGestureEvent={onPinchEvent}
              onHandlerStateChange={onPinchStateChange}
            >
              <Animated.View style={[styles.imageContainer, animatedStyle]}>
                <Image
                  source={require("./assets/udos.jpg")}
                  style={styles.image}
                />
              </Animated.View>
            </PinchGestureHandler>
          </View>

          <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={toggleModal}>
            <View style={styles.modalOverlay}>
              <PanGestureHandler onGestureEvent={handleGesture}>
                <View style={styles.modalContainer}>
                  {/* Заголовок */}
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Удостоверение личности</Text>
                    <TouchableOpacity onPress={toggleModal}>
                      <Image style={{width: '28', height: '28'}} source={require('./assets/X.png')}/>
                    </TouchableOpacity>
                  </View>
                  
                  {/* Инструкции */}
                  <Text style={styles.instructions}>Покажите QR-код сотруднику</Text>
                  
                  {/* QR-код */}
                  <Image style={styles.qr} source={require('./assets/qrcode.jpeg')}></Image>
                  
                  {/* Подсказка */}
                  <Text style={styles.orText}>или скажите код</Text>
                  
                  {/* 6-значный код */}
                  <Text style={styles.code}>{generateCode()}</Text>
                </View>
              </PanGestureHandler>

            </View>
          </Modal>
          

          <View style={styles.divider} />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.showButton} onPress={toggleModal}>
              <Image
                source={require("./assets/qr.png")}
                style={{ width: 20, height: 20, right: 6 }}
              />
              <Text style={styles.buttonText}>Предъявить документ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton} onPress={handleShareDocument}>
              <Image
                source={require("./assets/share.png")}
                style={{ width: 20, height: 20, right: 9 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "rgb(42, 133, 212)",
                  fontWeight: "600",
                  alignSelf: "center",
                }}
              >
                Отправить документ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  zoomContainter: {
    position: 'relative',
    height: 580,
    right: '18',
    bottom: '',
    width: '109%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    padding: 16,
  },
  header: {
    backgroundColor: "white",
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomWidth: 0,
    elevation: 0,
    zIndex: 2,
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
  },
  segmentWrapper: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 16,
    height: "auto",
  },
  segment: {
    height: 38,
  },
  segmentText: {
    fontSize: 18,
  },
  selectedSegmentText: {
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 16,
  },
  slideContainer: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  imageContainer: {
    width: "125%",
    marginVertical: 16,
    alignSelf: "center",
    height: "auto", // Ensure the container has a fixed height
    marginVertical: 16,
    alignSelf: "center",
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    position: 'relative',
    bottom: '37',
    width: "90%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  divider: {
    width: "120%", // Full width
    height: 1, // Height of the divider
    backgroundColor: "#EEEDED",
    marginVertical: 16,
    alignSelf: "center",
    position: 'relative',
    bottom: '16',
  },
  buttonContainer: {
    position: 'relative',
    bottom: '48',
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    width: "100%",
    height: "auto",
  },
  showButton: {
    backgroundColor: "rgb(42, 133, 212)",
    paddingVertical: 12,
    flexDirection: "row", // Arrange icon and text in a row
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 55,
    width: "100%",
    justifyContent: "center",
    top: 34,
  },
  sendButton: {
    backgroundColor: "white",
    borderColor: "rgb(42, 133, 212)",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: "100%",
    justifyContent: "center",
    height: 55,
    top: 35,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    alignSelf: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end", // Обеспечивает, чтобы окно было внизу
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%", // Устанавливаем ширину на 100%
    alignItems: "center",
    height: '411'
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  qr: {
    position: 'relative',
    bottom: '11',
    width: "140",
    height: '140'
  },
  orText: {
    position: 'relative',
    bottom: '5',
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  code: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgb(0, 0, 0)",
    marginTop: 10,
    position: 'relative',
    bottom: '10'
  },
});

export default App;
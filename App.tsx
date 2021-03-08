import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');

const DraggableBox = (props) => {
  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);
  const lastOffset = { x: 0, y: 0 };

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  const onHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastOffset.x += event.nativeEvent.translationX;
      lastOffset.y += event.nativeEvent.translationY;
      translateX.setOffset(lastOffset.x);
      translateX.setValue(0);
      translateY.setOffset(lastOffset.y);
      translateY.setValue(0);
    }
  };

  return (
    <PanGestureHandler
      {...props}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={[
          styles.draggableBox,
          {
            transform: [{ translateX: translateX }, { translateY: translateY }],
          },
        ]}
      >
        {props.children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default function App() {
  return (
    <View>
      <StatusBar hidden />
      <Image
        style={styles.backgroundImage}
        source={{
          uri:
            'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        }}
      />
      <View style={styles.contentContainer}>
        <DraggableBox>
          <BlurView
            tint='default'
            intensity={95}
            style={[styles.cardContainer]}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.2)']}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <Text style={styles.text}>Glassmorphism</Text>
            </LinearGradient>
          </BlurView>
        </DraggableBox>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height,
    width,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: 350,
    height: 200,
    backgroundColor: 'green',
    borderRadius: 20,
    overflow: 'hidden',
  },
  card: {
    height: '100%',
    width: '100%',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    borderWidth: 0.5,
  },
  text: {
    fontSize: 25,
    color: '#fff',
    alignSelf: 'center',
  },
  draggableBox: {
    borderRadius: 20,
    overflow: 'hidden',
  },
});

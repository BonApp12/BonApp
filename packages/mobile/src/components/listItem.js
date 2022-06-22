import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import {PanGestureHandler} from "react-native-gesture-handler";
import {FontAwesome5} from "@expo/vector-icons";

const LIST_ITEM_HEIGHT = 70;
const SCREEN_WIDTH = Dimensions.get('window').width;

const TRANSLATE_X_THRESHOLD = SCREEN_WIDTH * 0.3;
const ListItem = ({task, onDismiss, openModal}) => {
    const translateX = useSharedValue(0);
    const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
    const marginVertical = useSharedValue(10);
    const opacity = useSharedValue(1);

    const panGesture = useAnimatedGestureHandler({
        onActive: (event) => {
            translateX.value = event.translationX;
        },
        onEnd: () => {
            const shouldBeDismissed = translateX.value < -TRANSLATE_X_THRESHOLD;
            const shouldOpenModal = translateX.value > TRANSLATE_X_THRESHOLD;
            if (shouldBeDismissed) {
                translateX.value = withTiming(-SCREEN_WIDTH);
                itemHeight.value = withTiming(0);
                marginVertical.value = withTiming(0);
                opacity.value = withTiming(0, undefined, (isFinished) => {
                    if (isFinished) {
                        runOnJS(onDismiss)(task.index);
                    }
                });

            } else if (shouldOpenModal) {
                runOnJS(openModal)(task);
                translateX.value = withTiming(0);
            } else {
                translateX.value = withTiming(0);
            }

        }
    });


    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }));
    const rIconContainerStyle = useAnimatedStyle(() => {
        const opacity = withTiming(
            Math.abs(translateX.value * 2.5) > TRANSLATE_X_THRESHOLD ? 1 : 0
        );
        return {opacity};
    });
    const rTaskContainerStyle = useAnimatedStyle(() => {
        return {
            height: itemHeight.value,
            marginVertical: marginVertical.value,
            opacity: opacity.value,
        };
    });

    return (
        <Animated.View style={[styles.taskContainer, rTaskContainerStyle]}>
            <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
                <FontAwesome5 name={"trash-alt"} size={LIST_ITEM_HEIGHT * 0.4} color={'red'}/>
            </Animated.View>
            <Animated.View style={[styles.iconContainer, styles.iconContainerInfo, rIconContainerStyle]}>
                <FontAwesome5 name={"question-circle"} size={LIST_ITEM_HEIGHT * 0.4} color={'blue'}/>
                <Text style={{fontSize: 10}}>Information</Text>
            </Animated.View>
            <PanGestureHandler onGestureEvent={panGesture}>
                <Animated.View style={[styles.task, rStyle]}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                </Animated.View>
            </PanGestureHandler>
        </Animated.View>
    );
};
export default ListItem;
const styles = StyleSheet.create({
    taskContainer: {
        width: '100%',
        alignItems: 'center',
    },
    task: {
        width: '90%',
        height: LIST_ITEM_HEIGHT,
        justifyContent: 'center',
        paddingLeft: 20,
        backgroundColor: "white",
        borderRadius: 10,
        // Shadow ios
        shadowOpacity: 0.09,
        shadowOffset: {
            height: 0,
            width: 20
        },
        shadowRadius: 10,
        //Shadow for android
        elevation: 5

    },
    taskTitle: {
        fontSize: 16,
    },
    iconContainer: {
        height: LIST_ITEM_HEIGHT,
        width: LIST_ITEM_HEIGHT,
        position: 'absolute',
        right: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainerInfo: {
        left: '5%',
        color: 'blue',
    }
});

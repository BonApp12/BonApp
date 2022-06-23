import React, {forwardRef, useCallback, useImperativeHandle, useMemo, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider,} from '@gorhom/bottom-sheet';

const ModalBottom = forwardRef(({taskToDisplay}, ref) => {
    // ref
    const bottomSheetModalRef = useRef(null);

    const snapPoints = useMemo(() => ['25%', '50%'], []);
    useImperativeHandle(ref, () => ({
        handlePresentModalPress() {
            bottomSheetModalRef.current?.present();
            bottomSheetModalRef.current?.present();
        }
    }));

    const handleSheetChanges = useCallback((index) => {
        if (index === -1) {
            bottomSheetModalRef.current?.dismiss();
        }
    }, []);

    return (
        <BottomSheetModalProvider>
            <View>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    style={styles.popup}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                >
                    <View>
                        <Text>{taskToDisplay.title} Awesome 🎉</Text>
                    </View>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    popup: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    }
});

export default ModalBottom;

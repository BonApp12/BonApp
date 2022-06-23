import Toast from "react-native-toast-message";

export default function toast(type,text1,text2,position='top'){
    return Toast.show({
        type: type,
        text1: text1,
        text2: text2,
        position: position
    });
}
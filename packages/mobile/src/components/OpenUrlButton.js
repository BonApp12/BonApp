import {useCallback} from "react";
import {Alert, Linking, Text} from "react-native";
import styles from "../screens/Login/LoginStyle";

const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Impossible d'ouvrir le lien : ${url}`);
        }
    }, [url]);

    return <Text onPress={handlePress} style={styles.forgetPasswordText}>{children}</Text>;
};

export default OpenURLButton;
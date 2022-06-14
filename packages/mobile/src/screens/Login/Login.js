import {View, TextInput, ImageBackground, Pressable, Text, Linking, Alert} from "react-native";
import styles from "./LoginStyle";
import {useFonts} from "expo-font";
import {useCallback} from "react";

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


export default function Login() {
    const [loaded] = useFonts({
        'FascinateRegular': require("../../../assets/fonts/Fascinate-Regular.ttf")
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../../../assets/login-home.png")} resizeMode="cover" style={styles.image}>
                <View style={styles.containerTextTitle}>
                    <Text style={{...styles.title,fontFamily: "FascinateRegular"}}>
                        BonApp
                    </Text>
                </View>
                <View style={styles.containerInput}>
                    <TextInput
                        placeholder={'Votre email...'}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder={'Votre mot de passe...'}
                        secureTextEntry={true}
                        style={styles.input}
                    />

                    <OpenURLButton url={'http://localhost:3000/forgot-password/'}>Mot de passe oublié ?</OpenURLButton>
                    <Pressable style={styles.button} onPress={() => alert('Marwane le gros suceur')}>
                        <Text style={styles.textButton}>Se connecter</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    )
}
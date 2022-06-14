import {View, TextInput, ImageBackground, Pressable, Text} from "react-native";
import styles from "./LoginStyle";
import {useFonts} from "expo-font";
import OpenURLButton from "../../components/OpenUrlButton";

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
                    <Pressable style={styles.button} onPress={() => alert('Test')}>
                        <Text style={styles.textButton}>Se connecter</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    )
}
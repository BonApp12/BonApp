import {View, ImageBackground, Pressable, Text} from "react-native";
import styles from "./LoginStyle";
import {useFonts} from "expo-font";
import OpenURLButton from "../../components/OpenUrlButton";
import {useContext, useState} from "react";
import validateFormatEmail from "../../help/validateFormatEmail";
import Input from "../../components/Input";
import loginError from "../../errors/loginError";
import {AuthContext} from "../../context/AuthContext";

export default function Login() {
    const {login} = useContext(AuthContext);
    const [loaded] = useFonts({
        'FascinateRegular': require("../../../assets/fonts/Fascinate-Regular.ttf")
    });

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState({email: "", password: ""});

    if (!loaded) {
        return null;
    }

    const handleSubmit = () => {
        Object.keys(user).forEach(attr => {
            error[attr] =  ((attr === "email" && (!validateFormatEmail(user[attr]) || user[attr].length === 0)) || (attr === "password" && user[attr].length === 0)) ? loginError[attr] : "";
            setError({...error});
        });
        if(Object.keys(error).filter(attr => error[attr].length > 0).length === 0){
            login({email: user.email, password: user.password});
        }
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
                    <Input placeholder={'Votre email...'} changeText={(e) => setUser({...user, email: e.trim().toLowerCase()})} error={error.email}/>
                    <Input placeholder={'Votre mot de passe...'} changeText={(e) => setUser({...user, password: e})} error={error.password} secureText={true}/>

                    <OpenURLButton url={'http://localhost:3000/forgot-password/'}>Mot de passe oublié ?</OpenURLButton>
                    <Pressable style={styles.button} onPress={() => handleSubmit()}>
                        <Text style={styles.textButton}>Se connecter</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    )
}
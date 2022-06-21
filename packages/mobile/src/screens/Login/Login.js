import {View, ImageBackground, Pressable, Text, Image, Keyboard} from "react-native";
import styles from "./LoginStyle";
import {useFonts} from "expo-font";
import OpenURLButton from "../../components/OpenUrlButton";
import {useContext, useEffect, useState} from "react";
import validateFormatEmail from "../../utils/validateFormatEmail";
import Input from "../../components/Input";
import loginError from "../../errors/loginError";
import {AuthContext} from "../../context/AuthContext";
import loader from "../../../assets/loader.gif";

export default function Login() {
    const {login} = useContext(AuthContext);
    const [loaded] = useFonts({
        'FascinateRegular': require("../../../assets/fonts/Fascinate-Regular.ttf")
    });

    useEffect(() => {
        return () => {
            setLoading(false);
            setError({email: "",password: ""});
            setUser({email: "",password: ""});
        }
    },[])

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState({email: "", password: ""});

    if (!loaded) {
        return null;
    }

    const handleSubmit = () => {
        Keyboard.dismiss();
        Object.keys(user).forEach(attr => {
            error[attr] =  ((attr === "email" && (!validateFormatEmail(user[attr]) || user[attr].length === 0)) || (attr === "password" && user[attr].length === 0)) ? loginError[attr] : "";
            setError({...error});
        });
        if(Object.keys(error).filter(attr => error[attr].length > 0).length === 0) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                login({email: user.email, password: user.password});
            }, 2000);
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
                    <Pressable style={{...styles.button, height:loading ? 70 : 55}} onPress={() => handleSubmit()}>
                        <Image source={loader} style={{width:80,height:80,alignSelf:'center',position:'absolute',top:-12,display: loading ? 'flex' : 'none'}}/>
                        {!loading && (<Text style={styles.textButton}>Se connecter</Text>)}
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    )
}
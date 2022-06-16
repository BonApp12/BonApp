import {Text, TextInput, View} from "react-native";
import styles from "../screens/Login/LoginStyle";

export default function Input({placeholder, changeText, error, secureText=false}) {
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                onChangeText={changeText}
                secureTextEntry={secureText}
            />
            {error ? (
                <Text style={styles.textError}>{error}*</Text>
            ) : null}
        </View>
    )
}
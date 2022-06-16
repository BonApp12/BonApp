import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    title:{
        color: "#F97316",
        fontSize: 50,
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    forgetPasswordText: {
        color: "#fff",
        fontWeight: "bold",
        marginVertical: 10,
        textDecorationLine: "underline",
        textAlign: "right"
    },
    containerInput: {
        flex:2,
        padding: 20,
    },
    containerTextTitle: {
        flex:1,
        alignItems: "center",
        justifyContent: "space-around"
    },
    input: {
        borderWidth: 1,
        borderColor: "#fff",
        marginTop: 20,
        padding: 18,
        backgroundColor: "#fff",
        borderRadius: 18,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        shadowColor: "#000",
        elevation: 10,
    },
    button: {
        padding: 10,
        borderRadius: 10,
        color: "#fff",
        backgroundColor: "#F97316",
    },
    textButton: {
        color: "#fff",
        padding: 7,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: "center",
    },
    textError: {
        color: "#ff0000",
        marginTop: 5,
        marginLeft: 5,
        fontSize: 16,
    }
});
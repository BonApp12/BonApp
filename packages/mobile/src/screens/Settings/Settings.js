import {View, Text, Pressable} from "react-native";
import {Divider, Layout} from "@ui-kitten/components";
import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {MaterialIcons} from "@expo/vector-icons";

export function Settings(){
    const {logout} = useContext(AuthContext);
    return(
        <View style={{flex: 1}}>
            <Divider/>
            <Layout style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
                <Pressable style={{backgroundColor:'red',padding:15,borderRadius:5,width:200}} onPress={() => logout()}>
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <MaterialIcons name="logout" size={20} style={{color:'white',marginRight:5}}/>
                        <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>
                            Déconnexion
                        </Text>
                    </View>
                </Pressable>
            </Layout>
        </View>
    )
}
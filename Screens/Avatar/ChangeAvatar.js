import React from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import { avatarData } from '../../constant/data';
import HeaderTitleComponent from '../../Components/HeaderTitle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';

const ChangeAvatar = ({navigation}) => {

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={()=>{
            AsyncStorage.setItem('userData', JSON.stringify(item))
            console.log('-=-=-=-=-=-avatar-=-=-=-', item);
            
            navigation.goBack()
        }} style={styles.itemContainer}>
         <FastImage resizeMode='cover' style={styles.avatar} source={{uri:item.image, priority: FastImage.priority.low,}}/>
        </TouchableOpacity>
      );

  return (
    <View style={styles.container}>
        <HeaderTitleComponent
        title={'Select Avatar'}
        goBack={() => navigation.goBack()}
        mainStyle={styles.mainHeaderStyle}
      />
      <FlatList
      numColumns={3}
        data={avatarData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={{width:"100%", padding:10}}
        contentContainerStyle={{}}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  itemContainer:{
    flexDirection:"row",
    alignItems:"center",
    width:"30%",
    margin:5,
    height:150,
    justifyContent:"center",
    borderRadius:8,
  },
  avatar:{
    width:'100%',
    height:'100%',
    borderRadius:8,
  }
});

export default ChangeAvatar;

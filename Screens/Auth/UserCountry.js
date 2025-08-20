import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PickerComponent from "../../Components/Picker";
import Metrics from "../../Helpers/Metrics";
import Button from "../../Components/Button";
import { Colors } from "../../Helpers/Colors";
import LinearGradient from "react-native-linear-gradient";
import { CountryList, get_country_data } from "../../APIs/commonAPIsStructure";
import Images from "../../constant/images/Images";
import { SvgUri } from "react-native-svg";
import HeaderTitleComponent from "../../Components/HeaderTitle";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserCountry = ({ navigation }) => {
  const [userCountry, setUserCountry] = useState('');
  const [countryImage, setCountryImage] = useState();
  const [userCountryError, setUserCountryError] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [errorAlert, setErrorAlert] = useState(false);
  const [isPickerClick, setIsPickerClick] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState("");

  // const list = [
  //   "AFN",
  //   "AFN",
  //   "AFN",
  //   "AFN",
  //   "AFN",
  //   "AFN",
  //   "AFN",
  //   "AFN",
  //   "AFN",
  //   "AFN",
  //   "AFN",
  // ];

  const countryCodeList = async () => {
    try {
      const countryCodeList = await CountryList();
      console.log("-=-=-=-=-=-=-=--countryCode-=-=-=-=-", countryCodeList.data);
      setCountryList(countryCodeList?.data);
      setSearchData(countryCodeList?.data);
    } catch (error) {
      console.log("-=-=-=-=-=-=-=--countryError-=-=-=-=-", error);
    }
  };

  const search_text = (text) => {
    let trimText = text.replace(/\s+/g, " ");
    let newArray = [];
    for (var i = 0; i < searchData?.length; i++) {
      let item = searchData[i];
      if (item.countryCode.toLowerCase().includes(trimText?.toLowerCase())) {
        console.log("-=-=-=-=-=--=searchdata-=-=-=-=-=-=-", text, item);
        newArray.push(item);
      }
    }
    setCountryList(newArray);
 };

 const fetchCountryData=async(id)=>{
  try {
    const user_country= await get_country_data(id)
    console.log('-=-=-=-=-user_country-=-=-=-=-=-', user_country);
    global.selectedCountry=user_country
    // AsyncStorage.setItem("dialCode", JSON.stringify(user_country));
  } catch (error) {
    console.log('-=-=-=-=-user_country-=err-=-=-=-=-', error);
  }
 }

  // const renderAlertModal = () => {
  //   return (
  //     <Modal
  //       animationType="slide"
  //       transparent={true}
  //       // visible={true}
  //       visible={errorAlert}
  //       onRequestClose={() => {}}
  //     >
  //       <View style={styles.alertMsg}>
  //         <ImageBackground
  //           resizeMode="contain"
  //           source={{
  //             uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110078/empty-Cb98WcEH_xvbkrx.png",
  //           }}
  //           style={styles.imageView}
  //         >
  //           <Text
  //             numberOfLines={4}
  //             adjustsFontSizeToFit
  //             style={styles.alertMsgText}
  //           >
  //             {errorMsg}
  //           </Text>
  //           <Button
  //             buttonTitleStyle={styles.buttonText}
  //             // disabled={!isValid}
  //             full={true}
  //             buttonTitle="Ok"
  //             buttonStyle={styles.ButtonView}
  //             onButtonPress={() => {
  //               setErrorAlert(false);
  //             }} // Use Formik's handleSubmit
  //           />
  //         </ImageBackground>
  //       </View>
  //     </Modal>
  //   );
  // };

  const CountryItem = ({ item }: ItemProps) => (
    <TouchableOpacity
      onPress={() => {
        console.log("-=-=-==-item-=-=-country-=-=-=-", item);
        setUserCountry(item);
        setIsPickerClick(false);
        setCountryImage(item?.flagSvg);
        fetchCountryData(item?._id)
        setUserCountryError('')
        // AsyncStorage.setItem("dialCode", (item));
        // props.setSelectedItem(item);
        // props.code && setIsPickerClick(false);
      }}
      style={styles.selectedLanguage}
    >
      
      <View style={{ width: 30, height: 30, }}>
         <SvgUri
                preserveAspectRatio="none"
                viewBox="0 0 600 600"
                style={{
                  marginHorizontal: 1,
                  // transform: [{ rotate: "180deg" }],
                }}
                color={"#fff"}
                width={"100%"}
                height={"100%"}
                uri={item.flagSvg}
              ></SvgUri>
      </View>
      <Text style={[styles.selectedText]}>{item.countryCode}</Text>
      <Text style={[styles.selectedText,{width:100}]}>{item.countryName}</Text>
      {/* <Image style={styles.forwordIcon} source={{ uri: item.flags.png }} /> */}
    </TouchableOpacity>
  );

  const renderCountryCode = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        // visible={true}
        visible={isPickerClick}
        onRequestClose={() => {
          setIsPickerClick(false);
          // Prevent the modal from closing when pressing back button
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.countryTitle}>Select Country</Text>
              <TouchableOpacity onPress={()=>{setIsPickerClick(false)}} style={styles.closeImg}>
                <FastImage
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                  source={{
                    uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907850/close_y7vfld.png",
                    priority: FastImage.priority.normal,
                  }}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Search"
              onChangeText={(text) => {
                setSearch(text);
                search_text(text.trim());
              }}
              value={search}
              keyboardType="email-address"
            />
            <FlatList
              // data={countryList.data}
              data={countryList}
              renderItem={({ item }) => <CountryItem item={item} />}
              keyExtractor={(item) => item.id}
              style={{ height: 600 }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  useEffect(() => {
    countryCodeList();
    // console.log(
    //   "-=-=-=-=-=countryError-=-=--countryError-=-=-=-=-",
    //   countryList
    // );
  }, []);

  return (
    <LinearGradient
      colors={["#962f2a", "#ba4940", "#d35c50"]}
      style={styles.container}
    >
      <HeaderTitleComponent
        goBack={() => navigation.goBack()}
        style={styles.mainHeaderStyle}
        title={"Select Country Code"}
      />
      <View style={{ flex: 0.8, justifyContent: "center" , alignSelf:"center"  }}>
        <TouchableOpacity
          onPress={() => {
            setIsPickerClick(true);
          }}
          style={styles.passwordContainer}
        >
          <Text style={styles.selectedCountryStyle}>
            {userCountry ? userCountry.countryCode : "Select Country"}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: 30, height: 30, marginRight: 10 }}>
            <SvgUri
                preserveAspectRatio="none"
                viewBox="0 0 600 600"
                style={{
                  marginHorizontal: 1,
                  // transform: [{ rotate: "180deg" }],
                }}
                color={"#fff"}
                width={"100%"}
                height={"100%"}
                uri={countryImage}
              ></SvgUri>
            </View>
            <View style={styles.imgView}>
              <SvgUri
                preserveAspectRatio="xMinYMin slice"
                style={{
                  marginHorizontal: 1,
                  transform: [{ rotate: "180deg" }],
                }}
                color={"#000"}
                width={"100%"}
                height={"100%"}
                uri={
                  "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123452/svgviewer-output_20_mho6rp.svg"
                }
              ></SvgUri>
              {/* <Image style={styles.down_arrow} source={Images.down_arrow} /> */}
            </View>
          </View>
        </TouchableOpacity>
        {userCountryError && (
          <Text style={{ ...styles.errorText }}>{userCountryError}</Text>
        )}
        
      </View>
      <View style={{flex:0.23,  justifyContent:"flex-start",}}>
         <Button
        buttonTitleStyle={styles.buttonTextStyle}
        buttonStyle={styles.loginButton}
        buttonTitle={"Continue"}
        full={true}
        onButtonPress={() => {
          console.log("-=-=-=-=-Done=-=-=-=-", userCountry, userCountry == "");

          if (userCountry == undefined || userCountry == "") {
            setUserCountryError("Please select your country.");
          } else {
            navigation.navigate("Register", { user_country: userCountry });
          }
        }}
      />
      </View>
     
     
      {renderCountryCode()}
      {/* {renderAlertModal()} */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#962f2a",
    paddingHorizontal: 15,
    // justifyContent: "center",
  },
  mainHeaderStyle: {
    backgroundColor: "transparent",
    paddingVertical: Metrics.rfv(10),
  },
  errorText: {
    color: "#fff",
    fontSize: Metrics.rfv(12),
    marginTop:Metrics.rfv(10)
  },
  title: {
    fontSize: Metrics.rfv(15),
    fontWeight: "bold",
    marginTop: Metrics.rfv(10),
    color: Colors.white,
  },
  itemStyle: {
    color: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderBottomWidth: 1,
    marginTop: Metrics.rfv(5),
    backgroundColor: "#fff",
    // borderBottomColor: "#dedee0",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    width:"60%",
    borderRadius:8,
    paddingVertical:13
    
  },
  buttonTextStyle: {
    color: "#962f2a",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#fff",
    paddingVertical: Metrics.rfv(8),
    // paddingHorizontal: Metrics.rfv(48),
    borderRadius: 8,
    // marginTop: "auto",
    marginBottom: Metrics.rfv(15),
    alignSelf:"center",
    width:"40%",
   
  },
  alertMsg: {
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    minHeight: "100%",
    position: "absolute",
    // height:'100%',
    // justifyContent:"center",
    // alignItems:"center"
  },
  imageView: {
    width: 400,
    height: 800,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  alertMsgText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    width: 120,
    // marginBottom:15
  },
  ButtonView: {
    backgroundColor: "#962f2a",
    // width:'70%',
    alignSelf: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 40,
    margin: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 15,
    color: "#fff",
    fontWeight: "700",
  },
  listContainer: {
    borderColor: "#dedee0",
    borderWidth: 1,
    borderRadius: Metrics.rfv(10),
    width: "100%",
    // height:Metrics.rfv(40),
    marginRight: Metrics.rfv(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  imgView: {
    width: 25,
    height: 25,
  },
  down_arrow: {
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    // alignItems:"center",
    flex: 1,
    // position:"absolute"
  },

  modalView: {
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    padding: 15,
    margin: 15,
    height: 500,
    width:"80%",
    alignSelf:"center"
  },
  countryTitle: {
    color: "#000",
    fontSize: Metrics.rfv(19),
    fontWeight: "700",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Metrics.rfv(20),
  },
  closeImg: {
    width: 30,
    height: 30,
  },
  registerButton: {
    // borderColor: '#962f2a',
    // borderWidth: 1,
    paddingVertical: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(25),
    borderRadius: 8,
    backgroundColor: "#962f2a",
    alignSelf: "center",
  },
  regButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  selectedLanguage: {
    padding: 15,
    borderBottomColor: "#dedee0",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedText: {
    color: "#000",
    fontSize: 15,
  },
  forwordIcon: {
    width: 20,
    height: 20,
  },
  input: {
    // height: Metrics.rfv(50),
    borderColor: "#C2C2C2",
    borderWidth: 1,
    borderRadius: Metrics.rfv(10),
    marginBottom: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(10),
    fontSize: Metrics.rfv(16),
  },
  selectedCountryStyle:{
    color:"#000",
    // fontWeight:"700",
    fontSize:Metrics.rfv(16)
  }
});
export default UserCountry;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
  Button,
  Modal,
  FlatList,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Metrics from '../../Helpers/Metrics';
import AuthStore from '../../reduxToolkit/AuthStore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PageWrapperView from '../../Components/PageWrapperView';
import {Colors} from '../../Helpers/Colors';
import Moment from 'moment';
import {Fonts, FONT_SIZE, currencies} from '../../constant/data';
import HeaderTitleComponent from '../../Components/HeaderTitle';
import Svg, {Path, Rect, SvgUri} from 'react-native-svg';
import PickerComponent from '../../Components/Picker';
import Images from '../../constant/images/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { user_profile } from '../../APIs/commonAPIsStructure';
import FastImage from 'react-native-fast-image';
import TimeZoneComponent from '../../Components/TimeZoneComponent';
import CustomToast from '../../Components/CustomToast';
// import Header from '../../Components/Header';

const {width, height} = Dimensions.get('window');

const PersonalDetails = ({navigation, route}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {logout} = AuthStore();
  const [timeZones, setTimeZones] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [currencyModal, setCurrencyModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [userData, setUserData] = useState();
  const [isToast, setIsToast] = useState(false);
  // const {userInfo} = route?.params
  let userInfo = route?.params

  const handleLogout = () => {
    console.log('Logged out', isModalVisible);
    logout();
  };
  const get_uer_data=async()=>{
    let token= userInfo?.userData?.token,
    id = userInfo?.userData?.user?._id
     const userProfile= await user_profile(token, id)
     console.log('-=-=-=-=-userProfile-=-=-userProfile-=-=-', userProfile);
     setUserData(userProfile)
  }

  useEffect(() => {
    get_uer_data()
    console.log('-=-=-=-=-=-=-=-info-=-=-=-=-=-=-',userInfo );
  }, [])
 

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contact: Yup.string()
      .required('Contact is required')
      .min(10, 'Contact must be at least 10 digits'),
    dateOfBirth: Yup.string().required('Date of Birth is required'),
  });

  const renderItem = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={currencyModal}
        onRequestClose={() => {
          setCurrencyModal(false);
          // Prevent the modal from closing when pressing back button
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.languageTitle}>
              <View />
              <Text style={styles.modalText}>Select Currency</Text>
              <TouchableOpacity onPress={() => setCurrencyModal(false)}>
                <FastImage style={styles.closeImage} source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907850/close_y7vfld.png', priority: FastImage.priority.low,}} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={currencies}
              renderItem={({item, index}) => (
                // console.log('-=-=-=-=-=-==-all-=-=-=-=-', item)
                <TouchableOpacity
                  onPress={() => {
                    setSelectedCurrency(item.currency);
                    console.log('item----', item.value, index);
                  }}
                  style={styles.selectedLanguage}>
                  <Text style={styles.selectedText}>{item.currency}</Text>
                  {item.currency == selectedCurrency && (
                    <FastImage style={styles.forwordIcon} source={{uri:"https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907849/tick_ctsqt5.png", priority: FastImage.priority.low,}} />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => {
                // i18next.changeLanguage(selectedCurrency),
                setCurrencyModal(false);
              }}
              style={styles.selectLanguageButton}>
              <Text style={styles.selectText}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <PageWrapperView statusBar={{background: '#a32324'}}>
     <HeaderTitleComponent
        title={'Personal Details'}
        goBack={() => navigation.goBack()}
        mainStyle={styles.mainHeaderStyle}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.backgroundContainer}></View>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <View>
              <View style={styles.profileHeader}>
                <FastImage
                  source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907465/c1_ebm7jm.jpg', priority: FastImage.priority.low,}}
                  style={styles.userIcon}
                />
                <View style={styles.profileTextContainer}>
                  <Text style={styles.profileName}>{userInfo?.userData?.user?.userName?userInfo?.userData?.user?.userName:'UserName'}</Text>
                  <View style={styles.uidContainer}>
                    <Text style={styles.profileDetail}>UID</Text>
                    <Text style={styles.profileDetail}>|</Text>
                    <Text style={styles.profileDetail}>{userInfo?.userData?.user?.invitation_code?userInfo?.userData?.user?.invitation_code:'---'}</Text>
                    <TouchableOpacity  onPress={() => {
                        setIsToast(true),
                          setTimeout(() => {
                            setIsToast(false);
                          }, 3000);
                      }}>
                    <View style={{width: 20, height: 20}}>
                <SvgUri
                preserveAspectRatio='xMinYMin slice'
                  style={{marginHorizontal: 1}}
                  color={'#fff'}
                  width={'100%'}
                  height={'100%'}
                  uri={
                    'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123449/svgviewer-output_5_fnbjly.svg'
                  }></SvgUri>
              </View>   
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.lastLogin}>
                    Last Login: {Moment(userInfo?.userData?.user?.lastLogin).format('MMMM Do YYYY, h:mm:ss a')}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <Formik
            initialValues={{
              fullName: '',
              email: '',
              contact: '',
              dateOfBirth: '',
              timeZone:'',
              country:'',
              currency:''
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              // Alert.alert('Form Submitted', JSON.stringify(values));
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              resetForm,
            }) => (
              <View style={styles.formContainer}>
                {/* <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                /> */}
                {/* {errors.fullName && touched.fullName && (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                )} */}
                <Text style={styles.label}>Email</Text>
                <TextInput
                editable={false}
                  style={styles.input}
                  // placeholder={'---'}
                  placeholder={userInfo?.userData?.user?.email?userInfo?.userData?.user?.email:"---"}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                editable={false}
                  style={styles.input}
                  // placeholder={'---'}
                  placeholder={`${userInfo?.userData?.user?.phone?userInfo?.userData?.user?.phone:'---'}`}
                  onChangeText={handleChange('contact')}
                  onBlur={handleBlur('contact')}
                  value={values.contact}
                  keyboardType="phone-pad"
                />
                {errors.contact && touched.contact && (
                  <Text style={styles.errorText}>{errors.contact}</Text>
                )}
                 {/* <Text style={styles.label}>Date of Birth</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Date of Birth"
                  onChangeText={handleChange('dateOfBirth')}
                  onBlur={handleBlur('dateOfBirth')}
                  value={values.dateOfBirth}
                />
                {errors.dateOfBirth && touched.dateOfBirth && (
                  <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
                )} */}
                 <Text style={styles.label}>Time Zone</Text>
                 <View style={styles.passwordContainer}>
                 <TimeZoneComponent
                 isCurrency={true}
                          code={true}
                          data={timeZones}
                          title={'TimeZone'}
                          selectedItem={
                            global.selectedCountry?.timeZone
                              ? global.selectedCountry?.timeZone
                              : "---"
                          }
                          // setSelectedItem={(itemValue) => {
                          //   let dialingCode= itemValue? itemValue:selectedCountry
                          //   console.log("-=-=-=-=-=-=item-=-=-=-=00000-", dialingCode);
                          //   AsyncStorage.setItem("dialCode", dialingCode);
                          //   setSelectedCountry(dialingCode);
                          // }}
                        />
                        {/* <PickerComponent
                          isCurrency={true}
                          data={timeZones}
                          title={'Select'}
                          selectedItem={selectedTime}
                          setSelectedItem={itemValue => {
                            console.log('-=-=-=-=-=-=item-=-=-=-=-', itemValue);
                            setSelectedTime(itemValue.name);
                          }}
                        /> */}
                      </View>
                {errors.timeZone && touched.timeZone && (
                  <Text style={styles.errorText}>{errors.timeZone}</Text>
                )}
                 <Text style={styles.label}>Country</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`${global.selectedCountry?.country?.countryName}`}
                  onChangeText={handleChange('Country')}
                  onBlur={handleBlur('Country')}
                  value={values.country}
                />
                {errors.country && touched.country && (
                  <Text style={styles.errorText}>{errors.country}</Text>
                )}
                 <Text style={styles.label}>Currency</Text>
                 <TouchableOpacity onPress={()=>{
                  setCurrencyModal(true);
                 }} style={styles.currencyModal}>
                  <Text style={styles.currencyStyle}>{global.selectedCountry?.currency?.symbol}</Text>
                  </TouchableOpacity>
                {/* <TextInput
                  style={styles.input}
                  placeholder="Currency"
                  onChangeText={handleChange('currency')}
                  onBlur={handleBlur('currency')}
                  value={values.currency}
                /> */}
                {errors.currency && touched.currency && (
                  <Text style={styles.errorText}>{errors.currency}</Text>
                )}

                {/* <View style={styles.buttonContainer}> */}
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={()=>{navigation.goBack()}}>
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {navigation.goBack()}}>
                    <Text style={[styles.buttonText,{ color: Colors.Primary_100,}]}>Cancel</Text>
                  </TouchableOpacity>
                {/* </View> */}
              </View>
            )}
          </Formik>
          {isToast && <CustomToast isToast={isToast} onRequestClose={()=>{setIsToast(false)}}/>}
          {currencyModal && renderItem()}
        </View>
      </ScrollView>
    </PageWrapperView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: Metrics.rfv(20),
    paddingBottom: Metrics.rfv(100),
  },
  label: {
    color: Colors.black,
    fontSize: FONT_SIZE.medium,
    paddingVertical: Metrics.rfv(5),
  },
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
  },
  profileContainer: {
    marginBottom: Metrics.rfv(20),
    marginTop: Metrics.rfv(0),
  },
 
  backgroundContainer: {
    height: height * 0.25,
    position: 'absolute',
    borderBottomLeftRadius: Metrics.rfv(30),
    borderBottomRightRadius: Metrics.rfv(30),
    backgroundColor: '#962f2a',
    width: '100%',
    alignItems: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  profileTextContainer: {
    marginLeft: Metrics.rfv(20),
  },
  uidContainer: {
    backgroundColor: '#FEAA57',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Metrics.rfv(10),
    justifyContent: 'space-evenly',
    width: '70%',
  },
  lastLogin: {
    fontSize: Metrics.rfv(12),
    fontWeight: 'bold',
    marginLeft: Metrics.rfv(2),
    color: Colors.white,
    fontFamily: Fonts.Roboto400,
  },
  profileName: {
    color: Colors.white,
    fontSize: Metrics.rfv(24),
    fontWeight: 'bold',
    fontFamily: Fonts.Roboto400,
  },
  profileDetail: {
    color: Colors.white,
    fontSize: Metrics.rfv(16),
    paddingVertical: Metrics.rfv(5),
    fontFamily: Fonts.Roboto400,
  },
  userIcon: {
    width: Metrics.rfv(55),
    height: Metrics.rfv(55),
    borderRadius: Metrics.rfv(100),
  },
  formContainer: {
    marginVertical: Metrics.rfv(20),
    backgroundColor: Colors.white,
    padding: Metrics.rfv(10),
    borderRadius: Metrics.rfv(10),
    elevation:4
  },
  input: {
    height: Metrics.rfv(50),
    borderColor: '#dedee0',
    borderWidth: 1,
    borderRadius: Metrics.rfv(10),
    marginBottom: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(10),
    fontFamily: Fonts.Roboto400,
    fontSize: Metrics.rfv(16),
  },
  errorText: {
    color: 'red',
    marginBottom: Metrics.rfv(10),
    fontFamily: Fonts.Roboto400,
    fontSize: Metrics.rfv(14),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.rfv(20),
  },
  submitButton: {
    backgroundColor: Colors.Primary_100,
    padding: Metrics.rfv(10),
    paddingHorizontal:50,
    borderRadius: Metrics.rfv(10),
    // width: '100%',
    alignSelf: 'center',
  },
  cancelButton: {
    // backgroundColor: Colors.grey,
    padding: Metrics.rfv(10),
    paddingHorizontal:50,
    borderRadius: Metrics.rfv(10),
    alignSelf: 'center',
    marginTop:10,
    borderColor:Colors.Primary_100,
    borderWidth:1
  },
  buttonText: {
    color: Colors.white,
    fontSize: Metrics.rfv(16),
    fontFamily: Fonts.Roboto400,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Metrics.rfv(10),
    borderWidth: 0.5,
    marginBottom: Metrics.rfv(5),
    marginTop: Metrics.rfv(5),
    backgroundColor: '#fff',
    borderColor: '#dedee0',
  },
  currencyModal:{
    borderColor: '#dedee0',
    borderWidth:1,
    padding:11,
    borderRadius:8,
    marginBottom:15
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 5,
    padding: 15,
    margin: 15,
    overflow: 'hidden',
    height: '100%',
  },
  closeImage: {
    width: 25,
    height: 25,
  },
  selectedText: {
    color: '#000',
    fontSize: 15,
  },
  selectedLanguage: {
    padding: 15,
    borderBottomColor: '#dedee0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectLanguageButton: {
    backgroundColor: '#a32324',
    width: '30%',
    alignSelf: 'center',
    // marginTop: 15,
    borderRadius: 12,
  },
  selectText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    padding: 10,
  },
  forwordIcon: {
    width: 20,
    height: 20,
  },
  languageTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  modalText: {
    color: '#000',
    fontSize: Metrics.rfv(16),
    fontWeight: 'bold',
    paddingBottom: 15,
    // marginTop:Metrics.rfv(25)
  },
  modalContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginBottom: 20,

    // alignItems:"center",
    // flex: 1,
  },
  currencyStyle:{
   
  }
});

export default PersonalDetails;

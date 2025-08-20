import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Metrics from '../../Helpers/Metrics';
import {Colors} from '../../Helpers/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PageWrapperView from '../../Components/PageWrapperView';
import {Fonts} from '../../constant/data';

const AddBankBalnace = ({navigation}) => {
  const [focus, setFocus] = useState({
    fullName: false,
    ifscCode: false,
    bankName: false,
    branchName: false,
    bankAccountNo: false,
    confirmBankAccountNo: false,
    phoneNo: false,
    email: false,
  });

  const initialValues = {
    fullName: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    bankAccountNo: '',
    confirmBankAccountNo: '',
    phoneNo: '',
    email: '',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    ifscCode: Yup.string().required('IFSC Code is required'),
    bankName: Yup.string().required('Bank Name is required'),
    branchName: Yup.string().required('Branch Name is required'),
    bankAccountNo: Yup.string()
      .required('Bank Account Number is required')
      .min(9, 'Account Number must be at least 9 digits')
      .max(18, 'Account Number can be at most 18 digits'),
    confirmBankAccountNo: Yup.string()
      .required('Confirm Bank Account Number is required')
      .oneOf([Yup.ref('bankAccountNo'), null], 'Account numbers must match'),
    phoneNo: Yup.string()
      .required('Phone Number is required')
      .matches(/^[0-9]{10}$/, 'Phone Number must be 10 digits'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const handleSubmit = values => {
    // console.log(values);
    // Handle form submission logic here
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <PageWrapperView
          topSafeArea
          dark={true}
          style={styles.pageWrapper}
          statusBar={{background: '#a32324'}}>
          <View style={styles.header}>
            <MaterialIcons
              name="arrow-back-ios"
              color={'#fff'}
              size={35}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerText}>Add Bank Balance</Text>
          </View>
          <ScrollView contentContainerStyle={styles.container}>
            {[
              'fullName',
              'ifscCode',
              'bankName',
              'branchName',
              'bankAccountNo',
              'confirmBankAccountNo',
              'phoneNo',
              'email',
            ].map((field, index) => (
              <View key={index}>
                <Text style={styles.label}>{`${field
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase())}`}</Text>
                <TextInput
                  style={[
                    styles.input,
                    {borderColor: focus[field] ? Colors.blue : Colors.grey},
                  ]}
                  placeholderTextColor={Colors.grey}
                  placeholder={field
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase())}
                  onChangeText={handleChange(field)}
                  onBlur={() => {
                    handleBlur(field);
                    setFocus(prev => ({...prev, [field]: false}));
                  }}
                  onFocus={() => setFocus(prev => ({...prev, [field]: true}))}
                  value={values[field]}
                  keyboardType={field === 'email' ? 'email-address' : 'default'}
                />
                {touched[field] && errors[field] && (
                  <Text style={styles.errorText}>{errors[field]}</Text>
                )}
              </View>
            ))}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </PageWrapperView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    color: Colors.black,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontFamily: Fonts.Roboto400,
  },
  label: {
    fontSize: Metrics.rfv(15),
    paddingTop: Metrics.rfv(10),
    paddingBottom: Metrics.rfv(5),
    fontWeight: 'bold',
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#a32324',
    flexDirection: 'row',
    width: '100%',
    paddingBottom: Metrics.rfv(10),
    paddingHorizontal: 20,
    paddingTop: Metrics.rfv(10),
  },
  headerText: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: Fonts.Roboto400,
    textAlign: 'center',
    width: '90%',
  },
  button: {
    marginHorizontal: Metrics.rfv(80),
    backgroundColor: Colors.Primary_100,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Fonts.Roboto400,
  },
});

export default AddBankBalnace;

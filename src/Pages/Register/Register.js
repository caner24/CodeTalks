import React from 'react';
import {View, Text, Alert} from 'react-native';
import Input from '../../components/Input/Input';
import * as yup from 'yup';
import {Formik} from 'formik';
import Button from '../../components/Button/CustomButton';
import styles from './register.style';
import auth from '@react-native-firebase/auth';
export default function Register({navigation}) {
  function createUser({email, password}) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Başarili bir şekilde kayit olundu lütfen giriş yapiniz!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
        Alert.alert(error.message);
      });
  }
  return (
    <View style={styles.main}>
      <View style={styles.mainFont}>
        <Text style={styles.bannerFonts}>codetalks</Text>
      </View>
      <View style={styles.forms}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            rePassword: '',
          }}
          onSubmit={values => createUser(values)}
          validationSchema={yup.object().shape({
            rePassword: yup
              .string()
              .oneOf(
                [yup.ref('password'), null],
                'Şifreleriniz eşleşmemektedir !.',
              ),
            email: yup.string().email().required(),
            password: yup
              .string()
              .min(4)
              .max(10, 'Şifreniz maximum 10 karakter olmalıdır.')
              .required(),
          })}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <View>
              <Input
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                placeholder="e-posta adresinizi giriniz.."
              />
              {touched.email && errors.email && (
                <Text style={{fontSize: 12, color: '#FF0D10'}}>
                  {errors.email}
                </Text>
              )}
              <Input
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="şifrenizi giriniz.."
                onBlur={() => setFieldTouched('password')}
                secureTextEntry={true}
              />
              {touched.password && errors.password && (
                <Text style={{fontSize: 12, color: '#FF0D10'}}>
                  {errors.password}
                </Text>
              )}
              <Input
                value={values.rePassword}
                onChangeText={handleChange('rePassword')}
                onBlur={() => setFieldTouched('rePassword')}
                secureTextEntry={true}
                placeholder="şifrenizi tekrar giriniz.."
              />
              {touched.rePassword && errors.rePassword && (
                <Text style={{fontSize: 12, color: '#FF0D10'}}>
                  {errors.name}
                </Text>
              )}
              <View style={styles.space}></View>
              <Button
                color="#FFA500"
                title="Kayit Ol"
                disabled={!isValid}
                onPress={handleSubmit}
              />
              <View style={styles.space}></View>
              <Button
                color="#000000"
                title="Geri"
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

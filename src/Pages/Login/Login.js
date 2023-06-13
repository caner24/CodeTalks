import React from 'react';
import {View, Text} from 'react-native';
import Input from '../../components/Input/Input';
import * as yup from 'yup';
import {Formik} from 'formik';
import Button from '../../components/Button/CustomButton';
import styles from './login.style';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

import auth from '@react-native-firebase/auth';
export default function Register({navigation}) {
  function signIn({email, password}) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Başarili bir şekilde giriş yapıldı',
          button: 'close',
        });
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: 'Böyle bir kullanici bulunamadı',
            button: 'close',
          });
        }

        console.log(error);
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
          }}
          onSubmit={values => signIn(values)}
          validationSchema={yup.object().shape({
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
              <View style={styles.space}></View>
              <Button
                color="#FFA500"
                title="Giriş Yap"
                disabled={!isValid}
                onPress={handleSubmit}
              />
              <View style={styles.space}></View>
              <Button
                color="#000000"
                title="Kayit Ol"
                onPress={() => navigation.navigate('Register')}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

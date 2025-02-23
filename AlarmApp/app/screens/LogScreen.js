import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';

const Onboarding = ({navigation}) => {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Image
            style={styles.image}
            source={require('../../assets/images/Rectangle 27.png')}
          />
  
          <View style={styles.footer} />
        </View>
  
        <View style={styles.content}>

     
  
        </View>
      </View>
    );
  };
  
  export default React.memo(Onboarding);
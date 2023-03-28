import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = () => {
  const [getImageSelect, setImageSelect] = useState(false);
  const [getImageUrl, setImageUrl] = useState('');

  const Cancel = () => {
    setImageSelect(false);
    setImageUrl('');
  };

  const SelectImage = () => {
    ImagePicker.openPicker({
      cropping: true,
      includeExif: true,
      hideBottomControls: true,
      waitAnimationEnd: false,
      cropperChooseText: 'ok',
      cropperCancelText: 'Cancel',
    }).then(image => {
      console.log(image.path);
      if (image.path != '') {
        setImageSelect(true);
        setImageUrl(image.path);
      }
    });
  };

  return (
    <SafeAreaView>
      <View style={Styles.Container}>
        {getImageSelect != true ? (
          <View>
            <Image
              source={require('./Asset/imgSelect.png')}
              style={Styles.ImageIcon}
            />
            <TouchableOpacity onPress={() => SelectImage()}>
              <View style={Styles.bgButton}>
                <Text style={Styles.txtButton}>Select Image</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <ImageBackground
              source={{uri: getImageUrl}}
              style={Styles.ImageFullSize}>
              <TouchableOpacity onPress={() => Cancel()}>
                <Image
                  source={require('./Asset/imgCross.png')}
                  style={{width: 20, height: 20, margin: 10}}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  Container: {
    width: windowWidth,
    height: windowHeight,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  bgButton: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#0096FF',
  },
  txtButton: {
    color: 'white',
  },
  ImageIcon: {
    width: 300,
    height: 300,
  },
  ImageFullSize: {
    width: windowWidth,
    height: windowHeight,
  },
});

export default App;

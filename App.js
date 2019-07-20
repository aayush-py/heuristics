import React from 'react'
import { View, Text, Image, Button,StyleSheet } from 'react-native'
import ImagePicker from 'react-native-image-picker'

export default class App extends React.Component {
  state = {
    photo: null,
    deficiency: 'phospohors',
    supplement: 'null'
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

  createFormData = (photo, body) => {
    const data = new FormData();
  
    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
  
    return data;
  }

  handleUpload  = () => {
    console.log(1);
    fetch("http://172.20.0.4:3000/api/upload", {
     method: "POST",
      body: this.createFormData(this.state.photo, { userId: "123" })
    })
      .then(response => {
        console.log("upload succes", response);
        alert("Upload success!");
        this.setState({ photo: null });
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  }

  render() {
    const { photo } = this.state
    return (
      <View style={{ flex: 1,backgroundColor:'grey'}}>
        <View style={styles.buttonView}>
          {photo && (
            <React.Fragment>
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 300, height: 300 }}
              />
              <Button title="Done" onPress={this.handleUpload} />
            </React.Fragment>
          )}
          <Button title="Upload Photo" onPress={this.handleChoosePhoto} />
        </View>
        <View style={styles.pBar}>
          <Text style={styles.pHeading}>Deficiency:</Text>
          <Text style={styles.pAns}>{this.state.deficiency}</Text>
        </View>
        <View style={styles.pBar}>
          <Text style={styles.pHeading}>Supplement:</Text>
          <Text style={styles.pAns}>{this.state.supplement}</Text>
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonView:{
    

  },
  pBar:{  
    width:'100%',
    marginTop:20,
    marginBottom:10,
    padding:10,
    fontFamily:"Helvetica-Oblique"

  },
  pHeading:{
    fontSize:40,
    fontFamily:"Helvetica-Oblique"
  },
  pAns:{
    fontSize:30,
    marginTop:10,
    borderRadius:2,
    borderWidth:1,
    borderColor:'black',
    fontFamily:'Symbol'
  }
})
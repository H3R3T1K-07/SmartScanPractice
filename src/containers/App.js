import React, {Component} from 'react';
import Clarifai from 'clarifai'
import Particles from 'react-particles-js';
import './App.css';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
 apiKey: '6be5f90bfc43487ba03b519123b5bc07'
});

const particlesOptions = {
  particles: {
    number: {
      value: 10,
      density: {
        enable: true,
        value_area: 50
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = (event) => {
    app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict("the-image-url");
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts']
      })
  }

  render() {
      return (
        <div className="">
          <Particles className="particles"
            params = {particlesOptions}ß
           />
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm 
              onInputChange = {this.onInputChange} 
              onButtonSubmit = {this.onButtonSubmit}
              />
          {/*<FaceRecognition /> */}
          
        </div>
      );
    }
}

export default App;

import React, {Component} from 'react';
import Clarifai from 'clarifai'
import Particles from 'react-particles-js';
import './App.css';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';

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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
          id: '',
          name: '',
          email: '',
          password: '',
          entries: 0,
          joined: ''
        }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return ({
      leftCol: (clarifaiFace.left_col * width),
      topRow: (clarifaiFace.top_row * height),
      rightCol: (width - (clarifaiFace.right_col * width)),
      bottomRow: (height - (clarifaiFace.bottom_row * height))
    });
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      if(response) {
        fetch('http://localhost:3000/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        id: '120'
      })
    })
    .then(response => response.json())
    .then(count => {
      this.setState(Object.assign(this.state.user, {entries: count}))
      this.displayFaceBox(this.calculateFaceLocation(response))})
     }
    }) 
       
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    } else if(route === 'home' ){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
      const {imageUrl, box, isSignedIn, route, user} = this.state;
      return (
        <div className="">
          <Particles className="particles"
            params = {particlesOptions}
           />
          
          { this.state.route === 'home' ?
            <div>
              <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
              <Logo />
              <Rank name = {user.name} entries = {user.entries}/>
              <ImageLinkForm 
                  onInputChange = {this.onInputChange} 
                  onButtonSubmit = {this.onButtonSubmit}
                  /> 
              <FaceRecognition imageUrl = {imageUrl} box = {box}/>
            </div>
              :
              ( route === 'signin' ?
                <div>
                  <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
                  <Signin loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
                </div>
                :
                <div>
                  <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
                  <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
                </div>
              )
          }
        </div>
      );
    }
}

export default App;

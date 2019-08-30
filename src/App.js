import React from 'react';
import './App.css';
import firebase from 'firebase';

class  App extends React.Component {
  constructor(props){
    super(props);
    this.state = {user : null};
    this.iniciarSesion = this.iniciarSesion.bind(this);
    this.cerrarSesion =this.cerrarSesion.bind(this);
  
  }
    componentWillMount(){
     firebase.auth().onAuthStateChanged((user) => {
       if(user){
         console.log('Existe el email ', user);
       } else {
         console.log('no existe el email ');
       }
       this.setState({user:user});
     });
    } 

    iniciarSesion(){

      const provider = new firebase.auth.FacebookAuthProvider()
      
      firebase.auth().signInWithPopup(provider)
        .then(result => console.log(`${result.user.email} a inciado sesion`))
        .catch(error => console.log(`Error ${error.code}:${error.message}`))
    }
   
    cerrarSesion(){
      firebase.auth().signOut()
      .then(result => console.log("a cerrado sesion"))
      .catch(error => console.log(`${error.code}: ${error.message}`))
    }
    render(){
      return (
        <div>
          <div>
          {(this.state.user) ? <button onClick={this.cerrarSesion}>Cerrar Sesion</button> : <button onClick={this.iniciarSesion}> Iniciar sesion </button>}
          </div>
          
          <h4>{(this.state.user) ? this.state.user.displayName : 'no existe'}</h4> 
          {(this.state.user) ? <img with='32' src={this.state.user.photoURL}/> : ''}

        </div>
      )
    }
}

export default App;
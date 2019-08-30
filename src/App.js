import React from 'react';
import './App.css';
import firebase from 'firebase';

class  App extends React.Component {
  constructor(props){
    super(props);
    this.state = {user : null};
    this.iniciarSesion = this.iniciarSesion.bind(this);
    this.cerrarSesion =this.cerrarSesion.bind(this);
    this.listaDeJugadores = this.listaDeJugadores.bind(this);
  
  }
    componentWillMount(){
     firebase.auth().onAuthStateChanged((user) => {
       if(user){
        let idIngresado = user.email;
        firebase.firestore().collection('jugadores').doc(idIngresado).set(
        {
          email: idIngresado, 
          valorActual:1,
          nombre: user.displayName,
          estado : true
        });
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
        .then(result => {
          
        })
        .catch(error => console.log(`Error ${error.code}:${error.message}`))
    }
   
    cerrarSesion(){
      firebase.auth().signOut()
      .then(result => {
          firebase.firestore().collection('jugadores').doc(this.state.user.email).update({estado : false})
        }   
      )
      .catch(error => console.log(`${error.code}: ${error.message}`))
    }
    listaDeJugadores(){
      firebase.firestore().collection('jugadores').onSnapshot(onSnapshot => {
        onSnapshot.forEach(jugador => {
          console.log(jugador.data().email);
          console.log(jugador.data().nombre);
          console.log(jugador.data().estado);
        })
      })
     }
    render(){
      return (
        <div>
          <div>
          {(this.state.user) ? <button onClick={this.cerrarSesion}>Cerrar Sesion</button> : <button onClick={this.iniciarSesion}> Iniciar sesion </button>}
          </div>
          <h4>{(this.state.user) ? this.state.user.displayName : 'no existe'}</h4> 
          {(this.state.user) ? <img with='32' src={this.state.user.photoURL}/> : ''}
          <button onClick={this.existeCollection}>existecollection</button>
          <button onClick={this.listaDeJugadores}>Lista de jugadores</button>

        </div>
      )
    }
}

export default App;
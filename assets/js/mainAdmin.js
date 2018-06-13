// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDVp7i98DCfmzy58s-rITn5aIcA2WgrUxs",
    authDomain: "escueladigital-d9efd.firebaseapp.com",
    databaseURL: "https://escueladigital-d9efd.firebaseio.com",
    projectId: "escueladigital-d9efd",
    storageBucket: "escueladigital-d9efd.appspot.com",
    messagingSenderId: "393430749638"
  };
  firebase.initializeApp(config);

  var onAdmin = false;
  var authState = false;

  var restrictedNavigationUrls = ['/participantes.html', '/contacto.html'];

  firebase.auth().onAuthStateChanged(function(user) {
  	authState = !!user;
  if (user ) {
    // User is signed in.

    console.log("Estas adentro");
    if(window.location.pathname === '/admin.html'){
    	onAdmin = true;
		handleNavigation('/participantes.html')
	}
	handleNavigation(window.location.pathname);
    
    if(window.location.pathname === '/participantes.html'){
    	queryDatabase();
    }
       if(window.location.pathname === '/contacto.html'){

 		queryDataBaseContacto();
 	}


  } else {
    // No user is signed in.


	console.log("Estas afuera");
	handleNavigation('/admin.html');
  }
});

//handleNavigation(window.location.pathname);


 function shouldNavigate(url){
 	var isRestrictedUrl = !!restrictedNavigationUrls.find(item => item === url);
 	return isRestrictedUrl && authState;
 }

 function handleNavigation(url){
	 if(shouldNavigate(url)){
		 if(url !== window.location.pathname){
			 window.location = url
		 }
	 } else {
		if('/admin.html' !== window.location.pathname){
			window.location = 'admin.html'
		}

	 }
 }






function login(){


	console.log("Correo el login");
	var userEmail = document.getElementById("correoLogin").value;
	var userPass = document.getElementById("passwordLogin").value;


	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  	// Handle Errors here.
  	var errorCode = error.code;
  	var errorMessage = error.message;
  	
	  window.alert("Error :" + errorMessage );
	  
	  handleNavigation('/participantes.html')

  	// ...
});


}

function queryDatabase(token) {
 var tabla = document.getElementById("tabla");
  firebase.database().ref('/participantes/').once('value').then(function(snapshot) {
  var participantesObject = snapshot.val();
  var keys = Object.keys(participantesObject);
  for (var i = 0; i < keys.length; i++) {
  var currentObject = participantesObject[keys[i]];
  var listItem = createListItemAsString(i+1, currentObject);
  tabla.innerHTML += listItem
  console.log(participantesObject);

  }


});

}


function queryDataBaseContacto(token){
	var tablaContacto = document.getElementById("tabla-contacto");
	firebase.database().ref('/contacto/').once('value').then(function(snapshot) {
  	var contactoObject = snapshot.val();
  	var keys = Object.keys(contactoObject);
  	for (var i = 0; i < keys.length; i++) {
    var currentObject = contactoObject[keys[i]];
    var listItem = createListItemAsStringContacto(i+1, currentObject);
    tablaContacto.innerHTML += listItem
    console.log(contactoObject);

  }


});
}


function createListItemAsString(index, item){
	var itemStr = "<tr>";
	itemStr += "<th>" + index + "</th>";
	itemStr += "<th>" + item.nombre + "</th>";
	itemStr += "<th>" + item.carrera+ "</th>";
	itemStr += "<th>" + item.universidad+ "</th>";
	itemStr += "<th>" + item.semestreActual+ "</th>";
	itemStr += "<th>" + item.semestrePractica+ "</th>";
	itemStr += "<th>" + item.correo+ "</th>";
	itemStr += "<th>" + item.telefono+ "</th>";
	itemStr += "<th> <a href='" + item.hojaVida+ "'>Descargar</a > </th>";
	itemStr += "</tr>";
	return itemStr;
}

function createListItemAsStringContacto(index, item){
	var itemStr = "<tr>";
	itemStr += "<th>" + index + "</th>";
	itemStr += "<th>" + item.nombre + "</th>";
	itemStr += "<th>" + item.correo+ "</th>";
	itemStr += "<th>" + item.asunto+ "</th>";
	itemStr += "<th>" + item.mensaje+ "</th>";
	itemStr += "</tr>";
	return itemStr;
}

function logout(e){

	window.location = 'admin.html';	

	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}).catch(function(error) {
	  // An error happened.

	var errorCode = error.code;
  	var errorMessage = error.message;
  	
  	window.alert("Error :" + errorMessage );
	});
}



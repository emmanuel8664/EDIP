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

 

// Reference messages collection
var messagesRefParticipantes = firebase.database().ref('participantes');
var messagesRefContacto = firebase.database().ref('contacto');



// Listen for form submit
document.getElementById('participantesForm').addEventListener('submit', submitForm);
document.getElementById('contactoForm').addEventListener('submit', submitForm);



// Submit form
function submitForm (e) {

	e.preventDefault();
	

if(e.target==participantesForm){ 

// File storage
	var fileName = document.getElementById('ins-hojaVida').files[0].name;
// Create a root reference
	var storageRef = firebase.storage().ref('/HojasDeVida/' + getInputVal('ins-nombre'));

	var uploadTask = storageRef.put(document.getElementById('ins-hojaVida').files[0]);
	

//Register three observers:
//1. 'state_changed' observer, called any time the state changes
//2. Error observer, called on failure
//3. Completion observer, called on successful completion
uploadTask.then(function(snapshot){
//Observe state change events such as progress, pause, and resume
//See below for more detail
	console.log("snapshot then", snapshot)
	console.log("uploadTask then", uploadTask)
	var downloadURL = uploadTask.snapshot.downloadURL;
	console.log(downloadURL);

	

	uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

		var nombre = getInputVal('ins-nombre');
		var correo = getInputVal('ins-correo'); 
		var telefono = getInputVal('ins-telefono'); 
		var universidad = getInputVal('ins-universidad'); 
		var carrera = getInputVal('ins-carrera'); 
		var semestreActual = getInputVal('ins-semestreActual'); 
		var semestrePractica = getInputVal('ins-semestrePractica');
		var hojaVida = downloadURL;
	
		
	    console.log('File available at', downloadURL);
	    saveMessageParticipantes(nombre,correo,telefono,universidad,carrera,semestreActual,semestrePractica,hojaVida);
	  });

		w



});

uploadTask.on('state_changed',function(snapshot){
//Observe state change events such as progress, pause, and resume
//See below for more detail
	//console.log("snapshot", snapshot)
	//console.log("uploadTask", uploadTask)
	//var downloadURL = uploadTask.snapshot.downloadURL;
	//console.log(downloadURL);

}, function(error) {
	//Handle unsuccessfil uploads
}, function(){
	//Handle successful uploads on complete
	//For instance, get the download URL:
	var downloadURL = uploadTask.snapshot.downloadURL;
	


	
});
	
	window.alert("Sus datos se han enviado satisfactoriamente");

//	Get values
	
	

}
else if(e.target==contactoForm){
	
//	Get values

	var nombre = getInputVal('name');
	var asunto = getInputVal('subject'); 
	var correo = getInputVal('email'); 
	var mensaje = getInputVal('message'); 
	
	saveMessageContacto(nombre,asunto,correo,mensaje);
	window.alert("Sus datos se han enviado satisfactoriamente");
	document.getElementById("contactoForm").reset()

}


}

// Function to get form values
function getInputVal(id){
	return document.getElementById(id).value;
}


// Save message to firebase participantes
function saveMessageParticipantes(nombre,correo,telefono,universidad,carrera,semestreActual,semestrePractica,hojaVida){
	var newMessageRef = messagesRefParticipantes.push();
	newMessageRef.set({
	nombre:nombre,
	correo:correo,
	telefono:telefono,
	universidad:universidad,
	carrera:carrera,
	semestreActual:semestreActual,
	semestrePractica:semestrePractica,
	hojaVida:hojaVida
	});
}

// Save message to firebase contacto
function saveMessageContacto(nombre,asunto,correo,mensaje){
	var newMessageRef = messagesRefContacto.push();
	newMessageRef.set({
	nombre:nombre,
	asunto:asunto,
	correo:correo,
	mensaje:mensaje
	});
}



 document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    queryDatabaseVideos();
    queryDatabaseIntegrantes2();

  });


function queryDatabaseVideos(token) {
  firebase.database().ref('/youtube/').once('value').then(function(snapshot) {
  var VideosObject = snapshot.val();
  var keys = Object.keys(VideosObject);
  for (var i = 0; i < keys.length; i++) {
  var currentObject = VideosObject[keys[i]];
  var number = i+1;
  document.getElementById("video"+number).src = currentObject;

  }


});

}

function queryDatabaseIntegrantes(token) {
  firebase.database().ref('/integrantes/').once('value').then(function(snapshot) {
  var IntegrantesObject = snapshot.val();
  var keys = Object.keys(IntegrantesObject);
  for (var i = 0; i < keys.length; i++) {
  		
  		var currentObject = IntegrantesObject[keys[i]];
  		var keysI = Object.keys(currentObject);
  		var atributos = ["carrera", "gustos", "nombre","universidad"];
  		
  		for (var j = 0; j < keys.length; j++) {
  		var currentObjectI = currentObject[keysI[j]];
  		var number = i+1;

  	//	document.getElementById("p"+i+atributos[j]).innerHTML=currentObjectI;
  		console.log(i);
  		console.log(j);
  		console.log(currentObjectI);
  		console.log("p"+number+atributos[j]);
  	}	
//  Le gusta viajar, jugar tenis y hacer actividades extremas 
 // var number = i+1;
 // document.getElementById("video"+number).src = currentObject;

  }
});

}

function queryDatabaseIntegrantes2(token) {
 
 firebase.database().ref('/integrantes/').once('value').then(function(snapshot) {

var i = 0,
    j = 0,
    endx = 15,
    endy = 4;

var IntegrantesObject = snapshot.val();
var keys = Object.keys(IntegrantesObject);
var atributos = ["carrera", "gustos", "nombre","universidad"];
for (; i < endx; i++) {

		if(IntegrantesObject[keys[i]]==null){
			return null;
		}
		else {
		var currentObject = IntegrantesObject[keys[i]];
  		var keysI = Object.keys(currentObject);	
		}
		

  		

    		for (j = 0; j < endy; j++) {
       			

       			var currentObjectI = currentObject[keysI[j]];
  				var number = i+1;
  				console.log(document.getElementById("p"+number+atributos[j]));
  				document.getElementById("p"+number+atributos[j]).innerHTML=currentObjectI;

    		}
}



});

}


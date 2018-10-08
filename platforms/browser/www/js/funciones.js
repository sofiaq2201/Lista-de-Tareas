// Get the input field
var input = document.getElementById("tarea");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
 	var e = document.getElementById("btn_new").getAttribute('style');
    if (e=='display:none;') {
    	 document.getElementById("btn_edit").click();
	//alert("modificado");
    }else{
    	 document.getElementById("btn_new").click();
    //	 alert("nuevo");
    }
  
  }
});


function obtener_tareas(){
	var tareas = new Array();

	var tareas_str = localStorage.getItem('tareas_guardadas');
	if (tareas_str !== null){
		tareas = JSON.parse(tareas_str);
	}

	return tareas
}

function new_task(){
	
	var nueva_tarea = document.getElementById("tarea").value;
	var tareas = obtener_tareas();
	tareas.push(nueva_tarea);
	localStorage.setItem('tareas_guardadas',JSON.stringify(tareas));
	document.getElementById("tarea").value = '';
	mostrar();
}

function edit_task(pos){
	edicion_tarea = document.getElementById("tarea").value;

	tareas = obtener_tareas();
 	tareas[pos] = edicion_tarea;
	localStorage.setItem('tareas_guardadas',JSON.stringify(tareas));
	mostrar();

 	document.getElementById("btn_new").removeAttribute('style');
 	document.getElementById("btn_edit").setAttribute('style', 'display:none;');
 	document.getElementById("tarea").value = '';
}


function modificar(pos){
	tareas = obtener_tareas();
 	document.getElementById("tarea").value = tareas[pos];
 	document.getElementById("btn_new").setAttribute('style', 'display:none;');
 	document.getElementById("btn_edit").removeAttribute('style');
 	document.getElementById("btn_edit").setAttribute('onclick', 'edit_task('+pos+')');
}

function mostrar(){
	var tareas_div = document.getElementById("tareas");
	var tareas = obtener_tareas();
	// traer del local storage las tareas
	// recorrerlas con for}
	var html = '';
	for (i=0; i<tareas.length; i++){
		html += '' +
			'<div class="row mb-2" style="margin-top:5px;">' +
				'<div class="col-6 col-sm-6 col-md-6 ">'+
		    	'<p>	' + tareas[i] + '</p>'+
		    	'</div>' +
			'	<div class="col-6 col-sm-6 col-md-6">	'+
			'	<button type="button"" class="btn btn-outline-danger btn-sm justify-content-end"  onclick="eliminar('+i+')"><i class="far fa-trash-alt"></i></button>'+
			'	<button type="button" class="btn btn-outline-success btn-sm justify-content-end" onclick="modificar('+i+')"><i class="far fa-edit"></i></button>'+
			'	</div>' +
			'</div>';
	}

	tareas_div.innerHTML = html;
}

function eliminar(pos){
    tareas = obtener_tareas();
    tareas.splice(pos, 1); // el 1 es la cantidad de elementos de la lista que hace offset
    localStorage.setItem('tareas_guardadas', JSON.stringify(tareas));
    mostrar();
}
mostrar();
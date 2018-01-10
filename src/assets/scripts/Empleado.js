$(document).on("ready", init);// Inciamos el jquery

function init(){
	
	$('#tblEmpleado').dataTable({
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5'
        ]
    });
    
	ListadoEmpleado();// Ni bien carga la pagina que cargue el metodo
	ComboTipo_Documento();
	$("#VerForm").hide();// Ocultamos el formulario
	$("#txtClaveOtro").hide();
	$("form#frmEmpleado").submit(SaveOrUpdate);// Evento submit de jquery que llamamos al metodo SaveOrUpdate para poder registrar o modificar datos
	
	$("#btnNuevo").click(VerForm);// evento click de jquery que llamamos al metodo VerForm

	
	
	function SaveOrUpdate(e){
		e.preventDefault();
		$("#BtnAlmacena").hide();//OCULTO BOTON REGISTRAR
        var formData = new FormData($("#frmEmpleado")[0]);

        $.ajax({

                url: "./ajax/EmpleadoAjax.php?op=SaveOrUpdate",

                type: "POST",

               data: formData,

                contentType: false,

                processData: false,

                success: function(datos)

                {

                    //swal("Mensaje del Sistema", datos, "success");
					mensajesnew(datos);
                    ListadoEmpleado();
                    OcultarForm();
                    Limpiar();
					$("#BtnAlmacena").show();//MUESTRO BOTON REGISTRAR
                }

            });
	};

	function Limpiar(){
		// Limpiamos las cajas de texto
		$("#txtIdEmpleado").val("");
	    $("#txtNombre").val("");
	    $("#txtApellidos").val("");
	    $("#txtNum_Documento").val("");
	    $("#txtDireccion").val("");
	    $("#txtTelefono").val("");
	    $("#txtEmail").val("");
	    $("#txtRepresentante").val("");
	    $("#txtLogin").val("");
	    $("#txtClave").val("");
	    $("#txtClaveOtro").val("");
		$("#txtFecha_Ingreso").val("");
		$("#txtPersona_Contacto").val("");
		$("#txtDireccion_Contacto").val("");
		$("#txtTelefono_Contacto").val("");
		$("#txtCargo").val("");
		$("#txtFecha_Nacimiento").val("");
		$("#txtCelular_Empleado").val("");
		$("#txtCelular_Contacto").val("");
		$("#txtCodigoEmp").val("");
		
	}

	function VerForm(){
		$("#VerForm").show();// Mostramos el formulario
		$("#btnNuevo").hide();
		$("#VerListado").hide();// ocultamos el listado
		GetCodigo();
		
	}

	function OcultarForm(){
		$("#VerForm").hide();// Mostramos el formulario
		$("#btnNuevo").show();// ocultamos el boton nuevo
		$("#VerListado").show();
	}
}

function ListadoEmpleado(){ 
	var tabla = $('#tblEmpleado').dataTable(
		{   "aProcessing": true,
       		"aServerSide": true,
   			dom: 'Bfrtip',
	        buttons: [
	            'copyHtml5',
	            'excelHtml5',
	            'csvHtml5'
	        ],
        	"aoColumns":[
        	     	{   "mDataProp": "0"},
                    {   "mDataProp": "1"},
                    {   "mDataProp": "2"},
                    {   "mDataProp": "3"},
                    {   "mDataProp": "4"},
                    {   "mDataProp": "5"},
                    {   "mDataProp": "6"},
                    {   "mDataProp": "7"},
                    {   "mDataProp": "8"},
					{   "mDataProp": "9"},
					{   "mDataProp": "10"},
					{   "mDataProp": "11"},
					{   "mDataProp": "12"},
					{   "mDataProp": "13"},
					{   "mDataProp": "14"},
					{   "mDataProp": "15"},
					{   "mDataProp": "16"},
					{   "mDataProp": "17"},
					{   "mDataProp": "18"}

        	],"ajax": 
	        	{
	        		url: './ajax/EmpleadoAjax.php?op=list',
					type : "get",
					dataType : "json",
					
					error: function(e){
				   		console.log(e.responseText);	
					}
	        	},
	        "bDestroy": true

    	}).DataTable();
    };

function eliminarEmpleado(id){// funcion que llamamos del archivo ajax/CategoriaAjax.php?op=delete linea 53
	bootbox.confirm("¿Esta Seguro de eliminar el Empleado?", function(result){ // confirmamos con una pregunta si queremos eliminar
		if(result){// si el result es true
			$.post("./ajax/EmpleadoAjax.php?op=delete", {id : id}, function(e){// llamamos la url de eliminar por post. y mandamos por parametro el id 
                //swal("Mensaje del Sistema", e, "success");
				mensajesnew(e);
				ListadoEmpleado();

            });
		}
		
	})
}

function cargarDataEmpleado(id,apellidos, nombre,tipo_documento,num_documento,direccion,telefono,email,fecha_nacimiento,foto, login, clave,estado,fecha_ingreso,persona_contacto,direccion_contacto,telefono_contacto,cargo,celular_empleado,celular_contacto,cod_empleado){// funcion que llamamos del archivo ajax/CategoriaAjax.php linea 52
		
		$("#VerForm").show();// mostramos el formulario
		$("#btnNuevo").hide();
		$("#VerListado").hide();// ocultamos el listado

		$("#txtIdEmpleado").val(id);// recibimos la variable id a la caja de texto txtIdCategoria
	    $("#txtApellidos").val(apellidos);
	    $("#txtNombre").val(nombre);
 		$("#cboTipo_Documento").val(tipo_documento);
 		$("#txtNum_Documento").val(num_documento);
 		$("#txtDireccion").val(direccion);
 		$("#txtTelefono").val(telefono);
 		$("#txtEmail").val(email);
 		$("#txtFecha_Nacimiento").val(fecha_nacimiento);
 		//$("#txtLogo").val(logo);
 		$("#txtRutaImgEmp").val(foto);
 		$("#txtLogin").val(login);
 		//$("#txtClave").val(clave);
	    $("#txtRutaImgEmp").show();
 		$("#txtEstado").val(estado);
 		$("#txtClaveOtro").val(clave);
 		//$("#txtClaveOtro").show();
		$("#txtFecha_Ingreso").val(fecha_ingreso);
		$("#txtPersona_Contacto").val(persona_contacto);
		$("#txtDireccion_Contacto").val(direccion_contacto);
		$("#txtTelefono_Contacto").val(telefono_contacto);
		$("#txtCargo").val(cargo);
		$("#txtCelular_Empleado").val(celular_empleado);
		$("#txtCelular_Contacto").val(celular_contacto);
		$("#txtCodigoEmp").val(cod_empleado);
		
		
 	}	


 	function ComboTipo_Documento() {

        $.get("./ajax/EmpleadoAjax.php?op=listTipo_DocumentoPersona", function(r) {
                $("#cboTipo_Documento").html(r);
            
        })
    }

	
		function mensajesnew(idmsg){
		
		    switch (idmsg) {
				case "1":
					swal("Correcto!!!", "INGRESADO CON ÉXITO", "success");
				break;
				case "2":
					swal("Error!!!", "REGISTRO NO FUE INGRESADO", "error");
				break;
				case "3":
					swal("Correcto!!!", "ACTUALIZADO CON ÉXITO", "success");
				break;
				case "4":
					swal("Error!!!", "REGISTRO NO FUE ACTUALIZADO", "error");
				break;
				case "5":
					swal("Correcto!!!", "ELIMINADO CON ÉXITO", "success");
				break;
				case "6":
					swal("Advertencia!!!", "REGISTRO NO FUE ELIMINADO. SE REGISTRAN TRANSACCIONES. SOLO PUEDE CAMBIAR ESTADO", "warning");
				break;
				case "10":
					swal("Advertencia!!!", "DEBE AGREGAR LA SERIE/NÚMERO", "warning");
				break;
			}				
			        			
	}
	
	function GetCodigo(){
	
		$.getJSON("./ajax/EmpleadoAjax.php?op=GetCodigo", function(r) {
				
                $("#txtCodigoEmp").val(r.cod1 + ('000' + (parseInt(r.cod2)+1)).slice(-4));
				$("#txtCodigoEmpNum").val(('000' + (parseInt(r.cod2)+1)).slice(-4));
                //$("#txtCodigoEmp").html(r);
				//$("#txtCodigoEmp").val('Prueba');
            
        })
    }
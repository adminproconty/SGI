$(document).on("ready", init);// Inciamos el jquery

elementosReg = new Array(); 

function init(){
	
	$('#tblCliente').dataTable({
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5'
        ]
    });
    
	ListadoCliente();// Ni bien carga la pagina que cargue el metodo
	ComboTipo_Documento();
	$("#VerForm").hide();// Ocultamos el formulario
	
	//ACCION DE BOTONES
	
	$("form#frmCliente").submit(SaveOrUpdate);// Evento submit de jquery que llamamos al metodo SaveOrUpdate para poder registrar o modificar datos
	$("#btnNuevo").click(VerForm);// evento click de jquery que llamamos al metodo VerForm
	$("#btnBuscarServ").click(AbrirModalServicio);
	$("#btnBorraServ").click(EliminarServicio);
	
	//FIN ACCION DE BOTONES
	
	//ELIMINA SERVICIOS
	function EliminarServicio(){
		if ($("#txtIdBorraServ").val() != "") {
			var databorra = {
					idServicioBorra : $("#txtIdBorraServ").val()
			};		
				var dialog = bootbox.dialog({
					title: 'Eliminando el Servicio',
					message: '<p><i class="fa fa-spin fa-spinner"></i> Procesando...</p>',
					closeButton: false
					
				});
				
				$.post("./ajax/ClienteAjax.php?op=BorrarServicios", databorra, function(r){
				Limpiar();
				ListadoCliente();
				dialog.modal('hide');
				swal("Mensaje del Sistema", r, "success");

				
				OcultarForm();
				});
		} else {
            
			    bootbox.alert({
						message: "Debe ingresar un Id de Registro de la Tabla",
						size: 'small'
				});

        }
	
	}	//FIN ELIMINA SERVICIOS
	
	//GRABA ACTUALIZA CLIENTE
	function SaveOrUpdate(e){
		e.preventDefault();// para que no se recargue la pagina
 		var dialog = bootbox.dialog({
					title: 'Registrando Alumno',
					message: '<p><i class="fa fa-spin fa-spinner"></i> Procesando...</p>',
					closeButton: false
					
		});
		
		// Toma Servicios Ingresados
		AgregarServ();
		var detalle =  JSON.parse(consultarReg());
		//
		
		var combo = document.getElementById("cboTipo_Persona");
		var selected = combo.options[combo.selectedIndex].text;
		var data = { 
  						direccion_provincia  : $("#txtDireccion_departamento").val(),
						direccion_distrito  : $("#txtDireccion_departamento").val(),
						estado : $("#txtEstado").val(),
						txtIdPersona : $("#txtIdPersona").val(),
						tipo_persona : selected,
						nombre : $("#txtNombre").val(),
						tipo_documento : $("#cboTipo_Documento").val(),
						num_documento : $("#txtNum_documento").val(),
						direccion_departamento : $("#txtDireccion_departamento").val(),
						direccion_calle : $("#txtDireccion_Calle").val(),
						telefono : $("#txtTelefono").val(),
						email : $("#txtEmail").val(),
						numero_cuenta : $("#txtNumero_cuenta").val(),
						apellidop : $("#txtApellidop").val(),
						apellidom : $("#txtApellidom").val(),
						nombrealumno : $("#txtNombrealumno").val(),
						nacimientoalumno : $("#txtNacimientoalumno").val(),
						representante : $("#txtRepresentante").val(),
						representanteotro : $("#txtRepresentanteotro").val(),
						hermanos : $("#txtHermanos").val(),
						nombreh1 : $("#txtNombreh1").val(),
						nacimientoh1 : $("#txtNacimientoh1").val(),
						nombreh2 : $("#txtNombreh2").val(),
						nacimientoh2 : $("#txtNacimientoh2").val(),
						nombreh3 : $("#txtNombreh3").val(),
						nacimientoh3 : $("#txtNacimientoh3").val(),
						lugarocupa : $("#txtLugarocupa").val(),
						cuidado : $("#txtCuidado").val(),
						cuidadootro : $("#txtCuidadootro").val(),
						cdianterior : $("#txtCdianterior").val(),
						edadcdianterior : $("#txtEdadcdianterior").val(),
						nombrepadre : $("#txtNombrepadre").val(),
						nacimientopadre : $("#txtNacimientopadre").val(),
						paispadre : $("#txtPaispadre").val(),
						ciudadpadre : $("#txtCiudadpadre").val(),
						nacionalidadpadre : $("#txtNacionalidadpadre").val(),
						direccionpadre : $("#txtDireccionpadre").val(),
						telefonopadre : $("#txtTelefonopadre").val(),
						celularpadre : $("#txtCelularpadre").val(),
						emailpadre : $("#txtEmailpadre").val(),
						trabajopadre : $("#txtTrabajopadre").val(),
						profesionpadre : $("#txtProfesionpadre").val(),
						cargopadre : $("#txtCargopadre").val(),
						telefonoofipadre : $("#txtTelefonoofipadre").val(),
						estadopadre : $("#txtEstadopadre").val(),
						nombremadre : $("#txtNombremadre").val(),
						nacimientomadre : $("#txtNacimientomadre").val(),
						paismadre : $("#txtPaismadre").val(),
						ciudadmadre : $("#txtCiudadmadre").val(),
						nacionalidadmadre : $("#txtNacionalidadmadre").val(),
						direccionmadre : $("#txtDireccionmadre").val(),
						telefonomadre : $("#txtTelefonomadre").val(),
						celularmadre : $("#txtCelularmadre").val(),
						emailmadre : $("#txtEmailmadre").val(),
						trabajomadre : $("#txtTrabajomadre").val(),
						profesionmadre : $("#txtProfesionmadre").val(),
						cargomadre : $("#txtCargomadre").val(),
						telefonoofimadre : $("#txtTelefonoofimadre").val(),
						estadomadre : $("#txtEstadomadre").val(),
						autorizaface : $("#txtAutorizaface").val(),
						nombreretira1 : $("#txtNombreretira1").val(),
						telefonoretira1 : $("#txtTelefonoretira1").val(),
						parentescoretira1 : $("#txtParentescoretira1").val(),
						nombreretira2 : $("#txtNombreretira2").val(),
						telefonoretira2 : $("#txtTelefonoretira2").val(),
						parentescoretira2 : $("#txtParentescoretira2").val(),
						nombreretira3 : $("#txtNombreretira3").val(),
						telefonoretira3 : $("#txtTelefonoretira3").val(),
						parentescoretira3 : $("#txtParentescoretira3").val(),
						telefonofac : $("#txtTelefonofac").val(),
						ano_lectivo : $("#txtAno_lectivo").val(),
						fecha_ingresocdi : $("#txtFecha_ingresocdi").val(),
						paisalumno : $("#txtPaisalumno").val(),
						ciudadalumno : $("#txtCiudadalumno").val(),
						nombrecdiant : $("#txtNombrecdiant").val(),
						horario : $("#txtHorario").val(),
						requiere_transporte : $("#txtRequiere_transporte").val(),
						tipo_transporte : $("#txtTipo_transporte").val(),
						direccion_recoge : $("#txtDireccion_recoge").val(),
						direccion_deja : $("#txtDireccion_deja").val(),
						grado_alumno : $("#txtGrado_alumno").val(),
						detalle : detalle
                    };
		
		//$.post("./ajax/ClienteAjax.php?op=SaveOrUpdate", $(this).serialize(), function(r){// llamamos la url por post. function(r). r-> llamada del callback
		$.post("./ajax/ClienteAjax.php?op=SaveOrUpdate", data, function(r){// llamamos la url por post. function(r). r-> llamada del callback    
			Limpiar();
            ListadoCliente();
            dialog.modal('hide');
			swal("Mensaje del Sistema", r, "success");
            OcultarForm();
			location.reload();
        });
	}; //FIN GRABA ACTUALIZA CLIENTE


	//AGREGA SERVICIOS
	function AgregarServ(){
        var idArt = document.getElementsByName("txtIdArticulo");
        var cod = document.getElementsByName("txtCodgo");
        var desc = document.getElementsByName("txtDescripcion");
		
		for (var i = 0; i < idArt.length; i++) {
                AgregarDetalleRegistrar(idArt[i].value, cod[i].value, desc[i].value);
        }

	} //FIN AGREGA SERVICIOS	
	
	function AgregarDetalleRegistrar(idart, codigo, descripcion) {
        var detallesReg = new Array(idart, codigo, descripcion);
        elementosReg.push(detallesReg);
    }
	
	function consultarReg() {
        return JSON.stringify(elementosReg);
    }
	
	this.consultarReg = function(){
        /*
        for(i=0;i<this.elementos.length;i++){
            for(j=0;j<this.this.elementos[i].length;j++){
                console.log("Elemento: "+this.elementos[i][j]);
            }
        }
        */
        return JSON.stringify(elementosReg);
    };
	
	//LIMPIA CAMPOS
	function Limpiar(){
			$("#txtIdPersona").val("");
			$("#txtNombre").val("");
			$("#txtNum_documento").val("");
			$("#txtDireccion_departamento").val("");
			$("#txtDireccion_Calle").val("");
			$("#txtTelefono").val("");
			$("#txtEmail").val("");
			$("#txtNumero_cuenta").val("");
			$("#txtApellidop").val("");
			$("#txtApellidom").val("");
			$("#txtNombrealumno").val("");
			$("#txtNacimientoalumno").val("");
			$("#txtRepresentante").val("");
			$("#txtRepresentanteotro").val("");
			$("#txtHermanos").val("");
			$("#txtNombreh1").val("");
			$("#txtNacimientoh1").val("");
			$("#txtNombreh2").val("");
			$("#txtNacimientoh2").val("");
			$("#txtNombreh3").val("");
			$("#txtNacimientoh3").val("");
			$("#txtLugarocupa").val("");
			$("#txtCuidado").val("");
			$("#txtCuidadootro").val("");
			$("#txtCdianterior").val("");
			$("#txtEdadcdianterior").val("");
			$("#txtNombrepadre").val("");
			$("#txtNacimientopadre").val("");
			$("#txtPaispadre").val("");
			$("#txtCiudadpadre").val("");
			$("#txtNacionalidadpadre").val("");
			$("#txtDireccionpadre").val("");
			$("#txtTelefonopadre").val("");
			$("#txtCelularpadre").val("");
			$("#txtEmailpadre").val("");
			$("#txtTrabajopadre").val("");
			$("#txtProfesionpadre").val("");
			$("#txtCargopadre").val("");
			$("#txtTelefonoofipadre").val("");
			$("#txtEstadopadre").val("");
			$("#txtNombremadre").val("");
			$("#txtNacimientomadre").val("");
			$("#txtPaismadre").val("");
			$("#txtCiudadmadre").val("");
			$("#txtNacionalidadmadre").val("");
			$("#txtDireccionmadre").val("");
			$("#txtTelefonomadre").val("");
			$("#txtCelularmadre").val("");
			$("#txtEmailmadre").val("");
			$("#txtTrabajomadre").val("");
			$("#txtProfesionmadre").val("");
			$("#txtCargomadre").val("");
			$("#txtTelefonoofimadre").val("");
			$("#txtEstadomadre").val("");
			$("#txtAutorizaface").val("");
			$("#txtNombreretira1").val("");
			$("#txtTelefonoretira1").val("");
			$("#txtParentescoretira1").val("");
			$("#txtNombreretira2").val("");
			$("#txtTelefonoretira2").val("");
			$("#txtParentescoretira2").val("");
			$("#txtNombreretira3").val("");
			$("#txtTelefonoretira3").val("");
			$("#txtParentescoretira3").val("");
			$("#txtTelefonofac").val("");
			$("#txtAno_lectivo").val("");
			$("#txtFecha_ingresocdi").val("");
			$("#txtPaisalumno").val("");
			$("#txtCiudadalumno").val("");
			$("#txtNombrecdiant").val("");
			$("#txtHorario").val("");
			$("#txtRequiere_transporte").val("");
			$("#txtTipo_transporte").val("");
			$("#txtDireccion_recoge").val("");
			$("#txtDireccion_deja").val("");
			elementosReg.length = 0;
			$("table#tblDetalleIngresoServ tbody").html("");
			$("table#tblDetalleIngresoServAnt tbody").html("");
			$("#txtGrado_alumno").val("");
			$("#txtIdBorraServ").val("");
			

	} //FIN LIMPIA CAMPOS

	function ComboTipo_Documento() {
        $.get("./ajax/ClienteAjax.php?op=listTipo_DocumentoPersona", function(r) {
                $("#cboTipo_Documento").html(r);
            
        })
    }

	function VerForm(){
		$("#VerForm").show();// Mostramos el formulario
		$("#btnNuevo").hide();// ocultamos el boton nuevo
		$("#VerListado").hide();
	}

	function OcultarForm(){
		$("#VerForm").hide();// Mostramos el formulario
		$("#btnNuevo").show();// ocultamos el boton nuevo
		$("#VerListado").show();
	}

	// ABRE MODAL CON SERVICIO TABLA ARTICULO
	function AbrirModalServicio(){
        $("#modalListadoServicios").modal("show");
        var tabla = $('#tblServiciosIng').dataTable(
            {   "aProcessing": true,
                "aServerSide": true,
                "iDisplayLength": 4,
                "aoColumns":[
                        {   "mDataProp": "0"},
                        {   "mDataProp": "1"},
                        {   "mDataProp": "2"},
                        {   "mDataProp": "3"},
                        {   "mDataProp": "4"}
                ],"ajax": 
                    {
                        url: './ajax/ClienteAjax.php?op=listArtElegir',
                        type : "get",
                        dataType : "json",
                        
                        error: function(e){
                            console.log(e.responseText);    
                        }
                    },
                "bDestroy": true

            }).DataTable();
	} // FIN ABRE MODAL CON SERVICIO TABLA ARTICULO

} // FIN FUNCION INI

function ConsultarDetallesServ() {
        $("table#tblDetalleIngresoServ tbody").html("");
        var data = JSON.parse(objinit.consultar());
        //var idArt = document.getElementsByName("txtIdArticulo");
		
        for (var pos in data) {
		
                $("table#tblDetalleIngresoServ").append("<tr><td>" + data[pos][1] + " <input class='form-control' type='hidden' name='txtIdArticulo' id='txtIdArticulo[]' value='" + data[pos][0] + "' /></td><td>" + data[pos][2] + " <input class='form-control' type='hidden' onkeyup='Modificar(" + pos + ");' name='txtCodgo' id='txtCodgo[]' value='" + data[pos][2] + "' /></td><td><input class='form-control' type='text' name='txtDescripcion' onkeyup='Modificar(" + pos + ");' id='txtDescripcion[]' value='" + data[pos][3] + "' /></td><td WIDTH='100'><button type='button' data-toggle='tooltip' title='Eliminar Servicio' onclick='eliminarDetalle(" + pos + ")' class='btn btn-danger'><i class='fa fa-remove' ></i> </button></td></tr>");
    			//$("table#tblDetalleIngresoServ").append("<tr><td>" + data[pos][1] + " <input class='form-control' type='hidden' name='txtIdArticulo' id='txtIdArticulo[]' value='" + data[pos][0] + "' /></td><td>" + data[pos][2] + " <input class='form-control' type='hidden' onkeyup='Modificar(" + pos + ");' name='txtCodgo' id='txtCodgo[]' value='" + data[pos][2] + "' /></td><td><input class='form-control' type='text' name='txtDescripcion' onkeyup='Modificar(" + pos + ");' id='txtDescripcion[]' value='" + data[pos][3] + "' /></td><td><input class='form-control' type='text' onkeypress='return justNumbers(event);' name='txtStockIng' id='txtStockIng[]'   value='" + data[pos][4] + "' onkeyup='calcularTotal(" + pos + ");' required /></td><td><input class='form-control' type='text' onkeypress='return onKeyDecimal(event,this);' name='txtPrecioComp' id='txtPrecioComp[]'  value='" + data[pos][5] + "' onkeyup='calcularTotal(" + pos + ");' required /></td><td><input class='form-control' type='text' onkeyup='Modificar(" + pos + ");' onkeypress='return onKeyDecimal(event,this);' name='txtPrecioVentD' id='txtPrecioVentD[]'  value='" + data[pos][6] + "' required /></td><td><input class='form-control' type='text' onkeypress='return onKeyDecimal(event,this);' onkeyup='Modificar(" + pos + ");' name='txtPrecioVentaP' id='txtPrecioVentaP[]' value='" + data[pos][7] + "' required /></td><td WIDTH='100'><button type='button' data-toggle='tooltip' title='Eliminar Ingreso' onclick='eliminarDetalle(" + pos + ")' class='btn btn-danger'><i class='fa fa-remove' ></i> </button></td></tr>");
		}

    }	
	
	
function AgregarServ(id, art,cat,desc){
        AgregarDetalleCarritoServ(id, art, cat,desc);
    }
	
function AgregarDetalleCarritoServ(idart, nombre, codigo, descripcion) {
        var detalles = new Array(idart, nombre, codigo, descripcion);
        elementos.push(detalles);
        ConsultarDetallesServ();
    }

function eliminarDetalle(ele){
        console.log(ele);
        objinit.eliminar(ele);
        ConsultarDetallesServ();
    }

function ListadoCliente(){ 		
		var tabla = $('#tblCliente').dataTable(
		{   "aProcessing": true,
       		"aServerSide": true,
       		dom: 'Bfrtip',
	        buttons: [
	            'copyHtml5',
	            'excelHtml5',
	            'csvHtml5'
	        ],
        	"aoColumns":[
        	     	{   "mDataProp": "id"},
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
					{   "mDataProp": "18"},
					{   "mDataProp": "19"},
					{   "mDataProp": "20"},
					{   "mDataProp": "21"},
					{   "mDataProp": "22"},
					{   "mDataProp": "23"},
					{   "mDataProp": "24"},
					{   "mDataProp": "25"},
					{   "mDataProp": "26"},
					{   "mDataProp": "27"},
					{   "mDataProp": "28"},
					{   "mDataProp": "29"},
					{   "mDataProp": "30"},
					{   "mDataProp": "31"},
					{   "mDataProp": "32"},
					{   "mDataProp": "33"},
					{   "mDataProp": "34"},
					{   "mDataProp": "35"},
					{   "mDataProp": "36"},
					{   "mDataProp": "37"},
					{   "mDataProp": "38"},
					{   "mDataProp": "39"},
					{   "mDataProp": "40"},
					{   "mDataProp": "41"},
					{   "mDataProp": "42"},
					{   "mDataProp": "43"},
					{   "mDataProp": "44"},
					{   "mDataProp": "45"},
					{   "mDataProp": "46"},
					{   "mDataProp": "47"},
					{   "mDataProp": "48"},
					{   "mDataProp": "49"},
					{   "mDataProp": "50"},
					{   "mDataProp": "51"},
					{   "mDataProp": "52"},
					{   "mDataProp": "53"},
					{   "mDataProp": "54"},
					{   "mDataProp": "55"},
					{   "mDataProp": "56"},
					{   "mDataProp": "57"},
					{   "mDataProp": "58"},
					{   "mDataProp": "59"},
					{   "mDataProp": "60"},
					{   "mDataProp": "61"},
					{   "mDataProp": "62"},
					{   "mDataProp": "63"},
					{   "mDataProp": "64"},
					{   "mDataProp": "65"},
					{   "mDataProp": "66"},
					{   "mDataProp": "67"},
					{   "mDataProp": "68"},
					{   "mDataProp": "69"},
					{   "mDataProp": "70"},
					{   "mDataProp": "71"},
					{   "mDataProp": "72"},
					{   "mDataProp": "73"},
					{   "mDataProp": "74"},
					{   "mDataProp": "75"},
					{   "mDataProp": "76"},
					{   "mDataProp": "77"},
					{   "mDataProp": "78"},
					{   "mDataProp": "79"}


        	],"ajax": 
	        	{
	        		url: './ajax/ClienteAjax.php?op=list',
					type : "get",
					dataType : "json",
					
					error: function(e){
				   		console.log(e.responseText);	
					}
	        	},
	        "bDestroy": true

    	}).DataTable();
    };

function eliminarCliente(id){// funcion que llamamos del archivo ajax/CategoriaAjax.php?op=delete linea 53
	bootbox.confirm("¿Esta Seguro de eliminar el cliente seleccionado?", function(result){ // confirmamos con una pregunta si queremos eliminar
		if(result){// si el result es true
			$.post("./ajax/ClienteAjax.php?op=delete", {id : id}, function(e){// llamamos la url de eliminar por post. y mandamos por parametro el id 
                
				ListadoCliente();
				swal("Mensaje del Sistema", e, "success");

            });
		}
		
	})
}

// CARGA DATOS DEL CLIENTE BOTON EDITAR
function cargarDataCliente(id, tipo_persona,nombre,tipo_documento,num_documento,direccion_departamento,direccion_provincia,direccion_distrito,direccion_calle,telefono,email,numero_cuenta,estado,apellidop,apellidom,nombrealumno,nacimientoalumno,representante,representanteotro,hermanos,nombreh1,nacimientoh1,nombreh2,nacimientoh2,nombreh3,nacimientoh3,lugarocupa,cuidado,cuidadootro,cdianterior,edadcdianterior,nombrepadre,nacimientopadre,paispadre,ciudadpadre,nacionalidadpadre,direccionpadre,telefonopadre,celularpadre,emailpadre,trabajopadre,profesionpadre,cargopadre,telefonoofipadre,estadopadre,nombremadre,nacimientomadre,paismadre,ciudadmadre,nacionalidadmadre,direccionmadre,telefonomadre,celularmadre,emailmadre,trabajomadre,profesionmadre,cargomadre,telefonoofimadre,estadomadre,autorizaface,nombreretira1,telefonoretira1,parentescoretira1,nombreretira2,telefonoretira2,parentescoretira2,nombreretira3,telefonoretira3,parentescoretira3,telefonofac,ano_lectivo,fecha_ingresocdi,paisalumno,ciudadalumno,nombrecdiant,horario,requiere_transporte,tipo_transporte,direccion_recoge,direccion_deja,estado,grado_alumno){// funcion que llamamos del archivo ajax/CategoriaAjax.php linea 52
		$("#VerForm").show();// mostramos el formulario
		$("#btnNuevo").hide();// ocultamos el boton nuevo
		$("#VerListado").hide();

		$("#txtIdPersona").val(id);// recibimos la variable id a la caja de texto
		$("#cboTipo_Persona").val(tipo_persona);
		$("#txtNombre").val(nombre);
		$("#cboTipo_Documento").val(tipo_documento);
		$("#txtNum_documento").val(num_documento);
		$("#txtDireccion_departamento").val(direccion_departamento);
		$("#txtDireccion_Calle").val(direccion_calle);
		$("#txtTelefono").val(telefono);
		$("#txtEmail").val(email);
		$("#txtNumero_cuenta").val(numero_cuenta);
		$("#txtApellidop").val(apellidop);
		$("#txtApellidom").val(apellidom);
		$("#txtNombrealumno").val(nombrealumno);
		$("#txtNacimientoalumno").val(nacimientoalumno);
		$("#txtRepresentante").val(representante);
		$("#txtRepresentanteotro").val(representanteotro);
		$("#txtHermanos").val(hermanos);
		$("#txtNombreh1").val(nombreh1);
		$("#txtNacimientoh1").val(nacimientoh1);
		$("#txtNombreh2").val(nombreh2);
		$("#txtNacimientoh2").val(nacimientoh2);
		$("#txtNombreh3").val(nombreh3);
		$("#txtNacimientoh3").val(nacimientoh3);
		$("#txtLugarocupa").val(lugarocupa);
		$("#txtCuidado").val(cuidado);
		$("#txtCuidadootro").val(cuidadootro);
		$("#txtCdianterior").val(cdianterior);
		$("#txtEdadcdianterior").val(edadcdianterior);
		$("#txtNombrepadre").val(nombrepadre);
		$("#txtNacimientopadre").val(nacimientopadre);
		$("#txtPaispadre").val(paispadre);
		$("#txtCiudadpadre").val(ciudadpadre);
		$("#txtNacionalidadpadre").val(nacionalidadpadre);
		$("#txtDireccionpadre").val(direccionpadre);
		$("#txtTelefonopadre").val(telefonopadre);
		$("#txtCelularpadre").val(celularpadre);
		$("#txtEmailpadre").val(emailpadre);
		$("#txtTrabajopadre").val(trabajopadre);
		$("#txtProfesionpadre").val(profesionpadre);
		$("#txtCargopadre").val(cargopadre);
		$("#txtTelefonoofipadre").val(telefonoofipadre);
		$("#txtEstadopadre").val(estadopadre);
		$("#txtNombremadre").val(nombremadre);
		$("#txtNacimientomadre").val(nacimientomadre);
		$("#txtPaismadre").val(paismadre);
		$("#txtCiudadmadre").val(ciudadmadre);
		$("#txtNacionalidadmadre").val(nacionalidadmadre);
		$("#txtDireccionmadre").val(direccionmadre);
		$("#txtTelefonomadre").val(telefonomadre);
		$("#txtCelularmadre").val(celularmadre);
		$("#txtEmailmadre").val(emailmadre);
		$("#txtTrabajomadre").val(trabajomadre);
		$("#txtProfesionmadre").val(profesionmadre);
		$("#txtCargomadre").val(cargomadre);
		$("#txtTelefonoofimadre").val(telefonoofimadre);
		$("#txtEstadomadre").val(estadomadre);
		$("#txtAutorizaface").val(autorizaface);
		$("#txtNombreretira1").val(nombreretira1);
		$("#txtTelefonoretira1").val(telefonoretira1);
		$("#txtParentescoretira1").val(parentescoretira1);
		$("#txtNombreretira2").val(nombreretira2);
		$("#txtTelefonoretira2").val(telefonoretira2);
		$("#txtParentescoretira2").val(parentescoretira2);
		$("#txtNombreretira3").val(nombreretira3);
		$("#txtTelefonoretira3").val(telefonoretira3);
		$("#txtParentescoretira3").val(parentescoretira3);
		$("#txtTelefonofac").val(telefonofac);
		$("#txtAno_lectivo").val(ano_lectivo);
		$("#txtFecha_ingresocdi").val(fecha_ingresocdi);
		$("#txtPaisalumno").val(paisalumno);
		$("#txtCiudadalumno").val(ciudadalumno);
		$("#txtNombrecdiant").val(nombrecdiant);
		$("#txtHorario").val(horario);
		$("#txtRequiere_transporte").val(requiere_transporte);
		$("#txtTipo_transporte").val(tipo_transporte);
		$("#txtDireccion_recoge").val(direccion_recoge);
		$("#txtDireccion_deja").val(direccion_deja);
		$("#txtGrado_alumno").val(grado_alumno);

		// LLENA TABLA DE LOS ARTICULOS ELEGIDOS
		var idPersona = id
        $.post("./ajax/ClienteAjax.php?op=listArtElegidos", {idPersona2: idPersona}, function(r) {
                $("table#tblDetalleIngresoServAnt tbody").html(r);
            
        })
    
		
		
	}


 	


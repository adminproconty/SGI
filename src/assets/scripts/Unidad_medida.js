$(document).on("ready", init);// Inciamos el jquery

function init(){
	
    $('#tblUnidad_Medida').dataTable({
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ]
    });
    
	ListadoUnidad_Medida();// Ni bien carga la pagina que cargue el metodo
	$("#VerForm").hide();// Ocultamos el formulario
	$("form#frmUnidad_Medida").submit(SaveOrUpdate);// Evento submit de jquery que llamamos al metodo SaveOrUpdate para poder registrar o modificar datos
	
	$("#btnNuevo").click(VerForm);// evento click de jquery que llamamos al metodo VerForm

    function SaveOrUpdate(e){
    		e.preventDefault();// para que no se recargue la pagina
            $.post("./ajax/Unidad_MedidaAjax.php?op=SaveOrUpdate", $(this).serialize(), function(r){// llamamos la url por post. function(r). r-> llamada del callback
                
                Limpiar();
                //$.toaster({ priority : 'success', title : 'Mensaje', message : r});
                //swal("Mensaje del Sistema", r, "success");
				mensajesnew(r);
                OcultarForm();
    	        ListadoUnidad_Medida();
            });
    };

    function Limpiar(){
    		// Limpiamos las cajas de texto
    		$("#txtIdUnidad_Medida").val("");
    	    $("#txtNombre").val("");
    	    $("#txtPrefijo").val("");
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

}

function ListadoUnidad_Medida(){ 
        var tabla = $('#tblUnidad_Medida').dataTable(
        {   "aProcessing": true,
            "aServerSide": true,
            dom: 'Bfrtip',
            buttons: [
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdfHtml5'
            ],
            "aoColumns":[
                    {   "mDataProp": "0"},
                    {   "mDataProp": "1"},
                    {   "mDataProp": "2"},
                    {   "mDataProp": "3"}

            ],"ajax": 
                {
                    url: './ajax/Unidad_MedidaAjax.php?op=list',
                    type : "get",
                    dataType : "json",
                    
                    error: function(e){
                        console.log(e.responseText);    
                    }
                },
            "bDestroy": true
        }).DataTable();
};

function eliminarUnidad_Medida(id){// funcion que llamamos del archivo ajax/CategoriaAjax.php?op=delete linea 53
	bootbox.confirm("¿Esta Seguro de eliminar la Unidad de Medida?", function(result){ // confirmamos con una pregunta si queremos eliminar
		if(result){// si el result es true
			$.post("./ajax/Unidad_MedidaAjax.php?op=delete", {id : id}, function(e){// llamamos la url de eliminar por post. y mandamos por parametro el id 
                
				ListadoUnidad_Medida();
				//swal("Mensaje del Sistema", e, "success");
				mensajesnew(e);

            });
		}
		
	})
}

function cargarDataUnidad_Medida(id, nombre,prefijo){// funcion que llamamos del archivo ajax/CategoriaAjax.php linea 52
		$("#VerForm").show();// mostramos el formulario
		$("#btnNuevo").hide();// ocultamos el boton nuevo
		$("#VerListado").hide();

		$("#txtIdUnidad_Medida").val(id);// recibimos la variable id a la caja de texto txtIdCategoria
	    $("#txtNombre").val(nombre);// recibimos la variable nombre a la caja de texto txtNombre
	    $("#txtPrefijo").val(prefijo);
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
					swal("Error!!!", "REGISTRO NO FUE ELIMINADO", "error");
				break;
				case "10":
					swal("Advertencia!!!", "DEBE AGREGAR LA SERIE/NÚMERO", "warning");
				break;
			}				
			        			
	}
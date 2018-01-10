$(document).on("ready", init);

var objinit = new init();

var bandera = 1;

elementos = new Array();
elementos2 = new Array();

elementosReg = new Array(); 

function init() {

    sessionStorage.idSucursal = $("#txtIdSucursal").val();
    sessionStorage.Sucursal = $("#txtSucursal").val();

    $('#tblIngresos').dataTable({
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ]
    });
    
    var tabla = $('#tblArticulosIng').dataTable({
            "iDisplayLength": 4,
            "aLengthMenu": [2, 4]
        });

        

    ComboTipoDoc();
    ListadoIngresos();
    GetImpuesto();

    $("#VerForm").hide();

	$("#btnIngresarAbonos").prop("disabled", true);

	// $("#btnAgregar").click(AgregarDetalleIngreso)
   // $("#cboTipoComprobanteIng").change(VerNumSerie);
    $("#btnBuscarProveedor").click(AbrirModalProveedor);
    $("#btnBuscarSucursal").click(AbrirModalSucursal);
    $("#btnBuscarSucursal2").click(AbrirModalSucursal);
    $("#btnBuscarArt").click(AbrirModalArticulo);
	
	//PARA ABONOS
	$("#btnIngresarAbonos").click(RegistrarAb);
	

	
    $("#frmIngresos").submit(GuardarIngreso);

    $("#btnAgregarProveedor").click(function(e){
		e.preventDefault();

		var opt = $("input[type=radio]:checked");
		$("#txtIdProveedor").val(opt.val());
		$("#txtProveedor").val(opt.attr("data-nombre"));

		$("#modalListadoProveedor").modal("hide");
	});

    $("#btnAgregarSucursal").click(function(e){
        e.preventDefault();

        var opt = $("input[type=radio]:checked");
        $("#txtIdSucursal").val(opt.val());
        $("#txtSucursal").val(opt.attr("data-nombre"));

        $("#txtIdSucursal2").val(opt.val());
        $("#txtSucursal2").val(opt.attr("data-nombre"));

        $("#modalListadoSucursal").modal("hide");
    });

	$("#btnAgregarArt").click(function(e){
		e.preventDefault();

        var opt =  tabla.$("input[name='optArtBusqueda[]']:checked", {"page": "all"});

		opt.each(function() {
			AgregarDetalle($(this).val(), $(this).attr("data-nombre"), "", "", "", "1", "1", "1", "1", "1");
		})
		
		$("#modalListadoArticulos").modal("hide");
	});

    $("#txtStockIng").keypress(function total_suma(){
        var suma = 0;
        alert("s");
        $("#txtTotal").val("23");
    });

	// PARA ABONOS
	
	
	function RegistrarAb(e){
		e.preventDefault();
         var saldovalida = parseFloat($("#txtSaldo").val());
		  //bootbox.alert("Saldo " + parseFloat($("#txtSaldo").val()));
        if ($("#txtFecha_Pago").val() != "") {
            if ($("#txtValor").val() != "") {
				if (parseFloat($("#txtValor").val()) > 0) {
					if (saldovalida > 0) {
								//Agregar();
								var data = { 
									idIngresoab : $("#txtIdingreso").val(),
									Fecha_Pago : $("#txtFecha_Pago").val(),
									Forma_Pago : $("#txtForma_Pago").val(),
									Documento : $("#txtDocumento").val(),
									Banco : $("#txtBanco").val(),
									Valor : $("#txtValor").val()
								};
								
								$.post("./ajax/IngresoAjax.php?op=SaveAbono", data, function(r){
									swal("Mensaje del Sistema", r, "success");
									
									
								});
								
								
								var data2 = { 
									idIngresoab : $("#txtIdingreso").val(),
									Valor : parseFloat($("#txtValor").val()),
									Saldo : parseFloat($("#txtSaldo").val())
									
								};
										 
								$.post("./ajax/IngresoAjax.php?op=ActualizaSaldo", data2, function(r){
									swal("Mensaje del Sistema", r, "success");
									
									//location.reload();
									
								});
								
								var Saldopasa = parseFloat($("#txtSaldo").val());
								var Valorpasa = parseFloat($("#txtValor").val());
								//bootbox.alert("Pasa " + Saldopasa + Valorpasa);
								
								if (Saldopasa == Valorpasa){
									//bootbox.alert("Llega para Cancelar" + Saldopasa + Valorpasa);
									
									var data3 = { 
										idIngreso : $("#txtIdingreso").val(),
										estado : 'A'
									};
											 
				 
									$.post("./ajax/IngresoAjax.php?op=CambiarEstado", data3, function(e){
										
										swal("Mensaje del Sistema", e, "success");
										
										
									});
								}
								
								LimpiarAbono();
								OcultarForm();
								ListadoIngresos();
								location.reload();
					} else {
					bootbox.alert("El ingreso ya ha sido Pagado. El saldo es cero");
					}	
				} else {
                bootbox.alert("Debe ingresar un Valor mayor a cero");
				}	
            } else {
                bootbox.alert("Debe ingresar un Valor");
            }
        } else {
            bootbox.alert("Debe elegir una Fecha para el Abono");
        }
	}
	
	function ActualizaSal(){
					
                    var data = { 
                        idIngresoab : $("#txtIdingreso").val(),
                        Saldo : $("#txtValor").val()
                    };
                             
                    $.post("./ajax/IngresoAjax.php?op=ActualizaSaldo", data, function(r){
                        swal("Mensaje del Sistema", r, "success");

                    });

	}
	
	///////////

	function Agregar(){
        var idArt = document.getElementsByName("txtIdArticulo");
        var cod = document.getElementsByName("txtCodgo");
        //var serie = document.getElementsByName("txtSeries");
        var desc = document.getElementsByName("txtDescripcion");
        var stock_ing = document.getElementsByName("txtStockIng");
        var prec_comp = document.getElementsByName("txtPrecioComp");
        var prec_ventaD = document.getElementsByName("txtPrecioVentD");
        var prec_ventaP = document.getElementsByName("txtPrecioVentaP");
        /*
		var idArt = document.frmIngresos.elements["txtIdArticulo[]"];
		var cod = document.frmIngresos.elements["txtCodgo[]"];
        var serie = document.frmIngresos.elements["txtSerie[]"];
        var desc = document.frmIngresos.elements["txtDescripcion[]"];
        var stock_ing = document.frmIngresos.elements["txtStockIng[]"];
        //var stock_act = document.frmIngresos.elements["txtStockAct[]"];
        var prec_comp = document.frmIngresos.elements["txtPrecioComp[]"];
        var prec_ventaD = document.frmIngresos.elements["txtPrecioVentD[]"];
        var prec_ventaP = document.frmIngresos.elements["txtPrecioVentaP[]"];
        */
        for (var i = 0; i < stock_ing.length; i++) {
            if (stock_ing[i].value !== "") {
                AgregarDetalleRegistrar(idArt[i].value, cod[i].value, desc[i].value, stock_ing[i].value, 1,
                	 prec_comp[i].value, prec_ventaD[i].value, prec_ventaP[i].value);
            }
        }

	}
    
		
	function GuardarIngreso(e){
		e.preventDefault();

        if ($("#txtIdProveedor").val() != "") {
            if ($("#cboTipoComprobanteIng").val() != "") {
                if (elementos.length > 0) {
                    Agregar();
                    var detalle =  JSON.parse(consultarReg());

                    var data = { 
                        idUsuario : $("#txtIdUsuario").val(),
                        idSucursal : $("#txtIdSucursal").val(),
                        idproveedor : $("#txtIdProveedor").val(),
                        tipo_comprobante : $("#cboTipoComprobanteIng").val(),
                        serie_comprobante : $("#txtSerie").val(),
                        num_comprobante : $("#txtNumero").val(),
                        impuesto : $("#txtImpuesto").val(),
						fecha : $("#txtFecha").val(),
                        total : $("#txtTotal").val(), //TOTAL
						subtotal : $("#txtSubTotal").val(), //BASE 12%
						base0 : $("#txtBase0").val(), //BASE 0%
						baseIVA : $("#txtIgv").val(), //IVA
                        detalle : detalle
                    };
                    
                    $.post("./ajax/IngresoAjax.php?op=Save", data, function(r){
                        swal("Mensaje del Sistema", r, "success");
                        //alert(r);
                        Limpiar();
                        OcultarForm();
                        ListadoIngresos();
                    });
                } else {
                    bootbox.alert("Debe agregar articulos al detalle");
                }
            } else {
                bootbox.alert("Debe seleccionar un tipo de comprobante");
            }
        } else {
            bootbox.alert("Debe elegir un Proveedor");
        }
	}

    function Limpiar(){
        $("#txtIdSucursal").val(sessionStorage.idSucursal);
        $("#txtSucursal").val(sessionStorage.Sucursal);
        $("#txtIdProveedor").val("");
        $("#txtProveedor").val("");
       // $("#cboTipoComprobanteIng").val("");
        $("#txtSerie").val("");
        $("#txtNumero").val("");
        $("#txtSubTotal").val("");
        $("#txtIgv").val("");
        $("#txtTotal").val("");
        elementosReg.length = 0;
        elementos.length = 0;
 		elementos2.length = 0;
        $("#tblDetalleIngreso tbody").html("");
		$("#txtFecha").val("");
		$("#txtSaldo").val("");
    }
    
    function LimpiarAbono(){
        $("#txtIdSucursal").val(sessionStorage.idSucursal);
        $("#txtSucursal").val(sessionStorage.Sucursal);
		
		$("#txtFecha_Pago").val("");
        $("#txtForma_Pago").val("");
        $("#txtDocumento").val("");
        $("#txtBanco").val("");
        $("#txtValor").val("");
		
        //$("#tblDetalleIngreso tbody").html("");
		
    }

	
	function ComboTipoDoc() {

        $.get("./ajax/IngresoAjax.php?op=listTipoDoc", function(r) {
                $("#cboTipoComprobanteIng").html(r);
            
        })
    }

    function GetImpuesto() {

        $.getJSON("./ajax/GlobalAjax.php?op=GetImpuesto", function(r) {
                $("#txtImpuesto").val(r.porcentaje_impuesto);
                $("#SubTotal").html(r.simbolo_moneda + " S.Total 12%:");
				$("#Base0").html(r.simbolo_moneda + " S.Total 0%:");
                $("#IGV").html(r.simbolo_moneda + " IVA 12%:");
                $("#Total").html(r.simbolo_moneda + " Total:");                
				$("#TotalAbonos").html(r.simbolo_moneda + " Abonado:");                
				$("#Saldo").html(r.simbolo_moneda + " Saldo:");  
        })
    }

    function VerForm(){
        $("#VerForm").show();
        $("#btnNuevo").hide();
        $("#VerListado").hide();
    }

    function OcultarForm(){
        $("#VerForm").hide();
        $("#btnNuevo").show();
        $("#VerListado").show();
    }

    function AbrirModalProveedor(){
		$("#modalListadoProveedor").modal("show");
		$.post("./ajax/IngresoAjax.php?op=listProveedor", function(r){
            $("#Proveedor").html(r);
            $("#tblProveedores").DataTable();
        });
	}

    function AbrirModalSucursal(){
        $("#modalListadoSucursal").modal("show");

        $.post("./ajax/IngresoAjax.php?op=listSucursal", function(r){
            $("#Sucursales").html(r);
            $("#tblSucursales").DataTable();
        });
    }

	function AbrirModalArticulo(){
		
        $("#modalListadoArticulos").modal("show");
        var tabla = $('#tblArticulosIng').dataTable(
            {   "aProcessing": true,
                "aServerSide": true,
                "iDisplayLength": 4,
                //"aLengthMenu": [0, 4],
                "aoColumns":[
                        {   "mDataProp": "0"},
                        {   "mDataProp": "1"},
                        {   "mDataProp": "2"},
                        {   "mDataProp": "3"},
                        {   "mDataProp": "4"},
                        {   "mDataProp": "5"}


                ],"ajax": 
                    {
                        url: './ajax/ArticuloAjax.php?op=listArtElegir',
                        type : "get",
                        dataType : "json",
                        
                        error: function(e){
                            console.log(e.responseText);    
                        }
                    },
                "bDestroy": true

            }).DataTable();
	}


    function AgregarDetalle(idart, nombre, codigo, descripcion, stock_ing, stock_act, p_compra, p_ventaD, p_ventaP) {
        var detalles = new Array(idart, nombre, codigo, descripcion, stock_ing, stock_act, p_compra, p_ventaD, p_ventaP);
        elementos.push(detalles);
        ConsultarDetalles();
    }

	
    function AgregarDetalleRegistrar(idart, codigo, descripcion, stock_ing, stock_act, p_compra, p_ventaD, p_ventaP) {
        var detallesReg = new Array(idart, codigo, descripcion, stock_ing, stock_act, p_compra, p_ventaD, p_ventaP);
        elementosReg.push(detallesReg);
    }

    

	function consultar() {
        return JSON.stringify(elementos);
    }

    function consultarReg() {
        return JSON.stringify(elementosReg);
    }

    this.eliminar = function(pos){
        //var pos = elementos[].indexOf( 'c' );
        console.log(pos);
        
        pos > -1 && elementos.splice(parseInt(pos),1);
        console.log(elementos);
        
        //this.elementos.splice(pos, 1);
        //console.log(this.elementos);
    };

    this.consultar = function(){
        /*
        for(i=0;i<this.elementos.length;i++){
            for(j=0;j<this.this.elementos[i].length;j++){
                console.log("Elemento: "+this.elementos[i][j]);
            }
        }
        */
        return JSON.stringify(elementos);
    };

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
	
};

function eliminarDetalleing(ele){
        console.log(ele);
        objinit.eliminar(ele);
        ConsultarDetalles();
        calcularIgv();
        calcularSubTotal();
    }

	
function AgregarFila(pos){
        //<td> <input class='form-control' type='hidden' name='txtIdArticulo' id='txtIdArticulo[]' value='1' /></td><td><input class='form-control' type='text' name='txtCodgo' id='txtCodgo[]' value='1' /></td><td><input class='form-control' type='text' name='txtSerie' id='txtSerie[]'  value='1' /></td><td><input class='form-control' type='text' name='txtDescripcion' id='txtDescripcion[]' value='1' /></td><td><input class='form-control' type='text' onkeypress='return justNumbers(event);' name='txtStockIng' id='txtStockIng[]'   value='1' onkeyup='calcularTotal(" + pos + ");' required /></td><td><input class='form-control' type='text' onkeypress='return onKeyDecimal(event,this);' name='txtPrecioComp' id='txtPrecioComp[]'  value='1' onkeyup='calcularTotal(" + pos + ");' required /></td><td><input class='form-control' type='text' onkeypress='return onKeyDecimal(event,this);' name='txtPrecioVentD' id='txtPrecioVentD[]'  value='1' required /></td><td><input class='form-control' type='text' onkeypress='return onKeyDecimal(event,this);' name='txtPrecioVentaP' id='txtPrecioVentaP[]' value='1' required /></td><td WIDTH='100'><button type='button' data-toggle='tooltip' title='Quitar Articulo del detalle' onclick='eliminarDetalle(" + pos + ")' class='btn btn-danger'><i class='fa fa-remove' ></i> </button> <button type='button' data-toggle='tooltip' title='Pulse aqui para agregar mas filas de este articulo' onclick='AgregarFila(" + pos + ")' class='btn btn-success'><i class='fa fa-plus' ></i> </button></td>
        $("#tblDetalleIngreso tbody tr:eq(" + pos + ")").clone().appendTo("#tblDetalleIngreso tbody");
       //$("#tblDetalleIngreso tbody tr:last").after("<tr><td> <input class='form-control' type='hidden' name='txtIdArticulo' id='txtIdArticulo[]' value='1' /></td><td><input class='form-control' type='text' name='txtCodgo' id='txtCodgo[]' value='1' /></td><td><input class='form-control' type='text' name='txtSerie' id='txtSerie[]'  value='1' /></td><td><input class='form-control' type='text' name='txtDescripcion' id='txtDescripcion[]' value='1' /></td><td><input class='form-control' type='text' onkeypress='return justNumbers(event);' name='txtStockIng' id='txtStockIng[]'   value='1' onkeyup='calcularTotal(" + pos + ");' required /></td><td><input class='form-control' type='text' onkeypress='return onKeyDecimal(event,this);' name='txtPrecioComp' id='txtPrecioComp[]'  value='1' onkeyup='calcularTotal(" + pos + ");' required /></td><td><input class='form-control' type='text' onkeypress='return onKeyDecimal(event,this);' name='txtPrecioVentD' id='txtPrecioVentD[]'  value='1' required /></td><td><input class='form-control' type='text' onkeypress='return onKeyDecimal(event,this);' name='txtPrecioVentaP' id='txtPrecioVentaP[]' value='1' required /></td><td WIDTH='100'><button type='button' data-toggle='tooltip' title='Quitar Articulo del detalle' onclick='eliminarDetalle(" + pos + ")' class='btn btn-danger'><i class='fa fa-remove' ></i> </button> <button type='button' data-toggle='tooltip' title='Pulse aqui para agregar mas filas de este articulo' onclick='AgregarFila(" + pos + ")' class='btn btn-success'><i class='fa fa-plus' ></i> </button></td></tr>");
}

function ConsultarDetalles() {
        $("table#tblDetalleIngreso tbody").html("");
        var data = JSON.parse(objinit.consultar());
        
        for (var pos in data) {
                //$("table#tblDetalleIngreso").append("<tr><td>" + data[pos][1] + " <input class='form-control' type='hidden' name='txtIdArticulo' id='txtIdArticulo[]' value='" + data[pos][0] + "' /></td><td>" + data[pos][2] + " <input class='form-control' type='hidden' onkeyup='Modificar(" + pos + ");' name='txtCodgo' id='txtCodgo[]' value='" + data[pos][2] + "' /></td><td><input class='form-control' type='hidden' name='txtSeries' onkeyup='Modificar(" + pos + ");' id='txtSeries[]'  value='" + data[pos][3] + "' /></td><td><input class='form-control' type='text' name='txtDescripcion' onkeyup='Modificar(" + pos + ");' id='txtDescripcion[]' value='" + data[pos][4] + "' /></td><td><input class='form-control' type='text' onkeypress='return justNumbers(event);' name='txtStockIng' id='txtStockIng[]'   value='" + data[pos][5] + "' onkeyup='calcularTotal(" + pos + ");' required /></td><td><input class='form-control' type='text' onkeypress='return onKeyDecimal(event,this);' name='txtPrecioComp' id='txtPrecioComp[]'  value='" + data[pos][6] + "' onkeyup='calcularTotal(" + pos + ");' required /></td><td><input class='form-control' type='text' onkeyup='Modificar(" + pos + ");' onkeypress='return onKeyDecimal(event,this);' name='txtPrecioVentD' id='txtPrecioVentD[]'  value='" + data[pos][7] + "' required /></td><td><input class='form-control' type='text' onkeypress='return onKeyDecimal(event,this);' onkeyup='Modificar(" + pos + ");' name='txtPrecioVentaP' id='txtPrecioVentaP[]' value='" + data[pos][8] + "' required /></td><td WIDTH='100'><button type='button' data-toggle='tooltip' title='Eliminar Ingreso' onclick='eliminarDetalle(" + pos + ")' class='btn btn-danger'><i class='fa fa-remove' ></i> </button> <button type='button' data-toggle='tooltip' title='Pulse aqui para agregar mas filas de este articulo' onclick='AgregarDetalle(" + data[pos][0] + ",\"" + data[pos][1] +"\",\"" + data[pos][2] + "\",\"" + "" + "\",\"" + data[pos][4] + "\",\"" + data[pos][5] + "\",\"" + data[pos][6] + "\",\"" + data[pos][7] + "\",\"" + data[pos][8] + "\",\"" + data[pos][9] + "\",\"" + pos + "\")' class='btn btn-success'><i class='fa fa-plus' ></i> </button></td></tr>");
    	      $("table#tblDetalleIngreso").append("<tr><td>" + data[pos][1] + " <input class='form-control' type='hidden' name='txtIdArticulo' id='txtIdArticulo[]' value='" + data[pos][0] + "' /></td><td>" + data[pos][2] + " <input class='form-control' type='hidden' onkeyup='Modificar(" + pos + ");' name='txtCodgo' id='txtCodgo[]' value='" + data[pos][2] + "' /></td><td><input class='form-control' type='text' name='txtDescripcion' style='text-transform:uppercase;' onkeyup='javascript:this.value=this.value.toUpperCase();' onkeyup='Modificar(" + pos + ");' id='txtDescripcion[]' value='" + data[pos][3] + "' /></td><td><input class='form-control' type='text' onkeypress='return justNumbers(event);' name='txtStockIng' id='txtStockIng[]'   value='" + data[pos][4] + "' onkeyup='calcularTotal(" + pos + ");' required /></td><td><input class='form-control' type='text' onkeypress='return onKeyDecimal(event,this);' name='txtPrecioComp' id='txtPrecioComp[]'  value='" + data[pos][5] + "' onkeyup='calcularTotal(" + pos + ");' required /></td><td><input class='form-control' type='text' onkeyup='Modificar(" + pos + ");' onkeypress='return onKeyDecimal(event,this);' name='txtPrecioVentD' id='txtPrecioVentD[]'  value='" + data[pos][6] + "' required /></td><td><input class='form-control' type='text' onkeypress='return onKeyDecimal(event,this);' onkeyup='Modificar(" + pos + ");' name='txtPrecioVentaP' id='txtPrecioVentaP[]' value='" + data[pos][7] + "' required /></td><td WIDTH='100'><button type='button' data-toggle='tooltip' title='Eliminar Ingreso' onclick='eliminarDetalleing(" + pos + ")' class='btn btn-danger'><i class='fa fa-remove' ></i> </button></td></tr>");
		}
        calcularIgv();
        calcularSubTotal();
        calcularTotal();
    }

	
function ListadoIngresos(){ 
        var tabla = $('#tblIngresos').dataTable(
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

            ],"ajax": 
                {
                    url: './ajax/IngresoAjax.php?op=list',
                    type : "get",
                    dataType : "json",
                    
                    error: function(e){
                        console.log(e.responseText);    
                    }
                },
            "bDestroy": true

        }).DataTable();
    };

function cargarDataIngreso(id, serie, numero, impuesto, total, idIngreso, Proveedor, tipo_comprobante, saldo,subtotal,base0,baseIVA){
        bandera = 2;
        $("#VerForm").show();
        $("#btnNuevo").hide();
        $("#VerListado").hide();

        $("#btnRegistrarIng").hide();
        //$("#btnBuscarProveedor").hide();
        $("#btnVerArticulos").hide();

       // $("#VerMod").show();
        $("#txtProveedor").val(Proveedor);
        $("#txtImpuesto").val(impuesto);
        $("#cboTipoComprobanteIng").html("<option>" + tipo_comprobante + "</option>");
        $("#txtSerie").val(serie);
        $("#txtTotal").val(Math.round(total*100)/100);
        //var totalIgv=total * impuesto/(100+parseInt(impuesto));
        //$("#txtIgv").val(Math.round(totalIgv*100)/100);
		$("#txtIgv").val(Math.round(baseIVA*100)/100);
        //var subTotal=total - (total * impuesto/(100+parseInt(impuesto)));
        //$("#txtSubTotal").val(Math.round(subTotal*100)/100);
		$("#txtSubTotal").val(Math.round(subtotal*100)/100);
		$("#txtBase0").val(Math.round(base0*100)/100);
        $("#txtNumero").val(numero);
		
		$("#txtSaldo").val(Math.round(saldo*100)/100);
		
		var TotalAbono=total - saldo;
		$("#txtTotalAbonos").val(Math.round(TotalAbono*100)/100);
		
		
		
        CargarDetalleIngreso(idIngreso);
		CargarDetalleAbonos(idIngreso);
        //$('button[type="submit"]').attr('disabled','disabled');
        //$("#btnBuscarArt").prop("disabled", true);
        $("#btnBuscarProveedor").prop("disabled", true);
        $("#btnBuscarSucursal").prop("disabled", true);

        $("#cboFechaDesde").hide();
        $("#cboFechaHasta").hide();
        $("#btnBuscarSucursal2").hide();
        $("#txtSucursal2").hide();
        $("#lblSucursal2").hide();
        $("#lblDesde").hide();
        $("#lblHasta").hide();
		
		$("#txtFecha").prop("disabled", true);
		$("#cboTipoComprobanteIng").prop("disabled", true);
		$("#txtSerie").prop("disabled", true);
		$("#txtNumero").prop("disabled", true);

		
		// AGREGADO PARA ABONOS
		$("#btnIngresarAbonos").prop("disabled", false);
		$("#txtFecha_Pago").prop("disabled", false);
		$("#txtForma_Pago").prop("disabled", false);
		$("#txtDocumento").prop("disabled", false);
		$("#txtBanco").prop("disabled", false);
		$("#txtValor").prop("disabled", false);
		$("#txtIdingreso").val(id);
		//$("#txtTotalAbonos").val(id);
		
		
		//SumarColumna('tblDetalleAbonos', 4);
		
		    
}	
function cancelarIngreso(idIngreso, estado){
		//bootbox.alert("Tercer Paso " + idIngreso + estado); 
		if (estado='C'){
			bootbox.confirm("¿Esta Seguro de Anular el ingreso?", function(result){
				if(result){
				
						var data = { 
							idIngreso : idIngreso,
							estado : estado
						};
								 
	 
					$.post("./ajax/IngresoAjax.php?op=CambiarEstado", data, function(e){
						
						swal("Mensaje del Sistema", e, "success");
						ListadoIngresos();
						
					});
				}
				
			})
		}
		
    }

function CargarDetalleIngreso(idIngreso) {
        $('th:nth-child(9)').hide();
        $.post("./ajax/IngresoAjax.php?op=GetDetalleArticulo", {idIngreso: idIngreso}, function(r) {
                $("table#tblDetalleIngreso tbody").html(r);
            
        })
    }

function CargarDetalleAbonos(idIngreso) {
        $('th:nth-child(9)').hide();
        $.post("./ajax/IngresoAjax.php?op=GetDetalleAbonos", {idIngreso: idIngreso}, function(r) {
                $("table#tblDetalleAbonos tbody").html(r);
            
        })
    }	

function SumarColumna(grilla, columna) {
    $('th:nth-child(9)').hide();
    var resultVal = 0.0; 
    //alert('hola');  

	//$("table#tblDetalleAbonos tbody").html(r);
	
	$("table#" + grilla + " tbody tr").not(':first').each(
	//$("table#tblDetalleAbonos tbody tr").not(':first').each(
        function() {
         
            var celdaValor = $(this).find('td:eq(' + columna + ')');
			//var celdaValor = $(this).find('td:eq(4)');
            
            if (celdaValor.val() != null)
                    resultVal += parseFloat(celdaValor.html().replace(',','.'));
                     
        } //function
         
    ) //each
    //alert(resultVal);
	$("#txtTotalAbonos").val(resultVal);
   // $("#" + grilla + " tbody tr:last td:eq(" + columna + ")").html(resultVal.toFixed(2).toString().replace('.',','));   
 
}  
	
function calcularIgv(){
        var suma = 0;
		//bootbox.alert("Pasa " + data[pos][4] + " " + data[pos][5]);
        var data = JSON.parse(objinit.consultar());
        
        for (var pos in data) {
            suma += parseFloat(data[pos][6] * data[pos][4]); //BASE 12% * STOCK
        }
        var totalIgv=(suma * parseInt($("#txtImpuesto").val())) / 100 //SUMA DE 12% * IVA
        $("#txtIgv").val(totalIgv.toFixed(2));
    }

function calcularBase0(){
        var suma = 0;

        var data = JSON.parse(objinit.consultar());
        
        for (var pos in data) {
            suma += parseFloat(data[pos][5] * data[pos][4]); //BASE 0% * STOCK
        }
        var totalBase0=(suma)
        $("#txtBase0").val(totalBase0.toFixed(2));
    }
	
	
function calcularSubTotal(){
        var suma = 0;
        var data = JSON.parse(objinit.consultar());
        for (var pos in data) {
            suma += (parseFloat(parseFloat(data[pos][6]) * data[pos][4])); //BASE 12% * STOCK
        }
        var subTotal=suma
        $("#txtSubTotal").val(subTotal.toFixed(2));
    }

function calcularTotal(posi){
        
        var suma = 0;
		var totalnuevo = 0;
        var data = JSON.parse(objinit.consultar());
        for (var pos in data) {
            suma += parseFloat(data[pos][4] * data[pos][5]);
        }
        calcularIgv();
		calcularBase0();
        calcularSubTotal();
		totalnuevo= parseFloat($("#txtSubTotal").val()) + parseFloat($("#txtBase0").val()) + parseFloat($("#txtIgv").val())
        $("#txtTotal").val(totalnuevo.toFixed(2));
        if(posi != null){
          Modificar(posi);
            //alert(pos);
        }
    }

function Modificar(pos){
        var idArt = document.getElementsByName("txtIdArticulo");
        var cod = document.getElementsByName("txtCodgo");
        //var serie = document.getElementsByName("txtSeries");
        var desc = document.getElementsByName("txtDescripcion");
        var stock_ing = document.getElementsByName("txtStockIng");
        var prec_comp = document.getElementsByName("txtPrecioComp");
        var prec_ventaD = document.getElementsByName("txtPrecioVentD");
        var prec_ventaP = document.getElementsByName("txtPrecioVentaP");
        
        elementos[pos][2] = cod[pos].value;
        //elementos[pos][3] = serie[pos].value;
        elementos[pos][3] = desc[pos].value;
        elementos[pos][4] = stock_ing[pos].value;
        elementos[pos][5] = prec_comp[pos].value;
        elementos[pos][6] = prec_ventaD[pos].value;
        elementos[pos][7] = prec_ventaP[pos].value;
       // alert(elementos[pos][3] + " " + serie[pos].value);
        calcularIgv();
        calcularSubTotal();
        calcularTotal();
        //ConsultarDetalles();
    }

	
function justNumbers(e) {
        var keynum = window.event ? window.event.keyCode : e.which;
        if ((keynum == 8 || keynum == 48))
            return true;
        if (keynum <= 47 || keynum >= 58) return false;
            return /\d/.test(String.fromCharCode(keynum));
    }

function onKeyDecimal(e, field) {
        key = e.keyCode ? e.keyCode : e.which
        if (key == 8) return true
        if (key > 47 && key < 58) {
          if (field.value == "") return true
          regexp = /.[0-9]{5}$/
          return !(regexp.test(field.value))
        }
        if (key == 46) {
          if (field.value == "") return false
          regexp = /^[0-9]+$/
          return regexp.test(field.value)
        }
        return false
    }

function AgregarDetalles(id1, id2, id3, id4, id5, id6, id7, id8, id9, id10){
        alert(id1 + " "+ id2 + " " + id3 + " " + id4 + " "+ id5 + " "+ id6 + " " + id7 + " " + id8 + " " + id9 + " " + id10);
    }

function AgregarDetalle(idart, nombre, codigo, descripcion, stock_ing, stock_act, p_compra, p_ventaD, p_ventaP, pos) {
        var cant = prompt("¿Cuantas series necesita?", "");
        for (var i = 1; i <= cant; i++) {
            var serie = prompt("Serie " + i + ":", "");
            if (serie != null) {
                var detalles = new Array(idart, nombre, elementos[pos][2], elementos[pos][3], elementos[pos][4], 
                          elementos[pos][4], elementos[pos][5], elementos[pos][6], elementos[pos][7]);
                          elementos.push(detalles);
                        ConsultarDetalles();
            }
        }
        
    }


function Agregar(id, art,cat){
        AgregarDetalleCarrito(id, art, cat, "", "1", "0", "0", "0");
    }
	
function AgregarDetalleCarrito(idart, nombre, codigo, descripcion, stock_ing, stock_act, p_compra, p_ventaD, p_ventaP) {
        var detalles = new Array(idart, nombre, codigo, descripcion, stock_ing, stock_act, p_compra, p_ventaD, p_ventaP);
        elementos.push(detalles);
        ConsultarDetalles();
    }


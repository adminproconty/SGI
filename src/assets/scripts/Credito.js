$(document).on("ready", init);// Inciamos el jquery

var objC = new init();

var montoPendiente;

function init(){

	$("#tblCredito").dataTable({
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5'
        ]
    });

    $("#tblDeuda").dataTable({
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5'
        ]
    });

	ListadoCreditos();
	ListadoDeudas();

	$("form#frmCreditosV").submit(SaveOrUpdate);

	function SaveOrUpdate(e){
		e.preventDefault();
		
		var valor_pago = parseFloat($("#txtTotalPago").val());
		var valor_pendiente = parseFloat($("#txtMontoPendiente").val());
		
		valor_pago = (valor_pago*100)/100;
		valor_pendiente = (valor_pendiente*100)/100;
		
		
		//alert(valor_pago + " " + valor_pendiente)
		if (valor_pago > 0) {
			if (valor_pago <= valor_pendiente) {
				$.post("./ajax/CreditoAjax.php?op=SaveOrUpdate", $(this).serialize(), function(r){// llamamos la url por post. function(r). r-> llamada del callback
	            
		            Limpiar();
		            ListadoCreditos();
		            //$.toaster({ priority : 'success', title : 'Mensaje', message : r});
		            swal("Mensaje del Sistema", r, "success");
		            $("#VerListado").show();
					$("#VerForm").hide();
		        });
			} else {
				bootbox.alert("El monto a pagar no puede ser mayor al monto pendiente");
				$("#txtTotalPago").val("0.00");
			}
        } else {
			bootbox.alert("El monto a pagar no puede ser vacio, menor o igual que 0");
			$("#txtTotalPago").val("1.0");
		}
	};

	function Limpiar(){
		$("#txtIdCredito").val("");
		$("#txtIdVenta").val("");
		$("#txtTotalPago").val("");
		$("#txtMontoPendiente").val("");
		$("#txtDocucredito").val("");
		
	}

	function ListadoCreditos(){ 


	var tabla = $('#tblCredito').dataTable(
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

        	],"ajax": 
	        	{
	        		url: './ajax/CreditoAjax.php?op=list',
					type : "get",
					dataType : "json",
					
					error: function(e){
				   		console.log(e.responseText);	
					}
	        	},
	        "bDestroy": true

    	}).DataTable();		


    };

    function ListadoDeudas(){ 
	var tabla = $('#tblDeuda').dataTable(
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

        	],"ajax": 
	        	{
	        		url: './ajax/CreditoAjax.php?op=listDeudas',
					type : "get",
					dataType : "json",
					
					error: function(e){
				   		console.log(e.responseText);	
					}
	        	},
	        "bDestroy": true

    	}).DataTable();	
    };

    function GetDetalleCredito(idVenta) {
        
    }

}

function AgregarCredito(idVenta, total,saldo_factu){
	
	$("#VerListado").hide();
	$("#VerForm").show();
	$("#txtIdVenta").val(idVenta);
	$("#txtMontoTotal").val(total);
	$("#txtMontoPendiente").val(saldo_factu);

	$.post("./ajax/CreditoAjax.php?op=VerDetCredito", {idVenta: idVenta}, function(r) {
                $("table#tblVerDetalle tbody").html(r);
            
        });


}


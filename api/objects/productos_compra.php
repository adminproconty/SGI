<?php
class ProductosCompra {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $compras_id;
    public $producto_id; 
    public $cantidad;
    public $local_id;
    public $precio_unitario;
    public $subtotal;
    public $iva;
    public $total_iva;
    public $total;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    function getProductosCompra($idcompra){
        $query = "".$idcompra;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function insert(){
       
    
         // query to insert record
         $query = "INSERT INTO `productos_compra`(`compras_id`, `producto_id`, 
                    `cantidad`, `local_id`, `precio_unitario`, `subtotal`, `iva`, `total_iva`, 
                    `total`) VALUES (
                        ".$this->compras_id.",
                        ".$this->producto_id.",
                        ".$this->cantidad.",
                        ".$this->local_id.",
                        ".$this->precio_unitario.",
                        ".$this->subtotal.",
                        ".$this->iva.",
                        ".$this->total_iva.",
                        ".$this->total."
                    )";

        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);

        // execute query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }   
    }

}
?>
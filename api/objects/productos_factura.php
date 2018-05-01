<?php
class ProductosFactura {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $factura_id;
    public $producto_id;
    public $cantidad;
    public $descripcion;
    public $precio_unitario;
    public $subtotal;
    public $iva;
    public $total_iva;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todas las facturas
    function read(){
    
        // select all query
        $query = "SELECT * FROM `facturas` WHERE `empresa_id` = 1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getById($idfactura){

        $query = "SELECT * FROM `facturas` WHERE `id` = ".$idfactura;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function insert(){
       
    
         // query to insert record
         $query = "INSERT INTO `productos_factura`(`factura_id`, `producto_id`, 
                    `cantidad`, `descripcion`, `precio_unitario`, `subtotal`, `iva`, 
                    `total_iva`) VALUES (
                        ".$this->factura_id.",
                        ".$this->producto_id.",
                        ".$this->cantidad.",
                        '".$this->descripcion."',
                        ".$this->precio_unitario.",
                        ".$this->subtotal.",
                        ".$this->iva.",
                        ".$this->total_iva."
                    )";

        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);

        // execute query
        if($stmt->execute()){
            return $this->conn->lastInsertId();;
        }else{
            return false;
        }   
    }

}
?>
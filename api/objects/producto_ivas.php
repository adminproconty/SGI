<?php
class ProductoIvas {

    // conexión a la base de datos 
    private $conn;

    // Propiedades del objeto
    public $id;
    public $producto_id;
    public $iva_id;
    public $nombre;
    public $cantidad;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todos los ivas de un producto
    function getByProducto(){

        $query = "SELECT dpi.`id`, dpi.`producto_id`, dpi.`iva_id`, iva.`nombre`, iva.`cantidad`
                    FROM `detalle_producto_ivas` as dpi
                    JOIN `iva` as iva ON (dpi.`iva_id`  = iva.`id`)
                    WHERE dpi.`producto_id` = ".$this->producto_id."
                    AND iva.`estado` = 1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function delete(){
        $query = "DELETE FROM `detalle_producto_ivas` WHERE `id` = ".$this->id;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }  
    }

    function insert(){
        // query to insert record
        $query = "INSERT INTO `detalle_producto_ivas`(`producto_id`, `iva_id`) VALUES (
                    ".$this->producto_id.",
                    ".$this->iva_id."
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
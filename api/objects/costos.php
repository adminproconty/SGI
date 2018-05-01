<?php
class Costos {

    // conexión a la base de datos 
    private $conn;

    // Propiedades del objeto
    public $id;
    public $fecha;
    public $categoria_id;
    public $producto_id;
    public $codigo;
    public $nombre;
    public $costo;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todos los productos/costos
    function readByProducto(){
    
        // select all query
        $query = "SELECT `costo` 
                    FROM `costos` WHERE `producto_id` = :producto_id
                    ORDER BY `fecha` DESC LIMIT 1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // limpieza de los datos
        $this->producto_id=htmlspecialchars(strip_tags($this->producto_id));      
    
        // bind values
        $stmt->bindParam(":producto_id", $this->producto_id);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // insertar un inventario
    function insert(){
    
        // query to insert record
        $query = "INSERT INTO `costos`(`fecha`, `producto_id`, `costo`) VALUES (
            now(),
            :producto_id,
            :costo
            )";
    
        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);
    
        // limpieza de los datos
        $this->producto_id=htmlspecialchars(strip_tags($this->producto_id));        
        $this->costo=htmlspecialchars(strip_tags($this->costo));        
    
        // bind values
        $stmt->bindParam(":producto_id", $this->producto_id);
        $stmt->bindParam(":costo", $this->costo);
    
        // execute query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }   
        
        
    }

}
?>
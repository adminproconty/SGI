<?php
class Categorias {

    // conexión a la base de datos 
    private $conn;

    // Propiedades del objeto
    public $id;
    public $empresa_id;
    public $nombre;
    public $abreviatura;
    public $descripcion;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todos los roles
    function read(){
    
        // select all query
        $query = "SELECT `id`, `empresa_id`, `nombre`, `abreviatura`, `descripcion` 
                    FROM `categorias_productos` WHERE `empresa_id` = 1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // insertar una cuenta
    function insert(){
    
        // query to insert record
        $query = "INSERT INTO `categorias_productos`(`empresa_id`, `nombre`, 
                    `abreviatura`, `descripcion`) VALUES (
                        1,
                        '".$this->nombre."',
                        '".$this->abreviatura."',
                        '".$this->descripcion."'
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

    // actualizar datos del rol
    function update(){
    
        // query 
        $query = "UPDATE `categorias_productos` SET 
                    `nombre`= '".$this->nombre."',
                    `abreviatura`= '".$this->abreviatura."',
                    `descripcion`= '".$this->descripcion."' 
                    WHERE `id` = ".$this->id;
    
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
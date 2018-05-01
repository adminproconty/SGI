<?php
class Proveedores {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $RUC;
    public $nombre;
    public $direccion;
    public $email;
    public $convencional;
    public $celular; 
    public $opcional; 
    public $credito;
    public $web;
    public $contacto;
    public $nota_pedido;
    public $parte_relacionada;
    public $automatico;
    public $empresa_id;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todas las personas
    function read(){
    
        // select all query
        $query = "SELECT `id`, `RUC`, `nombre`, `direccion`, `email`, 
                            `convencional`, `celular`, `opcional`, `credito`, `web`, 
                            `contacto`, `nota_pedido`, `parte_relacionada`, `automatico` 
                            FROM `proveedores` WHERE `empresa_id` = 1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // obtener todos los datos de una persona
    function readByDocumento($doc){
    
        // select one query
        $query = "SELECT `id`, `empresa_id`, `RUC`, `nombre`, `direccion`, `email`, 
                    `convencional`, `celular`, `opcional`, `credito`, `web`, `contacto`, 
                    `nota_pedido`, `parte_relacionada`, `automatico` 
                    FROM `proveedores` 
                    WHERE `RUC` = '".$doc."'";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // insertar una cuenta
    function insert(){
    
        // query to insert record
        $query = "INSERT INTO `proveedores`(`empresa_id`, `RUC`, `nombre`, `direccion`, 
                    `email`, `convencional`, `celular`, `opcional`, `credito`, `web`, 
                    `contacto`, `nota_pedido`, `parte_relacionada`, `automatico`) VALUES (
                        ".$this->empresa_id.",
                        '".$this->RUC."',
                        '".$this->nombre."',
                        '".$this->direccion."',
                        '".$this->email."',
                        '".$this->convencional."',
                        '".$this->celular."',
                        '".$this->opcional."',
                        ".$this->credito.",
                        '".$this->web."',
                        '".$this->contacto."',
                        ".$this->nota_pedido.",
                        ".$this->parte_relacionada.",
                        ".$this->automatico."
                    )";
    
        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);    
        
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }   
        
        
    }

    // actualizar datos de la persona
    function update(){
    
        // query 
        $query = "UPDATE `proveedores` SET 
                    `RUC`= '".$this->RUC."',
                    `nombre`= '".$this->nombre."',
                    `direccion`= '".$this->direccion."',
                    `email`= '".$this->email."',
                    `convencional`= '".$this->convencional."',
                    `celular`= '".$this->celular."',
                    `opcional`= '".$this->opcional."',
                    `credito`= ".$this->credito.",
                    `web`= '".$this->web."',
                    `contacto`= '".$this->contacto."',
                    `nota_pedido`= ".$this->nota_pedido.",
                    `parte_relacionada`= ".$this->parte_relacionada.",
                    `automatico`= ".$this->automatico." 
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
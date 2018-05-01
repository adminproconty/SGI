<?php
class Empresa{
 
    // conexión a la base de datos y nombre de la tabla
    private $conn;
    private $table_name = "empresa";
 
    // Propiedades del objeto
    public $id;
    public $nombre_legal;
    public $nombre_comercial;
    public $email;
    public $RUC;
    public $direccion;
    public $telefono;
    public $celular;
    
    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // leer la información de la empresa
    function read(){
    
        // select all query
        $query = "SELECT 
                    `id`, `nombre_legal`, 
                    `nombre_comercial`, 
                    `email`, 
                    `RUC`, 
                    `direccion`, 
                    `telefono`, 
                    `celular` FROM ". $this->table_name ."`empresa` WHERE 1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // actualizar datos de la empresa
    function update(){
    
        // query to insert record
        $query = "UPDATE ".$this->table_name." SET 
                    `nombre_legal`=:nombre_legal,
                    `nombre_comercial`=:nombre_comercial,
                    `email`=:email,
                    `RUC`=:RUC,
                    `direccion`=:direccion,
                    `telefono`=:telefono,
                    `celular`=:celular WHERE `id`=:id";
    
        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->nombre_legal=htmlspecialchars(strip_tags($this->nombre_legal));
        $this->nombre_comercial=htmlspecialchars(strip_tags($this->nombre_comercial));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->RUC=htmlspecialchars(strip_tags($this->RUC));
        $this->direccion=htmlspecialchars(strip_tags($this->direccion));
        $this->telefono=htmlspecialchars(strip_tags($this->telefono));
        $this->celular=htmlspecialchars(strip_tags($this->celular));
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind values
        $stmt->bindParam(":nombre_legal", $this->nombre_legal);
        $stmt->bindParam(":nombre_comercial", $this->nombre_comercial);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":RUC", $this->RUC);
        $stmt->bindParam(":direccion", $this->direccion);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":celular", $this->celular);
        $stmt->bindParam(":id", $this->id);
    
        // execute query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }   
        
        
    }
}
?>
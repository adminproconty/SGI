<?php
class Tarjetas {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $empresa_id;
    public $nombre;
    public $numero;
    public $tipo_tarjeta_id;
    public $tipo_tarjeta;
    public $marca_tarjeta_id;
    public $marca_tarjeta;
    public $cuenta_id;
    public $bnco_id;
    public $banco;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todas las tarjetas
    function read(){
    
        // select all query
        $query = "SELECT tar.`id`, tar.`empresa_id`, tar.`nombre`, tar.`numero`, tar.`tipo_tarjeta_id`, 
                    tt.`nombre` as tipo_tarjeta, tar.`marca_tarjeta_id`, 
                    mt.`nombre` as marca_tarjeta, tar.`cuenta_id`, cue.`bnco_id`, ban.`nombre` as banco
                    FROM `tarjetas` as tar
                    JOIN `tipos_tarjetas` as tt ON (tar.`tipo_tarjeta_id` = tt.`id`)
                    JOIN `marcas_tarjetas` as mt ON (tar.`marca_tarjeta_id` = mt.`id`)
                    JOIN `cuentas` as cue ON (tar.`cuenta_id` = cue.`id`)
                    JOIN `bancos` as ban ON (cue.`bnco_id` = ban.`id`)
                    WHERE tar.`empresa_id` = 1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getById(){
    
        // select all query
        $query = "SELECT tar.`id`, tar.`empresa_id`, tar.`nombre`, tar.`numero`, tar.`tipo_tarjeta_id`, 
                    tt.`nombre` as tipo_tarjeta, tar.`marca_tarjeta_id`, 
                    mt.`nombre` as marca_tarjeta, tar.`cuenta_id`, cue.`bnco_id`, ban.`nombre` as banco
                    FROM `tarjetas` as tar
                    JOIN `tipos_tarjetas` as tt ON (tar.`tipo_tarjeta_id` = tt.`id`)
                    JOIN `marcas_tarjetas` as mt ON (tar.`marca_tarjeta_id` = mt.`id`)
                    JOIN `cuentas` as cue ON (tar.`cuenta_id` = cue.`id`)
                    JOIN `bancos` as ban ON (cue.`bnco_id` = ban.`id`)
                    WHERE tar.`id` = ".$this->id;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // insertar una tarjeta
    function insert(){

        // query to insert record
        $query = "INSERT INTO `tarjetas`(`empresa_id`, `nombre`, `numero`, 
                    `tipo_tarjeta_id`, `marca_tarjeta_id`, `cuenta_id`) VALUES (
                        1,
                        '".$this->nombre."',
                        '".$this->numero."',
                        ".$this->tipo_tarjeta_id.",
                        ".$this->marca_tarjeta_id.",
                        ".$this->cuenta_id."
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

    // actualizar datos de la tarjeta
    function update(){
    
        // query 
        $query = "UPDATE `tarjetas` SET 
                    `nombre`= '".$this->nombre."',
                    `numero`= '".$this->numero."',
                    `tipo_tarjeta_id`= ".$this->tipo_tarjeta_id.",
                    `marca_tarjeta_id`= ".$this->marca_tarjeta_id.",
                    `cuenta_id`= ".$this->cuenta_id." 
                    WHERE `id` = ".$this->id;
    
        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);
    
        // execute query
        if($stmt->execute()){
            return true;
        }else{
            echo json_encode($stmt);
        }   
        
        
    }

}
?>
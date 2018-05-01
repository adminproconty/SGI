<?php
class Cuentas {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $empresa_id;
    public $nombre;
    public $tipo_fuente;
    public $fuente_cuenta;
    public $bnco_numero;
    public $bnco_id;
    public $banco;
    public $bnco_tipo_cuenta;
    public $tipo_cuenta;
    public $bnco_saldo_inicial;
    public $email;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todas las cuentas de la empresa
    function read(){
    
        // select all query
        $query = "SELECT cue.`id`, cue.`empresa_id`, cue.`nombre`, cue.`tipo_fuente`, 
                    fc.`nombre` as fuente_cuenta, cue.`bnco_numero`, cue.`bnco_id`, 
                    ban.`nombre` as banco, cue.`bnco_tipo_cuenta`, tc.`nombre` as tipo_cuenta, 
                    cue.`bnco_saldo_inicial`, cue.`email` 
                    FROM `cuentas` as cue 
                    JOIN `fuente_cuentas` as fc ON (cue.`tipo_fuente` = fc.`id`) 
                    JOIN `bancos` as ban ON (cue.`bnco_id` = ban.`id`) 
                    JOIN `tipo_cuentas` as tc ON (tc.`id` = cue.`bnco_tipo_cuenta`)
                    WHERE cue.`empresa_id` = 1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getById(){
        // select all query
        $query = "SELECT cue.`id`, cue.`empresa_id`, cue.`nombre`, cue.`tipo_fuente`, 
                    fc.`nombre` as fuente_cuenta, cue.`bnco_numero`, cue.`bnco_id`, 
                    ban.`nombre` as banco, cue.`bnco_tipo_cuenta`, tc.`nombre` as tipo_cuenta, 
                    cue.`bnco_saldo_inicial`, cue.`email` 
                    FROM `cuentas` as cue 
                    JOIN `fuente_cuentas` as fc ON (cue.`tipo_fuente` = fc.`id`) 
                    JOIN `bancos` as ban ON (cue.`bnco_id` = ban.`id`) 
                    JOIN `tipo_cuentas` as tc ON (tc.`id` = cue.`bnco_tipo_cuenta`)
                    WHERE cue.`id` = ".$this->id;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getElectronica() {
        $query = "SELECT `id`, `empresa_id`, `nombre`, `tipo_fuente`, `bnco_numero`, 
                    `bnco_id`, `bnco_tipo_cuenta`, `bnco_saldo_inicial`, `email` 
                    FROM `cuentas` WHERE `empresa_id` = 1";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // insertar una cuenta
    function insert(){

        // query to insert record
        $query = "INSERT INTO `cuentas`(`empresa_id`, `nombre`, `tipo_fuente`, 
                    `bnco_numero`, `bnco_id`, `bnco_tipo_cuenta`, `bnco_saldo_inicial`, 
                    `email`) VALUES (
                        ".$this->empresa_id.",
                        '".$this->nombre."',
                        ".$this->tipo_fuente.",
                        '".$this->bnco_numero."',
                        ".$this->bnco_id.",
                        ".$this->bnco_tipo_cuenta.",
                        ".$this->bnco_saldo_inicial.",
                        '".$this->email."'
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

    // actualizar datos de la cuenta
    function update(){
    
        // query 
        $query = "UPDATE `cuentas` SET 
                    `nombre`= '".$this->nombre."',
                    `tipo_fuente`= ".$this->tipo_fuente.",
                    `bnco_numero`= '".$this->bnco_numero."',
                    `bnco_id`= ".$this->bnco_id.",
                    `bnco_tipo_cuenta`= ".$this->bnco_tipo_cuenta.",
                    `bnco_saldo_inicial`= ".$this->bnco_saldo_inicial.",
                    `email`= '".$this->email."' 
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
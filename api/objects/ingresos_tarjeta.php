<?php
class IngresosTarjeta {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $ingresos_id;
    public $fecha;
    public $tarjeta_id;
    public $numero;
    public $tipo_tarjeta;
    public $marca_tarjeta;
    public $bnco_id;
    public $banco;
    public $tipo_cuenta;
    public $monto;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todos los ingresos por tarjetas
    function getById($idingreso){

        $query = "SELECT it.`id`, it.`ingresos_id`, it.`fecha`, it.`tarjeta_id`, tar.`numero`, 
                    tt.`nombre` as tipo_tarjeta, mt.`nombre` as marca_tarjeta, cue.`bnco_id`, 
                    ban.`nombre` as banco, tc.`nombre` as tipo_cuenta, it.`monto` 
                    FROM `ingresos_tarjeta` as it
                    JOIN `tarjetas` as tar ON (it.`tarjeta_id` = tar.`id`)
                    JOIN  `tipos_tarjetas` as tt ON (tar.`tipo_tarjeta_id` = tt.`id`)
                    JOIN `marcas_tarjetas` as mt ON (tar.`marca_tarjeta_id` = mt.`id`)
                    JOIN `cuentas` as cue ON (tar.`cuenta_id` = cue.`id`)
                    JOIN `bancos` as ban ON (cue.`bnco_id` = ban.`id`)
                    JOIN `tipo_cuentas` as tc ON (cue.`bnco_tipo_cuenta` = tc.`id`)
                    WHERE it.`ingresos_id` = ".$idingreso;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function insert(){
       
    
         // query to insert record
         $query = "INSERT INTO `ingresos_tarjeta`(`ingresos_id`,  `fecha`, `tarjeta_id`, `monto`) 
                    VALUES (
                        ".$this->ingresos_id.",
                        '".$this->fecha."',
                        ".$this->tarjeta_id.",
                        ".$this->monto."
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
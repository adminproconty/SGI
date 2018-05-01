<?php
class Inventario {

    // conexión a la base de datos 
    private $conn;

    // Propiedades del objeto
    public $id;
    public $local_id;
    public $local_nom;
    public $producto_id;
    public $codigo;
    public $nombre; 
    public $cantidad;
    public $minimo_stock;
    public $iva_id;
    public $iva;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todos los productos/locales
    function read(){
    
        // select all query
        $query = "SELECT inv.`id`, inv.`local_id`, loc.`nombre` as local_nom, inv.`producto_id`, 
                    pro.`codigo`, pro.`nombre`, inv.`cantidad`, inv.`minimo_stock`
                    FROM `inventario_local` as inv
                    JOIN `locales` as loc ON (loc.`id` = inv.`local_id`)
                    JOIN `productos` as pro ON (pro.`id` = inv.`producto_id`)
                    WHERE loc.`empresa_id` = 1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getByLocal($idlocal){
        $query = "SELECT inv.`id`, inv.`local_id`, loc.`nombre` as local_nom, inv.`producto_id`, 
                    pro.`codigo`, pro.`nombre`, inv.`cantidad`, inv.`minimo_stock`, 
                    iv.`id` as iva_id, iv.`cantidad` as iva 
                    FROM `inventario_local` as inv 
                    JOIN `locales` as loc ON (loc.`id` = inv.`local_id`) 
                    JOIN `productos` as pro ON (pro.`id` = inv.`producto_id`) 
                    JOIN `iva` as iv ON (iv.`id` = pro.`iva_id`) 
                    WHERE loc.`empresa_id` = 1 AND pro.`activo` = 1 AND inv.`local_id` = ".$idlocal;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();    
        return $stmt;
    }

    function getByLocalProducto($idlocal, $proid){
        $query = "SELECT inv.`id`, inv.`local_id`, loc.`nombre` as local_nom, inv.`producto_id`, 
                    pro.`codigo`, pro.`nombre`, inv.`cantidad`, inv.`minimo_stock`,
                    iv.`id` as iva_id, iv.`cantidad` as iva 
                    FROM `inventario_local` as inv
                    JOIN `locales` as loc ON (loc.`id` = inv.`local_id`)
                    JOIN `productos` as pro ON (pro.`id` = inv.`producto_id`)
                    JOIN `iva` as iv ON (iv.`id` = pro.`iva_id`) 
                    WHERE loc.`empresa_id` = 1 
                    AND inv.`local_id` = ".$idlocal." AND pro.`id` = ".$proid;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();    
        return $stmt;
    }

    // insertar un inventario
    function insert(){
    
        // query to insert record
        $query = "INSERT INTO `inventario_local`(`local_id`, `producto_id`, `cantidad`, `minimo_stock`) 
                    VALUES (
                        :local_id,
                        :producto_id,
                        :cantidad,
                        :minimo_stock
                    )";
    
        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);
    
        // limpieza de los datos
        $this->local_id=htmlspecialchars(strip_tags($this->local_id));
        $this->producto_id=htmlspecialchars(strip_tags($this->producto_id));        
        $this->cantidad=htmlspecialchars(strip_tags($this->cantidad));        
        $this->minimo_stock=htmlspecialchars(strip_tags($this->minimo_stock));        
    
        // bind values
        $stmt->bindParam(":local_id", $this->local_id);
        $stmt->bindParam(":producto_id", $this->producto_id);
        $stmt->bindParam(":cantidad", $this->cantidad);
        $stmt->bindParam(":minimo_stock", $this->minimo_stock);
    
        // execute query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }   
        
        
    }

    // actualizar la cantidad/local
    function update(){
    
        // query 
        $query = "UPDATE `inventario_local` SET 
                    `cantidad`= :cantidad,
                    `minimo_stock` = :minimo_stock
                    WHERE `id` = :id";
    
        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->cantidad=htmlspecialchars(strip_tags($this->cantidad));
        $this->minimo_stock=htmlspecialchars(strip_tags($this->minimo_stock));
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind values        
        $stmt->bindParam(":cantidad", $this->cantidad);
        $stmt->bindParam(":minimo_stock", $this->minimo_stock);
        $stmt->bindParam(":id", $this->id);
    
        // execute query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }   
        
        
    }

    function delete() {

        // query 
        $query = "DELETE FROM `inventario_local` WHERE `id` = :id";
    
        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind values 
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
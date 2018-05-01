<?php
class Productos {

    // conexión a la base de datos 
    private $conn;

    // Propiedades del objeto
    public $id;
    public $tipo_producto_id;
    public $tipo_producto;
    public $categoria_id;
    public $categoria;
    public $nombre;
    public $unidad;
    public $codigo;
    public $descripcion;
    public $materia_prima;
    public $producto_final;
    public $SUM;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todos los productos
    function read(){
    
        // select all query
        $query = "SELECT prod.`id`, prod.`categoria_id`, cat.`nombre` as categoria, 
                        prod.`nombre`, prod.`unidad`, prod.`codigo`, prod.`descripcion`, 
                        prod.`materia_prima`, prod.`producto_final` 
                        FROM `productos` as prod
                        JOIN `categorias_productos` as cat ON (prod.`categoria_id` = cat.`id`)
                        WHERE cat.`empresa_id` = 1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getById($idprod){
        // select all query
        $query = "SELECT pro.`id`, cat.`tipo_producto_id`, tp.`nombre` as tipo_producto, 
                    pro.`categoria_id`, cat.`nombre` as categoria, pro.`nombre`, pro.`unidad`, 
                    pro.`codigo`, pro.`descripcion`, pro.`activo`, pro.`iva_id`, iva.`cantidad`
                    FROM `productos` as pro
                    JOIN `categorias_productos` as cat ON (pro.`categoria_id` = cat.`id`)
                    JOIN `tipo_producto` as tp ON (cat.`tipo_producto_id` = tp.`id`)
                    JOIN `iva` as iva ON (pro.`iva_id` = iva.`id`)
                    WHERE tp.`empresa_id` = 1  AND pro.`id` = ".$idprod;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function sumaProductosCategoria($id){
        $query = "SELECT COUNT(`id`) as SUM FROM `productos` WHERE `categoria_id` = ".$id;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();    
        return $stmt;
    }

    function getAbreviaturaCategoria($id) {
        $query = "SELECT `abreviatura` FROM `categorias_productos` WHERE `id` = ".$id;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();    
        return $stmt;
    }

    function getAbreviaturaTipoProducto($id) {
        $query = "SELECT `codigo` FROM `tipo_producto` WHERE `id` = ".$id;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();    
        return $stmt;
    }

    function getIdByCodCategoria($cod, $cat) {
        $query = "SELECT `id` FROM `productos` 
                    WHERE `codigo` = '".$cod."' AND `categoria_id` = ".$cat;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();    
        return $stmt;
    }

    // insertar un producto
    function insert(){
    
        // query to insert record
        $query = "INSERT INTO `productos`(`categoria_id`, `nombre`, `unidad`, 
                    `codigo`, `descripcion`, `materia_prima`, 
                    `producto_final`) VALUES (
                        ".$this->categoria_id.",
                        '".$this->nombre."',
                        '".$this->unidad."',
                        '".$this->codigo."',
                        '".$this->descripcion."',
                        ".$this->materia_prima.",
                        ".$this->producto_final."
                    )";
    
        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);
    
        // execute query
        if($stmt->execute()){
            return $this->conn->lastInsertId();
        }else{
            return false;
        }   
        
        
    }

    // actualizar datos del rol
    function update(){
    
        // query 
        $query = "UPDATE `productos` SET 
                    `categoria_id`= ".$this->categoria_id.",
                    `nombre`= '".$this->nombre."',
                    `unidad`= '".$this->unidad."',
                    `codigo`= '".$this->codigo."',
                    `descripcion`= '".$this->descripcion."',
                    `materia_prima`= ".$this->materia_prima.",
                    `producto_final`= ".$this->producto_final." 
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
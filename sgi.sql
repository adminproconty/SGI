-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-05-2018 a las 19:10:21
-- Versión del servidor: 10.1.29-MariaDB
-- Versión de PHP: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sgi`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bancos`
--

CREATE TABLE `bancos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `bancos`
--

INSERT INTO `bancos` (`id`, `nombre`) VALUES
(1, 'Banco del Pichincha, .S.A.'),
(2, 'Banco de Guayaquil, S.A.'),
(3, 'Banco Bolivariano, S.A.'),
(4, 'Banco de Machala, S.A.'),
(5, 'Banco de Loja, S.A.'),
(6, 'Banco Comercial de Manabí, S.A.'),
(7, '\r\nBanco Solidario del Ecuador,S.A.'),
(8, 'Banco del Pacífico, S.A.'),
(9, 'Banco Promérica, S.A.'),
(10, 'Banco del Austro, S.A.'),
(11, 'Banco Amazonas, S.A.'),
(12, 'UNIBANCO, S.A.'),
(13, 'Banco General Rumiñahui, S.A.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cajas`
--

CREATE TABLE `cajas` (
  `id` int(11) NOT NULL,
  `local_id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_productos`
--

CREATE TABLE `categorias_productos` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci NOT NULL,
  `abreviatura` varchar(4) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `proveedor_id` int(11) DEFAULT NULL,
  `serie` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `documento` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `autorizacion` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_comprobante` date NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `fecha_caducidad` date NOT NULL,
  `vencimiento` date NOT NULL,
  `descripcion` varchar(400) COLLATE utf8_spanish_ci NOT NULL,
  `subtotal` float NOT NULL,
  `iva` float NOT NULL,
  `total_iva` float NOT NULL,
  `total` float NOT NULL,
  `stock_inicial` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `costos`
--

CREATE TABLE `costos` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `producto_id` int(11) NOT NULL,
  `costo` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuentas`
--

CREATE TABLE `cuentas` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci NOT NULL,
  `tipo_fuente` int(11) NOT NULL,
  `bnco_numero` text COLLATE utf8_spanish_ci,
  `bnco_id` int(11) DEFAULT NULL,
  `bnco_tipo_cuenta` int(11) DEFAULT NULL,
  `bnco_saldo_inicial` float DEFAULT NULL,
  `email` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cxc`
--

CREATE TABLE `cxc` (
  `id` int(11) NOT NULL,
  `factura_id` int(11) NOT NULL,
  `fracciones` int(10) UNSIGNED NOT NULL,
  `monto_minimo` float UNSIGNED NOT NULL,
  `estatus_id` int(11) NOT NULL,
  `fecha_fin` date NOT NULL,
  `fecha_cancelada` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_producto_ivas`
--

CREATE TABLE `detalle_producto_ivas` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `iva_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_usuario_local`
--

CREATE TABLE `detalle_usuario_local` (
  `id` int(11) NOT NULL,
  `local` int(11) NOT NULL,
  `empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `detalle_usuario_local`
--

INSERT INTO `detalle_usuario_local` (`id`, `local`, `empleado`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `persona_id` int(11) NOT NULL,
  `clave` text COLLATE utf8_spanish_ci,
  `empleado` tinyint(1) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `persona_id`, `clave`, `empleado`, `activo`) VALUES
(1, 1, 'proconty@2018', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `id` int(11) NOT NULL,
  `nombre_legal` text COLLATE utf8_spanish_ci NOT NULL,
  `nombre_comercial` text COLLATE utf8_spanish_ci NOT NULL,
  `email` text CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `RUC` text COLLATE utf8_spanish_ci NOT NULL,
  `direccion` text COLLATE utf8_spanish_ci NOT NULL,
  `telefono` text COLLATE utf8_spanish_ci NOT NULL,
  `celular` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`id`, `nombre_legal`, `nombre_comercial`, `email`, `RUC`, `direccion`, `telefono`, `celular`) VALUES
(1, 'Proconty', 'Proconty', 'info@proconty.com', '12345', 'Quito', '02', '09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estatus`
--

CREATE TABLE `estatus` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `estatus`
--

INSERT INTO `estatus` (`id`, `nombre`) VALUES
(1, 'Pendiente pago'),
(2, 'Pagada'),
(3, 'Cancelada'),
(4, 'Anulada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `id` int(11) NOT NULL,
  `persona_id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `local_id` int(11) NOT NULL,
  `tipo_factura` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `serie` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `autorizacion` int(10) UNSIGNED NOT NULL,
  `subtotal` float UNSIGNED NOT NULL,
  `total_iva` float UNSIGNED NOT NULL,
  `total` float UNSIGNED NOT NULL,
  `estatus_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formas_pago`
--

CREATE TABLE `formas_pago` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `formas_pago`
--

INSERT INTO `formas_pago` (`id`, `nombre`) VALUES
(1, 'Efectivo'),
(2, 'Tarjeta'),
(3, 'Cheque'),
(4, 'Transferencia bancaria'),
(5, 'Pago electrónico'),
(6, 'Crédito');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fuente_cuentas`
--

CREATE TABLE `fuente_cuentas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `fuente_cuentas`
--

INSERT INTO `fuente_cuentas` (`id`, `nombre`) VALUES
(1, 'Bancaria'),
(2, 'Electrónica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingresos`
--

CREATE TABLE `ingresos` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `recibo` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `cuenta_id` int(11) DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  `referencia` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `documento` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `total` float NOT NULL,
  `tipo_ingreso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingresos_cheque`
--

CREATE TABLE `ingresos_cheque` (
  `id` int(11) NOT NULL,
  `ingresos_id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `banco_id` int(11) NOT NULL,
  `numero` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `titular` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `monto` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingresos_directos`
--

CREATE TABLE `ingresos_directos` (
  `id` int(11) NOT NULL,
  `ingresos_id` int(11) NOT NULL,
  `cuenta` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `debe` float NOT NULL,
  `haber` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingresos_tarjeta`
--

CREATE TABLE `ingresos_tarjeta` (
  `id` int(11) NOT NULL,
  `ingresos_id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `tarjeta_id` int(11) NOT NULL,
  `monto` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingresos_transferencia`
--

CREATE TABLE `ingresos_transferencia` (
  `id` int(11) NOT NULL,
  `ingresos_id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `banco_receptor_id` int(11) NOT NULL,
  `banco_emisor_id` int(11) NOT NULL,
  `monto` float NOT NULL,
  `referencia` varchar(200) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario_local`
--

CREATE TABLE `inventario_local` (
  `id` int(11) NOT NULL,
  `local_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(20) NOT NULL,
  `minimo_stock` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `iva`
--

CREATE TABLE `iva` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci NOT NULL,
  `cantidad` float NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locales`
--

CREATE TABLE `locales` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci NOT NULL,
  `direccion` text COLLATE utf8_spanish_ci NOT NULL,
  `email` text COLLATE utf8_spanish_ci NOT NULL,
  `telefono` text COLLATE utf8_spanish_ci NOT NULL,
  `celular` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `locales`
--

INSERT INTO `locales` (`id`, `empresa_id`, `nombre`, `direccion`, `email`, `telefono`, `celular`) VALUES
(1, 1, 'Matriz', 'Dirección', 'matriz@correo.com', '02', '09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas_tarjetas`
--

CREATE TABLE `marcas_tarjetas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `marcas_tarjetas`
--

INSERT INTO `marcas_tarjetas` (`id`, `nombre`) VALUES
(1, 'Visa'),
(2, 'Mastercard'),
(3, 'Dinners Club'),
(4, 'American Express'),
(5, 'Discover');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos_compra`
--

CREATE TABLE `pagos_compra` (
  `id` int(11) NOT NULL,
  `compras_id` int(11) DEFAULT NULL,
  `cxp_id` int(11) DEFAULT NULL,
  `metodo_id` int(11) NOT NULL,
  `cantidad_cancelada` float NOT NULL,
  `tarjeta_id` int(11) DEFAULT NULL,
  `autorizacion_tarjeta` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cuenta_id` int(11) DEFAULT NULL,
  `numero_cheque` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `codigo_transferencia` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `banco_receptor_id` int(11) DEFAULT NULL,
  `institucion` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `observacion` text COLLATE utf8_spanish_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos_facturas`
--

CREATE TABLE `pagos_facturas` (
  `id` int(11) NOT NULL,
  `factura_id` int(11) NOT NULL,
  `cxc_id` int(11) DEFAULT NULL,
  `metodo_id` int(11) NOT NULL,
  `cantidad_cancelada` float UNSIGNED NOT NULL,
  `cuenta_id` int(11) DEFAULT NULL,
  `banco` text COLLATE utf8_spanish_ci,
  `tipo_tarjeta_id` int(11) DEFAULT NULL,
  `marca_tarjeta_id` int(11) DEFAULT NULL,
  `numero_tarjeta` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `autorizacion_tarjeta` int(10) DEFAULT NULL,
  `titular` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `numero_cheque` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `codigo_transferencia` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `email` text COLLATE utf8_spanish_ci,
  `observacion` text COLLATE utf8_spanish_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci NOT NULL,
  `apellido` text COLLATE utf8_spanish_ci NOT NULL,
  `tipo_documento` int(11) NOT NULL,
  `num_documento` text COLLATE utf8_spanish_ci NOT NULL,
  `direccion` text COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci NOT NULL,
  `email` text COLLATE utf8_spanish_ci NOT NULL,
  `convencional` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `celular` text COLLATE utf8_spanish_ci,
  `opcional` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`id`, `empresa_id`, `nombre`, `apellido`, `tipo_documento`, `num_documento`, `direccion`, `descripcion`, `email`, `convencional`, `celular`, `opcional`) VALUES
(1, 1, 'Zayda', 'Yaguana', 1, '12345', 'Quito', '---', 'zayda.yaguana@proconty.com', '02', '09', '02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci NOT NULL,
  `unidad` text COLLATE utf8_spanish_ci NOT NULL,
  `codigo` text COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci NOT NULL,
  `materia_prima` tinyint(1) NOT NULL,
  `producto_final` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_compra`
--

CREATE TABLE `productos_compra` (
  `id` int(11) NOT NULL,
  `compras_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(10) NOT NULL,
  `local_id` int(11) NOT NULL,
  `precio_unitario` float NOT NULL,
  `subtotal` float NOT NULL,
  `iva` float NOT NULL,
  `total_iva` float NOT NULL,
  `total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_factura`
--

CREATE TABLE `productos_factura` (
  `id` int(11) NOT NULL,
  `factura_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(10) NOT NULL,
  `descripcion` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `precio_unitario` float NOT NULL,
  `subtotal` float NOT NULL,
  `iva` float NOT NULL,
  `total_iva` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `RUC` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(300) COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(500) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `convencional` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `celular` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `opcional` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `credito` int(10) DEFAULT NULL,
  `web` text COLLATE utf8_spanish_ci,
  `contacto` varchar(15) COLLATE utf8_spanish_ci DEFAULT NULL,
  `nota_pedido` tinyint(1) DEFAULT NULL,
  `parte_relacionada` tinyint(1) DEFAULT NULL,
  `automatico` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjetas`
--

CREATE TABLE `tarjetas` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci NOT NULL,
  `numero` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `tipo_tarjeta_id` int(11) NOT NULL,
  `marca_tarjeta_id` int(11) NOT NULL,
  `cuenta_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_ingresos_egresos`
--

CREATE TABLE `tipos_ingresos_egresos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tipos_ingresos_egresos`
--

INSERT INTO `tipos_ingresos_egresos` (`id`, `nombre`) VALUES
(1, 'Directo'),
(2, 'Transferencia'),
(3, 'Cheque'),
(4, 'Tarjeta'),
(5, 'CXC'),
(6, 'CXP');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_tarjetas`
--

CREATE TABLE `tipos_tarjetas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tipos_tarjetas`
--

INSERT INTO `tipos_tarjetas` (`id`, `nombre`) VALUES
(1, 'Débito'),
(2, 'Crédito');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_cuentas`
--

CREATE TABLE `tipo_cuentas` (
  `id` int(11) NOT NULL,
  `tipo_fuente` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tipo_cuentas`
--

INSERT INTO `tipo_cuentas` (`id`, `tipo_fuente`, `nombre`) VALUES
(1, 1, 'Cuenta de Ahorros'),
(2, 1, 'Cuenta Corriente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documento`
--

CREATE TABLE `tipo_documento` (
  `id` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tipo_documento`
--

INSERT INTO `tipo_documento` (`id`, `nombre`) VALUES
(1, 'Cédula de Identidad'),
(2, 'R.U.C.'),
(3, 'Pasaporte'),
(4, 'Consumidor final');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_facturas`
--

CREATE TABLE `tipo_facturas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tipo_facturas`
--

INSERT INTO `tipo_facturas` (`id`, `nombre`) VALUES
(1, 'Factura');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bancos`
--
ALTER TABLE `bancos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cajas`
--
ALTER TABLE `cajas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cajas_local_id` (`local_id`);

--
-- Indices de la tabla `categorias_productos`
--
ALTER TABLE `categorias_productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `abreviatura` (`abreviatura`),
  ADD KEY `empresa_categoria_id` (`empresa_id`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empresa_compras_id` (`empresa_id`),
  ADD KEY `proveedor_compras_id` (`proveedor_id`);

--
-- Indices de la tabla `costos`
--
ALTER TABLE `costos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `costos_producto_id` (`producto_id`);

--
-- Indices de la tabla `cuentas`
--
ALTER TABLE `cuentas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `banco_empresa_id` (`empresa_id`),
  ADD KEY `cuentas_tipo_id` (`bnco_tipo_cuenta`),
  ADD KEY `cuentas_tipo_fuente_id` (`tipo_fuente`),
  ADD KEY `banco_cuenta_id` (`bnco_id`);

--
-- Indices de la tabla `cxc`
--
ALTER TABLE `cxc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cxc_factura_id` (`factura_id`),
  ADD KEY `cxc_estatus_id` (`estatus_id`);

--
-- Indices de la tabla `detalle_producto_ivas`
--
ALTER TABLE `detalle_producto_ivas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_detalle_producto_ivas_id` (`producto_id`),
  ADD KEY `iva_detalle_producto_ivas_id` (`iva_id`);

--
-- Indices de la tabla `detalle_usuario_local`
--
ALTER TABLE `detalle_usuario_local`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empleado_rol_local` (`empleado`),
  ADD KEY `local_rol_empleado` (`local`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empleados_persona_id` (`persona_id`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_empresa` (`email`(50)) USING BTREE,
  ADD UNIQUE KEY `RUC_empresa` (`RUC`(50)) USING BTREE,
  ADD UNIQUE KEY `celular_empresa` (`celular`(20));

--
-- Indices de la tabla `estatus`
--
ALTER TABLE `estatus`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `facturas_tipo_factura_id` (`tipo_factura`),
  ADD KEY `facturas_empresa_id` (`empresa_id`),
  ADD KEY `local_factura` (`local_id`),
  ADD KEY `persona_factura` (`persona_id`),
  ADD KEY `facturas_estatus_id` (`estatus_id`),
  ADD KEY `facturas_usuario_id` (`usuario_id`);

--
-- Indices de la tabla `formas_pago`
--
ALTER TABLE `formas_pago`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fuente_cuentas`
--
ALTER TABLE `fuente_cuentas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ingresos`
--
ALTER TABLE `ingresos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cuentas_ingresos` (`cuenta_id`),
  ADD KEY `empresa_ingresos` (`empresa_id`),
  ADD KEY `ingresos_tipo_id` (`tipo_ingreso`);

--
-- Indices de la tabla `ingresos_cheque`
--
ALTER TABLE `ingresos_cheque`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ingresos_cheque_ingresos` (`ingresos_id`),
  ADD KEY `banco_cheque_ingresos` (`banco_id`);

--
-- Indices de la tabla `ingresos_directos`
--
ALTER TABLE `ingresos_directos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ingresos_ingresos_directos` (`ingresos_id`);

--
-- Indices de la tabla `ingresos_tarjeta`
--
ALTER TABLE `ingresos_tarjeta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ingresos_tarjeta_ingresos` (`ingresos_id`),
  ADD KEY `tarjeta_ingresos_id` (`tarjeta_id`);

--
-- Indices de la tabla `ingresos_transferencia`
--
ALTER TABLE `ingresos_transferencia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ingresos_transferencias_ingresos` (`ingresos_id`),
  ADD KEY `banco_receptor_id` (`banco_receptor_id`),
  ADD KEY `banco_emisor_id` (`banco_emisor_id`);

--
-- Indices de la tabla `inventario_local`
--
ALTER TABLE `inventario_local`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventario_local_local_id` (`local_id`),
  ADD KEY `inventario_local_producto_id` (`producto_id`);

--
-- Indices de la tabla `iva`
--
ALTER TABLE `iva`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iva_empresa_id` (`empresa_id`);

--
-- Indices de la tabla `locales`
--
ALTER TABLE `locales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `locales_empresa_id` (`empresa_id`);

--
-- Indices de la tabla `marcas_tarjetas`
--
ALTER TABLE `marcas_tarjetas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pagos_compra`
--
ALTER TABLE `pagos_compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `compras_productos_compra_id` (`compras_id`),
  ADD KEY `metodo_pago_pagos_compra_id` (`metodo_id`),
  ADD KEY `tarjeta_pagos_compra_id` (`tarjeta_id`),
  ADD KEY `cuenta_pagos_compra_id` (`cuenta_id`),
  ADD KEY `bancos_pagos_compra_id` (`banco_receptor_id`);

--
-- Indices de la tabla `pagos_facturas`
--
ALTER TABLE `pagos_facturas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pagos_facturas_factura_id` (`factura_id`),
  ADD KEY `pagos_facturas_formas_id` (`metodo_id`),
  ADD KEY `pagos_facturas_cuenta_id` (`cuenta_id`),
  ADD KEY `pagos_facturas_tipo_tarjeta_id` (`tipo_tarjeta_id`),
  ADD KEY `pagos_factura_marca_tarjeta_id` (`marca_tarjeta_id`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `personas_empresa_id` (`empresa_id`),
  ADD KEY `personas_tipo_documento_id` (`tipo_documento`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productos_categoria_id` (`categoria_id`);

--
-- Indices de la tabla `productos_compra`
--
ALTER TABLE `productos_compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_compra_id` (`producto_id`),
  ADD KEY `compras_compras_producto_id` (`compras_id`),
  ADD KEY `local_productos_compra_id` (`local_id`);

--
-- Indices de la tabla `productos_factura`
--
ALTER TABLE `productos_factura`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productos_factura_id` (`factura_id`),
  ADD KEY `productos_factura_producto_id` (`producto_id`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empresa_proveedor_id` (`empresa_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roles_empresa_id` (`empresa_id`);

--
-- Indices de la tabla `tarjetas`
--
ALTER TABLE `tarjetas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cuenta_tarjeta` (`cuenta_id`),
  ADD KEY `tipos_tarjeta_tarjeta` (`tipo_tarjeta_id`),
  ADD KEY `marca_tarjeta_tarjeta` (`marca_tarjeta_id`),
  ADD KEY `empresa_tarjeta` (`empresa_id`);

--
-- Indices de la tabla `tipos_ingresos_egresos`
--
ALTER TABLE `tipos_ingresos_egresos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipos_tarjetas`
--
ALTER TABLE `tipos_tarjetas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_cuentas`
--
ALTER TABLE `tipo_cuentas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo_cuentas_tipo_fuentes_id` (`tipo_fuente`);

--
-- Indices de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_facturas`
--
ALTER TABLE `tipo_facturas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bancos`
--
ALTER TABLE `bancos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `cajas`
--
ALTER TABLE `cajas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias_productos`
--
ALTER TABLE `categorias_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `costos`
--
ALTER TABLE `costos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cuentas`
--
ALTER TABLE `cuentas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cxc`
--
ALTER TABLE `cxc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_producto_ivas`
--
ALTER TABLE `detalle_producto_ivas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_usuario_local`
--
ALTER TABLE `detalle_usuario_local`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `estatus`
--
ALTER TABLE `estatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `formas_pago`
--
ALTER TABLE `formas_pago`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `fuente_cuentas`
--
ALTER TABLE `fuente_cuentas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `ingresos`
--
ALTER TABLE `ingresos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ingresos_cheque`
--
ALTER TABLE `ingresos_cheque`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ingresos_directos`
--
ALTER TABLE `ingresos_directos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ingresos_tarjeta`
--
ALTER TABLE `ingresos_tarjeta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ingresos_transferencia`
--
ALTER TABLE `ingresos_transferencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inventario_local`
--
ALTER TABLE `inventario_local`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `iva`
--
ALTER TABLE `iva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `locales`
--
ALTER TABLE `locales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `marcas_tarjetas`
--
ALTER TABLE `marcas_tarjetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pagos_compra`
--
ALTER TABLE `pagos_compra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pagos_facturas`
--
ALTER TABLE `pagos_facturas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos_compra`
--
ALTER TABLE `productos_compra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos_factura`
--
ALTER TABLE `productos_factura`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tarjetas`
--
ALTER TABLE `tarjetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipos_ingresos_egresos`
--
ALTER TABLE `tipos_ingresos_egresos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tipos_tarjetas`
--
ALTER TABLE `tipos_tarjetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_cuentas`
--
ALTER TABLE `tipo_cuentas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipo_facturas`
--
ALTER TABLE `tipo_facturas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cajas`
--
ALTER TABLE `cajas`
  ADD CONSTRAINT `cajas_local_id` FOREIGN KEY (`local_id`) REFERENCES `locales` (`id`);

--
-- Filtros para la tabla `categorias_productos`
--
ALTER TABLE `categorias_productos`
  ADD CONSTRAINT `empresa_categoria_id` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `empresa_compras_id` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `proveedor_compras_id` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `costos`
--
ALTER TABLE `costos`
  ADD CONSTRAINT `costos_producto_id` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cuentas`
--
ALTER TABLE `cuentas`
  ADD CONSTRAINT `banco_cuenta_id` FOREIGN KEY (`bnco_id`) REFERENCES `bancos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `banco_empresa_id` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cuentas_tipo_fuente_id` FOREIGN KEY (`tipo_fuente`) REFERENCES `fuente_cuentas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cuentas_tipo_id` FOREIGN KEY (`bnco_tipo_cuenta`) REFERENCES `tipo_cuentas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cxc`
--
ALTER TABLE `cxc`
  ADD CONSTRAINT `cxc_estatus_id` FOREIGN KEY (`estatus_id`) REFERENCES `estatus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cxc_factura_id` FOREIGN KEY (`factura_id`) REFERENCES `facturas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_producto_ivas`
--
ALTER TABLE `detalle_producto_ivas`
  ADD CONSTRAINT `iva_detalle_producto_ivas_id` FOREIGN KEY (`iva_id`) REFERENCES `iva` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `producto_detalle_producto_ivas_id` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_usuario_local`
--
ALTER TABLE `detalle_usuario_local`
  ADD CONSTRAINT `empleado_rol_local` FOREIGN KEY (`empleado`) REFERENCES `empleados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `local_rol_empleado` FOREIGN KEY (`local`) REFERENCES `locales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `empleados_persona_id` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `facturas_empresa_id` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `facturas_estatus_id` FOREIGN KEY (`estatus_id`) REFERENCES `estatus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `facturas_tipo_factura_id` FOREIGN KEY (`tipo_factura`) REFERENCES `tipo_facturas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `facturas_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `empleados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `local_factura` FOREIGN KEY (`local_id`) REFERENCES `locales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `persona_factura` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ingresos`
--
ALTER TABLE `ingresos`
  ADD CONSTRAINT `cuentas_ingresos` FOREIGN KEY (`cuenta_id`) REFERENCES `cuentas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `empresa_ingresos` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ingresos_tipo_id` FOREIGN KEY (`tipo_ingreso`) REFERENCES `tipos_ingresos_egresos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ingresos_cheque`
--
ALTER TABLE `ingresos_cheque`
  ADD CONSTRAINT `banco_cheque_ingresos` FOREIGN KEY (`banco_id`) REFERENCES `bancos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ingresos_cheque_ingresos` FOREIGN KEY (`ingresos_id`) REFERENCES `ingresos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ingresos_directos`
--
ALTER TABLE `ingresos_directos`
  ADD CONSTRAINT `ingresos_ingresos_directos` FOREIGN KEY (`ingresos_id`) REFERENCES `ingresos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ingresos_tarjeta`
--
ALTER TABLE `ingresos_tarjeta`
  ADD CONSTRAINT `ingresos_tarjeta_ingresos` FOREIGN KEY (`ingresos_id`) REFERENCES `ingresos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tarjeta_ingresos_id` FOREIGN KEY (`tarjeta_id`) REFERENCES `tarjetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ingresos_transferencia`
--
ALTER TABLE `ingresos_transferencia`
  ADD CONSTRAINT `banco_emisor_id` FOREIGN KEY (`banco_emisor_id`) REFERENCES `bancos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `banco_receptor_id` FOREIGN KEY (`banco_receptor_id`) REFERENCES `bancos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ingresos_transferencias_ingresos` FOREIGN KEY (`ingresos_id`) REFERENCES `ingresos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `inventario_local`
--
ALTER TABLE `inventario_local`
  ADD CONSTRAINT `inventario_local_local_id` FOREIGN KEY (`local_id`) REFERENCES `locales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inventario_local_producto_id` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `iva`
--
ALTER TABLE `iva`
  ADD CONSTRAINT `iva_empresa_id` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `locales`
--
ALTER TABLE `locales`
  ADD CONSTRAINT `locales_empresa_id` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pagos_compra`
--
ALTER TABLE `pagos_compra`
  ADD CONSTRAINT `bancos_pagos_compra_id` FOREIGN KEY (`banco_receptor_id`) REFERENCES `bancos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compras_productos_compra_id` FOREIGN KEY (`compras_id`) REFERENCES `compras` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cuenta_pagos_compra_id` FOREIGN KEY (`cuenta_id`) REFERENCES `cuentas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `metodo_pago_pagos_compra_id` FOREIGN KEY (`metodo_id`) REFERENCES `formas_pago` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tarjeta_pagos_compra_id` FOREIGN KEY (`tarjeta_id`) REFERENCES `tarjetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pagos_facturas`
--
ALTER TABLE `pagos_facturas`
  ADD CONSTRAINT `pagos_factura_marca_tarjeta_id` FOREIGN KEY (`marca_tarjeta_id`) REFERENCES `marcas_tarjetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pagos_facturas_cuenta_id` FOREIGN KEY (`cuenta_id`) REFERENCES `cuentas` (`id`),
  ADD CONSTRAINT `pagos_facturas_factura_id` FOREIGN KEY (`factura_id`) REFERENCES `facturas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pagos_facturas_formas_id` FOREIGN KEY (`metodo_id`) REFERENCES `formas_pago` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pagos_facturas_tipo_tarjeta_id` FOREIGN KEY (`tipo_tarjeta_id`) REFERENCES `tipos_tarjetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `personas`
--
ALTER TABLE `personas`
  ADD CONSTRAINT `personas_empresa_id` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `personas_tipo_documento_id` FOREIGN KEY (`tipo_documento`) REFERENCES `tipo_documento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_categoria_id` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos_compra`
--
ALTER TABLE `productos_compra`
  ADD CONSTRAINT `compras_compras_producto_id` FOREIGN KEY (`compras_id`) REFERENCES `compras` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `local_productos_compra_id` FOREIGN KEY (`local_id`) REFERENCES `locales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `producto_compra_id` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos_factura`
--
ALTER TABLE `productos_factura`
  ADD CONSTRAINT `productos_factura_id` FOREIGN KEY (`factura_id`) REFERENCES `facturas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productos_factura_producto_id` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD CONSTRAINT `empresa_proveedor_id` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `roles_empresa_id` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tarjetas`
--
ALTER TABLE `tarjetas`
  ADD CONSTRAINT `cuenta_tarjeta` FOREIGN KEY (`cuenta_id`) REFERENCES `cuentas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `empresa_tarjeta` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `marca_tarjeta_tarjeta` FOREIGN KEY (`marca_tarjeta_id`) REFERENCES `marcas_tarjetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tipos_tarjeta_tarjeta` FOREIGN KEY (`tipo_tarjeta_id`) REFERENCES `tipos_tarjetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tipo_cuentas`
--
ALTER TABLE `tipo_cuentas`
  ADD CONSTRAINT `tipo_cuentas_tipo_fuentes_id` FOREIGN KEY (`tipo_fuente`) REFERENCES `fuente_cuentas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

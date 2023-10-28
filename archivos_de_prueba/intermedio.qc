-- Crear tablas 
CREATE TABLE Clientes (
    ClienteID INT,
    Nombre VARCHAR,
    Email VARCHAR
);

CREATE TABLE Pedidos (
    PedidoID INT,
    ClienteID INT,
    Producto VARCHAR,
    Cantidad INT
);
CREATE TABLE Clientes2 (
    ClienteID INT,
    Nombre VARCHAR,
    Email VARCHAR
);

CREATE TABLE Pedidos2 (
    PedidoID INT,
    ClienteID INT,
    Producto VARCHAR,
    Cantidad INT
);
-- Alter
ALTER TABLE Pedidos
ADD Estado VARCHAR;

ALTER TABLE Pedidos
RENAME TO NewPedidos;

-- Drop tablas 
DROP TABLE Pedidos2;
DROP TABLE Clientes2;


-- Insertar datos
INSERT INTO Clientes (ClienteID, Nombre, Email)
VALUES (1, "Ana", "ana@example.com");
INSERT INTO Clientes (ClienteID, Nombre, Email)
VALUES (2, "Carlos", "carlos@example.com");

INSERT INTO NewPedidos (PedidoID, ClienteID, Producto, Cantidad, Estado)
VALUES (101, 1, "Producto A", 3, "En proceso");
INSERT INTO NewPedidos (PedidoID, ClienteID, Producto, Cantidad, Estado)
VALUES (102, 2, "Producto B", 5, "Pendiente");

-- Seleccionar datos con WHERE
SELECT * FROM Clientes WHERE ClienteID = 1;
SELECT * FROM NewPedidos WHERE Estado = "En proceso";

-- Actualizar datos
UPDATE NewPedidos
SET Estado = "Completado"
WHERE PedidoID = 101;
select * from NewPedidos;

-- Truncar tabla
TRUNCATE TABLE NewPedidos;
select * from NewPedidos;

-- Borrar datos
DELETE FROM Clientes WHERE ClienteID = 2;
select * from Clientes;

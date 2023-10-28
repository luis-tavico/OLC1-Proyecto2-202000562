-- Crear tablas
CREATE TABLE Productos (
    ProductoID INT,
    Nombre VARCHAR,
    Precio DOUBLE,
    Stock INT
);

CREATE TABLE Ventas (
    VentaID INT,
    ProductoID INT,
    Cantidad INT,
    FechaVenta DATE,
    Total DOUBLE,
    MetodoPago VARCHAR,
    EstadoVenta VARCHAR
);
CREATE TABLE Productos2 (
    ProductoID INT,
    Nombre VARCHAR,
    Precio DOUBLE,
    Stock INT
);

CREATE TABLE Ventas2 (
    VentaID INT,
    ProductoID INT,
    Cantidad INT,
    FechaVenta DATE,
    Total DOUBLE,
    MetodoPago VARCHAR,
    EstadoVenta VARCHAR
);
-- Alterar tabla (Modificar columna Precio)
ALTER TABLE Productos
RENAME COLUMN Precio TO PrecioUnitario;

-- Alterar tabla (Agregar columna Categoria)
ALTER TABLE Productos
ADD Categoria VARCHAR;

-- Drop tablas avanzadas
DROP TABLE Ventas2;
DROP TABLE Productos2;


-- Insertar datos
INSERT INTO Productos (ProductoID, Nombre, PrecioUnitario, Stock, Categoria)
VALUES (1, "Producto X", 1000.00, 50, "Electrónicos");
INSERT INTO Productos (ProductoID, Nombre, PrecioUnitario, Stock, Categoria)
VALUES (2, "Producto Y", 750.50, 30, "Ropa");

INSERT INTO Ventas (VentaID, ProductoID, Cantidad, FechaVenta, Total, MetodoPago, EstadoVenta)
VALUES (501, 1, 10, "2023-10-17", 10000.00, "Tarjeta", "Completado");
INSERT INTO Ventas (VentaID, ProductoID, Cantidad, FechaVenta, Total, MetodoPago, EstadoVenta)
VALUES (502, 2, 5, "2023-10-16", 3752.50, "Efectivo", "Pendiente");

-- Truncar tabla
TRUNCATE TABLE Ventas;
select * from Ventas;

-- Borrar datos
DELETE FROM Productos WHERE ProductoID = 2;
select * from Productos;


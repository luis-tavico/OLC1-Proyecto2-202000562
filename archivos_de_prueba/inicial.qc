-- Crear tablas
CREATE TABLE Empleados (
    ID INT,
    Nombre VARCHAR,
    Salario DOUBLE
);
CREATE TABLE Empleados2 (
    ID INT,
    Nombre VARCHAR,
    Salario DOUBLE
);
CREATE TABLE Venta (
    VentaId INT,
    ProductoId INT,
    Cantidad INT
);
-- Alter
ALTER TABLE Empleados
ADD Edad INT;

-- Drop
DROP TABLE Empleados2;


-- Insertar datos
INSERT INTO Empleados (ID, Nombre, Salario, Edad)
VALUES (1, "Juan", 2500.00, 30);

INSERT INTO Venta(VentaId, ProductoId, Cantidad) VALUES (1, 1, 10);

-- Seleccionar datos
SELECT * FROM Empleados;

-- Actualizar datos
UPDATE Empleados
SET Salario = 2800.00
WHERE ID = 1;
Select * from Empleados;

-- Truncar tabla
TRUNCATE TABLE Venta;
SELECT * FROM Venta;

-- Borrar datos
DELETE FROM Empleados WHERE ID = 1;
SELECT * FROM Empleados;

-- funciones nativas

SELECT LOWER("HOLA MUNDO"); -- hola mundo
SELECT UPPER("hola mundo"); -- HOLA MUNDO
SELECT ROUND(125.678980, 3); -- 125.679
SELECT LEN("ganare el curso de compiladores 1"); -- 30 caracteres
SELECT TRUNCATE(8.965, 1); -- 8.9
SELECT TYPEOF(245.5); -- DOUBLE 
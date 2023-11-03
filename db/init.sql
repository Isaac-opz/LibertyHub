create database libertyhub;
use libertyhub;

create table users (
    id int(11) NOT NULL AUTO_INCREMENT,
    nombre_completo varchar(50) DEFAULT NULL,
    correo varchar(30) DEFAULT NULL,
    contrasena varchar(20) DEFAULT NULL,
    tipo_de_usuario varchar(25) DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    propertyId INT NOT NULL,
    comment TEXT NOT NULL,
    rating INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table propiedades (
    id int(5) NOT NULL AUTO_INCREMENT,
    nombre varchar(50) DEFAULT NULL,
    id_anfitrion int(5) DEFAULT NULL,
    nombre_anfitrion varchar(50) DEFAULT NULL,
    distrito varchar(50) DEFAULT NULL,
    barrio varchar(50) DEFAULT NULL,
    latitud decimal(7,5) DEFAULT NULL,
    longitud decimal(8,5) DEFAULT NULL,
    tipo_habitacion varchar(50) DEFAULT NULL,
    precio int(3) DEFAULT NULL,
    minimo_noches int(2) DEFAULT NULL,
    numero_opiniones int(3) DEFAULT NULL,
    ultima_opinion varchar(50) DEFAULT NULL,
    opiniones_por_mes decimal(3,2) DEFAULT NULL,
    propiedades_del_anfitrion int(1) DEFAULT NULL,
    dias_habiles int(3) DEFAULT NULL,
    calificacion decimal(2,1) DEFAULT NULL,
    PRIMARY KEY (id)
);

INSERT INTO usuarios
    (nombre_completo, correo, contrasena, tipo_de_usuario)
VALUES
    ('Danna', 'danna@gmail.com', '1234', 'anfitrion');

INSERT INTO usuarios
    (nombre_completo, correo, contrasena, tipo_de_usuario)
VALUES
    ('Juan', 'juanpablogranadoscoral@gmail.com', '1234', 'anfitrion');

INSERT INTO usuarios
    (nombre_completo, correo, contrasena, tipo_de_usuario)
VALUES
    ('Isaac', 'isaac@gmail.com', '1234', 'anfitrion');

INSERT INTO usuarios
    (nombre_completo, correo, contrasena, tipo_de_usuario)
VALUES
    ('test', 'test@gmail.com', '1234', 'huesped');




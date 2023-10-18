import mysql.connector
from mysql.connector import Error

# Configura la conexión a MySQL
try:
    connection = mysql.connector.connect(
        host='localhost',
        database='libertyhub',
        user='root',
        password=''
    )

    if connection.is_connected():
        cursor = connection.cursor()

        # Lee el archivo CSV y carga los datos en la tabla
        with open('/vagrant/libertyhub/db/datoskny.csv', 'r', encoding='utf-8') as file:
            next(file)  # Saltar la primera fila si contiene encabezados
            for line in file:
                data = line.strip().split(',')
                cursor.execute('INSERT INTO datoslimpiosny (id, nombre, id_anfitrion, nombre_anfitrion, distrito, barrio, latitud, longitud, tipo_habitacion, precio, minimo_noches, numero_opiniones, ultima_opinion, opiniones_por_mes, propiedades_del_anfitrion, dias_habiles, calificacion) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', data)

        connection.commit()
        print("Los datos se han importado correctamente")

except Error as e:
    print(f"Error: {e}")

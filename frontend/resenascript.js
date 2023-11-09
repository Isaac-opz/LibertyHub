document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');

    // Escucha el envío del formulario de reseña
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtén los valores del formulario
        const propiedad = document.getElementById('propiedad').value;
        const correo = document.getElementById('correo').value;
        const ranking = parseInt(document.getElementById('ranking').value);
        const comentarios = document.getElementById('comentarios').value;

        // Realiza una solicitud POST a tu API para crear una nueva reseña
        fetch('/api/propiedades/' + propiedad + '/resenas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuario: correo,
                reseña: comentarios,
                puntuación: ranking,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error al crear la reseña: ' + data.error);
            } else {
                alert('Reseña creada exitosamente');
                // Limpia el formulario después de enviar
                reviewForm.reset();
                // Actualiza la lista de reseñas
                cargarReseñas(propiedad);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al enviar la reseña.');
        });
    });

    // Función para cargar las reseñas anteriores
    function cargarReseñas(propiedadId) {
        // Realiza una solicitud GET a tu API para obtener las reseñas de la propiedad
        fetch('/api/propiedades/' + propiedadId + '/resenas')
        .then(response => response.json())
        .then(data => {
            // Renderiza las reseñas en el elemento reviewsList
            reviewsList.innerHTML = '';
            data.forEach(reseña => {
                const reseñaElement = document.createElement('div');
                reseñaElement.innerHTML = `
                    <h3>${reseña.usuario}</h3>
                    <p>Puntuación: ${reseña.puntuación}</p>
                    <p>${reseña.comentarios}</p>
                `;
                reviewsList.appendChild(reseñaElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al cargar las reseñas.');
        });
    }

    // Llama a cargarReseñas para cargar las reseñas iniciales (reemplaza "propiedadId" con el valor correcto)
    cargarReseñas('propiedadId');
});
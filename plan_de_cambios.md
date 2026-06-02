# Plan de Trabajo: Actualizaciones La Meca Glamping

A continuación se detalla el plan de acción paso a paso para implementar los cambios solicitados en el proyecto, basados en las anotaciones.

## 1. Carrusel de Fotos (Comida y Espacios)
*   **Archivos implicados:** `src/components/ImageCarousel.jsx` y `src/App.jsx`.
*   **Acciones:**
    *   Crear una segunda instancia de este componente enfocada únicamente en los **espacios del glamping** y ubicada en un espacio prudente para esto(domos, vistas, exteriores). Con las imagenes que están en public/Comunidad (Si puedes implementar una forma de simplemente iterar todo lo que haya en la carpeta Comunidad, sin necesidad de agregar los nombres de cada imagen a la llamada, perfecto, si no puedes no pasa nada)

## 2. Botones Principales de Reserva (Hero)
*   **Archivos implicados:** `src/sections/HeroSection.jsx` y `src/sections/HeroSection.css`.
*   **Acciones:**
    *   Agregar dos botones de llamado a la acción (CTA) en la sección principal:
        1. "Solicitar reserva alojamiento"
        2. "Solicitar reserva Restaurante"
    *   Enlazar estos botones a la sección correspondiente de contacto o reservas.

## 3. Sección "Quiénes Somos"
*   **Archivos implicados:** `src/sections/RetreatSection.jsx` (adaptarlo) o crear `src/sections/AboutSection.jsx`.
*   **Acciones:**
    *   Insertar el texto sobre la experiencia memorable, la naturaleza, los domos y cómo la gastronomía, la música y el arte se unen:
    "La Meca Glamping es un destino creado para vivir experiencias memorables en medio de la naturaleza. Somos glamping y restaurante abierto al público, un espacio donde la gastronomía, la música, el arte y las increíbles vistas a las montañas se unen para crear momentos únicos. Creemos que cada visita debe sentirse diferente. Por eso diseñamos espacios cálidos y llenos de personalidad, donde cada detalle —la iluminación, la decoración, la música y el ambiente— transmite una energía especial. Nuestros domos ofrecen comodidad y conexión con la naturaleza, mientras que el restaurante invita a disfrutar buena comida en un entorno auténtico y acogedor.
    La experiencia gastronómica es parte esencial de La Meca. Nos apasiona crear platos para compartir, cenas especiales y momentos que se disfrutan no solo por el sabor, sino también por el ambiente que los rodea: una conversación junto a la fogata, música acompañando la noche y una vista inolvidable de las montañas de Guasca"

## 4 y 5. Restaurante (Carnes maduradas, Chef Clau)
*   **Archivos implicados:** `src/sections/GastronomySection.jsx`.
*   **Acciones:**
    *   Actualizar los textos descriptivos para incluir a la Chef Clau (más de 20 años de experiencia):
    "El restaurante de La Meca Glamping ofrece una experiencia gastronómica única, liderada por la Chef Clau, quien durante más de 20 años ha perfeccionado una propuesta de cocina de autor donde cada plato refleja creatividad, técnica y pasión por la buena comida. nuestra especialidad son las carnes, acompañadas de mantequillas compuestas y preparaciones creadas para resaltar sabores auténticos y memorables. Más que un restaurante, somos un espacio donde la gastronomía, la música, el arte y la naturaleza se unen para convertir cada visita en una experiencia inolvidable."

    *   Añadir la etiqueta de *(Restaurante campestre, exclusivo)*.
    *   Destacar el uso de **carnes maduradas y angus certificado**, mantequillas compuestas y la cocina de autor.

## 6. Habitaciones (Descripción y Tarifas)
*   **Archivos implicados:** `src/sections/AccommodationSection.jsx`.
*   **Acciones:**
    *   Actualizar la información para resaltar: domos geodésicos termoacondicionados, cama doble, sofá, baño de gran tamaño, jacuzzi panorámico.
    *   Añadir la estructura de tarifas:
        *   Pareja fin de semana: $470.000 / noche
        *   Pareja entre semana: desde $380.000
        *   Persona adicional: $50.000 / noche

## 7. Atributo Pet-Friendly
*   **Archivos implicados:** `src/sections/AccommodationSection.jsx` (o sección general de características).
*   **Acciones:**
    *   Añadir un distintivo/ícono claro de "Pet-Friendly" dentro de las amenidades del glamping.

## 8. Reseñas y Testimonios
*   **Archivos implicados:** `src/sections/ReviewsSection.jsx`.
*   **Acciones:**
    *   Reemplazar las fotos de perfil genéricas de los testimonios por fotos o recortes que muestren los domos o escenarios del glamping.

## 9. Redes Sociales
*   **Archivos implicados:** `src/components/Footer.jsx` y/o `src/sections/ContactSection.jsx`.
*   **Acciones:**
    *   Añadir o actualizar los enlaces directos a las redes sociales de La Meca Glamping.

## 10. Formulario de Reserva de Restaurante
*   **Archivos implicados:** `src/sections/ContactSection.jsx`.
*   **Acciones:**
    *   Crear/modificar el formulario de reservas para incluir los siguientes campos: Nombre, Identificación, Fecha de reserva, Número de personas.
    *   **Lógica condicional:** Implementar una regla que detecte si el número de personas es mayor a 15. Si es así, mostrar un mensaje informando que para grupos de ese tamaño es obligatorio contactar a un asesor (con botón directo a WhatsApp).

## 11. Sección de Eventos
*   **Archivos implicados:** Crear `src/sections/EventsSection.jsx` (y su respectivo `.css`) y enlazarlo en `src/App.jsx`.
*   **Acciones:**
    *   Diseñar e implementar una nueva sección dedicada enteramente a eventos, manteniendo la estética premium y campestre.

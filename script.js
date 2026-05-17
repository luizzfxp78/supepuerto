// MENU MOBILE

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// SWIPER HERO

const swiper = new Swiper(".heroSwiper", {
  loop:true,
  effect:"fade",
  autoplay:{
    delay:4000,
    disableOnInteraction:false,
  }
});

// NAVBAR SCROLL

window.addEventListener('scroll', () => {

  const header = document.querySelector('.header');

  if(window.scrollY > 50){
    header.style.backdropFilter = "blur(15px)";
    header.style.background = "rgba(0,0,0,.4)";
  }else{
    header.style.background = "transparent";
  }

});

// LEAFLET MAP

const map = L.map('map').setView([-10.801, -77.743], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:'© OpenStreetMap'
}).addTo(map);

L.marker([-10.801, -77.743])
  .addTo(map)
  .bindPopup('Supe Puerto - Perú')
  .openPopup();

// ANIMACIÓN SCROLL

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }

  });

});

document.querySelectorAll('.food-card, .tour-card, .myth-card')
.forEach(el => observer.observe(el));

// Cerrar meu cuando se presione
const closeMenu = () => navLinks.classList.remove('active');
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));


// ========== HISTORIA INTERACTIVA ==========
const historyData = {
  caral: {
    title: "Los Orígenes de Áspero",
    desc: "Supe Puerto es reconocido como la puerta de entrada a Áspero, importante ciudad pesquera vinculada a la Civilización Caral, considerada una de las culturas más antiguas de América con más de 5000 años de historia. Desde este puerto ancestral se desarrollaron actividades de pesca, intercambio comercial y organización social que contribuyeron al crecimiento de una civilización avanzada en agricultura, astronomía y arquitectura monumental en la costa central del Perú.",
    img: "img/historia/aspero.jpg",
    chapter: 1
  },
  japones: {
    title: "La Herencia Japonesa",
    desc: "A inicios del siglo XX, inmigrantes japoneses llegaron a Supe Puerto, trayendo nuevas técnicas de pesca, cultivos y costumbres que se fusionaron con la tradición local. La comunidad nikkei impulsó la industria pesquera y comercial, dejando una huella imborrable en la gastronomía y las festividades del puerto.",
    img: "img/historia/japoneses.jpg",
    chapter: 2
  },
  fundacion: {
    title: "Fundación de Supe Puerto",
    desc: "El 28 de noviembre de 1940, mediante Ley N° 9240, se creó oficialmente el distrito de Supe Puerto. Este hito permitió la organización administrativa, el desarrollo de infraestructura portuaria y el fortalecimiento de la identidad costera, separándose del distrito de Supe.",
    img: "img/historia/fundacion.jpg",
    chapter: 3
  },
  turismo: {
    title: "Despertar Turístico",
    desc: "En 1994, Supe Puerto comenzó a ser promocionado como destino turístico gracias a sus playas, el malecón y la cercanía al complejo arqueológico de Áspero. Se construyeron nuevos accesos, restaurantes y espacios recreativos, atrayendo visitantes nacionales e internacionales.",
    img: "img/historia/turismo.jpg",
    chapter: 4
  },
  hoy: {
    title: "Supe Puerto Actual",
    desc: "Hoy, Supe Puerto combina modernidad y tradición. Su puerto pesquero sigue activo, sus playas son concurridas, y sus festividades como la Semana Santa y las ferias gastronómicas muestran un pueblo orgulloso de su herencia cultural. El turismo sostenible y la conservación de Áspero son ejes de su desarrollo futuro.",
    img: "img/historia/actualidad.jpg",
    chapter: 5
  }
};

// Obtener elementos
const btns = document.querySelectorAll('.timeline-btn');
const historyImg = document.getElementById('historyImg');
const historyTitle = document.getElementById('historyTitle');
const historyDesc = document.getElementById('historyDesc');
const chapterCounter = document.getElementById('chapterCounter');

// Función para cambiar contenido
function setHistory(period) {
  const data = historyData[period];
  if (!data) return;

  // Actualizar imagen
  historyImg.src = data.img;
  historyImg.alt = data.title;
  // Actualizar texto
  historyTitle.textContent = data.title;
  historyDesc.textContent = data.desc;
  chapterCounter.textContent = data.chapter;

  // Marcar botón activo
  btns.forEach(btn => {
    if (btn.dataset.period === period) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Asignar eventos a los botones
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const period = btn.dataset.period;
    setHistory(period);
  });
});


// ========== LUGARES TURÍSTICOS CON FILTROS ==========
const placesData = [
  // Arqueológicos
  { name: "Áspero", category: "arqueologicos", desc: "Ciudad pesquera ancestral del período Arcaico Tardío con más de 5000 años de antigüedad. Vinculada a la Civilización Caral, sus pirámides y plazas circulares asombran al visitante.", img: "img/turismo/aspero.jpg", tags: ["Patrimonio ancestral", "Ruinas milenarias"] },
  { name: "Museo Comunitario Áspero", category: "arqueologicos", desc: "Espacio cultural gestionado por la comunidad local que exhibe cerámica, herramientas de piedra y restos óseos recuperados en las excavaciones arqueológicas.", img: "img/turismo/museo.jpg", tags: ["Mañana", "Entrada libre"] },
  
  // Playas
  { name: "La Isla", category: "playas", desc: "Playa de aguas cristalinas y arena dorada, ideal para el baño y el surf. Su forma de península la protege de las corrientes fuertes.", img: "img/turismo/playa.jpg", tags: ["Todo el día", "Surf y baño seguro"] },
  { name: "El Faraón", category: "playas", desc: "Extensa playa de oleaje moderado, perfecta para familias. Cuenta con servicios de alquiler de sombrillas y restaurantes cercanos.", img: "img/playa2.jpg", tags: ["Familiar", "Puesta de sol"] },
  { name: "Playa del Amor", category: "playas", desc: "Pequeña cala escondida, rodeada de acantilados. Muy concurrida por parejas y fotógrafos por su paisaje romántico.", img: "img/turismo/playa_amor.jpg", tags: ["Romántico", "Atardecer"] },
  { name: "Playa de Áspero", category: "playas", desc: "Ubicada junto al complejo arqueológico, combina historia y mar. Sus aguas tranquilas son ideales para nadar.", img: "img/turismo/playa_aspero.jpg", tags: ["Historia y mar", "Aguas calmadas"] },
  { name: "El Muelle", category: "playas", desc: "Zona de pescadores artesanales. Se puede observar la llegada de botes y comprar pescado fresco directamente.", img: "img/turismo/muelle.jpg", tags: ["Pesca artesanal", "Mañana"] },
  
  // Paseos
  { name: "Plaza de la Bandera", category: "paseos", desc: "Corazón cívico de Supe Puerto. Rodeada de jardines y palmeras, es punto de encuentro para actividades patrióticas.", img: "img/turismo/plaza_bandera.jpg", tags: ["Cívico", "Fotos"] },
  { name: "Barco Guardacostas", category: "paseos", desc: "Antigua embarcación de la Marina de Guerra del Perú, convertida en atractivo turístico. Ideal para tomar fotos.", img: "img/turismo/guardacostas.jpg", tags: ["Historia naval", "Todo el día"] },
  { name: "Malecón Turístico", category: "paseos", desc: "Extenso paseo marítimo con vista al océano. Bancas, áreas verdes y puestos de comida criolla.", img: "img/turismo/malecon.jpg", tags: ["Atardecer", "Caminata"] },
  { name: "Mirador de Puerto", category: "paseos", desc: "Mirador elevado que ofrece una vista panorámica de toda la bahía. Imperdible para los amantes de la fotografía.", img: "img/turismo/mirador.jpg", tags: ["Vistas 360°", "Atardecer"] },
  { name: "Parque Miguel Grau", category: "paseos", desc: "Parque infantil y zona de descanso, dedicado al héroe nacional. Muy concurrido los fines de semana.", img: "img/parque.jpg", tags: ["Familiar", "Área verde"] },
  
  // Naturaleza
  { name: "Totoral de los Patos", category: "naturaleza", desc: "Humedal protegido donde habitan patos silvestres y otras aves migratorias. Ideal para avistamiento de fauna.", img: "img/turismo/totoral.jpg", tags: ["Aves", "Senderismo"] },
  { name: "Cerro San José", category: "naturaleza", desc: "Elevación natural con senderos señalizados. En la cima se obtiene una vista espectacular de todo el valle.", img: "img/turismo/cerro_san_jose.jpg", tags: ["Excursión", "Vistas"] },
  
  // Residencias Históricas
  { name: "El Reloj del Gallo", category: "residencias", desc: "Antigua casona con una torre de reloj rematada por una veleta en forma de gallo. Símbolo arquitectónico del puerto.", img: "img/turismo/reloj.jpg", tags: ["Arquitectura", "Fotos"] },
  { name: "Casa de José María Arguedas", category: "residencias", desc: "Vivienda donde vivió el célebre escritor peruano. Conserva mobiliario y objetos personales de la época.", img: "img/turismo/jose_maria_arguedas.jpg", tags: ["Literatura", "Visita cultural"] },
  { name: "Quinta Luis Banchero Rossi", category: "residencias", desc: "Residencia del empresario pesquero, hoy convertida en centro cultural. Destaca su arquitectura republicana.", img: "img/turismo/luis_banchero_rosi.jpg", tags: ["Historia empresarial", "Eventos"] },
  { name: "Blanca Varela (La Isadora)", category: "residencias", desc: "Casa museo dedicada a la poeta Blanca Varela. Espacio íntimo con jardín y exposiciones de arte.", img: "img/turismo/la_isadora.jpg", tags: ["Poesía", "Jardín"] }
];

// Función para generar las tarjetas HTML
function renderPlaces(filter = "todos") {
  const grid = document.getElementById("places-grid");
  if (!grid) return;

  const filtered = filter === "todos" 
    ? placesData 
    : placesData.filter(place => place.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="no-results">No hay lugares en esta categoría.</p>`;
    return;
  }

  const cardsHTML = filtered.map(place => `
    <article class="place-card" data-category="${place.category}">
      <div class="place-img">
        <img src="${place.img}" alt="${place.name}" loading="lazy">
        <div class="img-overlay">${place.desc}</div>
      </div>
      <div class="place-info">
        <h3>${place.name}</h3>
        <div class="place-tags">
          ${place.tags.map(tag => `<span>${tag}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');

  grid.innerHTML = cardsHTML;
}
// Lógica de los botones de filtro
function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Quitar clase active de todos
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      renderPlaces(filterValue);
    });
  });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  renderPlaces('todos');
  initFilters();
});


// ========== GALERÍA 3D CON ZOOM ==========
(function() {
  // Lista de imágenes (usa las que tengas en la carpeta img/)
const images = [
  'img/g1.jpg', 'img/g2.jpg', 'img/g3.jpg',
  'img/g4.jpg', 'img/g5.jpg', 'img/g6.jpg',
  'img/g7.jpg', 'img/g8.jpg', 'img/g9.jpg',
  'img/g10.jpg', 'img/g11.jpg', 'img/g12.jpg'
];
  const total = images.length;
  // Configurar columnas (3 columnas, ajustar según número de imágenes)
  const columns = 3;
  let currentImg = undefined;
  let currentImgProps = { x: 0, y: 0 };
  let isZooming = false;
  let mouse = { x: 0, y: 0 };
  let delayedPlay;

  // Crear los elementos .photoBox dentro de .mainBoxes
  const $mainBoxes = $('.mainBoxes');
  for (let i = 0; i < total; i++) {
    let col = i % columns;
    let colIndex = col; // 0,1,2
    let $box = $('<div>').addClass('photoBox pb-col' + colIndex);
    $box.css('backgroundImage', 'url(' + images[i] + ')');
    $mainBoxes.append($box);

    // Posiciones X según columna
    let xPos = [60, 280, 500][colIndex];
    // Altura fija
    let height = 640;
    let width = 400;
    // Y inicial y movimiento vertical diferencial según columna
    let startY = [-575, 800, 800][colIndex];
    let endY = [800, -575, -575][colIndex];
    let duration = [40, 35, 26][colIndex];

    gsap.set($box[0], {
      x: xPos,
      y: startY,
      width: width,
      height: height,
      borderRadius: 20,
      scale: 0.5,
      zIndex: 1,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    });

    // Animación vertical infinita
    let tl = gsap.timeline({ paused: true, repeat: -1 })
      .fromTo($box[0], { y: startY, rotation: -0.05 }, { duration: duration, y: endY, rotation: 0.05, ease: 'none' });
    tl.progress(i / total);
    $box[0].tl = tl;
  }

  // Funciones auxiliares
  function pauseBoxes(box) {
    let classStr = 'pb-col0';
    if ($(box).hasClass('pb-col1')) classStr = 'pb-col1';
    if ($(box).hasClass('pb-col2')) classStr = 'pb-col2';
    $('.photoBox').each(function() {
      if ($(this).hasClass(classStr)) {
        gsap.to(this.tl, { timeScale: 0, ease: 'sine' });
      }
    });
  }

  function playBoxes() {
    $('.photoBox').each(function() {
      let tl = this.tl;
      tl.play();
      gsap.to(tl, { duration: 0.4, timeScale: 1, ease: 'sine.in', overwrite: true });
    });
  }

  // Inicialización
  function initGallery() {
    let $stage = $('.gallery-stage');
    let $main = $stage;
    let $mainBoxes = $('.mainBoxes');
    let $mainClose = $('.mainClose');

    gsap.set($main[0], { perspective: 800 });
    gsap.set('.photoBox', { opacity: 1, cursor: 'pointer' });
    gsap.set($mainBoxes[0], { left: '75%', xPercent: -50, width: 1200, rotationX: 14, rotationY: -15, rotationZ: 10 });
    gsap.set($mainClose[0], { autoAlpha: 0, width: 60, height: 60, left: -30, top: -31, pointerEvents: 'none' });
    gsap.fromTo($main[0], { autoAlpha: 0 }, { duration: 0.6, ease: 'power2.inOut', autoAlpha: 1, delay: 0.2 });
    playBoxes();

    // Eventos
    $('.photoBox').on('mouseenter', function(e) {
      if (currentImg) return;
      if (delayedPlay) delayedPlay.kill();
      pauseBoxes(e.currentTarget);
      let _t = e.currentTarget;
      gsap.to('.photoBox', { duration: 0.2, overwrite: 'auto', opacity: function(i, t) { return (t === _t) ? 1 : 0.33; } });
      gsap.fromTo(_t, { zIndex: 100 }, { duration: 0.2, scale: 0.62, overwrite: 'auto', ease: 'power3' });
    });

    $('.photoBox').on('mouseleave', function(e) {
      if (currentImg) return;
      let _t = e.currentTarget;
      if (gsap.getProperty(_t, 'scale') > 0.62) {
        delayedPlay = gsap.delayedCall(0.3, playBoxes);
      } else {
        playBoxes();
      }
      gsap.timeline()
        .set(_t, { zIndex: 1 })
        .to(_t, { duration: 0.3, scale: 0.5, overwrite: 'auto', ease: 'expo' }, 0)
        .to('.photoBox', { duration: 0.5, opacity: 1, ease: 'power2.inOut' }, 0);
    });

    $('.photoBox').on('click', function(e) {
      if (!isZooming) {
        isZooming = true;
        gsap.delayedCall(0.8, function() { isZooming = false; });

        if (currentImg) {
          // Cerrar zoom
          gsap.timeline({ defaults: { ease: 'expo.inOut' } })
            .to('.mainClose', { duration: 0.1, autoAlpha: 0, overwrite: true }, 0)
            .to('.mainBoxes', { duration: 0.5, scale: 1, left: '75%', width: 1200, rotationX: 14, rotationY: -15, rotationZ: 10, overwrite: true }, 0)
            .to('.photoBox', { duration: 0.6, opacity: 1, ease: 'power4.inOut' }, 0)
            .to(currentImg, { duration: 0.6, width: 400, height: 640, borderRadius: 20, x: currentImgProps.x, y: currentImgProps.y, scale: 0.5, rotation: 0, zIndex: 1 }, 0);
          currentImg = undefined;
        } else {
          // Abrir zoom
          pauseBoxes(e.currentTarget);
          currentImg = e.currentTarget;
          currentImgProps.x = gsap.getProperty(currentImg, 'x');
          currentImgProps.y = gsap.getProperty(currentImg, 'y');

          gsap.timeline({ defaults: { duration: 0.6, ease: 'expo.inOut' } })
            .set(currentImg, { zIndex: 100 })
            .fromTo('.mainClose', { x: mouse.x, y: mouse.y, autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power3.inOut' }, 0)
            .to('.photoBox', { opacity: 0 }, 0)
            .to(currentImg, { width: '100%', height: '100%', borderRadius: 0, x: 0, y: 0, scale: 1, opacity: 1 }, 0)
            .to('.mainBoxes', { duration: 0.5, left: '50%', width: '100%', rotationX: 0, rotationY: 0, rotationZ: 0 }, 0.15)
            .to('.mainBoxes', { duration: 5, scale: 1.06, rotation: 0.05, ease: 'none' }, 0.65);
        }
      }
    });

    // Cerrar con el botón (clon)
    $('.mainClose').on('click', function() {
      if (currentImg) {
        // Simular click en la foto actual para cerrar
        $(currentImg).trigger('click');
      }
    });

    // Seguir al mouse
    if ('ontouchstart' in window) {
      mouse.x = window.innerWidth - 50;
      mouse.y = 60;
    } else {
      $('.gallery-stage').on('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        if (currentImg) {
          gsap.to('.mainClose', { duration: 0.1, x: mouse.x, y: mouse.y, overwrite: 'auto' });
        }
      });
    }
  }

  // Esperar a que el DOM esté listo
  $(document).ready(function() {
    if ($('.gallery-stage').length) {
      initGallery();
    }
  });
})();


// ========== MITOS Y LEYENDAS - TABS HORIZONTALES ==========
document.addEventListener('DOMContentLoaded', () => {
  const btns = document.querySelectorAll('.tab-btn');
  const panes = document.querySelectorAll('.tab-pane');

  if (!btns.length) return;

  function switchTab(selectedBtn) {
    const targetId = selectedBtn.getAttribute('data-tab');
    
    // Actualizar botones activos
    btns.forEach(btn => btn.classList.remove('active'));
    selectedBtn.classList.add('active');
    
    // Actualizar paneles activos
    panes.forEach(pane => {
      pane.classList.remove('active');
      if (pane.id === targetId) {
        pane.classList.add('active');
      }
    });
  }

  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(btn);
    });
  });

  // Por defecto, si ninguno está activo, activar el primero (opcional)
  const anyActive = Array.from(btns).some(btn => btn.classList.contains('active'));
  if (!anyActive && btns.length) {
    switchTab(btns[0]);
  }
});
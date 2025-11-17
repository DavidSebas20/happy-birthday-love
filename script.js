// ==================== FONDOS DE COLORES ====================
const backgroundImages = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
];

// ==================== IMÁGENES/GIFS FLOTANTES ====================
// Imágenes de los gatitos
const floatingImages = [
  "https://i.pinimg.com/originals/fd/35/30/fd3530b992c00cc1556a794a306cef45.gif",
  "https://i.pinimg.com/originals/2e/50/01/2e5001e76859afbf2a045a0c4f3a4107.gif",
  "https://i.pinimg.com/originals/c3/bb/4d/c3bb4d7ea3365dce2df03e17e659d058.gif",
  "https://i.pinimg.com/originals/eb/8d/c1/eb8dc1b0d517739a7adba71983796aa7.gif",
  "https://i.pinimg.com/736x/21/e9/48/21e948740808fac5adc5eaf70260ec8e.jpg",
  "https://i.pinimg.com/originals/01/2a/e7/012ae77a7bf2882ba4e72a0c26243335.gif",
  "https://i.pinimg.com/originals/49/84/ce/4984ce4f416747e312d01273d8756657.gif",
  "https://i.pinimg.com/originals/17/20/35/1720353613d7a0846551ab6aedfc80fb.gif",
  "https://i.pinimg.com/originals/ae/44/53/ae44534c93938ba24cf923e7a5f913c4.gif",
  "https://i.pinimg.com/originals/49/3d/d3/493dd329f4eac0f7c8fd9f6f251b6346.jpg",
  "https://i.pinimg.com/originals/d4/69/33/d46933d5a5ce73ddf4a887d3a62875bd.gif",
  "https://i.pinimg.com/originals/b5/0b/74/b50b748c25d0e8c3041475f1cd535869.gif",
  "https://i.pinimg.com/736x/f0/61/ac/f061acd4587df4695de71d70cc8956ae.jpg",
  "https://i.pinimg.com/originals/03/72/22/037222b77ef49198a6bdfab8080be631.gif",
  "https://i.pinimg.com/originals/49/84/ce/4984ce4f416747e312d01273d8756657.gif",
  "https://i.pinimg.com/originals/91/ab/c2/91abc2a660f0262d410b5f186d52d269.gif",
  "https://i.pinimg.com/originals/27/3d/54/273d546db1d47f4575d4287345b0631c.gif",
  "https://i.pinimg.com/originals/00/88/99/008899fc6341e299e583e36410691631.gif",
];

let currentBackgroundIndex = 0;

// ==================== CAMBIAR FONDO ====================
function changeBackground() {
  const backgrounds = document.querySelectorAll(".background-image");
  const currentBg = backgrounds[0];
  const nextBg = backgrounds[1];

  currentBackgroundIndex =
    (currentBackgroundIndex + 1) % backgroundImages.length;

  nextBg.style.backgroundImage = backgroundImages[currentBackgroundIndex];
  nextBg.classList.add("active");
  currentBg.classList.remove("active");

  setTimeout(() => {
    currentBg.style.backgroundImage = backgroundImages[currentBackgroundIndex];
  }, 2000);
}

// Cambiar fondo cada 5 segundos
setInterval(changeBackground, 5000);

// ==================== CREAR CORAZONES FLOTANTES ====================
function createFloatingHeart() {
  const container = document.getElementById("hearts-container");
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.innerHTML = "❤️";

  // Posición aleatoria horizontal
  heart.style.left = Math.random() * 100 + "%";
  // Posición aleatoria vertical (aparecer en cualquier parte de la pantalla)
  heart.style.top = Math.random() * 100 + "%";
  heart.style.animationDelay = Math.random() * 2 + "s";
  heart.style.fontSize = Math.random() * 20 + 20 + "px";

  container.appendChild(heart);

  // Eliminar después de la animación
  setTimeout(() => {
    heart.remove();
  }, 8000);
}

// Crear corazones cada 800ms
let heartInterval = setInterval(createFloatingHeart, 800);

// ==================== CREAR IMÁGENES FLOTANTES ====================
function createFloatingImage() {
  // Solo crear si hay imágenes configuradas y no son las de ejemplo
  if (floatingImages.length === 0 || floatingImages[0].includes("example")) {
    return;
  }

  const container = document.getElementById("hearts-container");
  const imageContainer = document.createElement("div");
  imageContainer.className = "floating-image";

  // Seleccionar imagen aleatoria
  const randomImage =
    floatingImages[Math.floor(Math.random() * floatingImages.length)];

  const img = document.createElement("img");
  img.src = randomImage;
  img.alt = "Memoria especial";

  imageContainer.appendChild(img);

  // Posición aleatoria horizontal
  imageContainer.style.left = Math.random() * 100 + "%";
  // Posición aleatoria vertical (aparecer en cualquier parte de la pantalla)
  imageContainer.style.top = Math.random() * 100 + "%";
  imageContainer.style.animationDelay = Math.random() * 2 + "s";

  // Tamaño aleatorio (entre 80px y 150px)
  const size = Math.random() * 70 + 80;
  imageContainer.style.width = size + "px";
  imageContainer.style.height = size + "px";

  container.appendChild(imageContainer);

  // Eliminar después de la animación
  setTimeout(() => {
    imageContainer.remove();
  }, 8000);
}

// Crear imágenes cada 3 segundos
let imageInterval = setInterval(createFloatingImage, 3000);

// ==================== MODO GALERÍA ====================
let galleryMode = false;

// Hacer la función global
window.toggleGallery = function () {
  galleryMode = !galleryMode;
  const body = document.body;
  const btn = document.getElementById("toggle-gallery-btn");

  if (galleryMode) {
    // Activar modo galería
    body.classList.add("gallery-mode");
    btn.innerHTML = '<i class="fas fa-arrow-left me-2"></i>Regresar';

    // Aumentar la frecuencia de corazones e imágenes
    clearInterval(heartInterval);
    clearInterval(imageInterval);

    heartInterval = setInterval(createFloatingHeart, 400); // Más corazones
    imageInterval = setInterval(createFloatingImage, 1500); // Más imágenes

    // Crear muchos corazones e imágenes inmediatamente
    for (let i = 0; i < 15; i++) {
      setTimeout(createFloatingHeart, i * 200);
    }
    for (let i = 0; i < 5; i++) {
      setTimeout(createFloatingImage, i * 400);
    }
  } else {
    // Desactivar modo galería
    body.classList.remove("gallery-mode");
    btn.innerHTML = '<i class="fas fa-images me-2"></i>Ver Bebés';

    // Volver a la frecuencia normal
    clearInterval(heartInterval);
    clearInterval(imageInterval);

    heartInterval = setInterval(createFloatingHeart, 800);
    imageInterval = setInterval(createFloatingImage, 3000);
  }
};

// ==================== INICIALIZAR ====================
document.addEventListener("DOMContentLoaded", function () {
  // Establecer el primer fondo
  const firstBg = document.querySelector(".background-image");
  firstBg.style.backgroundImage = backgroundImages[0];

  // Crear algunos corazones iniciales
  for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingHeart, i * 500);
  }

  // Crear algunas imágenes iniciales
  for (let i = 0; i < 2; i++) {
    setTimeout(createFloatingImage, i * 1500);
  }

  // Mostrar contenido principal después de la animación
  setTimeout(() => {
    const animation = document.getElementById("birthday-animation");
    const mainContent = document.getElementById("main-content");

    if (animation) {
      animation.style.display = "none";
    }
    if (mainContent) {
      mainContent.style.display = "block";
      // Agregar animación de entrada a la carta
      const card = document.querySelector(".birthday-card");
      if (card) {
        card.style.animation = "fadeInDown 1s ease-out";
      }
    }
  }, 6000); // 6 segundos para que termine la animación
});

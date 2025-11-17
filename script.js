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
// AGREGA AQUÍ LOS LINKS DE TUS IMÁGENES O GIFS
const floatingImages = [
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXZ4eGRvNzZrYmN3YnZ3Zzd2Yzl6ejZrYmN3Yzd2Yzl6ejZrYmN3YnZ3ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/example1/giphy.gif",
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXZ4eGRvNzZrYmN3YnZ3Zzd2Yzl6ejZrYmN3Yzd2Yzl6ejZrYmN3YnZ3ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/example2/giphy.gif",
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXZ4eGRvNzZrYmN3YnZ3Zzd2Yzl6ejZrYmN3Yzd2Yzl6ejZrYmN3YnZ3ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/example3/giphy.gif",
  // Agrega más URLs de imágenes/GIFs aquí
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

  // Posición aleatoria
  heart.style.left = Math.random() * 100 + "%";
  heart.style.animationDelay = Math.random() * 2 + "s";
  heart.style.fontSize = Math.random() * 20 + 20 + "px";

  container.appendChild(heart);

  // Eliminar después de la animación
  setTimeout(() => {
    heart.remove();
  }, 8000);
}

// Crear corazones cada 800ms
setInterval(createFloatingHeart, 800);

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

  // Posición aleatoria
  imageContainer.style.left = Math.random() * 100 + "%";
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
setInterval(createFloatingImage, 3000);

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
});

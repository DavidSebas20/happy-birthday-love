// ==================== CONFIGURACIÓN DEL QUIZ ====================
// AQUÍ PUEDES AGREGAR TUS PREGUNTAS Y RESPUESTAS
const quizData = {
  question1: {
    question:
      "No soy regalo de caja ni me envuelves en papel, pero soy un momento que saboreas lento. Nos une entre sabores, risas y miradas,bajo una luz tenue, quizá velas encendidas.¿Qué soy?",
    answer: "cena", // respuesta correcta (en minúsculas)
    loveMessage:
      "¡Correcto mi amor! Hoy vamos a cenar en un lugar muy bonito 💕",
  },
  question2: {
    question:
      "Soy arte y ciencia, aunque no pinto ni observo el cielo, mi lienzo es una cavidad, oscuro y pequeño. Vivo entre piezas alineadas en arco, y con pulso firme, devuelvo brillo a lo opaco. Conozco raíces que no crecen en tierra, y batallo contra enemigos silenciosos que desgarran. No soy botánica ni arquitectura en sí, pero estudio estructuras que sostienen una sonrisa al fin. ¿Qué soy?",
    answer: "odontología", // respuesta correcta (en minúsculas)
    loveMessage:
      "¡Exacto mi vida! Sigue estudiando porfavor aqui tienes la página web que transcribe tus audios  ❤️",
  },
  question3: {
    question:
      "No soy libro, pero me lees como si lo fuera. No soy espejo, pero reflejo tu mundo en mi cara. No tengo plumas, pero capturo ideas en un toque. Soy más ligera que un universo de conocimiento, y más silenciosa que un secreto bien guardado. Doy luz sin quemar, respuestas sin preguntar, y a través de mí, navegas mares sin mojarte. ¿Quién soy?",
    answer: "tablet", // respuesta correcta (en minúsculas)
    loveMessage:
      "¡Sí mi amor! Espero que te ayude muchisimo en la Universidad 💖",
  },
};

let currentQuestion = 1;

// ==================== INICIALIZAR ====================
document.addEventListener("DOMContentLoaded", function () {
  // Cargar la primera pregunta
  loadQuestion(1);
  updateProgress();

  // Agregar evento Enter a los inputs
  document.querySelectorAll(".answer-input").forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const questionNum = parseInt(this.id.split("-")[1]);
        checkAnswer(questionNum);
      }
    });
  });
});

// ==================== CARGAR PREGUNTA ====================
function loadQuestion(questionNum) {
  const questionData = quizData[`question${questionNum}`];
  const questionText = document.getElementById(`question-${questionNum}-text`);

  if (questionText && questionData) {
    questionText.textContent = questionData.question;
  }
}

// ==================== VERIFICAR RESPUESTA ====================
function checkAnswer(questionNum) {
  const input = document.getElementById(`answer-${questionNum}`);
  const feedback = document.getElementById(`feedback-${questionNum}`);
  const userAnswer = input.value.trim().toLowerCase();
  const correctAnswer = quizData[`question${questionNum}`].answer.toLowerCase();
  const loveMessage = quizData[`question${questionNum}`].loveMessage;

  // Limpiar feedback previo
  feedback.className = "feedback-message";
  feedback.innerHTML = "";

  if (userAnswer === "") {
    feedback.classList.add("error", "show");
    feedback.innerHTML =
      '<i class="fas fa-exclamation-circle me-2"></i>Por favor escribe una respuesta';
    return;
  }

  if (userAnswer === correctAnswer) {
    // Respuesta correcta
    feedback.classList.add("success", "show");
    feedback.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            <strong>¡Correcto!</strong>
            <div class="love-message mt-2">${loveMessage}</div>
        `;

    // Deshabilitar input y botón
    input.disabled = true;
    const button = input.nextElementSibling;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-check me-2"></i>Completado';

    // Avanzar a la siguiente pregunta
    if (questionNum < 3) {
      setTimeout(() => {
        showNextQuestion(questionNum);
      }, 2000);
    } else {
      // Última pregunta completada
      setTimeout(() => {
        showFinalMessage();
      }, 2000);
    }
  } else {
    // Respuesta incorrecta
    feedback.classList.add("error", "show");
    feedback.innerHTML =
      '<i class="fas fa-times-circle me-2"></i>Intenta de nuevo mi amor, sé que puedes ❤️';
    input.value = "";
    input.focus();
  }
}

// ==================== MOSTRAR SIGUIENTE PREGUNTA ====================
function showNextQuestion(currentNum) {
  const nextNum = currentNum + 1;
  const nextQuestion = document.getElementById(`question-${nextNum}`);

  if (nextQuestion) {
    nextQuestion.classList.remove("d-none");
    loadQuestion(nextNum);
    currentQuestion = nextNum;
    updateProgress();

    // Scroll suave a la siguiente pregunta
    nextQuestion.scrollIntoView({ behavior: "smooth", block: "center" });

    // Enfocar el input
    setTimeout(() => {
      document.getElementById(`answer-${nextNum}`).focus();
    }, 500);
  }
}

// ==================== MOSTRAR MENSAJE FINAL ====================
function showFinalMessage() {
  // Ocultar todas las preguntas
  document.querySelectorAll(".question-section").forEach((section) => {
    section.classList.add("d-none");
  });

  // Mostrar mensaje final
  const finalMessage = document.getElementById("final-message");
  finalMessage.classList.remove("d-none");

  // Actualizar progreso al 100%
  updateProgress(true);

  // Scroll al mensaje final
  finalMessage.scrollIntoView({ behavior: "smooth", block: "center" });

  // Crear confeti de corazones
  createConfetti();
}

// ==================== ACTUALIZAR PROGRESO ====================
function updateProgress(complete = false) {
  const progressBar = document.getElementById("progress-bar");
  const currentQuestionSpan = document.getElementById("current-question");

  if (complete) {
    progressBar.style.width = "100%";
    progressBar.setAttribute("aria-valuenow", "100");
    currentQuestionSpan.textContent = "3";
  } else {
    const progress = (currentQuestion / 3) * 100;
    progressBar.style.width = progress + "%";
    progressBar.setAttribute("aria-valuenow", progress);
    currentQuestionSpan.textContent = currentQuestion;
  }
}

// ==================== CONFETI DE CORAZONES ====================
function createConfetti() {
  const container = document.getElementById("hearts-container");

  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.innerHTML = ["❤️", "💕", "💖", "💗", "💝"][
        Math.floor(Math.random() * 5)
      ];

      heart.style.left = Math.random() * 100 + "%";
      heart.style.animationDelay = "0s";
      heart.style.fontSize = Math.random() * 30 + 25 + "px";

      container.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 8000);
    }, i * 100);
  }
}

// ==================== EFECTOS VISUALES ====================
// Fondos de colores
const backgroundImages = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
];

// IMÁGENES/GIFS FLOTANTES - Usa los mismos que en script.js
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

setInterval(changeBackground, 5000);

function createFloatingHeart() {
  const container = document.getElementById("hearts-container");
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.innerHTML = "❤️";

  heart.style.left = Math.random() * 100 + "%";
  heart.style.top = Math.random() * 100 + "%";
  heart.style.animationDelay = Math.random() * 2 + "s";
  heart.style.fontSize = Math.random() * 20 + 20 + "px";

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

setInterval(createFloatingHeart, 800);

function createFloatingImage() {
  if (floatingImages.length === 0 || floatingImages[0].includes("example")) {
    return;
  }

  const container = document.getElementById("hearts-container");
  const imageContainer = document.createElement("div");
  imageContainer.className = "floating-image";

  const randomImage =
    floatingImages[Math.floor(Math.random() * floatingImages.length)];

  const img = document.createElement("img");
  img.src = randomImage;
  img.alt = "Memoria especial";

  imageContainer.appendChild(img);

  imageContainer.style.left = Math.random() * 100 + "%";
  imageContainer.style.top = Math.random() * 100 + "%";
  imageContainer.style.animationDelay = Math.random() * 2 + "s";

  const size = Math.random() * 70 + 80;
  imageContainer.style.width = size + "px";
  imageContainer.style.height = size + "px";

  container.appendChild(imageContainer);

  setTimeout(() => {
    imageContainer.remove();
  }, 8000);
}

setInterval(createFloatingImage, 3000);

// ==================== MODO GALERÍA ====================
let galleryMode = false;
let heartInterval = setInterval(createFloatingHeart, 800);
let imageInterval = setInterval(createFloatingImage, 3000);

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

// Inicializar efectos visuales
const firstBg = document.querySelector(".background-image");
if (firstBg) {
  firstBg.style.backgroundImage = backgroundImages[0];
}

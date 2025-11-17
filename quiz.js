// ==================== CONFIGURACIÓN DEL QUIZ ====================
// AQUÍ PUEDES AGREGAR TUS PREGUNTAS Y RESPUESTAS
const quizData = {
  question1: {
    question: "Pregunta de ejemplo 1: ¿Cuál es tu color favorito?",
    answer: "rosa", // respuesta correcta (en minúsculas)
    loveMessage:
      "¡Correcto mi amor! Como el rosa de tus mejillas cuando te sonrojas 💕",
  },
  question2: {
    question: "Pregunta de ejemplo 2: ¿En qué mes nos conocimos?",
    answer: "enero", // respuesta correcta (en minúsculas)
    loveMessage: "¡Exacto mi vida! El mejor mes de mi vida porque te conocí ❤️",
  },
  question3: {
    question: "Pregunta de ejemplo 3: ¿Cuánto te amo?",
    answer: "infinito", // respuesta correcta (en minúsculas)
    loveMessage: "¡Sí mi amor! Te amo hasta el infinito y más allá 💖",
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
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXZ4eGRvNzZrYmN3YnZ3Zzd2Yzl6ejZrYmN3Yzd2Yzl6ejZrYmN3YnZ3ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/example1/giphy.gif",
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXZ4eGRvNzZrYmN3YnZ3Zzd2Yzl6ejZrYmN3Yzd2Yzl6ejZrYmN3YnZ3ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/example2/giphy.gif",
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXZ4eGRvNzZrYmN3YnZ3Zzd2Yzl6ejZrYmN3Yzd2Yzl6ejZrYmN3YnZ3ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/example3/giphy.gif",
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

// Inicializar efectos visuales
const firstBg = document.querySelector(".background-image");
if (firstBg) {
  firstBg.style.backgroundImage = backgroundImages[0];
}

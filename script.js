const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent =
    document.body.classList.contains("light") ? "🌙" : "☀️";
});

// Form validation
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    formMessage.style.color = "red";
    formMessage.textContent = "Please fill all fields!";
  } else {
    formMessage.style.color = "green";
    formMessage.textContent = "Message sent successfully!";
    form.reset();
  }
});
/* ================= TYPING EFFECT ================= */

const textArray = ["Frontend Developer", "UI/UX Enthusiast", "JavaScript Lover"];
const typingElement = document.querySelector(".typing");

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = textArray[textIndex];
  
  if (!isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex++);
    if (charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  } else {
    typingElement.textContent = currentText.substring(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

/* ================= SCROLL REVEAL ================= */

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;

  reveals.forEach(reveal => {
    const elementTop = reveal.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      reveal.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

/* ================= MODAL ================= */

function openModal(title, description) {
  const modal = document.getElementById("projectModal");
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalDescription").textContent = description;

  // Get buttons from clicked card
  const buttons = event.currentTarget.querySelectorAll(".project-buttons a");
  const modalButtons = document.getElementById("modalButtons");
  modalButtons.innerHTML = "";
  buttons.forEach(btn => {
    const newBtn = document.createElement("a");
    newBtn.href = btn.href;
    newBtn.target = "_blank";
    newBtn.className = "btn small";
    newBtn.textContent = btn.textContent;
    modalButtons.appendChild(newBtn);
  });

  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("projectModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
/* ================= PAGE LOADER ================= */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.opacity = "0";
  setTimeout(() => loader.style.display = "none", 800);
});

/* ================= CURSOR GLOW ================= */

const glow = document.createElement("div");
glow.classList.add("cursor-glow");
document.body.appendChild(glow);

document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* ================= 3D TILT ================= */

const cards = document.querySelectorAll(".tilt-card");

cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 20;
    const rotateY = ((x / rect.width) - 0.5) * -20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});

/* ================= PARTICLE BACKGROUND ================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});
/* ================= ANIMATED MODAL ================= */
function openModal(title, description, githubStars=0) {
  const modal = document.getElementById("projectModal");
  const modalContent = modal.querySelector(".modal-content");

  document.getElementById("modalTitle").textContent = title;

  const modalDescription = document.getElementById("modalDescription");
  modalDescription.textContent = "";
  modalDescription.classList.add("typing");

  // Typing effect in modal
  let charIndex = 0;
  function typeText() {
    if (charIndex <= description.length) {
      modalDescription.textContent = description.substring(0, charIndex++);
      requestAnimationFrame(typeText);
    } else {
      // Append GitHub stars after typing
      if (githubStars) {
        const starText = ` ⭐ ${githubStars} Stars`;
        modalDescription.textContent += starText;
      }
    }
  }
  typeText();

  // Get buttons from clicked card
  const buttons = event.currentTarget.querySelectorAll(".project-buttons a");
  const modalButtons = document.getElementById("modalButtons");
  modalButtons.innerHTML = "";
  buttons.forEach(btn => {
    const newBtn = document.createElement("a");
    newBtn.href = btn.href;
    newBtn.target = "_blank";
    newBtn.className = "btn small";
    newBtn.textContent = btn.textContent;
    modalButtons.appendChild(newBtn);
  });

  modal.style.display = "flex";
  modal.classList.add("show");
}

function closeModal() {
  const modal = document.getElementById("projectModal");
  modal.classList.remove("show");
  setTimeout(() => modal.style.display = "none", 400);
}

window.onclick = function(event) {
  const modal = document.getElementById("projectModal");
  if (event.target === modal) {
    closeModal();
  }
}

/* ================= PARTICLE HOVER ON PROJECT CARDS ================= */
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {
  const canvas = document.createElement("canvas");
  card.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  canvas.width = card.offsetWidth;
  canvas.height = card.offsetHeight;

  const particles = [];
  for(let i=0;i<50;i++){
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      size: Math.random()*2+1,
      speedX: (Math.random()-0.5)*0.5,
      speedY: (Math.random()-0.5)*0.5
    });
  }

  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      p.x+=p.speedX;
      p.y+=p.speedY;
      if(p.x<0||p.x>canvas.width)p.speedX*=-1;
      if(p.y<0||p.y>canvas.height)p.speedY*=-1;
      ctx.fillStyle="rgba(255,255,255,0.7)";
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();

  card.addEventListener("mouseenter",()=>canvas.style.opacity="1");
  card.addEventListener("mouseleave",()=>canvas.style.opacity="0");
  canvas.style.transition="0.4s";
  canvas.style.opacity="0";
});
/* ================= SCROLL-TO-TOP BUTTON ================= */

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* ================= FOOTER PARTICLE BACKGROUND ================= */

const footerCanvas = document.getElementById("footerParticles");
const fCtx = footerCanvas.getContext("2d");

function resizeFooterCanvas() {
  footerCanvas.width = footerCanvas.offsetWidth;
  footerCanvas.height = footerCanvas.offsetHeight;
}
resizeFooterCanvas();
window.addEventListener("resize", resizeFooterCanvas);

const fParticles = [];
for (let i = 0; i < 80; i++) {
  fParticles.push({
    x: Math.random() * footerCanvas.width,
    y: Math.random() * footerCanvas.height,
    size: Math.random() * 3 + 1,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.3,
    color: `hsla(${Math.random()*360}, 80%, 60%, 0.5)`
  });
}

function animateFooterParticles() {
  fCtx.clearRect(0, 0, footerCanvas.width, footerCanvas.height);

  fParticles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > footerCanvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > footerCanvas.height) p.speedY *= -1;

    fCtx.fillStyle = p.color;
    fCtx.beginPath();
    fCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    fCtx.fill();
  });

  requestAnimationFrame(animateFooterParticles);
}


animateFooterParticles();
document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();
  const status = document.getElementById("formStatus");
  status.textContent = "Sending...";

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  emailjs.send("service_c3ghh95","template_raqqjjt",{
    from_name: name,
    from_email: email,
    message: message
  },"WSD3u1PyxuZvNQKVS")
  .then(function(response){
    status.style.color = "#4BB543";
    status.textContent = "Message sent successfully!";
    document.getElementById("contactForm").reset();
  }, function(error){
    status.style.color = "#FF4C4C";
    status.textContent = "Oops! Something went wrong.";
  });
});

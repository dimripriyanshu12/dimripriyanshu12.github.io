// Typing Effect
const text = ["Frontend Developer", "Web Designer", "JavaScript Enthusiast"];
let index = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing");

function type(){
  if(charIndex < text[index].length){
    typingElement.textContent += text[index].charAt(charIndex);
    charIndex++;
    setTimeout(type,100);
  }else{
    setTimeout(erase,1500);
  }
}

function erase(){
  if(charIndex > 0){
    typingElement.textContent = text[index].substring(0,charIndex-1);
    charIndex--;
    setTimeout(erase,50);
  }else{
    index = (index+1)%text.length;
    setTimeout(type,500);
  }
}

document.addEventListener("DOMContentLoaded",type);

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click",()=>{
  document.body.classList.toggle("dark-mode");
});
// COUNTER ANIMATION
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / 100;

    if(count < target){
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});

// MODAL
function openModal(){
  document.getElementById("projectModal").style.display = "flex";
}

function closeModal(){
  document.getElementById("projectModal").style.display = "none";
}

// LOADER
window.addEventListener("load",()=>{
  document.getElementById("loader").style.display="none";
});
// SCROLL REVEAL
ScrollReveal().reveal('.hero-content', {
  delay:200,
  origin:'left',
  distance:'50px',
  duration:1000
});

ScrollReveal().reveal('.hero-img', {
  delay:400,
  origin:'right',
  distance:'50px',
  duration:1000
});

ScrollReveal().reveal('.skill', {
  interval:200,
  scale:0.8
});

ScrollReveal().reveal('.project-card', {
  delay:300,
  origin:'bottom',
  distance:'40px'
});
particlesJS("particles-js", {
  particles:{
    number:{ value:80 },
    size:{ value:3 },
    color:{ value:"#00c6ff" },
    line_linked:{
      enable:true,
      distance:150,
      color:"#00c6ff",
      opacity:0.4
    },
    move:{ enable:true, speed:2 }
  }
});
// EMAILJS INIT
(function(){
  emailjs.init("WSD3u1PyxuZvNQKVS");
})();

document.getElementById("contact-form")
.addEventListener("submit", function(e){
  e.preventDefault();

  emailjs.sendForm(
    "service_c3ghh95",
    "template_hybmu9s",
    this
  ).then(()=>{
    alert("Message Sent Successfully!");
    this.reset();
  }, (error)=>{
    alert("Failed to send message.");
  });
});
// HAMBURGER TOGGLE
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("open");
});
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});
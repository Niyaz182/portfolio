// ================= Typing Effect =================
const roles = [
    "Android Developer",
    "AI / ML Enthusiast",
    "Full-Stack Developer",
    "Software Engineer"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect() {
    const current = roles[roleIndex];
    if (!deleting) {
        typing.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typing.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) {
            deleting = false;
            roleIndex++;
            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }
        }
    }
    setTimeout(typeEffect, deleting ? 60 : 120);
}

typeEffect();

// ================= Sticky Header (Fixed for Light Mode) =================
const header = document.querySelector(".header");

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        // We use a CSS class instead of inline styles so Light Mode can override it easily
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// ================= Scroll To Top =================
const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        scrollBtn.style.display = "block";
    }
    else {
        scrollBtn.style.display = "none";
    }
});

scrollBtn.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// ================= Fade Animation =================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
});

document.querySelectorAll(".fade-up").forEach(el => {
    observer.observe(el);
});

// ================= Mobile Menu =================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// ================= Dark / Light Mode =================
const themeBtn = document.getElementById("theme-toggle");
const body = document.body;

// Check local storage for theme preference on load
if (localStorage.getItem("theme") === "light") {
    body.classList.add("light");
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

themeBtn.addEventListener("click", () => {
    body.classList.toggle("light");

    if (body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem("theme", "dark");
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// ================= Form Submission Handling =================
const form = document.getElementById('portfolioForm');
const responseDiv = document.getElementById('formResponse');
const submitBtn = document.getElementById('submitBtn');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop the page from refreshing
        
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        responseDiv.textContent = "";

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let res = await response.json();
            if (response.status == 200) {
                responseDiv.style.color = "#10b981"; // Green text
                responseDiv.textContent = "Message sent successfully!";
                form.reset(); // Clear the form fields
            } else {
                console.log(response);
                responseDiv.style.color = "#ef4444"; // Red text
                responseDiv.textContent = res.message;
            }
        })
        .catch(error => {
            console.log(error);
            responseDiv.style.color = "#ef4444";
            responseDiv.textContent = "Something went wrong. Please try again.";
        })
        .then(function() {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
        });
    });
}
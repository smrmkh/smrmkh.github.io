const navToggler = document.querySelector(".nav-toggler");
const navOutside = document.querySelector(".mobile-nav-outside");
const topNav = document.querySelector(".top-nav");
navToggler.addEventListener("click", function () {
	topNav.classList.toggle("open");
});
navOutside.addEventListener("click", function () {
	topNav.classList.toggle("open");
});

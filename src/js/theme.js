window.onload = function () {
	siteHeader();
};
document.addEventListener("scroll", function () {
	siteHeader();
});
function siteHeader() {
	if (window.scrollY > 99) {
		document.getElementById("site-header").classList.remove("bg-opacity-20");
	} else {
		document.getElementById("site-header").classList.add("bg-opacity-20");
	}
}
// site menu
const openSiteMenu = document.getElementById("open-site-menu");
const siteMenu = document.getElementById("site-menu");
const menuOverlay = document.getElementById("menu-overlay");
openSiteMenu.addEventListener("click", function () {
	siteMenu.classList.toggle("-translate-x-full");
	openSiteMenu.classList.toggle("opened");
	menuOverlay.classList.toggle("hidden");
	menuOverlay.classList.toggle("opacity-0");
	menuOverlay.classList.toggle("block");
	menuOverlay.classList.toggle("opacity-30");
	if (document.body.style.overflow === "hidden") {
		document.body.style.overflow = null;
	} else {
		document.body.style.overflow = "hidden";
	}
});
menuOverlay.addEventListener("click", function () {
	siteMenu.classList.add("-translate-x-full");
	openSiteMenu.classList.remove("opened");
	menuOverlay.classList.add("hidden", "opacity-0");
	menuOverlay.classList.remove("block", "opacity-30");
	document.body.style.overflow = null;
});
//menu item
const menuItems = document.querySelectorAll(".menu-item");
const menuItemOverlay = document.getElementById("menu-item-overlay");
for (let menuItem = 0; menuItem < menuItems.length; menuItem++) {
	menuItems[menuItem].addEventListener("click", function () {
		for (let menuItem = 0; menuItem < menuItems.length; menuItem++) {
			const elm = menuItems[menuItem];
			elm.addEventListener("click", function () {
				if (!elm.classList.contains("active")) {
					document.body.style.overflow = "hidden";
					elm.classList.add("active");
					menuItemOverlay.classList.add("active");
					setTimeout(function () {
						let elmHeight = elm.offsetHeight;
						let elmOffsetTop = elm.offsetTop;
						let screenHeight = screen.height;
						let scrollY = window.scrollY;
						let newLocation =
							(screenHeight - elmHeight) / 2 + scrollY - elmOffsetTop;
						elm.style.marginTop = newLocation + "px";
						elm.style.marginBottom = -newLocation + 32 + "px";
					}, 250);
				}
			});
		}
		this.classList.toggle("open");
	});
}
menuItemOverlay.addEventListener("click", function () {
	let aelm = document.querySelector(".menu-item.active");
	aelm.style.marginTop = null;
	aelm.style.marginBottom = null;
	menuItemOverlay.classList.remove("active");
	setTimeout(function () {
		aelm.classList.remove("active");
	}, 250);
	setTimeout(function () {
		document.body.style.overflow = null;
	}, 500);
});
// scrollspy
window.onload = function () {
	scrollSpy("#menu-categories", {
		sectionClass: ".scrollspy",
		activeClass: "active",
		menuActiveTarget: ".menu-category",
		// smooth scroll
		smoothScroll: true,
	});
};
const menuFilterInput = document.getElementById("menu-filter-input");
menuFilterInput.addEventListener("keyup", filterMenuItem);
function filterMenuItem() {
	let value = menuFilterInput.value.toUpperCase();
	console.log(value);
	let menuItems = document.querySelectorAll(".menu-item");
	for (let item = 0; item < menuItems.length; item++) {
		const elm = menuItems[item];
		let elmValueTag = elm.querySelector(".menu-item-title");
		let elmValue = elmValueTag.textContent || elmValueTag.innerHtml;
		if (elmValue.toUpperCase().indexOf(value) > -1) {
			elm.style.display = null;
		} else {
			elm.style.display = "none";
		}
	}
}

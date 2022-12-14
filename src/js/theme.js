// preloader
window.addEventListener("DOMContentLoaded", preloader);
function preloader() {
	const preloader = document.getElementById("preloader");
	setTimeout(() => {
		preloader.querySelector("div").remove();
		preloader.querySelector("p").remove();
		preloader.classList.add("opacity-0");
	}, 200);
	setTimeout(() => {
		preloader.remove();
	}, 500);
}
// site menu
if (window.innerWidth < laptopWidth) {
	const openSiteMenu = document.getElementById("open-site-menu");
	const siteMenu = document.getElementById("site-menu");
	const menuOverlay = document.getElementById("site-menu-overlay");
	openSiteMenu.addEventListener("click", toggleMenu);
	menuOverlay.addEventListener("click", hideMenu);
	function toggleMenu() {
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
	}
	function hideMenu() {
		siteMenu.classList.add("-translate-x-full");
		openSiteMenu.classList.remove("opened");
		menuOverlay.classList.add("hidden", "opacity-0");
		menuOverlay.classList.remove("block", "opacity-30");
		document.body.style.overflow = null;
	}
} else {
	document.getElementById("open-site-menu").remove();
}
// site menu hover effect on desktop
if (window.innerWidth >= laptopWidth) {
	const siteMenu = document.getElementById("site-menu");
	let currenPage = document.querySelector("#site-menu li.current-menu-item");
	indicatorPosition(currenPage);
	siteMenu.addEventListener("mouseout", () => {
		indicatorPosition(currenPage);
	});
	const items = siteMenu.getElementsByTagName("li");
	for (let i = 0; i < items.length; i++) {
		const elm = items[i];
		elm.addEventListener("mouseover", () => {
			siteMenu.getElementsByClassName("current-menu-item")[0];
			indicatorPosition(elm);
		});
	}
	function indicatorPosition(elm) {
		let currentItem = elm;
		const indicator = document.getElementById("site-menu-indicator");
		indicator.style.transform =
			"translateX(" + (currentItem.offsetLeft + 8) + "px)";
		indicator.style.width = currentItem.offsetWidth - 16 + "px";
	}
}
// sticky site header
if (window.innerWidth < laptopWidth) {
	window.addEventListener("load", stickySiteHeader);
	window.addEventListener("scroll", stickySiteHeader);
	const siteHeader = document.getElementById("site-header");
	const FMCategoriesParent = document.getElementById("FM-categories-parent");
	let lastScrollPosition = 0;
	function stickySiteHeader() {
		if (lastScrollPosition < window.scrollY) {
			siteHeader.classList.add("-top-16");
			siteHeader.classList.remove("top-0");
			FMCategoriesParent.classList.add("top-0");
			FMCategoriesParent.classList.remove("top-16");
		} else {
			siteHeader.classList.add("top-0");
			siteHeader.classList.remove("-top-16");
			FMCategoriesParent.classList.add("top-16");
			FMCategoriesParent.classList.remove("top-0");
		}
		lastScrollPosition = window.scrollY;
	}
}
//food menu (FM)
//food menu lightbox
//food menu lightbox on mobile
if (window.innerWidth < laptopWidth) {
	function FMItemOpen(elm) {
		document.body.style.overflow = "hidden";
		elm.classList.add("active");
		const elmImage = elm.querySelector(".FM-image");
		elmImage.removeAttribute("srcset");
		elmImage.removeAttribute("sizes");
		FMOverlay.classList.add("active");
		setTimeout(function () {
			let elmHeight = elm.offsetHeight;
			let elmWidth = elm.offsetWidth;
			let elmOffsetTop = elm.getBoundingClientRect().top;
			let elmOffsetLeft = elm.getBoundingClientRect().left;
			let screenHeight = window.innerHeight;
			let screenWidth = window.innerWidth;
			let XLocation = (screenWidth - elmWidth) / 2 - elmOffsetLeft;
			let yLocation = (screenHeight - elmHeight) / 2 - elmOffsetTop;
			elm.style.transform =
				"translateY(" + yLocation + "px) translateX(" + XLocation + "px)";
		}, 250);
	}
	function FMItemclose() {
		let elm = document.querySelector(".FM-item.active");
		elm.style.transform = null;
		FMOverlay.classList.remove("active");
		elm.classList.remove("active");
		setTimeout(function () {
			document.body.style.overflow = null;
		}, 500);
	}
	const FMItems = document.querySelectorAll(".FM-item");
	const FMOverlay = document.getElementById("FM-overlay");
	for (let FMItem = 0; FMItem < FMItems.length; FMItem++) {
		const elm = FMItems[FMItem];
		elm.addEventListener("click", () => {
			if (!elm.classList.contains("active")) {
				FMItemOpen(elm);
			}
		});
	}
	FMOverlay.addEventListener("click", FMItemclose);
}
//food menu lightbox desktop
else {
	function escapeKeyPressed(e) {
		let key = e.key;
		if (key === "Escape") {
			FMItemclose();
		}
	}
	function FMItemOpen(elm) {
		elm.classList.add("active");
		FMOverlay.classList.add("active");
		let elmHeight = elm.offsetHeight;
		let elmWidth = elm.offsetWidth;
		let elmOffsetTop = elm.getBoundingClientRect().top;
		let elmOffsetLeft = elm.getBoundingClientRect().left;
		let screenHeight = window.innerHeight;
		let screenWidth = window.innerWidth;
		let XLocation = (screenWidth - elmWidth) / 2 - elmOffsetLeft;
		let yLocation = (screenHeight - elmHeight) / 2 - elmOffsetTop;
		elm.style.transform =
			"translateY(" +
			yLocation +
			"px) translateX(" +
			XLocation +
			"px) scale(1.4)";
		document.addEventListener("keydown", escapeKeyPressed);
	}
	function FMItemclose() {
		let elm = document.querySelector(".FM-image.active");
		elm.style.transform = null;
		FMOverlay.classList.remove("active");
		elm.classList.remove("active");
		document.removeEventListener("keydown", escapeKeyPressed);
	}
	const FMItems = document.querySelectorAll(".FM-image");
	const FMOverlay = document.getElementById("FM-overlay");
	for (let FMItem = 0; FMItem < FMItems.length; FMItem++) {
		const elm = FMItems[FMItem];
		elm.addEventListener("click", () => {
			if (!elm.classList.contains("active")) {
				FMItemOpen(elm);
			} else {
				FMItemclose();
			}
		});
	}
	FMOverlay.addEventListener("click", FMItemclose);
}
//food menu filter
if (window.innerWidth >= laptopWidth) {
	document.getElementById("FM-filter-input").remove();
	document.getElementById("FM-filter-input-md").id = "FM-filter-input";
} else {
	document.getElementById("FM-filter-input-md").remove();
}
const FMFilterInput = document.getElementById("FM-filter-input");
FMFilterInput.addEventListener("keyup", FMFilterItem);
function FMFilterItem() {
	let value = FMFilterInput.value.toUpperCase();
	let FMItems = document.querySelectorAll(".FM-item");
	for (let item = 0; item < FMItems.length; item++) {
		const elm = FMItems[item];
		let elmValueTag = elm.querySelector(".FM-title");
		let elmValue = elmValueTag.textContent || elmValueTag.innerHtml;
		if (elmValue.toUpperCase().indexOf(value) > -1) {
			elm.classList.remove("hidden");
		} else {
			elm.classList.add("hidden");
		}
	}
}
// prevent default a with # href
document.querySelector('a[href="#"]').addEventListener("click", (e) => {
	e.preventDefault();
});

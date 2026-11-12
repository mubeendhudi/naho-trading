const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Smooth anchor scrolling ---------- */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
	link.addEventListener("click", (event) => {
		const targetId = link.getAttribute("href");
		if (!targetId || targetId === "#") return;

		const target = document.querySelector(targetId);
		if (!target) return;

		event.preventDefault();
		target.scrollIntoView({
			behavior: prefersReducedMotion ? "auto" : "smooth",
			block: "start"
		});
	});
});

/* ---------- Header elevation on scroll ---------- */
const header = document.querySelector("header");

if (header) {
	const updateHeader = () => header.classList.toggle("isScrolled", window.scrollY > 12);
	updateHeader();
	window.addEventListener("scroll", updateHeader, { passive: true });
}

/* ---------- Mobile menu ---------- */
const menuToggle = document.querySelector(".menuToggle");
const mobileNav = document.querySelector(".mobileNav");

if (menuToggle && mobileNav) {
	const setMenu = (isOpen) => {
		mobileNav.classList.toggle("isOpen", isOpen);
		menuToggle.setAttribute("aria-expanded", String(isOpen));
		menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
		mobileNav.setAttribute("aria-hidden", String(!isOpen));
		menuToggle.innerHTML = isOpen
			? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
			: '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
	};

	menuToggle.addEventListener("click", () => {
		setMenu(!mobileNav.classList.contains("isOpen"));
	});

	mobileNav.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", () => setMenu(false));
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && mobileNav.classList.contains("isOpen")) {
			setMenu(false);
			menuToggle.focus();
		}
	});

	document.addEventListener("click", (event) => {
		if (mobileNav.classList.contains("isOpen") && !header.contains(event.target)) {
			setMenu(false);
		}
	});

	window.matchMedia("(min-width: 961px)").addEventListener("change", (event) => {
		if (event.matches) setMenu(false);
	});
}

/* ---------- Scroll reveal ---------- */
if (!prefersReducedMotion && "IntersectionObserver" in window) {
	const groups = [
		".aboutHeading > *",
		".aboutCopy p",
		".whyImageWrap",
		".whyContent > *",
		".gradesSection .sectionIntro",
		".gradeCard",
		".differenceHeading > *",
		".featureShowcase",
		".statsGrid > div",
		".processIntro > *",
		".processGrid article",
		".contactCopy",
		".contactForm",
		".footerInner > *"
	];

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.classList.add("isVisible");
				observer.unobserve(entry.target);
			});
		},
		{ rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
	);

	groups.forEach((selector) => {
		document.querySelectorAll(selector).forEach((element, index) => {
			element.classList.add("reveal");
			element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
			observer.observe(element);
		});
	});
}

/* ---------- Feature showcase slider ---------- */
const showcase = document.querySelector(".featureShowcase");

if (showcase) {
	const slides = [
		{
			image: "assets/images/feature1.jpg",
			alt: "Flexible sourcing capabilities",
			title: "Flexible Sourcing Capabilities",
			summary: "Highly Flexible Sourcing Capabilities Designed to Match Custom Requirements",
			description: "A steel mill re-rolling plates needs something different from a copper smelter chasing non-ferrous recovery. A buyer sourcing a one-off spot cargo has different priorities from a partner seeking a 12-month supply arrangement. Naho Trading is built to serve them all."
		},
		{
			image: "assets/images/feature3.jpg",
			alt: "Consistent quality",
			title: "Consistent Quality",
			summary: "Quality Verified Before Every Shipment",
			description: "Every shipment is carefully checked and prepared to meet the standards your operation depends on. Quality is verified before loading, not assumed after delivery."
		},
		{
			image: "assets/images/feature5.jpg",
			alt: "Reliable global network",
			title: "Reliable Global Network",
			summary: "Trusted Supply Relationships Across International Markets",
			description: "Our supplier network gives you dependable access to the grades you need, with clear communication from the first enquiry through to final delivery."
		},
		{
			image: "assets/images/feature6.jpg",
			alt: "Clear communication",
			title: "Clear Communication",
			summary: "Transparent Support At Every Step",
			description: "From specification and documentation to inspection and shipment, our team keeps the process simple, visible, and easy to manage."
		}
	];

	// Preload slide images so transitions don't flash
	slides.forEach((slide) => {
		const preload = new Image();
		preload.src = slide.image;
	});

	const image = showcase.querySelector(".showcaseImageItem");
	const title = showcase.querySelector(".showcaseTitle");
	const summary = showcase.querySelector(".showcaseSummary");
	const description = showcase.querySelector(".showcaseDescription");
	const progress = showcase.querySelectorAll(".showcaseProgress span");
	const previous = showcase.querySelector(".showcasePrevious");
	const next = showcase.querySelector(".showcaseNext");
	let currentSlide = 0;
	let timer;

	const renderSlide = (index) => {
		currentSlide = (index + slides.length) % slides.length;
		const slide = slides[currentSlide];
		showcase.classList.add("isChanging");

		window.setTimeout(() => {
			image.src = slide.image;
			image.alt = slide.alt;
			title.textContent = slide.title;
			summary.textContent = slide.summary;
			description.textContent = slide.description;
			progress.forEach((item, itemIndex) => item.classList.toggle("active", itemIndex === currentSlide));
			showcase.classList.remove("isChanging");
		}, 280);
	};

	const stopTimer = () => window.clearInterval(timer);
	const restartTimer = () => {
		stopTimer();
		if (prefersReducedMotion) return;
		timer = window.setInterval(() => renderSlide(currentSlide + 1), 9000);
	};

	previous.addEventListener("click", () => {
		renderSlide(currentSlide - 1);
		restartTimer();
	});

	next.addEventListener("click", () => {
		renderSlide(currentSlide + 1);
		restartTimer();
	});

	showcase.addEventListener("mouseenter", stopTimer);
	showcase.addEventListener("mouseleave", restartTimer);
	showcase.addEventListener("focusin", stopTimer);
	showcase.addEventListener("focusout", restartTimer);
	restartTimer();
}

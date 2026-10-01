document.querySelectorAll('a[href^="#"]').forEach((link) => {
	link.addEventListener('click', (event) => {
		const targetId = link.getAttribute('href');
		if (!targetId || targetId === '#') return;

		const target = document.querySelector(targetId);
		if (!target) return;

		event.preventDefault();
		target.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	});
});

const menuToggle = document.querySelector(".menuToggle");
const mobileNav = document.querySelector(".mobileNav");

if (menuToggle && mobileNav) {
	const closeMenu = () => {
		mobileNav.classList.remove("isOpen");
		menuToggle.setAttribute("aria-expanded", "false");
		menuToggle.setAttribute("aria-label", "Open menu");
		mobileNav.setAttribute("aria-hidden", "true");
		menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
	};

	menuToggle.addEventListener("click", () => {
		const isOpen = mobileNav.classList.toggle("isOpen");
		menuToggle.setAttribute("aria-expanded", String(isOpen));
		menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
		mobileNav.setAttribute("aria-hidden", String(!isOpen));
		menuToggle.innerHTML = isOpen
			? '<i class="fa-solid fa-xmark"></i>'
			: '<i class="fa-solid fa-bars"></i>';
	});

	mobileNav.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", closeMenu);
	});
}

const showcase = document.querySelector(".featureShowcase");

if (showcase) {
	const slides = [
		{
			image: "assets/images/feature1.jpg",
			icon: "assets/images/feature2.jpg",
			alt: "Flexible sourcing capabilities",
			title: "Flexible Sourcing Capabilities",
			summary: "Highly Flexible Sourcing Capabilities Designed to Match Custom Requirements",
			description: "A steel mill re-rolling plates needs something different from a copper smelter chasing non-ferrous recovery. A buyer sourcing a one-off spot cargo has different priorities from a partner seeking a 12-month supply arrangement. Naho Trading is built to serve them all."
		},
		{
			image: "assets/images/feature3.jpg",
			icon: "assets/images/feature4.jpg",
			alt: "Consistent quality",
			title: "Consistent Quality",
			summary: "Quality Verified Before Every Shipment",
			description: "Every shipment is carefully checked and prepared to meet the standards your operation depends on. Quality is verified before loading, not assumed after delivery."
		},
		{
			image: "assets/images/feature5.jpg",
			icon: "assets/images/feature6.jpg",
			alt: "Reliable global network",
			title: "Reliable Global Network",
			summary: "Trusted Supply Relationships Across International Markets",
			description: "Our supplier network gives you dependable access to the grades you need, with clear communication from the first enquiry through to final delivery."
		},
		{
			image: "assets/images/feature6.jpg",
			icon: "assets/images/feature5.jpg",
			alt: "Clear communication",
			title: "Clear Communication",
			summary: "Transparent Support At Every Step",
			description: "From specification and documentation to inspection and shipment, our team keeps the process simple, visible, and easy to manage."
		}
	];

	const image = showcase.querySelector(".showcaseImageItem");
	const icon = showcase.querySelector(".showcaseIcon");
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
		}, 180);
	};

	const restartTimer = () => {
		window.clearInterval(timer);
		timer = window.setInterval(() => renderSlide(currentSlide + 1), 10000);
	};

	previous.addEventListener("click", () => {
		renderSlide(currentSlide - 1);
		restartTimer();
	});

	next.addEventListener("click", () => {
		renderSlide(currentSlide + 1);
		restartTimer();
	});

	showcase.addEventListener("mouseenter", () => window.clearInterval(timer));
	showcase.addEventListener("mouseleave", restartTimer);
	restartTimer();
}

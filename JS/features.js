document.addEventListener('DOMContentLoaded', () => {
    // Price Calculator
    const initPriceCalculator = () => {
        const calculator = document.querySelector('.price-calculator');
        if (!calculator) return;

        const inputs = calculator.querySelectorAll('input, select');
        const basePrice = document.getElementById('base-price');
        const insurancePrice = document.getElementById('insurance-price');
        const totalPrice = document.getElementById('total-price');
        const daysInput = document.getElementById('rental-days');
        const carTypeInput = document.getElementById('car-type');
        const insuranceInput = document.getElementById('insurance-type');

        if (!basePrice || !insurancePrice || !totalPrice ||
            !daysInput || !carTypeInput || !insuranceInput) return;

        function calculatePrice() {
            const days = Math.max(1, parseInt(daysInput.value, 10) || 1);
            const carType = carTypeInput.value;
            const insurance = insuranceInput.value;

            const rates = { economy: 50, midsize: 75, luxury: 100 };
            const insuranceRates = { basic: 10, premium: 20, full: 30 };

            const baseCost = days * (rates[carType] || 0);
            const insuranceCost = days * (insuranceRates[insurance] || 0);

            basePrice.textContent = `$${baseCost}`;
            insurancePrice.textContent = `$${insuranceCost}`;
            totalPrice.textContent = `$${baseCost + insuranceCost}`;
        }

        inputs.forEach(input => {
            input.addEventListener('input', calculatePrice);
            input.addEventListener('change', calculatePrice);
        });
        calculatePrice();
    };

    // FAQ Accordion
    const initFAQ = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (!question) return;

            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                faqItems.forEach(otherItem => otherItem.classList.remove('active'));
                if (!isOpen) item.classList.add('active');
            });
        });
    };

    // Testimonials Slider
    const initTestimonials = () => {
        const slider = document.querySelector('.testimonials-slider');
        if (!slider) return;

        // Ignore unfinished placeholder cards so the slider never displays a blank slide.
        const cards = [...slider.querySelectorAll('.testimonial-card')].filter(card => {
            const comment = card.querySelector('.client-comment')?.textContent.trim();
            const author = card.querySelector('.client-details')?.textContent.trim();
            return Boolean(comment && author);
        });
        const dots = [...document.querySelectorAll('.testimonial-dots .dot')];
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        if (cards.length === 0) return;

        let currentSlide = 0;
        let autoPlayId = null;

        dots.forEach((dot, index) => {
            dot.hidden = index >= cards.length;
            if (index >= cards.length) return;

            dot.setAttribute('role', 'button');
            dot.setAttribute('tabindex', '0');
            dot.setAttribute('aria-label', `Show testimonial ${index + 1}`);
        });

        function showSlide(index) {
            currentSlide = (index + cards.length) % cards.length;
            cards.forEach((card, cardIndex) => {
                const active = cardIndex === currentSlide;
                card.classList.toggle('active', active);
                card.setAttribute('aria-hidden', String(!active));
            });
            dots.forEach((dot, dotIndex) => {
                if (dotIndex < cards.length) {
                    dot.classList.toggle('active', dotIndex === currentSlide);
                    dot.setAttribute('aria-pressed', String(dotIndex === currentSlide));
                }
            });
        }

        const nextSlide = () => showSlide(currentSlide + 1);
        const prevSlide = () => showSlide(currentSlide - 1);

        nextBtn?.addEventListener('click', nextSlide);
        prevBtn?.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            if (index >= cards.length) return;
            dot.addEventListener('click', () => showSlide(index));
            dot.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    showSlide(index);
                }
            });
        });

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion && cards.length > 1) {
            autoPlayId = window.setInterval(nextSlide, 5000);
            const pauseAutoPlay = () => {
                if (autoPlayId !== null) {
                    window.clearInterval(autoPlayId);
                    autoPlayId = null;
                }
            };
            slider.addEventListener('mouseenter', pauseAutoPlay, { once: true });
            slider.addEventListener('focusin', pauseAutoPlay, { once: true });
        }

        showSlide(0);
    };

    initPriceCalculator();
    initFAQ();
    initTestimonials();
});

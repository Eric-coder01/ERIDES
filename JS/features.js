document.addEventListener('DOMContentLoaded', () => {
    // Price Calculator
    const initPriceCalculator = () => {
        const calculator = document.querySelector('.price-calculator');
        if (!calculator) return;

        const inputs = calculator.querySelectorAll('input, select');
        const basePrice = document.getElementById('base-price');
        const insurancePrice = document.getElementById('insurance-price');
        const totalPrice = document.getElementById('total-price');

        function calculatePrice() {
            const days = parseInt(document.getElementById('rental-days').value) || 0;
            const carType = document.getElementById('car-type').value;
            const insurance = document.getElementById('insurance-type').value;

            // Base rates per day
            const rates = {
                economy: 50,
                midsize: 75,
                luxury: 100
            };

            // Insurance rates per day
            const insuranceRates = {
                basic: 10,
                premium: 20,
                full: 30
            };

            const baseCost = days * rates[carType];
            const insuranceCost = days * insuranceRates[insurance];
            const total = baseCost + insuranceCost;

            basePrice.textContent = `$${baseCost}`;
            insurancePrice.textContent = `$${insuranceCost}`;
            totalPrice.textContent = `$${total}`;
        }

        inputs.forEach(input => input.addEventListener('change', calculatePrice));
    };

    // FAQ Accordion
    const initFAQ = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                // Close all items
                faqItems.forEach(i => i.classList.remove('active'));
                // Open clicked item if it wasn't open
                if (!isOpen) item.classList.add('active');
            });
        });
    };

    // Testimonials Slider
    const initTestimonials = () => {
        const slider = document.querySelector('.testimonials-slider');
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;

        function showSlide(index) {
            cards.forEach(card => card.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            cards[index].classList.add('active');
            dots[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % cards.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + cards.length) % cards.length;
            showSlide(currentSlide);
        }

        // Event Listeners
        nextBtn?.addEventListener('click', nextSlide);
        prevBtn?.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Auto-play (optional)
        const autoPlay = setInterval(nextSlide, 5000);

        // Pause auto-play on hover
        slider.addEventListener('mouseenter', () => clearInterval(autoPlay));

        // Initial state
        showSlide(currentSlide);
    };

    // Initialize all features
    initPriceCalculator();
    initFAQ();
    initTestimonials();
});
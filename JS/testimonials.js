document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelector('.testimonial-dots');
    let currentSlide = 0;
    
    // Create dots based on number of testimonials
    const testimonials = document.querySelectorAll('.testimonial-card');
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dots.appendChild(dot);
        
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    function goToSlide(n) {
        currentSlide = n;
        const offset = -currentSlide * 100;
        slider.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        goToSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        goToSlide(currentSlide);
    });
});
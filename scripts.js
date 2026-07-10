// =====================================================// 1. ANIMACIÓN AL HACER SCROLL (Intersection Observer)
// =====================================================
document.addEventListener('DOMContentLoaded', () => {

    const elementos = document.querySelectorAll('.servicio-card, .beneficio-item, .plan-card, .paso, .faq-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    elementos.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // =====================================================
    // 2. EFECTO DE BARRAS EN MOCKUP
    // =====================================================
    const barras = document.querySelectorAll('.mockup-phone__chart .bar');
    setTimeout(() => {
        barras.forEach(bar => {
            const altura = bar.style.height;
            bar.style.height = '0%';
            setTimeout(() => {
                bar.style.height = altura;
                bar.style.transition = 'height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }, 100);
        });
    }, 400);

    // =====================================================
    // 3. FAQ: CIERRE AUTOMÁTICO
    // =====================================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('toggle', () => {
            if (item.open) {
                faqItems.forEach(other => {
                    if (other !== item && other.open) {
                        other.open = false;
                    }
                });
            }
        });
    });

    // =====================================================
    // 4. SCROLL SUAVE
    // =====================================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // =====================================================
    // 5. CARRUSEL DE PLANES
    // =====================================================
    const track = document.getElementById('carouselTrack');
    if (track) {
        const prevBtn = document.querySelector('.carousel-btn--prev');
        const nextBtn = document.querySelector('.carousel-btn--next');
        const dotsContainer = document.getElementById('carouselDots');
        const cards = track.querySelectorAll('.plan-card');
        let currentIndex = 0;
        let cardsPerView = getCardsPerView();

        function createDots() {
            dotsContainer.innerHTML = '';
            const totalDots = Math.ceil(cards.length / cardsPerView);
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('span');
                dot.dataset.index = i;
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goTo(i));
                dotsContainer.appendChild(dot);
            }
        }

        function getCardsPerView() {
            const width = window.innerWidth;
            if (width < 768) return 1;
            if (width < 1024) return 2;
            return 3;
        }

        function updateCarousel() {
            const totalDots = Math.ceil(cards.length / cardsPerView);
            const maxIndex = totalDots - 1;

            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;

            const cardWidth = cards[0].offsetWidth + 24;
            const offset = currentIndex * (cardWidth * cardsPerView);
            track.style.transform = `translateX(-${offset}px)`;

            const dots = dotsContainer.querySelectorAll('span');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });

            if (prevBtn) prevBtn.disabled = currentIndex === 0;
            if (nextBtn) nextBtn.disabled = currentIndex >= totalDots - 1;
        }

        function goTo(index) {
            const totalDots = Math.ceil(cards.length / cardsPerView);
            if (index < 0) index = 0;
            if (index >= totalDots) index = totalDots - 1;
            currentIndex = index;
            updateCarousel();
        }

        function next() {
            const totalDots = Math.ceil(cards.length / cardsPerView);
            if (currentIndex < totalDots - 1) {
                currentIndex++;
                updateCarousel();
            }
        }

        function prev() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }

        if (nextBtn) nextBtn.addEventListener('click', next);
        if (prevBtn) prevBtn.addEventListener('click', prev);

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newCardsPerView = getCardsPerView();
                if (newCardsPerView !== cardsPerView) {
                    cardsPerView = newCardsPerView;
                    createDots();
                    currentIndex = 0;
                    updateCarousel();
                } else {
                    updateCarousel();
                }
            }, 250);
        });

        createDots();
        updateCarousel();
    }

    // =====================================================
    // 6. MODAL DE TÉRMINOS Y CONDICIONES
    // =====================================================
    const modal = document.getElementById('termsModal');
    const openBtn = document.getElementById('openTermsBtn');
    const closeBtn = document.getElementById('closeTermsBtn');
    const acceptBtn = document.getElementById('acceptTermsBtn');

    function openModal() {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        setTimeout(() => {
            const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusable) focusable.focus();
        }, 100);
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        setTimeout(() => {
            openBtn.focus();
        }, 100);
    }

    if (openBtn) {
        openBtn.addEventListener('click', openModal);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // =====================================================
    // 7. SOPORTE PARA NAVEGADORES ANTIGUOS
    // =====================================================
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.servicio-card, .beneficio-item, .plan-card, .paso, .faq-item')
            .forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
    }
});
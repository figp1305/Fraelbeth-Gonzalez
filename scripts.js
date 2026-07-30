// ============================================================
// 1. INTERSECTION OBSERVER - ANIMACIONES AL SCROLL
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    const elementos = document.querySelectorAll('.servicio-card, .problema-card, .metodologia-step, .transparencia-item, .faq-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    elementos.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // ============================================================
    // 2. MOCKUP - ANIMACIÓN DE BARRAS
    // ============================================================
    const barras = document.querySelectorAll('.mockup-phone__chart .bar');
    setTimeout(() => {
        barras.forEach(bar => {
            const altura = bar.style.height;
            bar.style.height = '0%';
            setTimeout(() => {
                bar.style.height = altura;
                bar.style.transition = 'height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }, 150);
        });
    }, 500);

    // ============================================================
    // 3. FAQ - CIERRE AUTOMÁTICO
    // ============================================================
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

    // ============================================================
    // 4. SCROLL SUAVE
    // ============================================================
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

    // ============================================================
    // 5. MODAL TÉRMINOS
    // ============================================================
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
            if (openBtn) openBtn.focus();
        }, 100);
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (acceptBtn) acceptBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ============================================================
    // 6. FALLBACK PARA NAVEGADORES ANTIGUOS
    // ============================================================
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.servicio-card, .problema-card, .metodologia-step, .transparencia-item, .faq-item')
            .forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
    }
});
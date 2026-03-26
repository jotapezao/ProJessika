// ============================================
// JESSIKA RODRIGUES — Main JavaScript
// Enhanced with Lightbox, Tilt, Typing
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Elements ----
    const preloader = document.getElementById('preloader');
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    const contactForm = document.getElementById('contactForm');
    
    // ---- 0. Custom Cursor ----
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Loop de animação suave para o cursor (easing)
        function animateCursor() {
            let distX = mouseX - cursorX;
            let distY = mouseY - cursorY;

            cursorX = cursorX + (distX * 0.15); // fator de suavidade
            cursorY = cursorY + (distY * 0.15);

            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover states em botões e links
        const interactiveEle = document.querySelectorAll('a, button, .btn, .portfolio-card, input, textarea');
        interactiveEle.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });

        // Texto "VER PROJETO" no grid de portfolio
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        portfolioCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                cursor.setAttribute('data-text', 'VER PROJETO');
                cursor.classList.add('cursor-text-active');
            });
            card.addEventListener('mouseleave', () => {
                cursor.removeAttribute('data-text');
                cursor.classList.remove('cursor-text-active');
            });
        });
    }

    // ---- 1. Preloader ----
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) preloader.classList.add('hidden');
        }, 1800);
    });

    // ---- 2. Header Scroll ----
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ---- 3. Mobile Menu ----
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const spans = mobileMenuBtn.querySelectorAll('.hamburger span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans.forEach(s => { s.style.transform = 'none'; s.style.opacity = '1'; });
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('.hamburger span');
                spans.forEach(s => { s.style.transform = 'none'; s.style.opacity = '1'; });
            });
        });
    }

    // ---- 4. Scroll Reveal Animations ----
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- 5. Animated Counter ----
    const counters = document.querySelectorAll('.stat-number[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    counter.textContent = Math.floor(eased * target);
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));

    // ---- 6. Smooth Scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // ---- 7. Portfolio Filter ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                        card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => { card.style.display = 'none'; }, 400);
                }
            });
        });
    });

    // ---- 8. Active Nav Link on Scroll ----
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset + 200;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLink.classList.add('active-link');
                } else {
                    navLink.classList.remove('active-link');
                }
            }
        });
    });

    // ---- 9. Parallax Effect (Aprimorado com rAF) ----
    const parallaxBg = document.querySelector('.cta-parallax');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (parallaxBg) {
                    const scrolled = window.scrollY;
                    const rate = scrolled * 0.4;
                    // Uso correto mantendo cobertura e centralização
                    parallaxBg.style.backgroundPosition = `center calc(50% + ${rate}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // ---- 10. Lightbox ----
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    if (lightbox && lightboxImg) {
        // Open lightbox on portfolio card click
        portfolioCards.forEach(card => {
            card.addEventListener('click', () => {
                const img = card.querySelector('.portfolio-card-img img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (lightboxClose) {
            lightboxClose.addEventListener('click', (e) => {
                e.stopPropagation();
                closeLightbox();
            });
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // ---- 11. Card Tilt Effect ----
    portfolioCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });

    // ---- 12. Hero Typing Effect ----
    const heroAccent = document.querySelector('.hero-title-accent');
    if (heroAccent) {
        const words = ['experiências.', 'sonhos.', 'arte.', 'sofisticação.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        // Add cursor element
        const cursor = document.createElement('span');
        cursor.classList.add('typing-cursor');
        heroAccent.parentNode.insertBefore(cursor, heroAccent.nextSibling);

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                heroAccent.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                heroAccent.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2500; // pause at complete word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        // Start typing effect after preloader
        setTimeout(() => {
            heroAccent.textContent = '';
            typeEffect();
        }, 2200);
    }

    // ---- 13. Sobre Parallax ----
    const sobreImg = document.querySelector('.sobre-img-wrapper img');
    if (sobreImg) {
        window.addEventListener('scroll', () => {
            const rect = sobreImg.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (rect.top - window.innerHeight / 2) * 0.08;
                sobreImg.style.transform = `translateY(${offset}px) scale(1.05)`;
            }
        });
    }
});

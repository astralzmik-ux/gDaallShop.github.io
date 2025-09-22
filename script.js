document.addEventListener('DOMContentLoaded', () => {

    // --- Логика для переключения вкладок (без изменений) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const targetId = link.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            navLinks.forEach(navLink => navLink.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            link.classList.add('active');
            targetSection.classList.add('active');
        });
    });

    // --- Логика для кнопок "Купить" (без изменений) ---
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const funpayUrl = button.getAttribute('data-funpay-url');
            if (funpayUrl) {
                window.open(funpayUrl, '_blank');
            } else {
                console.error('URL для FunPay не указан на кнопке!');
            }
        });
    });

    // --- Логика для выбора количества и обновления цены (без изменений) ---
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const priceElement = card.querySelector('.price');
        const basePrice = parseFloat(priceElement.getAttribute('data-base-price'));
        const quantityInput = card.querySelector('.quantity-input');
        const minusBtn = card.querySelector('.quantity-btn.minus');
        const plusBtn = card.querySelector('.quantity-btn.plus');

        const updatePrice = () => {
            let quantity = parseInt(quantityInput.value);
            if (isNaN(quantity) || quantity < 1) {
                quantity = 1;
                quantityInput.value = 1;
            }
            const totalPrice = basePrice * quantity;
            priceElement.textContent = `${totalPrice} руб.`;
        };

        minusBtn.addEventListener('click', () => {
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
                updatePrice();
            }
        });

        plusBtn.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updatePrice();
        });

        quantityInput.addEventListener('input', updatePrice);
    });

    // --- НОВОЕ: Конфигурация частиц tsParticles ---
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#00aaff",
            },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
            },
            collisions: {
                enable: true,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: 0.3,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
        detectRetina: true,
    });

    // --- НОВОЕ: Анимация элементов при прокрутке ---
    const animatedElements = document.querySelectorAll('[data-scroll-anim]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем задержку анимации, если она указана в атрибуте
                const delay = entry.target.dataset.animDelay || '0s';
                entry.target.style.transitionDelay = delay;

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Отключаем наблюдение после анимации
            }
        });
    }, {
        threshold: 0.1 // Элемент считается видимым при появлении на 10%
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

});

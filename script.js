document.addEventListener('DOMContentLoaded', () => {

    // --- Логика для переключения вкладок (Донаты, Кейсы, Контакты) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Отменяем стандартное поведение ссылки

            const targetId = link.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            // Убираем класс 'active' у всех ссылок и секций
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            // Добавляем класс 'active' нужной ссылке и секции
            link.classList.add('active');
            targetSection.classList.add('active');
        });
    });

    // --- Логика для кнопок "Купить" ---
    const buyButtons = document.querySelectorAll('.buy-btn');

    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const funpayUrl = button.getAttribute('data-funpay-url');
            if (funpayUrl) {
                // Открываем ссылку в новой вкладке
                window.open(funpayUrl, '_blank');
            } else {
                console.error('URL для FunPay не указан на кнопке!');
            }
        });
    });

});
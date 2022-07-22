
document.addEventListener('DOMContentLoaded', function (e) {
    if (document.querySelector('.slider2')) {
        new Swiper('.slider__wrapper2', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: false,
            navigation: false,
            autoplay: {
                dalay: 1000,
            }
        })
    }

    if (document.querySelector('.feedback__slider')) {
        new Swiper('.feedback__slider-slider', {
            loop: true,
            // grid: {
            //     rows: 3,
            // },
            spaceBetween: 25,
            dynamicBullets: true,

            pagination: {
                el: ".feedback__slider-pagination",
                clickable: true,
                type: 'bullets',
                dynamicBullets: true,
                renderBullet: function (index, className) {
                    // if (index <= 2) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                    // }
                },
            },
            navigation: {
                nextEl: '.feedback__slider-next',
                prevEl: '.feedback__slider-prev',
            }
        })
    }

    document.addEventListener('click', function (e) {
        let targetEl = e.target;

        if (targetEl.classList.contains('main__next')) {
            e.preventDefault();
            document.querySelector('.map').scrollIntoView({ block: "start", behavior: "smooth" });
        }

        if (targetEl.classList.contains('header__burger')) {
            e.preventDefault();
            document.querySelector('.header__menu').classList.add('_active');
            document.querySelector('body').classList.add('_noscroll');
        }

        if (targetEl.classList.contains('header__menu-close')) {
            e.preventDefault();
            document.querySelector('.header__menu').classList.remove('_active');
            document.querySelector('body').classList.remove('_noscroll');
        }

        if ((targetEl.classList.contains('header__menu-item') || targetEl.classList.contains('header__menu-link')) && window.innerWidth <= 992) {
            document.querySelectorAll('.header__menu-item').forEach(item => {
                item.classList.remove('_active');
            });
            targetEl.closest('li').classList.add('_active');
            document.querySelector('.header__menu').classList.remove('_active');
            document.querySelector('body').classList.remove('_noscroll');
        }
    })
})

function lazyImages() {
    const imageObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.style.backgroundImage = `url('${lazyImage.dataset.original}')`;
                lazyImage.classList.add('_removegif');
                imgObserver.unobserve(lazyImage);
            }
        })
    });
    const arr = document.querySelectorAll('[data-original]');
    if (arr) {
        arr.forEach((v) => {
            imageObserver.observe(v);
        })
    }

    const imageObserver2 = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.add('_removegif');
                imgObserver.unobserve(lazyImage);
            }
        })
    });
    const arr2 = document.querySelectorAll('img[data-src]');
    if (arr2) {
        arr2.forEach((v) => {
            imageObserver2.observe(v);
        })
    }
}
lazyImages();


//  let abdcenter = [53.74591955089278, 53.58747549999998]; 
//  let abdulino = [53.68645289976997, 53.64240714062499];

function init(path) {
    let centerString = path.dataset.center.trim().split(',').map((item, accum) => {
        return +item;
    })

    let coordsString = path.dataset.coords.trim().split('-').map((item, accum) => {
        let coords = item.trim().split(',').map((index, acc) => {
            return +index;
        })
        return coords;
    })

    let center = centerString;
    let coords = coordsString;

    let map = new ymaps.Map('map-test', {
        center: center,
        zoom: 10
    });

    for (let i = 0; i < coords.length; i++) {
        let placemark = new ymaps.Placemark(coords[i], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/location.svg',
            iconImageSize: [40, 40],
            iconImageOffset: [-19, -44]
        });
        map.geoObjects.add(placemark);
    }

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
    return coords;
}



document.addEventListener('DOMContentLoaded', function (e) {
    if (document.querySelector('.header')) {
        const header = document.querySelector('.header');
        const page = document.querySelector('.main');
        const coords = header.getBoundingClientRect();
        page.style.paddingTop = `${coords.height}px`;

    }

    // if (document.querySelector('.slider')) {
    //     new Swiper('.slider__wrapper', {
    //         loop: true,
    //         slidesPerView: 2,
    //         spaceBetween: 70,
    //         pagination: {
    //             el: '.slider__pagination',
    //             clickable: true,
    //         },
    //         navigation: {
    //             nextEl: '.slider__next',
    //             prevEl: '.slider__prev',

    //         }
    //     })
    // }

    if (document.querySelector('.feedback__slider')) {
        new Swiper('.feedback__slider-slider', {
            loop: true,
            grid: {
                rows: 3,
            },
            slidesPerColumn: 3,
            slidesPerView: 'auto',
            // spaceBetween: 25,
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

    if (document.querySelector('.map__rodniki-items')) {
        const items = document.querySelectorAll('.map__rodniki-items');
        items[0].classList.add('_visible');

        for (let i = 0; i < items.length; i++) {
            let input = document.createElement('input');
            input.setAttribute('readonly', '');
            input.type = 'text';
            input.value = i + 1;
            document.querySelector('.map__rodniki-select-pages').append(input);
        }
    }

    document.addEventListener('click', function (e) {
        let targetEl = e.target;
        if (targetEl.classList.contains('header__burger')) {
            e.preventDefault();
            document.querySelector('.header__menu').classList.toggle('_active');
            targetEl.classList.toggle('_active');
            document.querySelector('body').classList.toggle('_noscroll');
        }
        if (targetEl.classList.contains('main__next')) {
            e.preventDefault();
            document.querySelector('.map').scrollIntoView({ block: "start", behavior: "smooth" });
        }
        if (document.querySelector('.map__rodniki-items')) {
            const items = document.querySelectorAll('.map__rodniki-items');
            if (targetEl.classList.contains('map__rodniki-select-next')) {
                slideRodnikLeft(items);
            }
            if (targetEl.classList.contains('map__rodniki-select-prev')) {
                slideRodnikRight(items);
            }
        }
    })

    map();
})

function slideRodnikLeft(collection) {
    let visisble = document.querySelector('.map__rodniki-items._visible');
    let i = [...collection].indexOf(visisble);
    if (i != [...collection].length - 1) {
        visisble.classList.remove('_visible');
        visisble.classList.add('_slide-left');
        collection[i + 1].classList.add('_visible');
    }
}
function slideRodnikRight(collection) {
    let visisble = document.querySelector('.map__rodniki-items._visible');
    let i = [...collection].indexOf(visisble);
    if (i != 0) {
        visisble.classList.remove('_visible');
        collection[i - 1].classList.remove('_slide-left');
        collection[i - 1].classList.add('_visible');
    }
}

function map() {
    const paths = document.querySelectorAll('.path');
    const svg = document.querySelector('svg');
    const svgparent = document.querySelector('.svg__parent');
    const span = document.querySelector('.before');
    const regionBtns = document.querySelectorAll('.region-btn');


    for (let i = 0; i < paths.length; i++) {
        const boundingBox = paths[i].getBBox()

        const xCenter = (boundingBox.width / 2) + boundingBox.x
        const yCenter = (boundingBox.height / 2) + boundingBox.y
        paths[i].style.transformOrigin = ` ${xCenter}px ${yCenter}px`;

        paths[i].addEventListener('mouseover', function (e) {
            let pathCoords = paths[i].getBoundingClientRect();
            if (!paths[i].classList.contains('_init')) {
                span.style.left = `${pathCoords.left}px`;
                span.style.top = `${pathCoords.top - 100}px`;
                span.textContent = `path ${i + 1}`;
                span.classList.add('_visible');
            }
        })

        paths[i].addEventListener('mouseleave', function () {
            span.classList.remove('_visible');
            if (!paths[i].classList.contains('_init')) {
                paths[i].style.transform = `scale(1)`;
            }
        })

        paths[i].addEventListener('click', function () {

            ymaps.ready(init(paths[i]));

            let centers = paths[i].dataset.coords.trim().split('-').map((item, accum) => {
                let coords = item.trim().split(',').map((index, acc) => {
                    return +index;
                })
                return coords;
            })

            this.classList.add('_init');

            setTimeout(() => {
                this.classList.add('_biger');
            }, 500);

            paths.forEach(path => {
                if (!path.classList.contains('_init')) {
                    path.classList.add('_remove');
                }
            });

            let map = document.querySelector('#map-test');
            let marks = document.querySelectorAll('.ymaps-2-1-79-image');

            console.log(marks);

            for (let j = 0; j < centers.length; j++) {

                let top = marks[j].getBoundingClientRect().top - map.getBoundingClientRect().top;
                let left = marks[j].getBoundingClientRect().left - map.getBoundingClientRect().left;

                console.log(top, left);

                let icon = `<svg class="mini-icon" id="mini-${i + 1}-${j + 1}" style="left: ${left}px; top: ${top}px" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_45_787)">
                                    <rect class="mini-rect" x="4" width="41.5037" height="41.4162" rx="20.7081" />
                                    <path class="mini-path" d="M24.8628 9.15247C19.6248 9.15247 15.3629 13.4144 15.3629 18.6464C15.3285 26.2998 24.5018 32.6457 24.8628 32.9022C24.8628 32.9022 34.3971 26.2998 34.3627 18.6524C34.3627 13.4144 30.1008 9.15247 24.8628 9.15247ZM24.8628 23.4023C22.2384 23.4023 20.1128 21.2767 20.1128 18.6524C20.1128 16.028 22.2384 13.9024 24.8628 13.9024C27.4871 13.9024 29.6127 16.028 29.6127 18.6524C29.6127 21.2767 27.4871 23.4023 24.8628 23.4023Z" />
                                    </g>
                                    <defs>
                                    <filter id="filter0_d_45_787" x="0" y="0" width="49.5039" height="49.4161" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset dy="4"/>
                                    <feGaussianBlur stdDeviation="2"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_45_787"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_45_787" result="shape"/>
                                    </filter>
                                    </defs>
                                    </svg>
                                `;

                svgparent.insertAdjacentHTML('beforeend', icon);
            }
        })
    }

    for (let i = 0; i < regionBtns.length; i++) {
        regionBtns[i].addEventListener('mouseover', function (e) {
            let pathCoords = paths[i].getBoundingClientRect();
            if (!paths[i].classList.contains('_biger')) {
                span.style.left = `${pathCoords.left}px`;
                span.style.top = `${pathCoords.top - 100}px`;
                span.textContent = `path ${i + 1}`;
                span.classList.add('_visible');
            }
        })

        regionBtns[i].addEventListener('mouseleave', function () {
            span.classList.remove('_visible');
            if (!paths[i].classList.contains('_biger')) {
                paths[i].style.transform = `scale(1)`;
            }
        })

    }
}


function images() {
    let images = document.querySelectorAll('.gallery__grid img');

    for (let i = 0; i < images.length; i++) {
        const coords = images[i].getBoundingClientRect();

        if (i == 0) {
            images[i].style.left = 0;
            images[i].style.top = 0;
        }

        if (i == 1) {
            const prevcoords = images[i - 1].getBoundingClientRect();
            images[i].style.left = `${prevcoords.width + 10}px`;
        }

        if (i == 2) {
            const prevcoords = images[i - 1].getBoundingClientRect();
            const prevcoords2 = images[i - 2].getBoundingClientRect();
            images[i].style.left = `${prevcoords2.width + prevcoords.width + 20}px`;
        }
        if (i == 3) {
            images[i].style.left = 0;
            images[i].style.top = `${images[0].getBoundingClientRect().height + 10}px`;
        }

        if (i == 4) {
            const prevcoords = images[i - 1].getBoundingClientRect();
            images[i].style.left = `${prevcoords.width + 10}px`;
            images[i].style.top = `${images[1].getBoundingClientRect().height + 10}px`;
        }

        if (i == 5) {
            const prevcoords = images[i - 1].getBoundingClientRect();
            const prevcoords2 = images[i - 2].getBoundingClientRect();
            images[i].style.left = `${prevcoords2.width + prevcoords.width + 20}px`;
            images[i].style.top = `${images[2].getBoundingClientRect().height + 10}px`;
        }

        if (i == 6) {
            images[i].style.left = `${images[3].getBoundingClientRect().width + 10}px`;
            images[i].style.top = `${images[4].getBoundingClientRect().height + images[1].getBoundingClientRect().height + 20}px`;
        }
        if (i == 7) {
            const prevcoords = images[i - 1].getBoundingClientRect();
            images[i].style.left = `${prevcoords.width + images[3].getBoundingClientRect().width + 20}px`;
            images[i].style.top = `${images[5].getBoundingClientRect().height + images[2].getBoundingClientRect().height + 20}px`;
        }

    }
}
images();

window.addEventListener('resize', images);
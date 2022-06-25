// init map
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
        zoom: 9
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

// click on path
function goToRegion(path, span, allPaths, svgparent, i) {
    if (path.dataset.coords != '' && !path.classList.contains('_biger')) {
        ymaps.ready(init(path));

        let centers = path.dataset.coords.trim().split('-').map((item, accum) => {
            let coords = item.trim().split(',').map((index, acc) => {
                return +index;
            })
            return coords;
        })


        path.classList.add('_init');
        if (span.classList.contains('_visible')) {
            span.classList.remove('_visible');
        }

        setTimeout(() => {
            path.classList.add('_biger');
        }, 800);

        setTimeout(() => {
            document.querySelector('.map__rodniki').classList.add('_active');
            document.querySelector('.map__regions').classList.remove('_active');
        }, 500);

        allPaths.forEach(path => {
            if (!path.classList.contains('_init')) {
                path.classList.add('_remove');
            }
        });

        let map = document.querySelector('#map-test');

        setTimeout(() => {
            let marks = document.querySelectorAll('.ymaps-2-1-79-image');

            for (let j = 0; j < centers.length; j++) {
                let top = marks[j].getBoundingClientRect().top - map.getBoundingClientRect().top;
                let left = marks[j].getBoundingClientRect().left - map.getBoundingClientRect().left;


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
        }, 1500);
    }

    if (path.dataset.rodniki != '' && !path.classList.contains('_biger')) {
        const rodniki = path.dataset.rodniki.trim().split(',');
        const centers = path.dataset.coords.trim().split('-').map((item, accum) => {
            let coords = item.trim().split(',').map((index, acc) => {
                return +index;
            })
            return coords;
        })

        let rodnik = '';
        let count = 0;
        let div = document.createElement('div');
        div.classList.add('map__rodniki-items');

        for (let n = 0; n < rodniki.length; n++) {
            const item = `  <a href="" class="rodniki__item">
                                        <div class="rodniki__item-info">
                                            <span class="rodniki__item-title">Родник «${rodniki[n]}»</span>
                                            <span class="rodniki__item-descr">с. Никольское, Оренбургский район,
                                                ${centers[n]}</span>
                                        </div>
                                        <img src="img/location.svg" alt="">
                                    </a>`;
            rodnik = rodnik + item;

            if (rodniki.length < 5) {

                div.insertAdjacentHTML('beforeend', rodnik);
                document.querySelector('.map__rodniki-body').append(div);
                rodnik = '';
            }

            else {
                if (count % 5 == 0) {
                    let div = document.createElement('div');
                    div.classList.add('map__rodniki-items');
                    div.insertAdjacentHTML('beforeend', rodnik);
                    document.querySelector('.map__rodniki-body').append(div);
                    rodnik = '';
                }
            }

            count++;
        }

        if (document.querySelector('.map__rodniki-items')) {
            const items = document.querySelectorAll('.map__rodniki-items');
            items[0].classList.add('_visible');
            for (let i = 0; i < items.length; i++) {
                if (items.length > 1) {
                    document.querySelector('.map__rodniki-select').style.display = 'flex';
                    let input = document.createElement('input');
                    input.setAttribute('readonly', '');
                    input.type = 'text';
                    input.value = i + 1;
                    document.querySelector('.map__rodniki-select-pages').append(input);
                }
            }
        }

    }
}


document.addEventListener('DOMContentLoaded', function (e) {
    if (document.querySelector('.header')) {
        const header = document.querySelector('.header');
        const page = document.querySelector('.main');
        const coords = header.getBoundingClientRect();
        page.style.paddingTop = `${coords.height}px`;

    }

    if (document.querySelector('.slider2')) {

        let slider = document.querySelector('.slider2');

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


    document.addEventListener('click', function (e) {
        let targetEl = e.target;

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

        if (targetEl.classList.contains('header__menu-item') && window.innerWidth <= 992) {
            document.querySelectorAll('.header__menu-item').forEach(item => {
                item.classList.remove('_active');
            });
            targetEl.classList.add('_active')
            setTimeout(() => {
                document.querySelector('.header__menu').classList.remove('_active');
                document.querySelector('body').classList.remove('_noscroll');
            }, 500);
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

function mouseover(path, btn, span) {
    if (!path.classList.contains('_biger')) {
        span.classList.add('_visible');
        let pathCoords = path.getBoundingClientRect();
        span.style.left = `${pathCoords.left}px`;
        span.style.top = `${pathCoords.top - 100}px`;
        span.textContent = `${btn.textContent} район`;
    }
}
function mouseleave(path, btn, span) {
    if (!path.classList.contains('_biger')) {
        span.classList.remove('_visible');
    }
}

function map() {
    const allPaths = document.querySelectorAll('.path');
    const paths2 = document.querySelectorAll('.path[data-index]');
    const paths = [...paths2].sort((a, b) => +a.dataset.index - +b.dataset.index);

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
            mouseover(paths[i], regionBtns[i], span);
        })

        paths[i].addEventListener('mouseleave', function () {
            mouseleave(paths[i], regionBtns[i], span);
        })

        paths[i].addEventListener('click', function () {
            goToRegion(paths[i], span, allPaths, svgparent, i);
        })

    }

    for (let index = 0; index < regionBtns.length; index++) {
        let i = +paths[index].dataset.index;

        regionBtns[index].addEventListener('mouseover', function (e) {
            mouseover(paths[i], regionBtns[i], span);
            paths[i].classList.add('_hovered');

        })

        regionBtns[index].addEventListener('mouseleave', function () {
            if (!paths[i].classList.contains('_biger')) {
                mouseleave(paths[i], regionBtns[i], span);
                paths[i].classList.remove('_hovered');
            }
        })

        regionBtns[index].addEventListener('click', function () {
            // document.querySelector('.map__regions-selected').textContent = this.textContent + ' район';
            // document.querySelector('.map__regions-selected').classList.add('_active');
            goToRegion(paths[i], span, allPaths, svgparent, i);

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

window.addEventListener('resize', function () {
    images();
});


const selectSingle = document.querySelectorAll('.select');

if (selectSingle) {

    selectSingle.forEach(select => {
        const selectSingle_title = select.querySelector('.select__title');
        const selectSingle_labels = select.querySelectorAll('.select__label');

        selectSingle_title.addEventListener('click', () => {
            if ('active' === selectSingle_title.closest('.select').getAttribute('data-state')) {
                selectSingle_title.closest('.select').setAttribute('data-state', '');
            } else {
                selectSingle_title.closest('.select').setAttribute('data-state', 'active');
            }
        });

        for (let j = 0; j < selectSingle_labels.length; j++) {
            selectSingle_labels[j].addEventListener('click', (e) => {
                selectSingle_title.textContent = e.target.textContent;
                selectSingle_labels[j].closest('.select').setAttribute('data-state', '');


                setTimeout(() => {
                    document.querySelector('.map__regions').classList.remove('_active');
                    document.querySelector('.map__next-btn').classList.remove('_active');
                }, 500);
                setTimeout(() => {
                    document.querySelector('.map__rodniki').classList.add('_active');
                    document.querySelector('.map__next').classList.add('_active');
                }, 1000);
            });
        }
    })

}


let labels = document.querySelectorAll('.map__rodniki .select__label');

if (labels) {
    for (let i = 0; i < labels.length; i++) {
        labels[i].addEventListener('click', function () {
            let rodnik = document.querySelectorAll('.rodniki__item')[i].cloneNode(true);
            let next = document.querySelector('.map__next');

            if (next.querySelector('.rodniki__item')) {
                next.removeChild(next.querySelector('.rodniki__item'));
                next.querySelector('a').before(rodnik);
            }
            else {
                next.querySelector('a').before(rodnik);
            }
        })
    }
}

document.addEventListener('click', function (e) {
    let targetEl = e.target;
    if (targetEl.classList.contains('map__bredcamps-img')) {
        if (!document.querySelector('.map__regions').classList.contains('_active')) {

            setTimeout(() => {
                document.querySelector('.map__rodniki').classList.remove('_active');
                document.querySelector('.map__next').classList.remove('_active');
                document.querySelector('.path._biger').classList.remove('_biger', '_init');
                document.querySelectorAll('.path').forEach(path => {
                    if (path.classList.contains('_remove')) {
                        path.classList.remove('_remove');
                    }
                });
                document.querySelectorAll('.mini-icon').forEach(icon => {
                    icon.remove();
                });

                if (document.querySelector('.map__rodniki-items')) {
                    document.querySelectorAll('.map__rodniki-items').forEach(item => {
                        item.remove();
                    });
                }
                if (document.querySelector('.map__rodniki-select-pages input')) {
                    document.querySelectorAll('.map__rodniki-select-pages input').forEach(input => {
                        input.remove();
                    });
                }
                0
                document.querySelector('.map__rodniki-select').style.display = 'none';

                document.querySelector('#map-test').removeChild(document.querySelector('#map-test').firstChild);


            }, 500);
            setTimeout(() => {
                document.querySelector('.map__regions').classList.add('_active');
                document.querySelector('.map__next-btn').classList.add('_active');

            }, 1000);
        }
    }
})


window.addEventListener('load', function () {
    document.querySelector('#map-test').style.height = document.querySelector('.svg__parent').getBoundingClientRect().height + 'px';
})
window.addEventListener('resize', function () {
    document.querySelector('#map-test').style.height = document.querySelector('.svg__parent').getBoundingClientRect().height + 'px';
})
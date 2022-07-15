// инит карты

const mapIconPath = 'http://erem19si.beget.tech/wp-content/themes/rodnik/assets/img/location.svg';
function init(path, coordsString) {
    let centerString;
    if (window.innerWidth > 1200) {
        centerString = path.dataset.centerpc.trim().split(',').map((item, accum) => {
            return +item;
        })
    }
    else {
        centerString = path.dataset.center.trim().split(',').map((item, accum) => {
            return +item;
        })
    }

    let center = centerString;
    let coords = coordsString;
    let map;

    if (window.innerWidth <= 640) {
        map = new ymaps.Map('map-test', {
            center: center,
            zoom: 8
        });
    }
    else {
        map = new ymaps.Map('map-test', {
            center: center,
            zoom: 9
        });
    }

    for (let i = 0; i < coords.length; i++) {
        let placemark = new ymaps.Placemark(coords[i], {}, {
            iconLayout: 'default#image',
            iconImageHref: mapIconPath,
            iconImageSize: [40, 40]
            // iconImageOffset: [-19, -44]
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
}

// загрузка родников района
function regionAction(path, span, svg, svgparent, i) {
    let svg2 = document.querySelector('.svg2');



    setTimeout(() => {
        svg.classList.add('_hidden')
    }, 300);
    svg2.classList.remove('_scaled');
    svg2.classList.add('_visible');
    let pathCopy = path.cloneNode(true);

    svg2.append(pathCopy);

    path = pathCopy;



    span.addEventListener('mouseenter', () => {
        span.classList.remove('_visible');
    })

    if (path.dataset.coords != '' && !path.classList.contains('_biger')) {
        let centers = path.dataset.coords.trim().split('-').map((item, accum) => {
            let coords = item.trim().split(',').map((index, acc) => {
                return +index;
            })
            return coords;
        })

        ymaps.ready(init(path, centers));
        if (span.classList.contains('_visible')) {
            span.classList.remove('_visible');
        }

        path.classList.add('_init');
        setTimeout(() => {
            path.classList.add('_biger');
        }, 300);

        setTimeout(() => {
            document.querySelector('.map__rodniki').classList.add('_active');
            document.querySelector('.map__regions').classList.remove('_active');
        }, 100);

        let map = document.querySelector('#map-test');
        setTimeout(() => {

            if (window.innerWidth <= 1200) {
                document.querySelector('.map__next').classList.add('_active');
            }

            let marks = document.querySelectorAll('.ymaps-2-1-79-image');
            for (let j = 0; j < centers.length; j++) {
                let top = marks[j].getBoundingClientRect().top - map.getBoundingClientRect().top;
                let left = marks[j].getBoundingClientRect().left - map.getBoundingClientRect().left;
                let icon = `<a href="" style="left: ${left}px; top: ${top}px">
                                <svg class="mini-icon" id="mini-${i + 1}-${j + 1}"  width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                            </a>`;


                svgparent.insertAdjacentHTML('beforeend', icon);
            }
            svgparent.classList.add('_active')

        }, 1000);

        const rodniki = path.dataset.rodniki.trim().split(',');

        let rodnik = [];
        let rodnik2 = [];
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
            rodnik.push(item);
            rodnik2.push(item);

            if (rodniki.length < 3) {
                rodnik.map(item => div.insertAdjacentHTML('beforeend', item));
                document.querySelector('.map__rodniki-body').append(div);
                rodnik = [];
            }

            if (rodnik.length > count && rodnik.length % 3 == 0) {
                let slice = rodnik.slice(count, count + 3);
                let div = document.createElement('div');
                div.classList.add('map__rodniki-items');
                slice.map(item => div.insertAdjacentHTML('beforeend', item));
                document.querySelector('.map__rodniki-body').append(div);
                count += 3;
            }

            addIntoRodnikSelect(n, rodniki[n]);
        }
        if (rodnik.length > count) {
            let slice = rodnik.slice(count, rodnik.length);
            let div = document.createElement('div');
            div.classList.add('map__rodniki-items');
            div.insertAdjacentHTML('beforeend', slice);
            document.querySelector('.map__rodniki-body').append(div);
        }

        if (document.querySelector('.map__rodniki-items')) {
            const items = document.querySelectorAll('.map__rodniki-items');
            items[0].classList.add('_visible');
            for (let i = 0; i < items.length; i++) {
                if (items.length > 1) {
                    document.querySelector('.map__rodniki-select').style.display = 'flex';
                    let input = document.createElement('input');
                    input.setAttribute('readonly', '');
                    input.classList.add('_page');
                    input.type = 'text';
                    input.value = i + 1;
                    document.querySelector('.map__rodniki-select-pages').append(input);
                }
            }
        }
        hoverOnRodnik(rodniki, svgparent);
        slideRodnikiButton();
    }

    if (path.dataset.rodniki == '') {
        path.classList.add('_init');
        if (span.classList.contains('_visible')) {
            span.classList.remove('_visible');
        }

        setTimeout(() => {
            path.classList.add('_biger');
        }, 300);

        svg.classList.add('_hidden')

        setTimeout(() => {
            document.querySelector('.map__regions').classList.remove('_active');
            document.querySelector('.map__norodnik').classList.add('_active');
        }, 100);

    }
    rodnikActions();
}

// наведени на иконки родника и на ссылки родника
function hoverOnRodnik(rodniki, svgPerent) {
    let span = document.createElement('span');
    span.className = 'before-r';
    function hover(link, rodnik, span) {
        link.append(span);
        span.textContent = rodnik;
        span.style.transform = `translate3d(40px,-40px,0)`;
        if (window.innerWidth < 992) {
            span.style.transform = `translate3d(30px,-30px,0)`;
        }
        if (window.innerWidth < 640) {
            span.style.transform = `translate3d(20px,-20px,0)`;
        }
        if (window.innerWidth < 500) {
            span.style.transform = `translate3d(15px,-15px,0)`;
        }
    }

    setTimeout(() => {
        let links = svgPerent.querySelectorAll('a');
        let linksRodnik = document.querySelectorAll('.rodniki__item');
        let labels = document.querySelectorAll('.map__rodniki .select__label');

        for (let i = 0; i < links.length; i++) {
            if (window.innerWidth <= 1200) {
                appendRodnik(0)
                hover(links[0], rodniki[0], span);

                links[i].addEventListener('click', function (e) {
                    e.preventDefault();
                    let labels = document.querySelectorAll('.map__rodniki .select__label');
                    cahngeRegionSelect(document.querySelector('.map__rodniki'), labels[i])
                    appendRodnik(i)
                })
            }


            links[i].addEventListener('mouseover', function () {
                hover(links[i], rodniki[i], span);
            })

            links[i].addEventListener('mouseleave', function () {
                links[i].removeChild(span);
            })

            linksRodnik[i].addEventListener('mouseover', function () {
                hover(links[i], rodniki[i], span);

                let svg = links[i].querySelector('svg');
                links.forEach(link => {
                    link.querySelector('svg').classList.remove('_hovered');
                })
                svg.classList.add('_hovered')
            })

            linksRodnik[i].addEventListener('mouseleave', function () {
                links[i].removeChild(span);
                links.forEach(link => {
                    link.querySelector('svg').classList.remove('_hovered');
                })
            })

            labels[i].addEventListener('click', function () {
                hover(links[i], rodniki[i], span);

                let svg = links[i].querySelector('svg');
                links.forEach(link => {
                    link.querySelector('svg').classList.remove('_hovered');
                })
                svg.classList.add('_hovered')
            })
        }
    }, 1500);
}

// клик на район
function goToRegion(path, span, svg, svgparent, i) {
    if (window.innerWidth > 1200) {
        regionAction(path, span, svg, svgparent, i);
    }
    else {
        document.querySelectorAll('.path').forEach(path => {
            if (path.classList.contains('_hovered')) {
                path.classList.remove('_hovered');
            }
        });
        path.classList.add('_hovered');
        document.querySelector('.map__next-btn').classList.add('_active');
    }
    if (document.querySelector('.mini-icon-r')) {
        if (window.innerWidth > 1200) {
            document.querySelectorAll('.mini-icon-r').forEach(item => {
                item.classList.add('_hidden');
            });
        }
    }
}

// слайд родников влево
function slideRodnikLeft(collection, pages, underline) {
    let visisble = document.querySelector('.map__rodniki-items._visible');
    let i = [...collection].indexOf(visisble);
    if (i != [...collection].length - 1) {
        visisble.classList.remove('_visible');
        visisble.classList.add('_slide-left');
        collection[i + 1].classList.add('_visible');

        let meta = pages[i + 1].getBoundingClientRect();
        let parentMeta = document.querySelector('.map__rodniki-select-pages').getBoundingClientRect();
        underline.style.left = `${meta.left - parentMeta.left + 5}px`;
    }
}

// слайд родников вправо
function slideRodnikRight(collection, pages, underline) {
    let visisble = document.querySelector('.map__rodniki-items._visible');
    let i = [...collection].indexOf(visisble);
    if (i != 0) {
        visisble.classList.remove('_visible');
        collection[i - 1].classList.remove('_slide-left');
        collection[i - 1].classList.add('_visible');

        let meta = pages[i - 1].getBoundingClientRect();
        let parentMeta = document.querySelector('.map__rodniki-select-pages').getBoundingClientRect();

        underline.style.left = `${meta.left - parentMeta.left + 5}px`;
    }
}

// слайд по клике на цыфры под родниками
function slideRodnikiButton() {
    const items = document.querySelectorAll('.map__rodniki-items');
    const pages = [...document.querySelectorAll('.map__rodniki-select-pages input')];
    const underline = document.querySelector('.map__rodniki-select-pages span');

    for (let i = 0; i < pages.length; i++) {
        pages[i].addEventListener('click', function () {
            const pastItems = pages.slice(0, i).map((index, acc) => acc);
            let visisble = document.querySelector('.map__rodniki-items._visible');
            visisble.classList.remove('_visible');
            items[i].classList.remove('_slide-left');
            items[i].classList.add('_visible');

            let meta = pages[i].getBoundingClientRect();
            let parentMeta = document.querySelector('.map__rodniki-select-pages').getBoundingClientRect();
            underline.style.left = `${meta.left - parentMeta.left + 5}px`;

            items.forEach(item => {
                item.classList.remove('_slide-left');
            })

            pastItems.map(index => {
                items[index].classList.add('_slide-left');
            })
        })
    }
}

// наведение  на кнопки районов и на самох  районов
function mouseover(path, btn, span) {
    if (!path.classList.contains('_biger')) {
        span.classList.add('_visible');
        let pathCoords = path.getBoundingClientRect();
        span.style.top = `${pathCoords.top - pathCoords.height / 2 + window.scrollY}px`;
        if (path.classList.contains('_right')) {
            // span.style.left = `${pathCoords.left - window.scrollX - pathCoords.width}px`;
            span.style.left = `${pathCoords.left - window.scrollX - span.getBoundingClientRect().width}px`;
        }
        else {
            span.style.left = `${pathCoords.right - window.scrollX}px`;
        }

        span.textContent = `${btn.textContent} район`;
        if (document.querySelector('.map__regions-selected')) {
            document.querySelector('.map__regions-selected').textContent = `${btn.textContent} район`;
        }
    }
}

// убрать наведение на кнопки районов и на самох  районов
function mouseleave(path, btn, span) {
    if (!path.classList.contains('_biger')) {
        span.classList.remove('_visible');
    }
}


// оснавная функция
const allPaths = document.querySelectorAll('.path');
const paths2 = document.querySelectorAll('.path[data-index]');
const paths = [...paths2].sort((a, b) => +a.dataset.index - +b.dataset.index);
const svg = document.querySelector('.svg');
const svgparent = document.querySelector('.svg__parent');
const span = document.querySelector('.before');
const regionBtns = document.querySelectorAll('.region-btn');
let labels = document.querySelectorAll('.map__regions .select__label');

for (let i = 0; i < paths.length; i++) {
    // if (window.innerWidth >= 768) {
    regionIitIcons(paths[i], svgparent, i);
    // }

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
        goToRegion(paths[i], span, svg, svgparent, i);
        if (window.innerWidth <= 1200) {
            cahngeRegionSelect(document.querySelector('.map__regions'), labels[i]);
        }
    })

    regionBtns[i].addEventListener('mouseover', function (e) {
        mouseover(paths[i], regionBtns[i], span);
        paths[i].classList.add('_hovered');

    })

    regionBtns[i].addEventListener('mouseleave', function () {
        if (!paths[i].classList.contains('_biger')) {
            mouseleave(paths[i], regionBtns[i], span);
            paths[i].classList.remove('_hovered');
        }
    })

    regionBtns[i].addEventListener('click', function () {
        goToRegion(paths[i], span, svg, svgparent, i);
    })

    labels[i].addEventListener('click', function () {
        goToRegion(paths[i], span, svg, svgparent, i);
        mouseover(paths[i], regionBtns[i], span);
        span.classList.remove('_zindex');
    })
}

let nextBtn = document.querySelector('.map__next-btn');
if (nextBtn) {
    nextBtn.addEventListener('click', function () {
        const activePath = document.querySelector('.path._hovered');
        const index = +activePath.dataset.index;
        regionAction(activePath, span, svg, svgparent, index);
        setTimeout(() => {
            this.classList.remove('_active');
        }, 300);

        if (document.querySelector('.mini-icon-r')) {
            document.querySelectorAll('.mini-icon-r').forEach(item => {
                item.classList.add('_hidden');
            });
        }
    });
}

let abdulino = document.querySelector('.path19');
if (window.innerWidth <= 1200 && abdulino) {
    abdulino.classList.add('_hovered')
    nextBtn.classList.add('_active')
    mouseover(paths[0], regionBtns[0], span);
}
// основная функция конец


// добавление родников  в селект
function addIntoRodnikSelect(i, rodnik) {
    let rodniki = document.querySelector('.map__rodniki');
    let rodnik_item = `
            <input id="singleSelect${i}-rdk" name="radio" class="select__input" type="radio"/>
            <label for="singleSelect${i}-rdk" tabindex="0" class="select__label" data-value="${rodnik}"></label>
        `
    rodniki.querySelector('.sselect__content-body').insertAdjacentHTML('beforeend', rodnik_item);
    let selectSingle_labels = rodniki.querySelectorAll('.select__label');
    for (let j = 0; j < selectSingle_labels.length; j++) {
        rodniki.querySelector('.select__title').textContent = selectSingle_labels[0].dataset.value;
    }
}

// клик по заголовку селекта
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
            selectSingle_title.textContent = selectSingle_labels[0].dataset.value + ' район';
        }
    })
}

// клик на опции селекта переход на страницу родника
function rodnikActions() {
    let labels = document.querySelectorAll('.map__rodniki .select__label');
    if (labels) {
        for (let i = 0; i < labels.length; i++) {
            labels[i].addEventListener('click', function () {
                if (window.innerWidth <= 1200) {
                    appendRodnik(i);
                }
                else {
                    // window.location.href = a[i].href;
                }
            })
        }
    }
}

// открываю родник под картой меньше 1200px
function appendRodnik(i) {
    let links = document.querySelectorAll('.svg__parent a');
    document.querySelector('.map__next').classList.add('_active');
    let rodnik = document.querySelectorAll('.rodniki__item')[i].cloneNode(true);
    let next = document.querySelector('.map__next-content');

    links.forEach(link => {
        link.querySelector('svg').classList.remove('_hovered');
    })

    links[i].querySelector('svg').classList.add('_hovered')

    if (next.querySelector('.rodniki__item')) {
        next.removeChild(next.querySelector('.rodniki__item'));
    }
    next.append(rodnik);
}

// высота карты
let mapTest = document.querySelector('#map-test');
if (mapTest) {
    window.addEventListener('load', function () {
        document.querySelector('#map-test').style.height = document.querySelector('.svg').getBoundingClientRect().height + 'px';
        document.querySelector('#map-test').style.width = document.querySelector('.svg').getBoundingClientRect().width + 'px';
    })

    // высота карты
    window.addEventListener('resize', function () {
        document.querySelector('#map-test').style.height = document.querySelector('.svg').getBoundingClientRect().height + 'px';
        document.querySelector('#map-test').style.width = document.querySelector('.svg').getBoundingClientRect().width + 'px';
    })
}

// клики на разние кнопки
document.addEventListener('click', function (e) {
    let targetEl = e.target;
    let regions = document.querySelector('.map__regions');
    let roniki = document.querySelector('.map__rodniki');


    if (document.querySelector('.map__rodniki-items')) {
        const items = document.querySelectorAll('.map__rodniki-items');
        const pages = document.querySelectorAll('.map__rodniki-select-pages input');
        const underline = document.querySelector('.map__rodniki-select-pages span');

        if (targetEl.classList.contains('map__rodniki-select-next')) {
            slideRodnikLeft(items, pages, underline);
        }
        if (targetEl.classList.contains('map__rodniki-select-prev')) {
            slideRodnikRight(items, pages, underline);
        }
    }

    if (targetEl.classList.contains('map__bredcamps-img')) {
        let svg = document.querySelector('.svg');
        let svg2 = document.querySelector('.svg2');

        if (svg.classList.contains('_hidden')) {
            setTimeout(() => {
                svg.classList.remove('_hidden');
            }, 300);
        }

        if (svg2.classList.contains('_visible')) {
            svg2.classList.remove('_visible');
            svg2.querySelector('.path').classList.add('_small')
            setTimeout(() => {
                svg2.removeChild(svg2.querySelector('.path'))
            }, 900);
        }

        if (!regions.classList.contains('_active') && roniki.classList.contains('_active')) {
            roniki.classList.remove('_active');
            document.querySelector('.svg__parent').classList.remove('_active')
            document.querySelector('.map__next').classList.remove('_active');

            setTimeout(() => {
                if (window.innerWidth <= 1200) {
                    document.querySelector('.map__next-btn').classList.add('_active');
                }
                document.querySelector('.before').classList.add('_visible');
            }, 1200);

            removeElements([...document.querySelectorAll('.mini-icon'), roniki.querySelectorAll('.select__label'), roniki.querySelectorAll('.select__input')]);

            if (document.querySelector('.map__rodniki-items')) {
                removeElement(document.querySelectorAll('.map__rodniki-items'));
            }

            if (document.querySelector('.rodniki__item')) {
                removeElement(document.querySelectorAll('.rodniki__item'));
            }

            if (document.querySelector('.map__rodniki-select-pages input')) {
                removeElement(document.querySelectorAll('.map__rodniki-select-pages input'));
                document.querySelector('.map__rodniki-select-pages span').style.left = '5px';
            }

            document.querySelector('.map__rodniki-select').style.display = 'none';

            document.querySelector('#map-test').removeChild(document.querySelector('#map-test').firstChild);

            roniki.querySelector('.select').removeAttribute('data-state');

            let rodnikLinks = document.querySelectorAll('.svg__parent a');
            if (rodnikLinks) {
                removeElement(rodnikLinks);
            }

            regions.classList.add('_active');
        }
        if (document.querySelector('.map__norodnik').classList.contains('_active') && !roniki.classList.contains('_active')) {
            document.querySelector('.map__norodnik').classList.remove('_active');
            setTimeout(() => {
                if (window.innerWidth <= 1200) {
                    document.querySelector('.map__next-btn').classList.add('_active');
                }
            }, 1200);
            regions.classList.add('_active');
        }

        if (document.querySelector('.mini-icon-r')) {
            setTimeout(() => {
                document.querySelectorAll('.mini-icon-r').forEach(item => {
                    item.classList.remove('_hidden');
                });
            }, 700);
        }
    }

    if (targetEl.classList.contains('select__label')) {
        let select = targetEl.closest('.select');
        select.setAttribute('data-state', '');
        select.querySelector('.select__title').textContent = targetEl.dataset.value + ' район';
    }

    if (targetEl.classList.contains('select__title') && targetEl.closest('.map__regions')) {
        document.querySelector('.before').classList.toggle('_zindex');
    }
})

// иконки на регоинах главной карте у  которых есть родники
function regionIitIcons(path, svgparent, i) {
    if (path.dataset.coords != '' && !path.classList.contains('_biger')) {
        let t = 25, l = 7;
        if (window.innerWidth <= 475) {
            t = 24, l = 3;
        }
        let top = path.getBoundingClientRect().top - svgparent.getBoundingClientRect().top + path.getBoundingClientRect().height / 2 - t;
        let left = path.getBoundingClientRect().left - svgparent.getBoundingClientRect().left + path.getBoundingClientRect().width / 2 - l;



        for (let j = 0; j < 1; j++) {

            let icon = `<svg class="mini-icon-r" id="mini-${i + 1}-${j + 1}" style="left: ${left}px; top: ${top}px"  width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    }
}

// меньше 1200 меняю заголовок слекта при клике на район
function cahngeRegionSelect(elem, label) {
    const select = elem.querySelector('.select');
    select.setAttribute('data-state', '');
    select.querySelector('.select__title').textContent = label.dataset.value + ' район';
}

// функция удаления элемента
function removeElement(elems) {
    for (let i = 0; i < elems.length; i++) {
        elems[i].remove();
    }
}

// функция удаления элемента - расширенная версия
function removeElements(elems) {
    for (let i = 0; i < elems.length; i++) {
        for (let k = 0; k < elems[i].length; k++) {
            elems[i][k].remove();
        }
    }
}
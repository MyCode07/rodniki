function goToRegion(path) {
    if (paths[i].dataset.coords != '' && !paths[i].classList.contains('_biger')) {
        ymaps.ready(init(paths[i]));

        let centers = paths[i].dataset.coords.trim().split('-').map((item, accum) => {
            let coords = item.trim().split(',').map((index, acc) => {
                return +index;
            })
            return coords;
        })


        this.classList.add('_init');
        if (span.classList.contains('_visible')) {
            span.classList.remove('_visible');
        }

        setTimeout(() => {
            this.classList.add('_biger');
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

    if (paths[i].dataset.rodniki != '' && !paths[i].classList.contains('_biger')) {
        const rodniki = paths[i].dataset.rodniki.trim().split(',');
        const centers = paths[i].dataset.coords.trim().split('-').map((item, accum) => {
            let coords = item.trim().split(',').map((index, acc) => {
                return +index;
            })
            return coords;
        })

        console.log(rodniki);

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
                console.log(div);
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
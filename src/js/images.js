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

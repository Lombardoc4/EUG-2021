// eslint-disable-next-line func-names
(function (doc) {
    window.addEventListener('DOMContentLoaded', () => {
        doc.querySelector('#landing header').classList.add('on');

        // _.each(doc.querySelectorAll('links a'), (link) => {});
        _.toggleClassWithDelay(doc.querySelectorAll('.links a'), 'on');

        if (window.innerWidth < 768)
            doc.getElementById('mainNav').classList.add('on');
    });

    window.addEventListener('scroll', () => {
        if (window.innerWidth >= 768) {
            const mainNav = doc.getElementById('mainNav');
            console.log('test');
            if (window.scrollY >= 30)
                mainNav.classList.add('on');
            else
                mainNav.classList.remove('on');
        }
    });

    /**
     * Transform slideshow images accordingly
     *
     *  @param {HTMLCollection} images
     *  @param {Integer} index
     */
    const changeSlideshowView = (images, index) => {
        _.each(images, (el, i) => {
            // Make image visible
            if (i === index)
                el.classList.add('on');

            // Animate slide
            // el.style = `transform: translateX(-${100 * index}%); transition: transform 0.4s, opacity 0.8s`;
        });
    };

    /**
     * Navigate through slideshow
     *
     *  @param {HTMLElement} clicker
     */
    const slideshowClick = (clicker) => {
        // Slideshow to which click belongs
        const slideshow = clicker.parentElement.querySelector('.projectImages');

        // Get Current Index
        const currentImage = +slideshow.dataset.image;

        // Get Max Index
        const maxImage = slideshow.children.length - 1;

        // Temp Var
        let newIndex = 0;

        // If Left Clicker
        if (clicker.classList.contains('click-left')) {
            // If left-most image
            if (currentImage === 0)
                newIndex = maxImage;
            else
                newIndex = currentImage - 1;
        }

        // If Right Clicker
        if (clicker.classList.contains('click-right')) {
            // If right-most image
            if (currentImage >= maxImage)
                newIndex = 0;
            else
                newIndex = currentImage + 1;
        }

        // Set new data-image index
        slideshow.dataset.image = newIndex;

        // Modify CSS to animate slide
        slideshow.children[currentImage].classList.remove('on');
        changeSlideshowView(slideshow.children, newIndex);
    };

    _.each(document.querySelectorAll('.projectSlide > .click-left'), (el) => {
        el.addEventListener('click', () => { slideshowClick(el); });
    });

    _.each(document.querySelectorAll('.projectSlide > .click-right'), (el) => {
        el.addEventListener('click', () => { slideshowClick(el); });
    });
}(document));

/* eslint-disable func-names */
// eslint-disable-next-line func-names
(function (doc) {
    // ********************
    // *** Nav Section
    // ********************

    /**
     *  Menu open/close animation
     *
     *  @param {boolean} state
     */
    let windowYOffset = 0;
    const showMenu = () => {
        const nav = document.querySelector('.nav_links');
        const burger = document.querySelector('#mobile-menu-burger');
        const mainContent = doc.getElementById('mainContent');

        // If maincontent is hidden get scroll position then set when not hidden
        if (mainContent.classList.contains('hide')) {
            window.scroll(0, windowYOffset);
            _.toggleClass(doc.getElementsByClassName('nav_link'), 'on');
        } else {
            windowYOffset = window.pageYOffset;
            _.toggleClassWithDelay(doc.getElementsByClassName('nav_link'), 'on', 100, 500);
        }

        nav.classList.toggle('on');
        mainContent.classList.toggle('hide');
        burger.classList.toggle('on');
        // _.toggleClassWithDelay(doc.getElementsByClassName('nav_link'), 'on', 200, 500);
    };


    const loadPage = () => {
        doc.querySelector('.preloader').classList.add('on');
        doc.getElementById('mainContent').classList.remove('d-none');
        setTimeout(() => {
            // *** Animate all content
            doc.getElementById('mainContent').classList.add('on');

            // *** Nav Animation
            if (window.innerWidth >= 480)
                _.toggleClassWithDelay(doc.getElementsByClassName('nav_link'), 'on', 200, 500);

            // *** Show active link
            const activeLink = [].find.call(doc.getElementsByClassName('nav_link'), navLink => navLink.getAttribute('href').slice(1) === window.location.pathname);
            activeLink?.classList.add('nav-underline');

            // *** Home Page Animation
            // Issues since
            // if (window.location.pathname.includes('index.html') || !window.location.pathname.includes('.html')) {
                doc.querySelector('.splash_list')?.classList.add('on');
                doc.querySelector('.homeSplash_main')?.classList.add('on');
            // }
        }, 50);


        document.querySelector('#mobile-menu-burger').addEventListener('click', () => {
            showMenu();
        });
    }

    document.getElementById('preloadImages')?.addEventListener('load', loadPage);


    window.onload = () => {
        doc.querySelector('.preloader').classList.add('on');
        doc.getElementById('mainContent').classList.remove('d-none');
        setTimeout(() => {
            // *** Animate all content
            doc.getElementById('mainContent').classList.add('on');

            // *** Nav Animation
            if (window.innerWidth >= 480)
                _.toggleClassWithDelay(doc.getElementsByClassName('nav_link'), 'on', 200, 500);

            // *** Show active link
            const activeLink = [].find.call(doc.getElementsByClassName('nav_link'), navLink => navLink.getAttribute('href').slice(1) === window.location.pathname);
            activeLink?.classList.add('nav-underline');

            // *** Home Page Animation
            // Issues since
            // if (window.location.pathname.includes('index.html') || !window.location.pathname.includes('.html')) {
                doc.querySelector('.splash_list')?.classList.add('on');
                doc.querySelector('.homeSplash_main')?.classList.add('on');
            // }
        }, 50);


        document.querySelector('#mobile-menu-burger').addEventListener('click', () => {
            showMenu();
        });
    };


    // ********************
    // *** Home
    // ********************

    // ********************
    // *** Portfolio Section
    // ********************
    if (window.location.pathname.includes('portfolio.html')) {
        doc.getElementById('modalClose').addEventListener('click', () => {
            doc.getElementById('overlay').classList.remove('on');
            doc.getElementById('modalTitle').innerHTML = '';

            _.emptyElement(doc.getElementById('imgContainer'), 'img');
            _.emptyElement(doc.getElementById('modalContent'));

            doc.body.classList.remove('overflow-hidden');
        }, false);

        doc.getElementById('overlay').addEventListener('click', function f() {
            this.classList.remove('on');
            doc.getElementById('modalTitle').innerHTML = '';

            _.emptyElement(doc.getElementById('imgContainer'), 'img');
            _.emptyElement(doc.getElementById('modalContent'));

            doc.body.classList.remove('overflow-hidden');
        }, false);

        doc.getElementById('modal').addEventListener('click', (e) => { e.stopPropagation(); });

        // n = 1 or -1
        const showSlides = (n) => {
            // If no images to slide
            if (document.getElementsByClassName('containedImg').length <= 1)
                return;

            const slides = document.getElementsByClassName('containedImg');
            const captionText = document.getElementById('img-caption');
            let slideIndex = +doc.getElementById('modal').dataset.slide + n;

            if (slideIndex > slides.length)
                slideIndex = 1;
            if (slideIndex < 1)
                slideIndex = slides.length;

            let i;
            for (i = 0; i < slides.length; i++)
                slides[i].style.opacity = 0;

            slides[slideIndex - 1].style.opacity = 1;
            doc.getElementById('modal').dataset.slide = slideIndex;
            captionText.innerHTML = slides[slideIndex - 1].alt;
        };

        doc.querySelector('.slide-click-left').addEventListener('click', () => {
            showSlides(-1);
        });

        doc.querySelector('.slide-click-right').addEventListener('click', () => {
            showSlides(1);
        });

        _.each(doc.getElementsByClassName('project_card'), (card) => {
            card.addEventListener('click', function f() {
                doc.getElementById('overlay').classList.add('on');
                const title = this.querySelector('.card_title')?.innerHTML;
                const content = this.querySelector('.card_content')?.innerHTML;
                const images = this.getElementsByClassName('card_image');
                const container = doc.getElementById('imgContainer');


                const primaryImg = doc.createElement('img');
                primaryImg.setAttribute('src', this.style.backgroundImage.slice(5, -2));
                primaryImg.setAttribute('alt', this.dataset.alt);
                primaryImg.classList.add('position-absolute', 'containedImg');
                this.dataset.height ? primaryImg.classList.add('h-100', 'w-auto') : primaryImg.classList.add('w-100');
                container.append(primaryImg);


                _.each(images, (image) => {
                    const imageDuplicate = image.cloneNode();
                    imageDuplicate.classList.add('position-absolute', 'containedImg');
                    imageDuplicate.style.opacity = 0;
                    container.append(imageDuplicate);
                });

                doc.getElementById('modal').dataset.slide = doc.getElementsByClassName('containedImg').length;

                doc.getElementById('modalTitle').innerHTML = title;
                doc.getElementById('modalContent').innerHTML = content;
                showSlides(0);
                // doc.getElementsByClassName('containedImg')[0].setAttribute('src', bgImg);

                doc.body.classList.add('overflow-hidden');
            });
        });
    }


    // ********************
    // *** Learn Section
    // ********************
    if (window.location.pathname.includes('learn.html')) {
        const learnSectionSide = () => {
            const newHash = window.location.hash;
            const learnSides = doc.getElementsByClassName('learn_side');
            let currentDeck;
            if (newHash.includes('#plants') || newHash.includes('#wildlife')) {
                _.each(learnSides, (el) => {
                    el.querySelector('.learn_side_img').classList.add('on');
                    el.querySelector('.learn_deck').classList.add('on');
                    if (newHash.includes(el.dataset.target)) {
                    //     currentDeck = el.querySelector('.learn_deck');
                        el.classList.remove('w-md-50', 'w-md-33', 'off');
                        el.classList.add('w-md-66', 'on');
                    //     // !Dont forget href!
                    //     currentDeck.classList.add('on');


                    //     el.style.backgroundImage = '';
                    } else {
                        el.classList.remove('w-md-50', 'w-md-66', 'on');
                        el.classList.add('w-md-34', 'off');
                    //     // el.firstElementChild.classList.add('');
                    //     el.querySelector('.learn_side_img').classList.remove('on');
                    //     el.querySelector('.learn_deck').classList.remove('on');
                        // el.firstElementChild.classList.remove('on');
                        // el.querySelector('.learn_side_img').style.backgroundImage = `url(${el.dataset.background})`;
                    }
                });

                // Show Full Copy
                _.each(doc.getElementsByClassName(newHash.slice(1)), (copy) => {
                    copy.classList.toggle('on');
                });
            }

            _.each(doc.getElementsByClassName('learn_deck_card'), (learnCard) => {
                _.each(learnCard.getElementsByClassName('read-more'), (readLink) => {
                    readLink.onclick =  () => {
                        _.each(doc.getElementsByClassName(newHash.slice(1)), (copy) => {
                            copy.classList.toggle('on');
                        });
                    };
                });
            });
        };


        learnSectionSide();
        window.addEventListener('hashchange', learnSectionSide, false);
    }

    // **************
    // *** Contact
    // **************
    if (window.location.pathname.includes('contact.html')) {
        (function () {
            emailjs.init('user_V9ER3aodBjBge1ZKhUypO');
        }());

        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        doc.getElementById('contactSubmit').addEventListener('click', () => {
            doc.getElementById('contactSubmit').style.pointerEvents = 'none';
            const name = doc.getElementById('contactName');
            const email = doc.getElementById('contactEmail');
            const message = doc.getElementById('contactMessage');
            const dateNow = Date();

            if (name.value && validateEmail(email.value) && message.value.length > 20) {
                console.log('sending');
                emailjs.send('service_d6s6jp3', 'template_g601w4w', {
                    from_name:  name.value,
                    message:    message.value,
                    reply_to:   email.value,
                    email_date: dateNow,
                }).then(() => {
                    doc.querySelector('.email-confirm').classList.remove('on');
                    setTimeout(() => {
                        window.location = './contact.html';
                    }, 5000);
                });
            } else {
                doc.getElementById('contactSubmit').style.pointerEvents = 'visible';

                // Mobile
                if (window.innerWidth < 480) {
                    (!name.value || name.value === '') ? name.style.backgroundColor = '#FFCB77' : name.style.backgroundColor = '#95A472';
                    !validateEmail(email.value) ? email.style.backgroundColor = '#FFCB77' : email.style.backgroundColor = '#95A472';
                    message.value.length < 20 ? message.style.backgroundColor = '#FFCB77' : message.style.backgroundColor = '#95A472';
                } else {
                    !validateEmail(email.value) ? email.style.boxShadow = '0 0 0 2px #FFCB77' : email.style.boxShadow = '';
                    message.value.length < 20 ? message.style.boxShadow = '0 0 0 2px #FFCB77' : message.style.boxShadow = '';
                    !name.value || name.value === '' ? name.style.boxShadow = '0 0 0 2px #FFCB77' : name.style.boxShadow = '';
                }
            }
        });
    }
}(document));

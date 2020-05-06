window.addEventListener('DOMContentLoaded', function() {
    ///SLIDER
    let prev = document.querySelector('.arrow-left'),
        next = document.querySelector('.arrow-right'),
        slides = document.querySelectorAll('.slider__item'),
        slideMargin = parseInt(getComputedStyle(slides[0]).marginRight),
        slideWrap = document.querySelector('.slider__items'),
        modal = document.querySelector('.modalBg'),
        modalImg = modal.querySelector('#modalImg'),
        close = modal.querySelector('span'),
        index = 3,
        winWid = window.innerWidth,
        transition = 0;
    
    if(winWid <= 992 && winWid > 768) {
        index = 2;
        slideWrap.style.width = slides.length * (259 + slideMargin)  + 'px';
    } else if(winWid <= 768) {
        index = 2;
        slideWrap.style.width = slides.length * (466 + slideMargin)  + 'px';
    } 
    else {
        index = 3;
        slideWrap.style.width = slides.length * (270 + slideMargin)  + 'px';
    }

    let change = (arr) => {
        arr.forEach(item => {
            item.style.transform = `translateX(${transition}%)`;
        })
    }
    
    next.addEventListener('click', () => {
        if(transition >= - ( (slides.length - index) * 100) ) {
            if(winWid <= 768) transition -= 100;
            else transition -=120
            change(slides)
        }
    })
    prev.addEventListener('click', () => {
        if(transition >= -( slides.length * 100) && transition!=0 ) {
            if(winWid <= 768) transition += 100;
            else transition +=120
            change(slides)
        }
    })

    slideWrap.addEventListener('click', function(e) {
        if(e.target.className === 'slider__img') {
            let path = e.target.src;
            modal.style.display = 'flex';
            modalImg.src = path;
            document.body.style.overflow = 'hidden';
        }
    })

    close.addEventListener('click', ()=> {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    })
    ///SLIDER SMALL

    let dots = document.querySelectorAll('.slider__dot'),
        slidImg = document.querySelectorAll('.slidImg');

        clearImg(1)

        function clearImg(el) {
            dots[0].style.backgroundColor = '#CC9C48';
            for(let i = el; i < slidImg.length; i++) {
                slidImg[i].style.display = 'none';
                dots[i].style.backgroundColor = ''
            }
        }
        
        dots.forEach((item,index) => {
            item.addEventListener('click', () => {
                clearImg(0);
                slidImg[index].style.display = 'block';
                dots[index].style.backgroundColor = '#CC9C48'
            })
        })

    
    ///SCROLL
    let links = document.querySelectorAll("a[href*='#']");
    let nav = document.querySelector('.header__nav');
    links.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const blockId = item.getAttribute('href');
            document.querySelector('' + blockId).scrollIntoView({
                behavior: "smooth",
                block: 'start'
            })
        })
    })
    window.addEventListener('scroll', () => {
        if(window.pageYOffset >= 1) nav.style.backgroundColor = '#000';
        else nav.style.backgroundColor = '';
    })

    //FORM
    let phone = document.querySelectorAll('.form_num');
    let solForm  = document.querySelector('.solForm');
    let ordForm = document.querySelector('.ordForm');
    let inputs = document.querySelectorAll('input');
    let textarea = document.querySelector('textarea');
    let load = document.querySelector('.load');
    let readyBg = document.querySelector('.order__bg');
    let ready = document.querySelector('.order__bg_ready');


    phone.forEach(item => {
        item.addEventListener('input', ()=> {
            if(+item.value < 0 || item.value == ' ') item.value = '';
        })
    })

    getForm(solForm);
    getForm(ordForm);

    function getForm(element) {
        element.addEventListener('submit', (e) => {
            let response = sendForm(element);
            e.preventDefault();
            response.then(
                () => {
                    load.style.display = 'none';
                    document.body.style.overflow = '';
                    textarea.value = '';
                    time();
                    inputs.forEach(item=>item.value = '')
                }
            )
        })
    }
    function sendForm(element) {
        return new Promise((resolve) => {
            load.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            let xhr = new XMLHttpRequest();
            let data = new FormData(element);
            
            xhr.open('POST', 'server.php')
            xhr.send(data);

            xhr.onreadystatechange = () => {
                if(xhr.status < 400) resolve();
            }
        })
    }
    function time() {
        readyBg.style.display = 'flex';
        ready.style.opacity = 1;
        setTimeout(() => {
            ready.style.opacity = 0;
            readyBg.style.display = 'none';
        },3000)

    }

    ////BURGER 
    let menu = document.querySelector('.header__menu_wrapper'),
        closeMenu = document.querySelector('.close_menu'),
        side = document.querySelector('.header__side'),
        items = document.querySelectorAll('.header__side_item a');

    menu.addEventListener('click', () => {
        menu.classList.add('active');
        side.style.transform = 'translateX(0%)';

    })
    closeMenu.addEventListener('click', () => {
        side.style.transform = 'translateX(-100%)';
        menu.classList.remove('active');
        clearColor()
    })

    items.forEach((item) => {
        item.addEventListener('touchstart', (e) => {
            clearColor();
            item.style.color = "#CC9C48";
        })
    })
    function clearColor() {
        items.forEach((item) => {
            item.style.color = "#fff";
        })
    }
})
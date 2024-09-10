'use strict'
window.addEventListener('DOMContentLoaded', ()=> {

    // === HEADER === \\\
    let header = document.querySelector('header'),
        headerBurger = document.querySelector('.burger'),
        headerMenu = header.querySelector('.header__menu')


    document.body.style.paddingTop = header.offsetHeight + 'px'
    document.body.style.setProperty('--headerHeight', header.offsetHeight + 'px');

    window.addEventListener('resize', ()=>{
        document.body.style.paddingTop = header.offsetHeight + 'px'
    })
    
    window.addEventListener('scroll', ()=>{
        if (window.pageYOffset > 0 ){
            header.classList.add('_white')
        }
        else{
            header.classList.remove('_white')
        }
    })

    headerBurger.addEventListener('click', toggleMenu)
    function toggleMenu() {
        headerMenu.classList.toggle('_active')
        headerBurger.classList.toggle('_active')
        document.body.classList.toggle('lock')
        if (headerMenu.classList.contains('_active')){
            header.classList.add('_white')
        }
        
        if (window.pageYOffset == 0 && !headerMenu.classList.contains('_active')){
            header.classList.remove('_white')
        }
    }
    function closeMenu() {
        headerMenu.classList.remove('_active')
        headerBurger.classList.remove('_active')
        document.body.classList.remove('lock')
    }
    document.addEventListener('click', (e) => {
        if ( !e.composedPath().includes(headerMenu) && !e.composedPath().includes(headerBurger)) {
            closeMenu()
        }
    })

    // === OUR TOGGLE PICS === \\\
    let ourItems = document.querySelectorAll('.our__item')
    ourItems.forEach(item => {
        let idx = 1,
            max = item.querySelectorAll('.our__pic img').length,
            defaultName = item.classList.value
        setInterval(() => {
            if (idx < max){
                idx++
            }
            else {
                idx = 1
            }
            item.classList.value = item.classList.value.slice(0, defaultName.length) + ` _pos-${idx}`
        }, 1000);
    })

    // === PLUSES/BENEFITS ITEMS HEIGHT === \\\
    if (window.matchMedia('(min-width: 768.1px)').matches){
        window.addEventListener('load', ()=>{
            let pluses = document.querySelector('section.pluses'),
                plusesItems = pluses.querySelectorAll('.pluses__item'),
                plusesHeights = []
        
            plusesItems.forEach(item => {
                plusesHeights.push(item.offsetHeight*1)
        
            });
            plusesItems.forEach(item => {
                item.style.height = Math.max.apply(Math, plusesHeights) + 'px'
            })

            
            let benefits = document.querySelector('section.benefits'),
                benefitsItems = benefits.querySelectorAll('.benefits__item'),
                benefitsHeights = []

            benefitsItems.forEach(item => {
                benefitsHeights.push(item.offsetHeight*1)
        
            });
            benefitsItems.forEach(item => {
                item.style.height = Math.max.apply(Math, benefitsHeights) + 'px'
            })
        })
    }
    // === FORMS === \\
    let formCalls = document.querySelectorAll('._form-call'),
        formPopUp = document.querySelector('.form.pop-up')
    formCalls.forEach(call => {
        call.addEventListener('click', ()=>{
            formPopUp.classList.toggle('_open')
        })
    })

    let forms = document.querySelectorAll('.form')
    forms.forEach(form => {
        let data = form.querySelector('.form__data'),
            success = form.querySelector('.form__success'),
            closes = form.querySelectorAll('.form__close'),
            name = form.querySelector('._name'),
            phone = form.querySelector('._phone'),
            email = form.querySelector('._email'),
            checkbox = form.querySelector('._checkbox'),
            send = form.querySelector('._send')

        send.addEventListener('click', ()=>{
            checkForm(true)
            if (checkForm(true)){
                data.classList.remove('_active')
                success.classList.add('_active')
            }
        })
        name.addEventListener('input', ()=>{
            checkForm(false)
        })
        data.addEventListener('DOMSubtreeModified', ()=>{
            checkForm(false)
        })
        email.addEventListener('input', ()=>{
            checkForm(false)
        })
        checkbox.addEventListener('input', ()=>{
            checkForm(false)
        })

        if (closes){
            closes.forEach(close => {
                close.addEventListener('click', ()=>{
                    form.classList.remove('_open')
                })
            })
        }
        
        function checkForm(checking) {
            let status = true
            if (name.value == ''){
                status = false
                checking ? name.classList.add('_error') : ''
            }
            else {
                checking ? name.classList.remove('_error') : ''
            }
            
            if (phone.value == ''){
                status = false
                checking ? phone.classList.add('_error') : ''
            }
            else {
                checking ? phone.classList.remove('_error') : ''
            }

            if (!checkEmail(email)){
                status = false
                checking ? email.classList.add('_error') : ''
            }
            else {
                checking ? email.classList.remove('_error') : ''
            }

            if (!checkbox.querySelector('input').checked){
                status = false
                checking ? checkbox.classList.add('_error') : ''
            }
            else {
                checking ? checkbox.classList.remove('_error') : ''
            }


            if (status){
                send.classList.remove('_disabled')

            }
            else {
                send.classList.add('_disabled')
            }
            return status
        }
    })
    // === SLICK SLIDERS === \\
    if (window.matchMedia('(max-width: 360.1px)').matches){
        let youList = document.querySelector('.you__list'),
            youProgressbar = document.querySelector('.you__progressbar'),
            youItems = document.querySelectorAll('.you__item')
            
        youProgressbar.style.setProperty('--countSlides', youItems.length);

        $(youList).slick({
            arrows : false,
            dots: false,
            slidesToShow: 1,
            infinite: false
        })
        $('.you__list').on('afterChange', function(event, slick, currentSlide, nextSlide){
            youProgressbar.style.setProperty('--currentSlide', currentSlide);
        });
    }
    // === INPUT MASK === \\
    $('._phone').mask("+7 999 999 99 99")
    
    // === CHECK EMAIL === \\
    function checkEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email.value)){
            email.parentNode.classList.add('_error')
            email.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            return false
        }
        else{
            email.parentNode.classList.remove('_error')
            return true
        }
    }

    // === WIDGET === \\
    let widget = document.querySelector('.widget'),
        widgetMain = document.querySelector('.widget__main')

    widgetMain.addEventListener('click', ()=>{
        widget.classList.toggle('_active')
    })

    document.addEventListener('click', (e) => {
        let withinBoundaries = e.composedPath().includes(widget);
            
        if (!withinBoundaries) {
            widget.classList.remove('_open')
        }
    })
    document.onkeydown = function(e) {
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
            return false;
        }
        if(e.ctrlKey && e.keyCode == 'P'.charCodeAt(0)){
            return false;
        }
        if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
            return false;
        }
    }
    document.body.querySelectorAll('*').forEach(i => { i.style.userSelect = 'none' })
    document.ondragstart = noselect;document.onselectstart = noselect;document.oncontextmenu = noselect;function noselect(){return false;}
    // === DROPDOWN === \\
    let dropdowns = document.querySelectorAll('.dropdown') 
    dropdowns.forEach(item => dropdown(item))
    function dropdown(dropdown) {
        let title = dropdown.querySelector('.dropdown__title'),
            titleText = dropdown.querySelector('.dropdown__title_text'),
            items = dropdown.querySelectorAll('.dropdown__item')

        title.addEventListener('click', ()=>{ dropdown.classList.toggle('_open') })

        if (items) {
            items.forEach(item => {
                item.addEventListener('click', ()=>{
                    titleText.textContent = item.textContent
                    items.forEach(i => {  i.classList.remove('_active')  })
                    item.classList.add('_active')
                    dropdown.classList.remove('_open')
                })
            })
        }

        // document.addEventListener('click', (e) => {
        //     let withinBoundaries = e.composedPath().includes(dropdown);
                
            // if (!withinBoundaries) {
            //     dropdown.classList.contains('_open') ? dropdown.classList.remove('_open') : ''
            // }
        // })
    }
    
    // === TABS === \\
    // let tabs = document.querySelectorAll('.tabs')

    // tabs.forEach(item => {tabsCreater(item)})
    // function tabsCreater(tabs) {
    //     let tabsTitles = tabs.querySelectorAll('.tabs__title'),
    //         tabsItems = tabs.querySelectorAll('.tabs__item')

    //     tabsTitles.forEach(title => {
    //         title.addEventListener('click', ()=>{
    //             for (let n = 0; n < tabsTitles.length; n++){
    //                 if (tabsTitles[n] == title){
    //                     tabsTitles[n].classList.add('_active')
    //                     tabsItems[n].classList.add('_active')
    //                 }
    //                 else {
    //                     tabsTitles[n].classList.remove('_active')
    //                     tabsItems[n].classList.remove('_active')
    //                 }
    //             }
    //         })
    //     })
    // }

    // === RADIO BUTTONS === \\
    // let radios = document.querySelectorAll('.radio')

    // radios.forEach(item => {radio(item)})
    // function radio(radio) {
    //     let radioItems = radio.querySelectorAll('.radio__item')
    //     radioItems.forEach(item =>{
    //         item.addEventListener('click', ()=>{
    //             radioItems.forEach(i => {i.classList.remove('_active')})
    //             item.classList.add('_active')
    //         })
    //     })
    // }
})
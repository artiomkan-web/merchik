
let sliders = document.querySelectorAll('.slider')
sliders.forEach(slider => {  createSlider(slider)  })
function createSlider(slider) { 
    let sliderWrapper = slider.querySelector('.slider__wrapper'),
        sliderRow = slider.querySelector('.slider__row'),
        sliderItems = slider.querySelectorAll('.slider__item'),
        sliderProgress = slider.querySelector('.slider__progressbar'),
        sliderProgressDrag = slider.querySelector('.slider__progressbar-drag'),
        sliderNext = slider.querySelector('.slider__toggle-next'),
        sliderPrev = slider.querySelector('.slider__toggle-prev'), 
        sliderDots = slider.querySelectorAll('.slider__dots-item'),
        sliderCount = getComputedStyle(slider).getPropertyValue('--indents')*1,
        sliderIndents = getComputedStyle(slider).getPropertyValue('--indents').split('px')[0],
        sliderDrag = false,
        sliderSpeed = 1,
        sliderCoorX = 1,
        sliderOffsetLeft = 0,
        sliderIndex = 0

    sliderRow.style.height = sliderRow.offsetHeight + 'px'
    sliderProgressDrag ? sliderProgressDrag.style.width = ((1) / sliderItems.length * sliderProgress.offsetWidth).toFixed(2) + 'px' : ''

    if (sliderPrev){
        sliderPrev.addEventListener('click', ()=>{
            sliderIndex--
            toggleSlide()
        })
    }
    if (sliderNext){
        sliderNext.addEventListener('click', ()=>{
            sliderIndex++
            toggleSlide()
        })
    }
    if (sliderDots.length > 0){
        sliderDots.forEach(dot => {
            dot.addEventListener('click', ()=>{
                for (let n = 0; n < sliderDots.length; n++){
                    if (sliderDots[n] == dot){
                        sliderDots[n].classList.add('_active')
                        sliderIndex = n
                    }
                    else{
                        sliderDots[n].classList.remove('_active')
                    }
                }
                toggleSlide()
            })
        })
    }
    
    sliderRow.addEventListener('mousedown', function(e) {
        sliderDrag = true;
        sliderCoorX = e.pageX - this.offsetLeft;
        sliderRow.style.scrollBehavior = 'unset'
    });
    document.addEventListener('mouseup', function(e) {
        sliderDrag = false;
        sliderOffsetLeft = sliderRow.scrollLeft;
        if (sliderOffsetLeft-sliderWrapper.offsetWidth*sliderIndex > sliderWrapper.offsetWidth/8){
            sliderIndex++
        }
        else if (sliderOffsetLeft-sliderWrapper.offsetWidth*sliderIndex < -sliderWrapper.offsetWidth/8){
            sliderIndex-- 
        }
        else{}
        sliderRow.style.scrollBehavior = 'smooth'
        sliderOffsetLeft = sliderIndex*sliderWrapper.offsetWidth
        toggleSlide()
    });
    sliderRow.addEventListener('mousemove', function(e) {
        sliderDrag ? this.scrollLeft = sliderOffsetLeft + -1*((e.pageX - this.offsetLeft - sliderCoorX)*sliderSpeed) : ''
    });
    sliderRow.addEventListener('touchend', ()=>{
        let position = sliderRow.scrollLeft-sliderWrapper.offsetWidth*sliderIndex,
            width = sliderWrapper.offsetWidth/6
            
        if (position > width){
            sliderIndex++
        }
        else if (position < -width){
            sliderIndex-- 
        }
        toggleSlide()
    })
    
    function toggleSlide() {
        if (sliderIndex < 0){
            sliderIndex = sliderItems.length - 1;
        }
        if (sliderIndex > sliderItems.length - 1){
            sliderIndex = 0;
        }
        for (let n = 0; n < sliderItems.length; n++){
            if (n == sliderIndex){
                sliderItems[n].classList.add('_active')
                sliderProgressDrag ? sliderProgressDrag.style.left = sliderIndex*(100/sliderItems.length) + '%' : ''
                
            }
            else{
                sliderItems[n].classList.remove('_active')
            }
        }
        
        if (sliderNext){
            sliderIndex == sliderItems.length - 1 ? sliderNext.classList.add('_disabled') : sliderNext.classList.remove('_disabled')
        }
        if (sliderPrev){
            sliderIndex == 0 ? sliderPrev.classList.add('_disabled') : sliderPrev.classList.remove('_disabled')
        }
        if (sliderDots.length > 0){
            sliderDots.forEach(dot => dot.classList.remove('_active'))
            sliderDots[sliderIndex].classList.add('_active')
        }
        sliderProgressDrag ? sliderProgressDrag.style.left = sliderIndex*(100/sliderItems.length).toFixed(2) + '%' : ''


        sliderRow.scrollLeft = sliderWrapper.offsetWidth*sliderIndex/sliderCount + sliderIndents*sliderIndex
    }
}
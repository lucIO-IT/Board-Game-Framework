//https://codepen.io/thenutz/pen/VwYeYEE

function draggableScroll(item, velocity=2){
    // slider is the father container
    const slider = item;
    let isDown = false;
    let startX;
    let startY;
    let scrollLeft;
    let scrollTop;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      startY = e.pageY - slider.offsetTop;
      scrollLeft = slider.scrollLeft;
      scrollTop = slider.scrollTop;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const y = e.pageY - slider.offsetTop;
      const walk = (x - startX) * velocity; //scroll-fast
      const scroll = (y - startY) * velocity;
      slider.scrollLeft = scrollLeft - walk;
      slider.scrollTop = scrollTop - scroll;
    });
}

export {draggableScroll}
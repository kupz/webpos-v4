import gsap from "gsap";

const floating = (el) => {
  gsap.to(el, {
    y: -10,
    yoyo: true,
    duration: 2,
    repeat: -1,
  });
};

const slideFromTop = (el) => {
    gsap.from(el , {
        yPercent: -100 , 
        duration: 1.5, 
        opacity: 0
    })
}

const slideFromRight = (el) => {
    gsap.from(el , {
        xPercent: 100 , 
        duration: 1.5, 
        opacity: 0
    })
}

const slideFromLeft = (el) => {
    gsap.from(el , {
        xPercent: -100 , 
        duration: 1.5, 
        opacity: 0
    })
}



export { floating, slideFromTop, slideFromLeft, slideFromRight };

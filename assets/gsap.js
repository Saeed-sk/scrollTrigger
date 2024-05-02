let fistSlideAnimate = gsap.timeline();
fistSlideAnimate.fromTo($('.circle-clipPath'), {
    clipPath: "circle(0.1% at 60% 60%)",
}, {
    clipPath: "circle(100% at 60% 60%)",
    delay: 1,
    duration: 1
})

let logoSvg = $('.logo-svg>path')
fistSlideAnimate.from(logoSvg, {
    translateY: 200,
    stagger: 0.1,
    duration: 0.5,
    ease: "circ.out"
}, "-=1.3")

let logoSvgTitle = $('.logo-svg-title>g')
fistSlideAnimate.from(logoSvgTitle, {
    translateY: 200,
    stagger: 0.2,
    duration: 1,
    ease: "circ.out"
}, "<")

let logoImage = $('.logo-image>svg>g')
fistSlideAnimate.from(logoImage, {
    scale: 0,
    rotate: 200,
    transformOrigin: "center center"
}, "<")

let logoImageTitle = $('.logo-image h2,h4')
fistSlideAnimate.from(logoImageTitle, {
    translateX: 200,
    opacity: 0,
    stagger: 0.5
}, "<")

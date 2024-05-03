gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".smooth-scroll"),
    smooth: true
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".smooth-scroll", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    }
});
let video = document.getElementById('firstVideo');
let clipPaths = $('#clipPath').children()
gsap.to(clipPaths, {
    scrollTrigger: {
        scroller: ".smooth-scroll",
        scrub: true,
        trigger: "#pin-box",
        start: "100% 50%",
        end: "+=2000",
        toggleActions: "restart end reverse end",
    },
    stagger: -0.1,
    width: 0,
})
locoScroll.on('scroll', (args) => {

    if (typeof args.currentElements['hey'] === 'object') {
        let progress = args.currentElements['hey'].progress;
        if (progress > 0.4) {
            video.play();
        } else if (progress > 0.7) {
            video.currentTime = 0
            video.pause()
        }
    }
});

console.log($(".parallax")[0])
gsap.to($(".parallax")[0], {
    // scrollTrigger: {
    //     scroller: ".smooth-scroll",
    //     trigger:'#pin-box',
    //     // start:"100% 50%",
    //     // end:"+=2000",
    //     markers:true,
    //     // toggleActions:"restart end reverse end",
    // },
    translateX: '+=10'
})
// GSAP PARALLAX - INDIVIDUAL ELEMENTS (while sharing class)

let parallaxElements = Array.prototype.slice.call(document.querySelectorAll("section"));
let self = this;
// console.log(parallaxElements)
// get box or parallax element inside each section
// parallaxElements.forEach(function (self) {
//
//     let boxTop = self.querySelectorAll(".parallaxTop");
//     let box = self.querySelectorAll(".parallax");
//
//     // animate boxes at top of page (section already in viewport)
//     gsap.to(boxTop, {
//         scrollTrigger: {
//             scroller: ".smooth-scroll",
//             scrub: true,
//             trigger: self,
//             start: "top 0%",
//             end: "bottom 0%",
//         },
//         y: (i, target) => -innerHeight * target.dataset.speed,
//         ease: "none"
//     });
//
//     // animate boxes when the relevant section comes into viewport
//     gsap.to(box, {
//         scrollTrigger: {
//             scroller: ".smooth-scroll",
//             scrub: true,
//             trigger: self,
//             start: "top 100%",
//             end: "bottom 0%",
//         },
//         y: (i, target) => -innerHeight * target.dataset.speed,
//         ease: "none",
//
//     });
//
//
// });

////////////////////////////////////

// get pinned boxes and box width
let pinBoxes = $('.pin-box');
let pinBoxWidth = pinBoxes.width();
let windowWidth = $(window).innerWidth();
let pinWrap = $('.pin-wrap');
let pinWrapWidth = windowWidth * pinBoxes.length;

let horizontalScrollLength = (pinBoxes.length - 1) * windowWidth;

// give pin wrap a set width
$('.pin-wrap').width(pinWrapWidth);

gsap.to(".pin-wrap", {
    scrollTrigger: {
        scroller: ".smooth-scroll",
        scrub: true,
        trigger: "#sectionPin",
        pin: "#sectionPin",
        // anticipatePin: 1,
        start: "top top",
        end: pinWrapWidth
    },
    x: -horizontalScrollLength,
    ease: "none"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();
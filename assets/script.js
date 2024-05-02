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


// GSAP PARALLAX - INDIVIDUAL ELEMENTS (while sharing class)

// get sections
var parallaxElements = Array.prototype.slice.call(document.querySelectorAll("section"));
var self = this;
console.log(parallaxElements)
// get box or parallax element inside each section
parallaxElements.forEach(function(self) {

    var boxTop = self.querySelectorAll(".parallaxTop");
    var box = self.querySelectorAll(".parallax");

    // animate boxes at top of page (section already in viewport)
    gsap.to(boxTop, {
        scrollTrigger: {
            scroller: ".smooth-scroll",
            scrub: true,
            trigger: self,
            start: "top 0%",
            end: "bottom 0%",
        },
        y: (i, target) => -innerHeight * target.dataset.speed,
        ease: "none"
    });

    // animate boxes when the relevant section comes into viewport
    gsap.to(box, {
        scrollTrigger: {
            scroller: ".smooth-scroll",
            scrub: true,
            trigger: self,
            start: "top 100%",
            end: "bottom 0%",
        },
        y: (i, target) => -innerHeight * target.dataset.speed,
        ease: "none",

    });


});

////////////////////////////////////

// get pinned boxes and box width
var pinBoxes = $('.pin-box');
var pinBoxWidth = pinBoxes.width();
var windowWidth = $(window).innerWidth();
var pinWrap = $('.pin-wrap');
var pinWrapWidth = windowWidth * pinBoxes.length;

var horizontalScrollLength = (pinBoxes.length - 1) * windowWidth;

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
let scroll = document.querySelector('.smooth-scroll')
this.scroll.on('scroll', (args) => {
    // Get all current elements : args.currentElements
    if(typeof args.currentElements['hey'] === 'object') {
        let progress = args.currentElements['hey'].progress;
        console.log(progress);
        // ouput log example: 0.34
        // gsap example : myGsapAnimation.progress(progress);
    }
});
// $(document).ready(function () {
//     document.getElementById('scrollDiv').addEventListener('wheel', function (e) {
//         if (e.deltaY < 0) {
//             this.scrollLeft -= 300;
//         } else {
//             this.scrollLeft += 300;
//         }
//         e.preventDefault();
//     });
// });

// function scrollHorizontally(event) {
//     event.preventDefault();
//     const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
//     document.getElementById('scrollContainer').scrollLeft -= (delta * 200); // اسکرول با سرعت 40px
// }
let video = document.getElementById('firstVideo');

// function checkVideoInView() {
//     const windowHeight = window.innerHeight;
//     const elementTop = video.getBoundingClientRect().top;
//     const elementBottom = video.getBoundingClientRect().bottom;
//     if (elementBottom <= windowHeight) {
//         video.currentTime = 0;
//         video.play();
//     }
// }
//
// window.addEventListener("scroll", checkVideoInView);
//
//
// const scrollContainer = $(".horizontal-scroll")[0];
// const container = $(".horizontal-scroll-content")[0];
//
//
// let lastScrollTop = 0;
// $(scrollContainer).scroll(function (event) {
//     let containerLeft = container.getBoundingClientRect().x;
//     let currentScrollTop = $(this).scrollLeft();
//     let maskElem = $(".maskedElem")[0].scrollLeft + window.outerWidth;
//
//     if (maskElem > currentScrollTop) {
//         if (currentScrollTop > lastScrollTop) {
//             for (let child of $("#clipPath")[0].children) {
//                 let rectX = ($(child)[0].getBBox().x) + 100;
//                 if (rectX > containerLeft + (window.outerWidth / 2)) {
//                     gsap.to(child, {
//                         width: "-=10px"
//                     })
//                 }
//             }
//         } else if (currentScrollTop <= lastScrollTop) {
//             for (let child of $("#clipPath")[0].children) {
//                 let rectX = ($(child)[0].getBBox().x) + 100;
//                 if (rectX > containerLeft + (window.outerWidth / 2)) {
//                     gsap.to(child, {
//                         width: "5%"
//                     })
//                 }
//             }
//         }
//     }
//     let imageParent = $(".parallax")
//     for (let imageParentElement of imageParent) {
//         gsap.to(imageParentElement,{
//             scrollTrigger:{
//                 trigger:scrollContainer,
//                 toggleActions:"restart pause reverse pause",
//                 markers:true
//             },
//             x:100,
//         })
//     }
//     lastScrollTop = currentScrollTop;
// });

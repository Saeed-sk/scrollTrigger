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

let parallaxes = $('.parallax');
let index = 1;
for (let parallax of parallaxes) {
    let percent = index * 210;
    gsap.to(parallax, {
        scrollTrigger: {
            scroller: ".smooth-scroll",
            scrub: true,
            trigger: $(".pin-box"),
            start: `${percent}% 100%`,
            end: "+=150%",
            markers: true,
            toggleActions: "restart end reverse end",
        },
        translateX: "+=50"
    })
    index++;
}


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
        start: "top top",
        end: pinWrapWidth,
        toggleActions: "restart end reverse end",
    },
    x: -horizontalScrollLength,
    ease: "none"
});
let pinBoxW = pinBoxes.width()
gsap.from($(".boxLines>path"), {
    scrollTrigger: {
        trigger: "#sectionPin",
        scroller: ".smooth-scroll",
        start: (pinBoxW * 3) + pinBoxW / 1.8,
        end: pinBoxW * 4,
        scrub: true
    },
    strokeDashoffset: 1000
})
for (let textLine of $(".boxLines>path.textLine")) {
    gsap.from(textLine, {
        scrollTrigger: {
            trigger: "#sectionPin",
            scroller: ".smooth-scroll",
            start: (pinBoxW * 3) + pinBoxW / 1.8,
            end: pinBoxW * 4,
            scrub: true
        },
        y: -100,
        opacity: 0,
    })
}
for (let circles of $(".boxLines>circle")) {
    gsap.from(circles, {
        scrollTrigger: {
            trigger: "#sectionPin",
            scroller: ".smooth-scroll",
            start: (pinBoxW * 3) + pinBoxW / 2,
            end: pinBoxW * 4,
            scrub: true
        },
        scale: 0
    })
}
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

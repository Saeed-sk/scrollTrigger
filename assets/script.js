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

let clipPaths = $('#clipPath>rect');
gsap.to(clipPaths, {
    scrollTrigger: {
        trigger: "#sectionPin",
        scroller: ".smooth-scroll",
        scrub: true,
        start: (pinBoxW / 2) + 100,
        end: "+=100%",
        toggleActions: "restart end reverse end",
    },
    stagger: -0.1,
    width: 0,
})

for (let circles of $(".boxLines>circle")) {
    gsap.from(circles, {
        scrollTrigger: {
            trigger: "#sectionPin",
            scroller: ".smooth-scroll",
            start: (pinBoxW * 3) + (pinBoxW * 0.4),
            end: "+=50%",
            scrub: true
        },
        scale: 0,
    })
}

gsap.from($(".boxLines>path"), {
    scrollTrigger: {
        trigger: "#sectionPin",
        scroller: ".smooth-scroll",
        start: (pinBoxW * 3) + (pinBoxW * 0.4),
        end: "+=50%",
        scrub: true
    },
    strokeDashoffset: 1000
})
for (let textLine of $(".boxLines>path.textLine")) {
    gsap.from(textLine, {
        scrollTrigger: {
            trigger: "#sectionPin",
            scroller: ".smooth-scroll",
            start: (pinBoxW * 3) + (pinBoxW * 0.4),
            end: "+=50%",
            scrub: true
        },
        y: -100,
        opacity: 0,
    })
}
let iconScale = gsap.timeline({
    scrollTrigger: {
        trigger: "#sectionPin",
        scroller: ".smooth-scroll",
        start: (pinBoxW * 3) + (pinBoxW * 0.4),
        end: "+=50%",
        scrub: true,
    }
})
iconScale.from($(".boxAnimate .iconSvg"), {
    scale: 0,
    duration: 1
})

let iconScale2 = gsap.timeline({
    scrollTrigger: {
        trigger: "#sectionPin",
        scroller: ".smooth-scroll",
        start: (pinBoxW * 3) + (pinBoxW),
        end: "+=150%",
        scrub: true,
    }
})

iconScale2.to($(".boxAnimate .iconSvg"), {
    scale: "+=6",
    translateX: (pinBoxW * 0.8) + "px",
    translateY: -(pinBoxes.height() / 4) + "px",
});
let slidesAnimate = gsap.timeline({
    scrollTrigger: {
        trigger: "#sectionPin",
        scroller: ".smooth-scroll",
        start: (pinBoxW * 4) + (pinBoxW * 0.5),
        end: "+=280%",
        scrub: true,
    }
})

slidesAnimate.from($(".pin-box .animated"), {
    translateX: -pinBoxW * 0.7,
    rotationY: 500,
    stagger: -0.1,
    opacity: 0,
    ease: "circ.out"
})
////////////////////////////////////////////////////////////////
let imagesAnimate = gsap.timeline({
    scrollTrigger: {
        scroller: ".smooth-scroll",
        pin: ".imagesPin",
        start: "0 0",
        end: "+=500%",
        scrub: true,
        toggleActions: "restart end reverse end",
    }
})
imagesAnimate.to($(".smallImage1"), {
    scale: 1,
    translateY: 0.5
})

imagesAnimate.from($("#bgImageClipPath2>rect"), {
    transformOrigin: "100% 100%",
    width: 0,
    stagger: -0.09
})

imagesAnimate.to($(".smallImage2"), {
    clipPath: "inset(0 0.01% 0 0)",
}, "<1")

imagesAnimate.to($(".smallImage1"), {
    scale: 1.3,
    translateY: 0.5
},"<")

imagesAnimate.from($("#bgImageClipPath3>rect"), {
    transformOrigin: "100% 100%",
    width: 0,
    stagger: -0.09
})

imagesAnimate.to($(".smallImage3"), {
    clipPath: "inset(0 0.01% 0 0)",
}, "<1")


//////////////////////////////////////////////////////////////
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

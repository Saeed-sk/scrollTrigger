$(document).ready(function () {
    document.getElementById('scrollDiv').addEventListener('wheel', function (e) {
        if (e.deltaY < 0) {
            this.scrollLeft -= 300;
        } else {
            this.scrollLeft += 300;
        }
        e.preventDefault();
    });
});

let video = document.getElementById('firstVideo');

function checkVideoInView() {
    const windowHeight = window.innerHeight;
    const elementTop = video.getBoundingClientRect().top;
    const elementBottom = video.getBoundingClientRect().bottom;
    if (elementBottom <= windowHeight) {
        video.currentTime = 0;
        video.play();
    }
}

window.addEventListener("scroll", checkVideoInView);


const scrollContainer = $(".horizontal-scroll")[0];
const container = $(".horizontal-scroll-content")[0];


let lastScrollTop = 0;
$(scrollContainer).scroll(function (event) {
    let containerLeft = container.getBoundingClientRect().x;
    let currentScrollTop = $(this).scrollLeft();
    let maskElem = $(".maskedElem")[0].scrollLeft + window.outerWidth;

    if (maskElem > currentScrollTop) {
        if (currentScrollTop > lastScrollTop) {
            for (let child of $("#clipPath")[0].children) {
                let rectX = ($(child)[0].getBBox().x) + 100;
                if (rectX > containerLeft + (window.outerWidth / 2)) {
                    gsap.to(child, {
                        width: "-=10px"
                    })
                }
            }
        } else if (currentScrollTop <= lastScrollTop) {
            for (let child of $("#clipPath")[0].children) {
                let rectX = ($(child)[0].getBBox().x) + 100;
                if (rectX > containerLeft + (window.outerWidth / 2)) {
                    gsap.to(child, {
                        width: "5%"
                    })
                }
            }
        }
    }
    let imageParent = $(".parallax")
    for (let imageParentElement of imageParent) {
        gsap.to(imageParentElement,{
            scrollTrigger:{
                trigger:scrollContainer,
                toggleActions:"restart pause reverse pause",
                markers:true
            },
            x:100,
        })
    }
    lastScrollTop = currentScrollTop;
});

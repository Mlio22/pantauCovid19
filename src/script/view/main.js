const connTimeout = 1000;

const pingUrl = "https://res.cloudinary.com/dv2l54jwg/raw/upload/v1588321529/hi_fb6klp.js";

function checkConnectivity() {
    const controller = new AbortController();
    const { signal } = controller;

    const to3 = setTimeout(() => {
        console.log("RTO");
        document.querySelector("header-bar").connectivity = false;
        controller.abort();
        return 0;
    }, connTimeout);

    fetch(pingUrl, {
            signal,
            cache: "no-store"
        }).then(response => {
            document.querySelector("header-bar").connectivity = response.status == 200 ? true : false;
            clearTimeout(to3);
            return 0;
        })
        .catch(_ => {
            controller.abort();
            document.querySelector("header-bar").connectivity = false;
            return 0;
        });
}

// const int1 = setInterval(checkConnectivity, 5000);

window.addEventListener("resize", function() {
    if (window.innerWidth > window.innerHeight) {
        fetch("src/script/components/header-bar.js")
            .then(_ => {
                console.log("halo");
            });
    }
});

document.querySelector(".headerTextContainer").addEventListener("click", function() {
    var elem = document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
})

// debug tools

// window.addEventListener("resize", _ => {
//     console.log("size changed");


// });
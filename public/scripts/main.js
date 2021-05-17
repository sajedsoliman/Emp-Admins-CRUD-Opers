// header on scroll
const appHeader = document.getElementById("app-header");
const rightSideContent = document.getElementsByClassName("makeStyles-content-4")[0];

rightSideContent.addEventListener("scroll", () => {
    if (rightSideContent.scrollTop > 0) {
        appHeader.classList.add("scrolled")
    } else {
        appHeader.classList.remove("scrolled")
    }
})
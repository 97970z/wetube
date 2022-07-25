const videoContent = document.getElementById("videoContent");
const moreBtn = document.getElementById("moreBtn");

const handleMoreContent = () => {
  if (moreBtn.textContent === "간략히") {
    videoContent.classList.remove("more");
    moreBtn.innerText = "더보기";
  } else {
    videoContent.classList.add("more");
    moreBtn.innerText = "간략히";
  }
};

moreBtn.addEventListener("click", handleMoreContent);

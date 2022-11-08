const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");
const deleteBtns = document.querySelectorAll(".video__comment__deleteBtn");
const cc = document.querySelectorAll(".commentCount");

const likeBtn = document.querySelector(".video__likeBtn");
const likeIcon = document.querySelector(".video__likeBtn i");
const likeCount = document.querySelector(".video__likeCount");

let commentRender = document.querySelectorAll(".video__comment");
let commnetCount = commentRender.length;

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;

  const newCommentLeft = document.createElement("div");
  newCommentLeft.className = "video__comment--left";

  const newCommentUserInfo = document.createElement("div");
  newCommentUserInfo.className = "video__comment--spans";

  const span = document.createElement("a");
  span.href = `/users/${id}`;
  span.innerText = `${form.dataset.username}`;

  const span3 = document.createElement("span");
  span3.className = "video__comment--left--date";
  span3.innerText = new Date().toLocaleDateString("ko-kr").replaceAll(" ", "");

  const span2 = document.createElement("span");
  span2.innerText = text;

  const span4 = document.createElement("span");
  span4.className = "video__likeBtn";
  // span4가 생성될때마다 id가 달라져야함
  span4.dataset.id = id;

  const icon = document.createElement("i");
  icon.className = "fa-regular fa-thumbs-up";

  const deleteSpan = document.createElement("span");
  deleteSpan.className = "video__comment__deleteBtn";
  deleteSpan.innerText = `❌`;

  newCommentLeft.appendChild(span);
  newCommentLeft.appendChild(span3);
  newCommentUserInfo.appendChild(span2);
  newCommentUserInfo.appendChild(span4);
  span4.appendChild(icon);
  newComment.appendChild(newCommentLeft);
  newCommentLeft.appendChild(newCommentUserInfo);
  newComment.appendChild(deleteSpan);
  videoComments.prepend(newComment);
  deleteSpan.addEventListener("click", handleDeleteComment);
};

// 좋아요 버튼 클릭하면 아이콘 변경
const handleLike = async (event) => {
  // 한번 누르면 fa-solid.fa-thumbs-up로 변경
  // if (likeIcon.classList.contains("fa-regular")) {
  //   likeIcon.classList.remove("fa-regular");
  //   likeIcon.classList.add("fa-solid");
  // } else {
  //   likeIcon.classList.remove("fa-solid");
  //   likeIcon.classList.add("fa-regular");
  // }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text === "") {
    return;
  }

  let commentRender = document.querySelectorAll(".video__comment");
  let commentCount = commentRender.length + 1;
  cc.forEach((cc) => (cc.innerHTML = `댓글 ${commentCount} 개`));

  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDeleteComment = async (event) => {
  console.log("click!");
  const videoId = videoContainer.dataset.id;
  const li = event.srcElement.parentNode;
  const {
    dataset: { id },
  } = li;

  let commentRender = document.querySelectorAll(".video__comment");
  let commentCount = commentRender.length - 1;
  cc.forEach((cc) => (cc.innerHTML = `댓글 ${commentCount} 개`));

  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ videoId }),
  });
  if (response.status === 200) {
    li.remove();
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
if (deleteBtns) {
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", handleDeleteComment);
  });
}
if (likeBtn) {
  likeBtn.addEventListener("click", handleLike);
}

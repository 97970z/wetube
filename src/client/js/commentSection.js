const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");
const deleteBtns = document.querySelectorAll(".video__comment__deleteBtn");

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
  span.innerText = `${form.dataset.username} `;

  const span3 = document.createElement("span");
  span3.innerText = new Date().toLocaleDateString("ko-kr").replaceAll(" ", "");

  const span2 = document.createElement("span");
  span2.innerText = text;

  const deleteSpan = document.createElement("span");
  deleteSpan.className = ".video__comment__deleteBtn";
  deleteSpan.innerText = `❌`;

  // newCommentLeft.appendChild(icon);
  newCommentUserInfo.appendChild(span);
  newCommentUserInfo.appendChild(span3);
  newCommentUserInfo.appendChild(span2);
  newCommentLeft.appendChild(newCommentUserInfo);
  newComment.appendChild(newCommentLeft);
  newComment.appendChild(deleteSpan);
  videoComments.prepend(newComment);
  deleteSpan.addEventListener("click", handleDeleteComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text === "") {
    return;
  }
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

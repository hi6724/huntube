import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtns = document.querySelectorAll(".deleteBtn");
const addComment = (text, newCommentId) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = newCommentId;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = ` ❌`;
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);

  videoComments.prepend(newComment);
  span2.addEventListener("click", (event) => handleDelete(newCommentId));
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

const handleDelete = async (id) => {
  await fetch(`/api/comment/${id}`, {
    method: "POST",
  });
  const comments = document.querySelectorAll(".video__comment");
  comments.forEach((comment) => {
    if (comment.dataset.id === id) {
      comment.remove();
    }
  });
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
deleteBtns.forEach((deleteBtn) => {
  const { id } = deleteBtn.dataset;
  deleteBtn.addEventListener("click", (event) => handleDelete(id));
});

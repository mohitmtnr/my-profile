import React from "react";
export default function RemoveElements(e) {
  const btn = e.target;
  e.stopPropagation();
  const confirm = window.confirm("Would you really like to remove the card?");
  if (confirm) {
    const card = btn.closest(".element-card");
    const targetApi = card.getAttribute("data-name");
    const id = card.id;
    deleteFromBackend(targetApi, id);
    card.classList.add("disappearing-effect");
    setTimeout(() => {
      card.remove();
    }, 400);
  }
}

const deleteFromBackend = (collection, id) => {
  const url = `http://localhost:5000/profile/${collection}/delete${collection}/${id}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authToken: localStorage.getItem("authToken"),
    },
  })
    .then((res) => res.json())
    .then((jsonRes) => console.log(jsonRes))
    .catch((error) => console.log(error));
};

const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export { checkResponse };

function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: headers,
  }).then(checkResponse);
}

export { getItems };

function postItems({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(checkResponse);
}

export { postItems };

function deleteItems(item) {
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: headers,
  }).then(checkResponse);
}

export { deleteItems };

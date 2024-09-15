const BASE_URL = "http://localhost:8081/todos";

export function getTodos() {
    return fetch(BASE_URL);
}

export async function addTodo(payload) {
    return fetch("http://localhost:8081/todos", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            'content-type': "application/json"
        }
    });
}


export function updateTodoState(id, state) {
    const url = `${BASE_URL}/${id}/state/${state}`
    return fetch(url, { method: "PATCH" });
}

export function removeTodos() {
    return fetch(BASE_URL + "/all", { method: "DELETE" });
}
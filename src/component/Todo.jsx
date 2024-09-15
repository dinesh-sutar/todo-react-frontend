import { updateTodoState } from "../service/TodoService";

function Todos({ todos }) {
    async function completeStateChange(id, state) {
        try {
            const response = await updateTodoState(id, state);
            if (response.status == 200) {
                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <section className="mt-4 max-h-24 overflow-y-auto">
            {todos.map(todo =>
                <div className="flex gap-4 align-middle" key={todo.id}>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => completeStateChange(todo.id, !todo.completed)} />
                    <p className={todo.completed ? "line-through" : ""}>{todo.title}</p>
                </div>
            )}
        </section>
    );
}

export default Todos;
import { useState } from "react";
import { removeTodos } from "../service/TodoService";

function TodoMenu({ filterTodos, selectedMenu, setSelectedMenu, fetchTodos }) {
    const [disabled, setDisabled] = useState(false);
    const [clearBtnText, setClearBtnText] = useState("Clear All");
    async function onClearAll(event) {
        setDisabled(state => true);
        setClearBtnText(state => "Removing...");
        try {
            const response = await removeTodos();
            if (response.status == 200) {
                fetchTodos();
                setDisabled(state => false);
                setClearBtnText(state => "Clear All");
            } else {
                console.error("Something went wrong");

            }
        } catch (error) {
            console.error(error);

        }
    }
    return (
        <section className="mt-4 flex justify-between">
            <div className="flex gap-3">
                <button onClick={() => {
                    filterTodos("ALL")
                    setSelectedMenu('ALL');
                }} className={`${selectedMenu == "ALL" ? "text-blue-500" : ""}`}>All</button>

                <button onClick={() => {
                    filterTodos("PENDING")
                    setSelectedMenu('PENDING');
                }} className={`${selectedMenu == "PENDING" ? "text-blue-500" : ""}`}>Pending</button>

                <button onClick={() => {
                    filterTodos("COMPLETED")
                    setSelectedMenu('COMPLETED');
                }} className={`${selectedMenu == "COMPLETED" ? "text-blue-500" : ""}`}>Completed</button>
            </div>
            <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-orange-600"
                disabled={disabled}
                onClick={onClearAll}
            >{clearBtnText}</button>
        </section>
    );
}

export default TodoMenu;
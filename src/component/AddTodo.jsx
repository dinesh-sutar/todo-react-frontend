function AddTodo({ onSubmit, disabled }) {
    const submitText = disabled ? "Send..." : "add";
    return (
        <section className="mt-4">
            <form onSubmit={onSubmit} className="flex justify-between gap-1">
                <input type="text" name="title" placeholder="Add a new Task" />
                <input type="submit" value={submitText} className="" disabled={disabled} />
            </form>
        </section>
    );
}

export default AddTodo;
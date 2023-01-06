function loadTask() {

    if (localStorage.getItem('state') == null) return {
        value: "",
        list: [],
        currentList: null,
        count: 0,
    }
    else return JSON.parse(localStorage.getItem('state'));

}

function loadDate(date) {
    date = date.toString();
    return {
        day: date.substring(8, 10),
        month: date.substring(5, 7),
        year: date.substring(0, 4)
    }
}

function addTask(setState, state) {
    ///const a = loadDate(new Date());
    const date = new Date()
    setState((prevProps) => ({
        ...prevProps,
        count: state.count + 1,
        list: [...state.list, { text: state.value, id: state.count, done: false, date: loadDate(date.toJSON()) }],
    }))
}

function deleteTask(setState, state, id) {
    setState((prevProps) => ({
        ...prevProps,
        list: state.list.filter(item => item.id !== id),
    }))
}

function doneTask(setState, state, id) {

    setState((prevProps) => ({
        ...prevProps,
        list: state.list.map(item => {
            if (item.id == id) {
                //item.done = !item.done;
                console.log(item)
                return { ...item, done: !item.done };
            } else {
                return item;
            }
        })
    }))
}

function editTask(event, setState, state, id) {
    setState((prevProps) => ({
        ...prevProps,
        list: state.list.map(item => {
            if (item.id == id) {
                item.text = event.target.value;
                console.log(event.target.value)
                return item;
            } else {
                console.log(event.value)
                return item;
            }
        })
    }))
}

module.exports={deleteTask,doneTask,editTask,addTask,loadTask,loadDate}
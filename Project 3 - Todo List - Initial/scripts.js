
const toDoList = {

    data() {
        return {
            todos: [], 
            newToDo: {
                done: false
            }
        }
    },
    methods: {
        addToDo: function() {
            if (this.newToDo.text){
                this.todos.push(this.newToDo);
                this.newToDo = {
                    done: false
                };
                localStorage.setItem("todos", JSON.stringify(this.todos));
            } else {
                alert("You must enter an item")
            }
        }   
    },
    created() {
        this.todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : this.todos;
    },
    updated() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

};

Vue.createApp(toDoList).mount('#app');
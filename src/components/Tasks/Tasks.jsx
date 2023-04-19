import {useState, useEffect} from 'react'
import TasksForm from '../TasksForm/TasksForm'
import TasksList from '../TasksList/TasksList'
import {onGetPosts} from '../../api/post'
import css from './Tasks.module.css'

const Tasks = () => {
    const [input, setInput] = useState({
        title: '',
        description: '', 
        completed: false,
        user_of_creation: 'Test' 
    })
    const [todos, setTodos] = useState([])
    const [editTodo, setEditTodo] = useState(null)

    const getAllPosts = async () => {
        try {
            const {data} = await onGetPosts()
            setTodos(data.posts)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        getAllPosts()
    }, [])

    return  (
        <>
            <h1 className={css.h1}>
                Какие планы на сегодняшний день?
            </h1>

            <TasksForm 
                input={input} 
                setInput={setInput} 
                todos={todos} 
                setTodos={setTodos} 
                editTodo={editTodo} 
                setEditTodo={setEditTodo} 
            />

            {todos.length ? 
                <TasksList 
                    todos={todos} 
                    setTodos={setTodos} 
                    setEditTodo={setEditTodo}
                /> : 
                <div className={css.empty}>
                    Список заданий пуст...
                </div>
            }
        </>
    )
}

export default Tasks

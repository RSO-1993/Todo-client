import {useState} from 'react'
import {TbCheckbox, TbEdit, TbTrash} from 'react-icons/tb'
import {onCompletedPost, onDeletePost} from '../../api/post'
import css from './TasksList.module.css'

const TasksList = ({todos, setTodos, setEditTodo}) => {

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleComplete = async (todo) => {
        try {
            const {data} = await onCompletedPost(
                todo.id, {completed: !todo.completed}
            )
            setError('')
            setSuccess(data.message)
            setTodos(
                todos.map((item) => {
                    if (item.id === todo.id) {
                        return {...item, completed: !item.completed}
                    }
                    return item
                })
            )
        } catch (error) {
            setError(error.response.data.errors[0].msg)
            setSuccess('')
        }
    }

    const handleEdit = ({id}) => {
        setEditTodo(todos.find((todo) => todo.id === id))
    }

    const handleDelete = async ({id}) => {
        try {
            const {data} = await onDeletePost(id)
            setError('')
            setSuccess(data.message)
            setTodos(todos.filter((todo) => todo.id !== id))
        } catch (error) {
            setError(error.response.data.errors[0].msg)
            setSuccess('')
        }
    }
    
    return (
        <div>
            <div className={
                    error ? 
                    [css.tasks__message, css.error].join(' ') : 
                    [css.tasks__message, css.success].join(' ')
            }>
                {error || success}
            </div>

            {todos.map((todo, index) => (
                <div 
                    className={
                        todo.completed ? 
                        [css.tasks__row, css.completed].join(' ') : 
                        css.tasks__row
                    } 
                    key={index}
                >
                    <div key={todo.id}>
                        <div className={css.tasks__text_header}>
                            <span>{index + 1}. {todo.title}</span>
                            <span>
                                {new Date(todo.date_of_creation).toLocaleString('en-US')}
                            </span>
                        </div>
                        <div className={css.tasks__text_content}>
                            {todo.description}
                        </div>
                    </div>

                    <div className={css.tasks__icons_footer}>
                        <TbCheckbox 
                            className={css.icon_completed} 
                            onClick={() => handleComplete(todo)} 
                        />
                        <TbEdit 
                            className={css.icon_edit} 
                            onClick={() => handleEdit(todo)} 
                        />
                        <TbTrash 
                            className={css.icon_delete} 
                            onClick={() => handleDelete(todo)} 
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TasksList

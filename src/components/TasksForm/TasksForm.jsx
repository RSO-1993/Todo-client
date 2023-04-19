import {useEffect, useState} from 'react'
import {onCreatePost, onUpdatePost, onGetPosts} from '../../api/post'
import css from './TasksForm.module.css'

const TasksForm = ({input, setInput, todos, setTodos, editTodo, setEditTodo}) => {

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const getAllPosts = async () => {
        try {
            const {data} = await onGetPosts()
            setTodos(data.posts)
        } catch (error) {
            console.log(error.response)
        }
    }

    const updateTodo = (id, title, description, completed) => {
        setTodos(todos.map((todo) => 
            todo.id === id ? {id, title, description, completed} : todo
        ))
        setEditTodo('')
    }

    useEffect(() => {
        if (editTodo) {
            setInput({
                title: editTodo.title, 
                description: editTodo.description
            })
        } else {
            setInput({
                title: '', 
                description: '', 
                completed: false, 
                user_of_creation: 'Test' 
            })
        }
        getAllPosts()
    }, [setInput, editTodo])
    
    const onInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!editTodo) {
                const {data} = await onCreatePost(input)
                setError('')
                setSuccess(data.message)
                setTodos([...todos, {
                    title: input.title,
                    description: input.description, 
                    completed: false,
                    user_of_creation: 'Test' 
                }])
                setInput({
                    title: '', 
                    description: '', 
                    completed: false, 
                    user_of_creation: 'Test'
                })
            } else {
                const {data} = await onUpdatePost(editTodo.id, input)
                setError('')
                setSuccess(data.message)
                updateTodo(
                    editTodo.id, 
                    input.title, 
                    input.description, 
                    editTodo.completed
                )
            }
            getAllPosts()
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

            <form onSubmit={(e) => onFormSubmit(e)}>
                <input 
                    type='text' 
                    placeholder='Название' 
                    className={
                        editTodo ? 
                        [css.tasks__input, css.edit].join(' ') : 
                        css.tasks__input
                    }
                    name='title'
                    value={input.title} 
                    required
                    onChange={(e) => onInputChange(e)}
                />

                <input 
                    type='text' 
                    placeholder='Описание' 
                    className={
                        editTodo ? 
                        [css.tasks__input, css.edit].join(' ') : 
                        css.tasks__input
                    }
                    name='description'
                    value={input.description} 
                    required
                    onChange={(e) => onInputChange(e)}
                />
                
                <button 
                    type='submit' 
                    className={
                        editTodo ? 
                        [css.tasks__button, css.edit].join(' ') : 
                        css.tasks__button
                    }
                >{editTodo ? 'Сохранить' : 'Добавить'}</button>
            </form>
        </div>
    )
}

export default TasksForm

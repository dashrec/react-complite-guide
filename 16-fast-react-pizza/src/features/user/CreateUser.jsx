import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateName } from './userSlice'
import { useNavigate } from 'react-router-dom'

function CreateUser() {
    const [username, setUsername] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        if (!username) return

        dispatch(updateName(username)) // this username will become a payload and will be assigned to state.username
        navigate('/menu')
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>👋 Welcome! Please start by telling us your name:</p>

            <input
                type="text"
                placeholder="Your full name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            {username !== '' && (
                <div>
                    <button>Start ordering</button>
                </div>
            )}
        </form>
    )
}

export default CreateUser

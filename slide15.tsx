import axios from 'axios'
import * as React from 'react'
import { transition, exec, transform } from './react-states'

/*
    #15: Rendering states
*/

const MyComponent = () => {
    const [todos, dispatch] = React.useReducer((todos, action) => transition(todos, action, {
        NOT_LOADED: {
            FETCH_TODOS: () => ({ state: 'LOADING'})
        },
        LOADING: {
            FETCH_TODOS_SUCCESS: ({ data }) => ({ state: 'LOADED', data }),
            FETCH_TODOS_ERROR: ({ error }) => ({ state: 'ERROR', error })
        },
        LOADED: {},
        ERROR: {}
    }), { state: 'NOT_LOADED' })

    React.useEffect(() => exec(todos, {
        LOADING: () => {
            axios.get('/todos')
                .then(response => {
                    dispatch({ type: 'FETCH_TODOS_SUCCESS', data: response.data })
                })
                .catch(error => {
                    dispatch({ type: 'FETCH_TODOS_ERROR', error: error.message })
                })
        }
    }), [todos])

    return (
        <div>

        </div>
    )
}
import { GET_CARDS, GET_CARDS_ERROR } from '../initialState'
import axios from 'axios'

export const getCards = () => async dispatch => {
    try {
        const { data } = await axios.get('https://api.pokemontcg.oi/v1/')
        dispatch({
            type: GET_CARDS,
            payload: data
        })
    }
    catch(e) {
        dispatch({
            type: GET_CARDS_ERROR,
            payload: console.warn(e)
        })
    }
}
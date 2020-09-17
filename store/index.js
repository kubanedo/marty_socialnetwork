import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            isChatActive: false,
            loggedUser: {
                userId: 0,
                firstName: 'Nezalogovaný',
                lastName: 'Uživatel',
                sex: 'm',
                points: 0
            }
        }),
        getters: {
            getloggedUserWholeName: state => {
              return state.loggedUser.firstName + " " + state.loggedUser.lastName;
            }
        },        
        mutations: {
            login: (state, payload) => {
                state.loggedUser = {
                    userId: 0,
                    points: 0,
                    ...payload
                }
            },
            changePoints: (state, payload) => {
                state.loggedUser.points = state.loggedUser.points + payload;
            },
            toggleChatActivness: state => {
                state.isChatActive = !state.isChatActive
            }            
        }
    });
}        
export default createStore
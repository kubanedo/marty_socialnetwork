/*export const state = () => ({
        isChatActive: false           
});

export const mutations = () => ({
    toggleChatActivness: state => {
        state.isChatActive = !state.isChatActive
    }
});*/
import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            isChatActive: false
        }),
        mutations: {
            toggleChatActivness: state => {
                state.isChatActive = !state.isChatActive
            }            
        }
    });
}        
export default createStore
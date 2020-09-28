import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            startTimestamp: new Date().getTime(),
            openedChat: null,
            loggedUser: {
                userId: "me",
                profileImg: 'http://jakubnedorost.cz/marty/images/profiles/me/profileimg.jpg',
                first_name: 'Nezalogovaný',
                last_name: 'Uživatel',
                sex: 'm',
                points: 0
            },
            chats: [],
            posts: [],
            comments: []
        }),
        getters: {
            getloggedUserWholeName: state => {
              return state.loggedUser.first_name + " " + state.loggedUser.last_name;
            }
        },        
        mutations: {
            login: (state, payload) => {
                state.loggedUser = {
                    userId: "me",
                    profileImg: 'http://jakubnedorost.cz/marty/images/profiles/me/profileimg.jpg',
                    points: 0,
                    ...payload
                }
            },
            changePoints: (state, payload) => {
                state.loggedUser.points = state.loggedUser.points + payload;
            },
            openChat: (state, payload) => {
                state.openedChat = payload;
            },
            closeChat: state => {
                state.openedChat = null;
            }            
        }
    });
}        
export default createStore
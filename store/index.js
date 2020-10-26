import Vuex from 'vuex'
import axios from 'axios'

const saveGame = (gameId, state) => {
    axios.post("https://jakubnedorost.cz/marty/api/save/?game_id=" + gameId, state)
        .then(response => console.log(response))  
}

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            startTimestamp: new Date().getTime(),
            gameVersion: 0,
            loggedUser: {
                game_id: 0,
                userId: "me",
                profileImg: 'http://jakubnedorost.cz/marty/images/profiles/me/profileimg.jpg',
                first_name: 'Nezalogovaný',
                last_name: 'Uživatel',
                sex: 'm',
                points: 0
            },
            chats: [{}],
            myPosts: [],
            othersPosts: [],
            myComments: {},
            othersComments: {},            
            savedPosts: [],
            reportedPosts: [],
            answeredQuizActions: [],
            myFriends: ['eliskasvob', 'jnovak'],
            myLikedPages: ['malltv'],
            /* App components state */
            openedChat: null,
            modalWindow: null            
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
            loadGame: (state, loadedState) => {
                Object.assign(state, loadedState);
               /* $nuxt.$router.push('/')*/
            },          
            postNewPost: (state, newPostObj) => {
                state.myPosts.unshift(newPostObj);
                saveGame(state.loggedUser.game_id, state);
            },
            deletePost: (state, post_id) => {
                let arrayPos;
                state.myPosts.forEach((item, index) => {
                    if(item.post_id==post_id) {
                        arrayPos = index;
                    }
                });
                if(arrayPos !== undefined) {
                    state.myPosts.splice(arrayPos, 1);
                } 
                saveGame(state.loggedUser.game_id, state);  
            }, 
            updatePost: (state, payload) => {
                let arrayPos;
                let storeProperty = (payload.posted_by=='me') ? 'myPosts' : 'othersPosts';
                state[storeProperty].forEach((item, index) => {
                    if(item.post_id==payload.post_id) {
                        arrayPos = index;
                    }
                });
                if(arrayPos !== undefined) {
                    state[storeProperty][arrayPos] = {
                        ...state[storeProperty][arrayPos],
                        ...payload
                    };
                } else {
                    state[storeProperty].push({
                        ...payload
                    });
                }
                saveGame(state.loggedUser.game_id, state);                    
            },
            savePost: (state, post_id) => {
                let posInArray = state.savedPosts.indexOf(post_id);
                if(posInArray < 0) {
                    state.savedPosts.push(post_id);
                } else {
                    state.savedPosts.splice(posInArray, 1);
                }
                saveGame(state.loggedUser.game_id, state);   
            },
            reportPost: (state, post_id) => {
                let posInArray = state.reportedPosts.indexOf(post_id);
                if(posInArray < 0) {
                    state.reportedPosts.push(post_id);
                } else {
                    state.reportedPosts.splice(posInArray, 1);
                }   
                saveGame(state.loggedUser.game_id, state);
            },                  
            updateChat: (state, payload) => {
                let contactID = payload.contact_id;
                if(state.chats[0][contactID]==undefined) {
                    state.chats[0][contactID] = {
                        "old_messages": []
                    }
                }
                if(payload.newMessage) {
                    state.chats[0][contactID].old_messages.push(payload.newMessage);
                } else if(payload.preparedMessagesUpdate) {
                    if(payload.preparedMessagesUpdate.incomingAnswer) {
                        state.chats[0][contactID].preparedMessages = payload.preparedMessagesUpdate;
                    } else {
                        delete state.chats[0][contactID].preparedMessages;
                    }
                } 
                saveGame(state.loggedUser.game_id, state);                 
            },
            postNewComment: (state, payload) => {
                const postID = payload.post_id;
                if(state.myComments[postID]==undefined) {
                    state.myComments[postID] = [];
                }       
                state.myComments[postID].push(payload);
                let arrayPos = state.myComments[postID].length - 1;
                delete state.myComments[postID][arrayPos].post_id;  
                saveGame(state.loggedUser.game_id, state);                          
            },             
            updateComment: (state, payload) => {
                let arrayPos;
                let storeProperty = (payload.commented_by=='me') ? 'myComments' : 'othersComments';
                let postID = payload.post_id;

                if(state[storeProperty][postID]!==undefined) {
                    state[storeProperty][postID].forEach((item, index) => {
                        if(item.comment_id==payload.comment_id) {
                            arrayPos = index;
                        }
                    });
                } else {
                    state[storeProperty][postID] = [];
                }   

                if(arrayPos !== undefined) {
                    state[storeProperty][postID][arrayPos] = {
                        ...state[storeProperty][postID][arrayPos],
                        ...payload
                    };
                    delete state[storeProperty][postID][arrayPos].post_id;
                } else {
                    state[storeProperty][postID].push({
                        ...payload
                    });
                    let newArrayPos = state[storeProperty][postID].length - 1;
                    delete state[storeProperty][postID][newArrayPos].post_id;                    
                }  
                saveGame(state.loggedUser.game_id, state);
            },    
            changeConnection: (state, payload) => {
                const connectionType = payload.connection_type;
                const profileId = payload.profile_id;

                let storeProperty;
                if(connectionType=='person') {
                    storeProperty = 'myFriends'; 
                } else if (connectionType=='page') {
                    storeProperty = 'myLikedPages';
                }   

                if(state[storeProperty].includes(profileId)) {
                    let arrayPos;
                    state[storeProperty].forEach((item, index) => {
                        if(item==profileId) {
                            arrayPos = index;
                        }
                    });
                    state[storeProperty].splice(arrayPos, 1)
                } else {
                    state[storeProperty].push(profileId) 
                }   
                saveGame(state.loggedUser.game_id, state);                          
            },                                                                        
            changePoints: (state, payload) => {
                state.loggedUser.points = state.loggedUser.points + payload;
                saveGame(state.loggedUser.game_id, state);
            },
            openChat: (state, payload) => {
                state.openedChat = payload;
            },
            closeChat: state => {
                state.openedChat = null;
            }            
        },
        actions: {
            loadGame (context, gameId) {
                axios.get('http://jakubnedorost.cz/marty/api/?load_game=' + gameId)
                    .then(response => {
                        let loadedState = response.data;
                        console.log(loadedState);
                        if (loadedState && (loadedState.loggedUser.game_id === gameId)) {
                            context.commit('loadGame', loadedState);
                           /* $nuxt.$router.push('/') */
                        } else {
                            console.log('nenalezena hra')
                            $nuxt.$router.push('/login?game-not-found')
                        }
                    })
                    .catch(error => { 
                        console.log(error)
                        $nuxt.$router.push('/login?error') 
                    })
            },
            saveGame: (context) => {
                saveGame(context.state.loggedUser.game_id, context.state);
            },                      
        }
    });
}        
export default createStore
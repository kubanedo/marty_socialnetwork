import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            startTimestamp: new Date().getTime(),
            gameInstanceId: 0,
            gameId: 0,
            loggedUser: {
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
            postNewPost: (state, newPostObj) => {
                state.myPosts.unshift(newPostObj);
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
            },
            savePost: (state, post_id) => {
                let posInArray = state.savedPosts.indexOf(post_id);
                if(posInArray < 0) {
                    state.savedPosts.push(post_id);
                } else {
                    state.savedPosts.splice(posInArray, 1);
                }   
            },
            reportPost: (state, post_id) => {
                let posInArray = state.reportedPosts.indexOf(post_id);
                if(posInArray < 0) {
                    state.reportedPosts.push(post_id);
                } else {
                    state.reportedPosts.splice(posInArray, 1);
                }   
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
            },
            postNewComment: (state, payload) => {
                const postID = payload.post_id;
                if(state.myComments[postID]==undefined) {
                    state.myComments[postID] = [];
                }       
                state.myComments[postID].push(payload);             
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
                }    
                if(arrayPos !== undefined) {
                    state[storeProperty][postID][arrayPos] = {
                        ...state[storeProperty][postID][arrayPos],
                        ...payload
                    };
                    delete state[storeProperty][postID][arrayPos].post_id;
                } else {
                    state[storeProperty][postID] = [];
                    state[storeProperty][postID].push({
                        ...payload
                    });
                    let newArrayPos = state[storeProperty][postID].length - 1;
                    console.log(newArrayPos);
                    delete state[storeProperty][postID][newArrayPos].post_id;                    
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
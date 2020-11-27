import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'

import UIFriendedToast from "~/components/ui/UIFriendedToast";

const saveGame = (gameId, state) => {
    axios.post(process.env.apiUrl + "/save/?game_id=" + gameId, {...state, modalWindow: null, loadingApp: true})
        .then(response => console.log(response))  
}

const defaultState = () => {
    return {    
    startTimestamp: new Date().getTime(),
    gameVersion: 0,
    loggedUser: {
        game_id: 0,
        userId: "me",
        profileImg: 'http://jakubnedorost.cz/marty/images/profiles/me/profileimg.jpg',
        first_name: 'Nezalogovaný',
        last_name: 'Uživatel',
        sex: 'm',
        points: 0,
        friends: ['eliskasvob', 'jnovak'],
        liked_pages: ['malltv']
    },
    chats: [{}],
    myPosts: [],
    othersPosts: [],
    myComments: {},
    othersComments: {},
    savedPosts: [],
    pendingRecievedFriendReq: ['dvorakova.nela'],
    pendingSentFriendReq: [],
    notifications: [{
        notif_id: 2,
        user_id: 'jnovak',
        type: 'like',
        what: 'post',
        excerpt: 'Nezahrál by si někdo',
        post_id: '1jnovak',
        time: {
            minutesAgo: 50
        },
        unread: 1
    },
    {
        notif_id: 1,
        user_id: 'eliskasvob',
        type: 'comment',
        what: 'comment',
        excerpt: 'Nezahrál by si někdo',
        post_id: 'me123',
        time: {
            daysAgo: 2
        },
        unread: 0
    }],
    reportedPosts: [],
    answeredQuizes: [],
    /* App components state */
    openedChat: null,
    modalWindow: null,
    loadingApp: true    
}
}

const createStore = () => {
    return new Vuex.Store({
        state: () => (Object.assign({}, defaultState())),
        getters: {
            getChatData: state => {
                return state.chats[0];
            },           
            getMyWholeName: state => (type = "whole") => {
              if(type=="shortened") {  
                return state.loggedUser.first_name + "\u00A0" + state.loggedUser.last_name[0] + ".";
              } else {
                return state.loggedUser.first_name + " " + state.loggedUser.last_name;  
              }
            },
            getMyUserData: state => {
                return state.loggedUser;
            },
            getMyFriends: state => {
                return state.loggedUser.friends;
            },
            getMyLikedPages: state => {
                return state.loggedUser.liked_pages;
            },            
            getAnsweredQuiz: state => id => {
                return state.answeredQuizes.find(answeredQuiz => answeredQuiz.quiz_id === id);
            }, 
            getMyPost: state => post_id => {
                return state.myPosts.find(post => post.post_id === post_id);
            }                                
        },        
        mutations: {
            resetState: (state) => {
                Object.assign(state, defaultState());
            },            
            login: (state, payload) => {
                state.loggedUser = {
                    ...state.loggedUser,
                    ...payload
                }
                state.loadingApp = false;
            },
            changeUserInfo(state, payload) {
                state.loggedUser = {
                    ...state.loggedUser,
                    ...payload                    
                }
            },
            loadGame: (state, loadedState) => {
                Object.assign(state, loadedState);
                state.loadingApp = false;
            },          
            postNewPost: (state, newPostObj) => {
                state.myPosts.unshift(newPostObj);
                saveGame(state.loggedUser.game_id, state);
            },
            deletePost: (state, post_id) => {
                let postPos = state.myPosts.findIndex(item => item.post_id === post_id);
                if (postPos !== undefined) {
                    state.myPosts.splice(postPos, 1);
                }    
                saveGame(state.loggedUser.game_id, state);  
            }, 
            updatePost: (state, payload) => {
                let arrayPos;
                let storeProperty = (payload.posted_by=='me') ? 'myPosts' : 'othersPosts';
               
                arrayPos = state[storeProperty].findIndex(item => item.post_id === payload.post_id);

                if(arrayPos > -1) {
                    Object.assign(state[storeProperty][arrayPos], {
                        ...state[storeProperty][arrayPos],
                        ...payload
                    });
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
                    Vue.set(state.chats[0], contactID, {
                        "old_messages": []
                    })
                }

                if(payload.newMessage) {
                    state.chats[0][contactID].old_messages.push(payload.newMessage);
                } else if(payload.preparedMessagesUpdate) {
                    state.chats[0][contactID].preparedMessages = payload.preparedMessagesUpdate;
                } else if(payload.newMessagesCount!==undefined) {
                    Vue.set(state.chats[0][contactID], 'new_messages_count', payload.newMessagesCount)                    
                } else {
                    delete state.chats[0][contactID].preparedMessages;
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
            deleteMyComment: (state, payload) => {
                let commentPos = state.myComments[payload.post_id].findIndex(item => item.comment_id === payload.comment_id);
                if (commentPos !== undefined) {
                    state.myComments[payload.post_id].splice(commentPos, 1);
                }
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
            makeQuizAnswered: (state, payload) => {
                state.answeredQuizes.push(payload);
            },    
            changeConnection: (state, payload) => {
                const connectionType = payload.connection_type;
                const profileId = payload.profile_id;

                let storeProperty;
                if(connectionType=='person') {
                    storeProperty = state.loggedUser.friends; 
                } else if (connectionType=='page') {
                    storeProperty = state.loggedUser.liked_pages;
                } else if (connectionType=='person:sent-request') {
                    storeProperty = state.pendingSentFriendReq;
                } else if (connectionType == 'person:received-request') {
                    storeProperty = state.pendingRecievedFriendReq;                    
                }

                if(storeProperty.includes(profileId)) {
                    let arrayPos;
                    storeProperty.forEach((item, index) => {
                        if(item==profileId) {
                            arrayPos = index;
                        }
                    });
                    storeProperty.splice(arrayPos, 1)
                } else {
                    storeProperty.push(profileId) 
                }   
                saveGame(state.loggedUser.game_id, state);                          
            },                                                                        
            changePoints: (state, payload) => {
                state.loggedUser.points = state.loggedUser.points + payload;
                saveGame(state.loggedUser.game_id, state);
            },          
            pushNotification(state, payload) {
                state.notifications.unshift(payload);
            },
            openChat: (state, payload) => {
                state.openedChat = payload;
            },
            closeChat: state => {
                state.openedChat = null;
            }            
        },
        actions: {
            waitForFriendRequestApproval(context, payload) {
                if (!context.state.loggedUser.friends.includes(payload.profile_id) && !context.state.pendingSentFriendReq.includes(payload.profile_id) ) {
                    const randomTime = (minTimeInSec, maxTimeInSecs) => { 
                        let randomTime = Math.floor(Math.random() * maxTimeInSecs) * 1000;
                        return (randomTime > (minTimeInSec * 1000)) ? randomTime : (minTimeInSec * 1000);
                    } 
                    context.commit('changeConnection', { ...payload, connection_type: 'person:sent-request'}); /* add to request queue */
                    setTimeout(() => {
                        context.commit('changeConnection', payload);
                        context.commit('changeConnection', { ...payload, connection_type: 'person:sent-request'}); /* remove from queue */
                        this._vm.$toast({
                            component: UIFriendedToast,
                            props: {
                                user_info: {
                                    user_id: payload.profile_id,
                                    user_name: payload.user_name,
                                    sex: payload.sex
                                }
                            }
                        });                        
                    }, randomTime(4, 10));
                } else {
                    context.commit('changeConnection', payload);
                }   
            },
            loadGame (context, gameId) {
                axios.get(process.env.apiUrl + '/?load_game=' + gameId)
                    .then(response => {
                        let loadedState = response.data;
                        console.log(loadedState);
                        if (loadedState && (loadedState.loggedUser.game_id === gameId)) {
                            loadedState.loggedUser.pending_sent_friend_req = [];
                            context.commit('loadGame', loadedState); 
                            if($nuxt.$route.path == "/login") {
                                $nuxt.$router.push('/')
                            }
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
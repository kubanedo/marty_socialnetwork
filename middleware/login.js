export default function(context) {
    if (context.store.state.loggedUser.game_id===0) {
        let gameId = localStorage.getItem("gameID");
        if (localStorage.getItem("gameID")) {
            setTimeout(() => context.store.dispatch('loadGame', gameId), 3000)            
           // context.router.push('/')
        } else {
            context.redirect('/login')
        }
    }
}
export default function(context) {
    if (context.store.state.loggedUser.game_id===0) {
        let gameId = localStorage.getItem("gameID");
        if (localStorage.getItem("gameID")) {
            context.store.dispatch('loadGame', gameId);
           // context.router.push('/')
        } else {
            context.redirect('/login')
        }
    }
}
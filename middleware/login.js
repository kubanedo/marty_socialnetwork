export default function(context) {
    console.log('vontext', context.store.state.loggedUser);
    if (context.store.state.loggedUser.game_id===0) {
        let gameId = localStorage.getItem("gameID");
        console.log(gameId, "middleware ID");
        if (localStorage.getItem("gameID")) {
            context.store.dispatch('loadGame', gameId);
            console.log('loaded');
           // context.router.push('/')
        } else {
            context.redirect('/login')
        }
    }
}
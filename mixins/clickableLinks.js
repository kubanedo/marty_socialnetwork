
const URLMatcher = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm
export default {
    methods: {
        getLinks(whereToGet) {            
            return whereToGet.match(URLMatcher)           
        },        
        makeLinksClickable(whereReplace) {            
            return whereReplace.replace(URLMatcher, match => `<a href="${match}" target="_blank">${match}</a>`)           
        }
    }
  }
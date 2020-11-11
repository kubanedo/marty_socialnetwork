export default {
    methods: {
        replaceSmileys(value) {
            const map = {
                "<3": "\u2764\uFE0F",
                "</3": "\uD83D\uDC94",
                ":D": "\uD83D\uDE00",
                "O:)": "\ud83d\ude07",                
                ":)": "\ud83d\ude0a",
                ";)": "\uD83D\uDE09",
                ":(": "\uD83D\uDE12",
                ":p": "\uD83D\uDE1B",
                ";p": "\uD83D\uDE1C",
                ":'(": "\uD83D\uDE22",
                ":P": "\ud83d\ude0b",
                ":-*": "\ud83d\ude18",
                ":O": "\ud83d\ude32",
            }; 
            function escapeSpecialChars(regex) {
                return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
            } 
            for (var i in map) {
                const regex = new RegExp(escapeSpecialChars(i), 'gim');
                value = value.replace(regex, map[i]);
            }
            return value;                                  
        }
    }
  }
<template>
    <textarea :value="updatedValue" @input="updateInput($event.target.value)" :placeholder="placeholder"></textarea>
</template>

<script>
export default {
    props: {
        value: String,
        placeholder: {
            type: String,
            default: 'Aa'
        }
    },
    computed: {
        updatedValue() {
            return this.replaceSmileys(this.value);
        }
    },
    methods: {
        updateInput(value) {
            this.$emit('input', this.replaceSmileys(value))
        },
        replaceSmileys(value) {
            const map = {
                "<3": "\u2764\uFE0F",
                "</3": "\uD83D\uDC94",
                ":D": "\uD83D\uDE00",
                ":)": "\uD83D\uDE03",
                ";)": "\uD83D\uDE09",
                ":(": "\uD83D\uDE12",
                ":p": "\uD83D\uDE1B",
                ";p": "\uD83D\uDE1C",
                ":'(": "\uD83D\uDE22",
                ":P": "\ud83d\ude0b",
                ":-*": "\ud83d\ude18",
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
</script>

<style lang="scss" scoped>
    @import "~/assets/variables.scss";
    textarea {
            background: $input-color;
            width: 100%;
            border-radius: 5px;
            padding: 10px;
            color: black;
            overflow-wrap: break-word;        
    }
</style>
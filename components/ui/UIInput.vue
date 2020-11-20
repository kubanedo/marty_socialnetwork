<template>
        <UIEmojiPicker @addSmiley="addSmiley" :rightOffset="scrollbarWidth" class="input">
            <textarea ref="textareaInput" :value="inputValue" @input="updateInput($event.target.value)" :placeholder="placeholder" :rows="rows"></textarea>
        </UIEmojiPicker>            
</template>

<script>
import replaceSmileys from '~/mixins/smileys.js'
import focusInput from '~/mixins/focusInput.js'
import UIEmojiPicker from "~/components/ui/UIEmojiPicker";

export default {
    components: {
        UIEmojiPicker
    },    
    mixins: [replaceSmileys, focusInput],
    props: {
        value: String,
        placeholder: {
            type: String,
            default: 'Aa'
        },
        rows: {
            type: Number,
            default: 1
        },
        focusOnShow: {
            type: Boolean
        }
    },
    data() {
        return {
            inputValue: this.value,
            scrollbarWidth: 0
        }
    },
    methods: {
        updateInput(value) {
            this.inputValue = this.replaceSmileys(value);
            this.$emit('input', this.inputValue);
        },
        addSmiley(smiley) {
            this.inputValue += smiley;
            this.$emit('input', this.inputValue);
        },
        checkIfHasScrollbar() {
            let textarea = this.$refs.textareaInput;
            if(textarea.clientHeight < textarea.scrollHeight) {
                this.scrollbarWidth = textarea.offsetWidth - textarea.clientWidth;
            } else {
                this.scrollbarWidth = 0;
            }
        }   
    },
    watch: {
        value(value) {
            this.inputValue = value;
            this.checkIfHasScrollbar();
            if(value=="") {
                this.scrollbarWidth = 0;
            }
        }
    },
    mounted() {
        if(this.focusOnShow) {
            this.focusInput('textareaInput');
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "~/assets/variables.scss";
    .input {
        width: 100%;
    }
    textarea {
            background: $input-color;
            width: 100%;
            border-radius: 5px;
            padding: 10px;
            padding-right: 35px;
            color: black;
            border: none;
            overflow-wrap: break-word;       
    }
    .input-wrapper {
            margin-bottom: 0;
    }
</style>
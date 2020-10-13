<template>
    <textarea ref="textareaInput" :value="updatedValue" @input="updateInput($event.target.value)" :placeholder="placeholder"></textarea>
</template>

<script>
import replaceSmileys from '~/mixins/smileys.js'
import focusInput from '~/mixins/focusInput.js'

export default {
    mixins: [replaceSmileys, focusInput],
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
        }    
    },
    mounted() {
        this.focusInput('textareaInput');
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
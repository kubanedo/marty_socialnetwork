export default {
    methods: {
        focusInput(refName) {
            const input = this.$refs[refName].$el;
            console.log(input);
            if(typeof input !== "undefined" && input !== null) {
               input.focus(); 
            }
        }
    }
  }
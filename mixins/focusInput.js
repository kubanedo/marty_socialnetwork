export default {
    methods: {
        focusInput(refName) {
            console.log(refName)
            const input = this.$refs[refName];
            if(typeof input !== "undefined" && input !== null) {
               input.focus(); 
            }
            console.log('aaa')
        }
    }
  }
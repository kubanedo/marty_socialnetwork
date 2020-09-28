<template>
  <span>{{output}}</span>
</template>

<script>
export default {
    props: {
        timestamp: Number
    },
    data() {
        return {
            output: ''
        }
    },
    methods: {
        convertTimestamp() {
            let now = Date.now();
            let dateNow = now.getDate() + '.' + now.getMonth() + '.' + now.getYear();

            let dateFromTimestamp = this.timestamp.getDate() + '.' + this.timestamp.getMonth() + '.' + this.timestamp.getYear();
            let timeFromTimestamp = this.with_leading_zeros(this.timestamp.getHours()) + ":" + this.with_leading_zeros(this.timestamp.getMinutes());

            if(dateNow === dateFromTimestamp) {
                this.output = timeFromTimestamp; 
            } else {
                this.output = dateFromTimestamp + " v " + timeFromTimestamp;
            }
        },
        with_leading_zeros(time) {
            return (time < 10 ? '0' : '') + time;
        }        
    },
    mounted() {
        this.convertTimestamp();
    }
}
</script>

<style>

</style>
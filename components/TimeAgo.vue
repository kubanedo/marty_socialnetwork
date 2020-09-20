<template>
  <span>{{timeAgo}}</span>
</template>

<script>
export default {
   data() {
       return {
           timeAgo: "",
           interval: ""
       }
   }, 
   props: {
       time: String
   },
   methods: {
       getTimeAgo() {
            let date = this.time;
            let getOutput = (date) => {
                const now = new Date();
                date = new Date(date);
                let seconds = (now.getTime() - date.getTime()) / 1000;                
                let delta = Math.round(seconds / 60);
                const with_leading_zeros = (time) => {
                    return (time < 10 ? '0' : '') + time;
                }
                if (delta < 2880) {
                    if (delta <= 0) 
                        return { output: 'právě teď', reloadInterval: 60 };
                    if (delta == 1)
                        return { output: 'před minutou', reloadInterval: 60 };
                    if (delta < 45) 
                        return { output: "před " + delta + " minutami", reloadInterval: 60 };
                    if (delta < 90) 
                        return { output: 'před hodinou', reloadInterval: 3600 };
                    if (delta < 1440) 
                        return { output: 'před ' + Math.round(delta / 60) + ' hodinami', reloadInterval: 3600 };
                    return {output: 'před ' + Math.round(delta / 60) + ' hodinami', reloadInterval: 86400};
                } else {
                    let monthName = new Array("leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec");
                    return {
                        output: date.getDate() + ". " + monthName[date.getMonth()] + " " +  date.getFullYear() + " v " + with_leading_zeros(date.getHours()) + ":" + with_leading_zeros(date.getMinutes()),
                        reloadInterval: 0
                    }    
                }
            };

            return getOutput(date);
       },
       reloadTimeAgo() {
           let vm = this;
           let reloadInterval = vm.getTimeAgo().reloadInterval * 1000;
           console.log(reloadInterval);
           console.log("timeoutputreload", vm.interval );
           if(reloadInterval !== 0) {
                vm.interval = setInterval(function() {
                    vm.timeAgo = vm.getTimeAgo().output;
                    console.log('reload');
                }, reloadInterval);
           } else {
               console.log("timeoutputreload", vm.interval);
               if(vm.interval) {
                 clearInterval(vm.interval);
               }
           }    
       }
   },
   mounted() {
       this.timeAgo = this.getTimeAgo().output;
       this.reloadTimeAgo();
   },
   destroyed() {
       console.log("timeoutputreload", this.interval);
        if(this.interval) {
            clearInterval(this.interval);
        }
   }
}
</script>

<style>

</style>
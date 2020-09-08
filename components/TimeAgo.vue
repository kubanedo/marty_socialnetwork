<template>
  <div>{{timeAgo}}</div>
</template>

<script>
export default {
   data() {
       return {
           timeAgo: ""
       }
   }, 
   props: {
       time: String
   },
   methods: {
       getTimeAgo() {
            let date = this.time;
            var getDelta = function getDelta(seconds) {
                var delta = Math.round(seconds / 60);
                if (delta <= 0) return 'právě teď';
                if (delta == 1) return 'před minutou';
                if (delta < 45) return "před " + delta + " minutami";
                if (delta < 90) return 'před hodinou';
                if (delta < 1440) return 'před ' + Math.round(delta / 60) + ' hodinami';
                if (delta < 2880) return 'včera';
                if (delta < 43200) return 'před ' + Math.round(delta / 1440) + ' dny';
                if (delta < 86400) return 'před měsícem';
                if (delta < 525960) return 'před ' + Math.round(delta / 43200) + ' měsíci';
                if (delta < 1051920) return 'před rokem';
                return 'před ' + Math.round(delta / 525960) + ' lety';
            };

            var now = new Date();
            date = new Date(date);
            var delta = (now.getTime() - date.getTime()) / 1000;
            return getDelta(delta);
       },
       reloadTimeAgo() {
           let vm = this;
           let reloadInterval = setInterval(function() {
               vm.timeAgo = vm.getTimeAgo();
               console.log('reload');
           }, 60000);
       }
   },
   mounted() {
       this.timeAgo = this.getTimeAgo();
       this.reloadTimeAgo();
   },
   destroyed() {
       clearInterval(reloadInterval);
   }
}
</script>

<style>

</style>
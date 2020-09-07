<template>
  <div>{{updatedTimeAgo}}</div>
</template>

<script>
export default {
   props: {
       time: String
   },
   methods: {
       getTimeAgo(date) {
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

            setInterval(function() {

            }, 60000)
            var now = new Date();
            date = new Date(date);
            var delta = (now.getTime() - date.getTime()) / 1000;
            return getDelta(delta);
       }
   },
   computed: {
       updatedTimeAgo: function() {
            let vm = this;
            setInterval(function() {
                vm.getTimeAgo(vm.time);
                console.log("zmena");
            }, 60000); 
            return this.getTimeAgo(this.time);          
       }
   } 
}
</script>

<style>

</style>
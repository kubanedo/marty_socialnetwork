<template>
    <div class="card">
        <h2>Fotky</h2>
    </div>   
</template>

<script>
export default {
    props: {
        profileData: {
            type: Object
        }
    },
    head () {
            return {
                title: "Fotky uživatele " + ((this.profileData.first_name) ? (this.profileData.first_name + ' ' + this.profileData.last_name) : this.$route.params.id)
            }
    }    
}
</script>

<style>

</style>
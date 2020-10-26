<template>
    <div>
        <UiProfileImg :userID="friendId"/>
        {{friendId}}
    </div>   
</template>

<script>
import UIProfileImg from '~/components/ui/UIProfileImg'
export default {
    props: {
        friendId: {
            type: String
        }
    },
    components: {
        UIProfileImg
    }
}
</script>

<style>

</style>
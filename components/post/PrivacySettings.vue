<template>
    <span>
        <UiTooltip v-if="privacySetting=='friends'" text="Přátelé"><i class="las la-user-friends"></i></UiTooltip>
        <UiTooltip v-if="privacySetting=='all'" text="Všichni"><i class="las la-globe"></i></UiTooltip>
    </span>    
</template>

<script>
import UITooltip from "~/components/ui/UITooltip";
export default {
    props: {
        privacySetting: String
    },
    components: {
        UITooltip
    }
}
</script>

<style>

</style>
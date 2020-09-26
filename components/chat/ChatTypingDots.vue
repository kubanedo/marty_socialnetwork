<template>
    <div id="wave">
        <span v-for="index in 3" :key="index" class="dot" :style="{width: size + 'px', height: size + 'px'}"></span>
        <small>{{contactName}} píše</small>
    </div>  
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: 3
        },
        contactName: String
    }
}
</script>

<style lang="scss" scoped>
div#wave {
	position:relative;
	.dot {
		display:inline-block;
		width:12px;
		height:12px;
		border-radius:50%;
		margin-right:3px;
		background:#303131;
		animation: wave 1.3s linear infinite;

		&:nth-child(2) {
			animation-delay: -1.1s;
		}

		&:nth-child(3) {
			animation-delay: -0.9s;
		}
	}
}

@keyframes wave {
	0%, 60%, 100% {
		transform: initial;
	}

	30% {
		transform: translateY(-15px);
	}
}
</style>
<template>
<div v-if="link_data.title">
  <strong v-if="deletablePreview"><small>Náhled odkazu:</small></strong> 
  <div class="linkpreview__wrapper">
    <button v-if="deletablePreview" @click.prevent="deleteLinkPreview" class="delete-linkpreview"><i class="las la-times"></i></button>
    <a :href="link_data.link" target="_blank" class="linkpreview__box">        
        <h3>{{link_data.title}}</h3>
        <div v-if="link_data.image" class="linkpreview__img-wrapper">
            <div class="linkpreview__img" :style="'background-image: url(' + link_data.image + ');'"></div>
        </div>
        <p>{{link_data.description}}</p>
        <small><strong>{{(link_data.domain ? link_data.domain.toUpperCase() : '')}}</strong></small>
    </a>
  </div>
</div>  
</template>

<script>
export default {
    props: {
        linkData: {
            type: Object,
            required: true
        },
        deletablePreview: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            link_data: this.linkData
        }
    },
    methods: {
        deleteLinkPreview() {
            this.link_data = {};
            this.$emit('deleteLinkPreview'); 
        }
    }
}
</script>

<style lang="scss" scoped>
.linkpreview__box {
    position: relative;
    display: block;
    text-decoration: none;
    color: black;
    border: 1px solid #F0F0F0;
    border-radius: 5px;
    padding: 10px;
    background-color: #F0F0F0;
    h3 {
        margin-bottom: 10px;
    }
    .linkpreview__img-wrapper {
        margin-right: -10px; 
        margin-left: -10px;
    }  
    .linkpreview__img {
        width: 100%;
        padding-bottom: 46%;
        background-size: cover;
        background-position: center;
        margin: 10px 0;
        border-top: 1px solid #F0F0F0;
        border-bottom: 1px solid #F0F0F0;
    }
}
.linkpreview__wrapper  {
    position: relative;
    .delete-linkpreview {
        background: grey;
        color: white;
        font-size: 12px;
        border-radius: 50%;
        height: 20px;
        width: 20px;
        padding-top: 1px;
        position: absolute;
        right: -10px;
        top: -10px;
        z-index: 2;
        &:hover {
            background: lighten(grey, 5);
        }
    }
}
</style>
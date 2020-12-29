<template>
    <span>
        {{text}}
    </span>
</template>

<script>
  //  @params text(String)
    export default {
        name: "Button",
        props:{
            text: String
        }
    }
</script>

<style scoped>
    span{
        background: #0F2F31;
        border-radius: 11px;
        width: 286px;
        height: 52px;

        @font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        /* identical to box height */

        text-align: center;
        text-transform: uppercase;
        color: #FFFFFF;
        padding: 15px 6px;

    }
</style>

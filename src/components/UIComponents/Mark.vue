<template>
    <span class="mark pl-2">
        {{text}}
    </span>
</template>

<script>
    //  @params text(String)

    export default {
        name: "Mark",
        props:{
            text:String
        }
    }
</script>

<style scoped>
    .mark {
        width: 32px;
        height: 15px;
        background: #F2F2F2;
        border-radius: 4px;
        padding: 2px 5px;
        text-transform: uppercase;
        @font-family: Montserrat;
        font-style: normal;
        font-weight: 300;
        font-size: 9px;
        line-height: 11px;
        /* identical to box height */

        position: relative;
        top: -2px;
        color: #0F2F31;

    }
</style>

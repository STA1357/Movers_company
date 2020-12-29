<template>
    <div class="d-flex list-block row" v-if="show">
        <div class="col-12 title-block row">
            <div class="title col-6 mb-1">You received</div>
            <div class="title-cost col-6 mb-1">456.166 BLACK</div>
            <div class="title col-6">You received</div>
            <div class="title-cost col-6">456.166 BLACK</div>
        </div>
        <div class="col-12 hr mb-3"/>
        <div class="col-7">
            <div v-for="(text,idx) in textL" :key="idx" class="text mb-2">{{text}} <img src="../../assets/info.svg" alt=""></div>
        </div>
        <div class="col-5">
            <div v-for="(text,idx) in textR" :key="idx" class="cost mb-2">{{text}}</div>
        </div>
    </div>
</template>

<script>
    //  @params textR(Array), textL(Array), show(Boolean)
    //TODO need refactoring NAMES

    export default {
        name: "List",
        props:{
            textR: Array,
            textL: Array,
            show: false
        },
    }
</script>

<style scoped>
    .text{
        @font-family: Montserrat;
        font-style: normal;
        font-weight: 300;
        font-size: 9px;
        line-height: 11px;
        /* identical to box height */

        text-align: left;
        color: #7B7B7B;
    }
    .cost{
        @font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 9px;
        line-height: 11px;
        /* identical to box height */

        text-align: right;

        color: #7B7B7B;
    }
    .list-block{
        width: 296px;
        height: auto;
        padding: 26px 0;
        background: rgba(255, 255, 255, 0.68);
        border-radius: 15px;
        margin: -20px auto 0;
        transition: opacity .5s;

    }
    .hr{
        width: 296.5px;
        height: 0px;

        border: 1px solid #E6E6E6;
    }
    .title-block{
        padding: 10px 0;
    }
    .title{
        @font-family: Montserrat;
        font-style: normal;
        font-weight: 300;
        font-size: 10px;
        line-height: 12px;

        color: #000000;
    }
    .title-cost{
        @font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        line-height: 12px;
        text-align: right;

        color: #000000;
    }
</style>

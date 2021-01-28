<template>
    <div class="d-flex check-price justify-content-between ">
        <span class="col-5 p-0" style="text-align: left; margin-top: 3px"
        >Aggregate price:</span
        >
        <div class="col p-0" style="text-align: left">
            {{
            isReverse
            ? Math.trunc(BWtokensPerOneETH * 10000) / 10000 +
            " " +
            "B&W per 1 ETH"
            : (1 / BWtokensPerOneETH | truncated3) + "ETH per 1 B&W"
            }}
            <img
                    src="@/assets/images/update.svg"
                    alt=""
                    @click="isReverse = !isReverse"
                    style="margin-top: -3px"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: "Rate",
        data(){
            return {
                isReverse: true,
            }
        },
        computed:{
            BWtokensPerOneETH() {
                return this.$store.getters["contracts/primary/BWtokensPerOneETH"];
            },
        }
    }
</script>

<style scoped>

</style>

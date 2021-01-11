<template>
  <div class="hello">
    <nav-cards :text="[{ title: 'BASE POOL', path: 'basic' },{ title: 'LIQUID POOL', path: 'Veridian Dynamics' },{ title: 'TRADE POOL', path: 'Veridian Dynamics' }]"/>
    <nav-cards :text="[{ title: 'TAKE LIQUIDITY', path: 'Veridian Dynamics' },{ title: 'RETURN LIQUIDITY', path: 'Veridian Dynamics' }]"/>
  </div>
</template>

<script>
import TBlock from "@/components/UIComponents/TitleBlock";
import Button from "@/components/UIComponents/Button";
import Mark from "@/components/UIComponents/Mark";
import List from "@/components/UIComponents/List";
import NavCards from "@/components/UIComponents/NavCards";
export default {
  name: "Main",
  components: {
    NavCards,
    Button,
    Mark,
    TBlock,
    List
  },
  data() {
    return {
      msg: "MAX",
      show: false,
      eth: "",
      whiteBlack: ""
    };
  },
  computed: {
    account() {
      return this.$store.getters["web3/account"];
    },
    measurementValueDisplay: {
      get() {
        this.whiteBlack = this.eth * 651.66;
        return this.whiteBlack;
      },
      set(newValue) {
        return this.eth;
      }
    }
  },
  mounted() {
    this.$store.dispatch("web3/getAccount");
  },
  methods: {
    shotList() {
      this.show = !this.show;
      console.log(this.show);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin-top: 64px;
}
.count {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  letter-spacing: 0.015em;

  color: #0f2f31;
}
.check-price {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  justify-content: space-around;
  color: #0f2f31;
  margin-bottom: 11px;
}
</style>

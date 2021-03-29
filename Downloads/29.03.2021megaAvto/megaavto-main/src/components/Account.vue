<!-- @format -->
<template>
  <div class="content-admin">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-12">
          <div class="myPlan">
            <v-row>
              <v-col cols="12" class="text-left" style="padding: 0 15px">
                <p class="cardProPlanLabel">Мой план</p>
              </v-col>
              <v-col cols="12" md="8" class="text-left" style="padding-top: 0">
                <div class="proPlanCardImage">
                  <img src="../assets/proplancard.svg" alt="proPlanCardImage">
                  <p class="typeOfPlan">{{typeOfPlan}}</p>
                  <p class="typeOfAccount">{{typeOfAccount}}</p>
                  <p class="cardHolderName">{{cardHolderName}}</p>
                  <p class="expireTitle">Expire date</p>
                  <p class="dateOfExpire">{{dateOfExpire}}</p>
                  <div class="line"></div>
                </div>
              </v-col>
              <v-col cols="12" md="3" class="text-right pt-3">
                <div class="proPlanCardInfo d-flex flex-column">
                  <p class="cardAmount">$ <b>{{ getUser.balance }}</b></p>
                  <p class="amountTitle">Баланс</p>
                  <p class="accountId">150423</p>
                  <p class="amountSubTitle">Заявок</p>
                  <div>
                    <label class="switch">
                      <input type="checkbox">
                      <span class="slider round"></span>
                    </label>
                  </div>
                  <p class="amountSubTitle pt-4">Уведомлять о продлении
                    подписки</p>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
        <div class="col-md-4 col-12">
          <div class="fillUpCard">
            <v-row>
              <v-col cols="12"> <h5>Пополнение счета</h5>
                <div class="orangeLine"></div>
              </v-col>

              <v-col cols="12" class="text-left" style="padding: 10px 15px; margin-top: 15px">
                <p class="fillUpInputLabel">Введите сумму</p>
                <v-text-field solo label="0.00000" suffix="$"></v-text-field>

              </v-col>
              <v-col cols="12" class="text-left" style="padding: 10px 15px 0 15px">
                <p class="fillUpButtonLabel">Вы получиту токенов: 100шт</p>
                <v-btn depressed class="white--text" @click="pay" style="background: linear-gradient(180deg, #F2994A 0%, #FF7A7A 100%);
border-radius: 5px; font-size: 12px; width: 100%"
                >Пополнить</v-btn>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
      <div class="row threecards-row">
        <div class="col-md proCard stepLeft">
          <p class="proTitle">PRO</p>
          <div class="orangeLine"></div>
          <ul class="proUl">
            <li>Будет много и вкусно</li>
            <li>Будет много и вкусно</li>
            <li>Будет много и вкусно</li>
            <li>Будет много и вкусно</li>
            <li>Будет много и вкусно</li>
          </ul>
          <span class="proSpan">
            $<p class="proPrice">90.<b>99</b></p>
          </span>
          <v-btn depressed class="white--text" style="background: linear-gradient(180deg, #F2994A 0%, #FF7A7A 100%);
border-radius: 5px; font-size: 12px; width: 100%"
          >Оформить</v-btn>
        </div>
        <div class="col-md proCard stepLeft">
          <p class="proTitle">PRO</p>
          <div class="orangeLine"></div>
          <ul class="proUl">
            <li>Будет много и вкусно</li>
            <li>Будет много и вкусно</li>
            <li>Будет много и вкусно</li>
            <li>Будет много и вкусно</li>
            <li>Будет много и вкусно</li>
          </ul>
          <span class="proSpan">
            $<p class="proPrice">90.<b>99</b></p>
          </span>
          <v-btn depressed class="white--text" style="background: linear-gradient(180deg, #F2994A 0%, #FF7A7A 100%);
border-radius: 5px; font-size: 12px; width: 100%"
          >Оформить</v-btn>
        </div>
        <div class="col-md proCard stepLeft">
          <p class="proTitle">PRO</p>
          <div class="orangeLine"></div>
          <ul class="proUl">
            <li>Будет много и вкусно</li>
            <li>Будет много и вкусно</li>
            <li>Будет много и вкусно</li>
            <li>Будет много и вкусно</li>
            <li>Будет много и вкусно</li>
          </ul>
          <span class="proSpan">
            $<p class="proPrice">90.<b>99</b></p>
          </span>
          <v-btn depressed class="white--text" style="background: linear-gradient(180deg, #F2994A 0%, #FF7A7A 100%);
border-radius: 5px; font-size: 12px; width: 100%"
          >Оформить</v-btn>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { CryptoJS } from "../assets/js/hmac-md5.js";
  import { Wayforpay } from "../assets/js/wayforpay.js";
  // import Wayforpay from "wayforpay";
  // require("https://secure.wayforpay.com/server/pay-widget.js");
  // import "https://secure.wayforpay.com/server/pay-widget.js";
  export default {
    name: "Account",
    data() {
      return {
        amount: "1547.36",
        languageSend: "RU",
        typeOfPlan: "PRO PLAN",
        typeOfAccount: "PREMIUM ACCOUNT",
        cardHolderName: "Mike Long",
        dateOfExpire: "06/01/21"
      };
    },
    computed: {
      getUser() {
        return this.$store.getters.getUser;
      },
    },
    // mounted() {
    //   let Wayforpay = document.createElement("script");
    //   Wayforpay.setAttribute(
    //     "src",
    //     "https://secure.wayforpay.com/server/pay-widget.js"
    //   );
    //   document.head.appendChild(Wayforpay);
    // },
    methods: {
      async pay() {
        let orderId = Math.floor(Math.random() * Date.now()).toString(36);
        let sendDate = Date.now();
        const hash1 = CryptoJS.HmacMD5(
          `avto_obmen_net;avto-obmen.net;${orderId};${sendDate};1;UAH;Subscription;1;1000`,
          "fbaa2ae5b58d3992f3926917a5b937a4d2110e5f"
        );
        // console.log("hash: ", hash1.toString());
        this.paymentHash = hash1.toString();
        // console.log(this.paymentHash);
        var wayforpay = new Wayforpay();
        if (this.paymentHash !== null) {
          wayforpay.run(
            {
              merchantAccount: "avto_obmen_net",
              merchantDomainName: "avto-obmen.net",
              merchantSignature: `${this.paymentHash}`,
              orderReference: `${orderId}`,
              orderDate: `${sendDate}`,
              amount: "1",
              currency: "UAH",
              productName: "Subscription",
              productPrice: "1000",
              productCount: "1",
              clientFirstName: "Вася",
              clientLastName: "Васечкин",
              clientEmail: "some@mail.com",
              clientPhone: "380631234567",
              language: `RU`,
            },
            function(response) {
              console.log(response);
              // on approved
            },
            function(response) {
              console.log(response);
              // on declined
            },
            function(response) {
              console.log(response);
              // on pending or in processing
            }
          );
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .threecards-row{
    margin-top: 40px;
  }
  .account {
    margin-left: 180px;
  }
  .money {
    background-color: #fff;
  }
  .fillUpCard{
    border: 1px solid lightgrey;
    margin-top: 35px;
    border-radius: 15px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    height: 275px;
    padding: 10px;
    margin-right: -10px;
    margin-left: 25px;
  }
  .fillUpInputLabel{
    margin: 0 0 5px 0;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;

    color: #2C5282;
  }
  .fillUpButtonLabel{
    margin: 0 0 20px 0;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;

    color: #2C5282;
  }
  .myPlan{
    border: 1px solid lightgrey;
    margin-top: 35px;
    margin-left: 35px;
    margin-right: -15px;
    border-radius: 15px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 20px 0 20px 40px;
    height: 275px;
  }
  .cardProPlanLabel{
    margin-bottom: 0;
    padding-bottom: 0;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 22px;
    line-height: 26px;

    color: #2C5282;
  }
  .proPlanCardImage{
    display: flex;
    justify-content: start;
    margin-top: 10px;
  }
  .line{
    width: 1px;
    height: 180px;
    background-color: lightgrey;
    margin-top: 15px;
    margin-left: 15px;
  }
  .cardAmount{
    color: #f1612c;
    font-size: 18px;
    opacity: 0.8;
  }
  .cardAmount b{
    font-size: 32px;
    font-weight: 400;
  }
  .amountTitle{
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;

    color: #2C5282;
    margin-top: -10px;
  }
  .accountId{
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #f1612c;
    margin-top: -10px;
    opacity: 0.8;
  }
  .amountSubTitle{
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;

    color: #2C5282;
    margin-top: -10px;
  }
  //style for check-box
  .switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 23px;

  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 2px;
    bottom: 3px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #f1612c;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  //bottom cards with different plan payment
  .orangeLine{
    width: 100%;
    height: 1px;
    background-color: #f1612c;
  }
  .stepLeft{
    margin-left: 45px;
  }
  .proCard{
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
  }
  .proTitle{
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 37px;

    color: #2C5282;
  }
  .proUl{
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-align: center;

    color: #2C5282
  }
  .proUl li{
    padding-top: 20px;
  }
  .proUl ::marker{
    color: #f1612c;
  }
  .proSpan{
    display: flex;
    justify-content: center;
    color: #f1612c;
    font-size: 32px;
    font-family: Roboto;
    font-weight: 400;
  }
  .proSpan b{
    font-size: 16px;
    font-weight: 400;
  }
  .proPrice{
    color: #2C5282;
  }
  //data inside card picture
  .typeOfPlan{
    position: absolute;
    color: white;
    left: 30px;
    top: 30px;
    font-weight: bold;
    font-size: 17px;
    font-family: Roboto;
  }
  .typeOfAccount{
    position: absolute;
    color:  rgba(255, 255, 255, 0.39);
    left: 30px;
    top: 55px;
    font-size: 11px;
  }
  .cardHolderName{
    position: absolute;
    color:  white;
    left: 30px;
    top: 180px;
    font-size: 16px;
  }
  .expireTitle{
    position: absolute;
    color:  rgba(255, 255, 255, 0.39);
    left: 160px;
    top: 172px;
    font-size: 8px;
  }
  .dateOfExpire{
    position: absolute;
    color:  white;
    left: 160px;
    top: 182px;
    font-size: 14px;
  }
  @media screen and (max-width: 960px){
    .content-admin{
      width: 100%;
      margin-left: 0;
    }
    .myPlan{
      margin-left: 0;
      padding-left: 15px;
      margin-right: 0;
    }
    .fillUpCard{
      margin-top: 180px;
      margin-left: 0;
      margin-right: 0;
    }
    .proCard{
      margin-left: 10px;
      margin-top: 10px;
      margin-right: 10px;
    }
    .line{
      display: none;
    }
    .threecards-row{
      margin-top: 0 !important;
    }
    .proPlanCardInfo{
    }
  }
</style>

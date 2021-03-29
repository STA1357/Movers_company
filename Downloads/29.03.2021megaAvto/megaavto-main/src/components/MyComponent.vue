<template>
  <div>
    <modal name="my-first-modal" class="my-first-modal">
      <div class="button-box">
        <div class="row d-flex justify-center align-center">
          <div class="col-md-12 text-right pr-4">
            <button
              type="button"
              class="btn-close"
              @click="hide"
              aria-label="Close modal"
              style="color: #ea5455 !important; font-weight: bold; font-size: 22px;"
            >
              x
            </button>
          </div>
          <div class="col-md-12 pr-0">
            <p class="modal-title-orange">Новый пользователь<p/>
            <hr style="background-color: #f1612c">
          </div>
          <form class="form-group mb-0 text-left">
            <label class="labels-for-inputs">Имя</label>
            <input
              v-model="userRegister.first_name"
              class="form-control mb-2"
              type="text"
              placeholder=""
              :class="{
                  'is-invalid':
                    registerSubmitted && $v.userRegister.first_name.$error,
                }"
            />
            <div
              v-if="registerSubmitted && $v.userRegister.first_name.$error"
              class="invalid-feedback"
            >
                <span v-if="!$v.userRegister.first_name.required"
                >Введите имя</span
                >
            </div>
            <label class="labels-for-inputs">Фамилия</label>
            <input
              v-model="userRegister.last_name"
              class="form-control mb-2"
              placeholder=""
              :class="{
                  'is-invalid':
                    registerSubmitted && $v.userRegister.last_name.$error,
                }"
            />
            <div
              v-if="registerSubmitted && $v.userRegister.last_name.$error"
              class="invalid-feedback"
            >
                <span v-if="!$v.userRegister.last_name.required"
                >Введите Фамилию</span
                >
            </div>
            <label class="labels-for-inputs">Имя пользователя</label>
            <input
              class="form-control mb-2"
              placeholder=""
              v-model="userRegister.username"
              :class="{
                  'is-invalid':
                    registerSubmitted && $v.userRegister.username.$error,
                }"
            />
            <div
              v-if="registerSubmitted && $v.userRegister.username.$error"
              class="invalid-feedback"
            >
                <span v-if="!$v.userRegister.username.required"
                >Введите имя пользователя</span
                >
            </div>
            <label class="labels-for-inputs">Телефон</label>
            <input
              class="form-control mb-2"
              placeholder=""
              v-model="userRegister.phone"
              v-mask="'+38(###)###-##-##'"
              :class="{
                  'is-invalid':
                    registerSubmitted && $v.userRegister.phone.$error,
                }"
            />
            <div
              v-if="registerSubmitted && $v.userRegister.phone.$error"
              class="invalid-feedback"
            >
                <span v-if="!$v.userRegister.phone.required"
                >Введите телефон</span
                >
              <span v-if="!$v.userRegister.phone.minLength"
              >Введите телефон полностью</span
              >
            </div>
            <label class="labels-for-inputs">Email</label>
            <input
              v-model="userRegister.email"
              type="email"
              class="form-control mb-2"
              placeholder=""
              style="font-size: 14px"
              required
              :class="{
                  'is-invalid':
                    registerSubmitted && $v.userRegister.email.$error,
                }"
            />
            <div
              v-if="registerSubmitted && $v.userRegister.email.$error"
              class="invalid-feedback"
            >
                <span v-if="!$v.userRegister.email.required"
                >Введите почту</span
                >
              <span v-if="!$v.userRegister.email.email"
              >Не правильная почта</span
              >
            </div>
            <label class="labels-for-inputs">Пароль</label>
            <input
              v-model="userRegister.password"
              type="password"
              class="form-control mb-2"
              placeholder=""
              style="font-size: 14px"
              required
              :class="{
                  'is-invalid':
                    registerSubmitted && $v.userRegister.password.$error,
                }"
            />
            <div
              v-if="registerSubmitted && $v.userRegister.password.$error"
              class="invalid-feedback"
            >
                <span v-if="!$v.userRegister.password.required"
                >Введите пароль</span
                >
            </div>
            <label class="labels-for-inputs">Повторите пароль</label>
            <input
              v-model="userRegister.confirm"
              type="password"
              class="form-control mb-5"
              placeholder=""
              style="font-size: 14px"
              required
              :class="{
                  'is-invalid':
                    registerSubmitted && $v.userRegister.confirm.$error,
                }"
            />
            <div
              v-if="registerSubmitted && $v.userRegister.confirm.$error"
              class="invalid-feedback"
            >
                <span v-if="!$v.userRegister.confirm.required"
                >Повторите пароль</span
                >
            </div>
            <div
              v-if="userRegister.password !== userRegister.confirm"
              class="confirm_error"
            >
              Пароли не совпадают
            </div>
            <v-btn
              class="addUser-button"
              @click="registration"
            >Добавить пользователя</v-btn
            >
          </form>
        </div>
      </div>
    </modal>
    <v-btn
      depressed
      :ripple="false"
      color="#2A4365"
      class="add-btn white--text"
      @click="show"
    ><img
      src="../assets/icons/pen-tool.svg"
      class="mr-2"
    />Добавить</v-btn
    >
  </div>
</template>

<script>
  import { required, minLength, email } from "vuelidate/lib/validators";
  import { mask } from "vue-the-mask";

    export default {
        name: "MyComponent",
        directives: { mask },
        computed: {
        isLoggedIn() {
          return this.$store.getters.isLoggedIn;
        },
        getNotification() {
          return this.$store.getters.getNotification;
        },
        isAdmin() {
          return this.$store.getters.isAdmin;
        },
      },
      beforeMount() {
        if (!this.isAdmin) {
          this.$router.push("/admin");
        }
      },
      data() {
        return {
          userRegister: {
            first_name: "",
            last_name: "",
            username: "",
            phone: "",
            email: "",
            password: "",
            confirm: "",
          },
          registerActive: false,
          emptyFields: false,
          registerSubmitted: false,
        };
      },
      validations: {
        userRegister: {
          first_name: { required },
          last_name: { required },
          username: { required },
          phone: { required, minLength: minLength(17) },
          email: { required, email },
          password: { required },
          confirm: { required },
        },
      },
      methods: {
        show () {
          this.$modal.show('my-first-modal');
        },
        hide () {
          this.$modal.hide('my-first-modal');
        },
        close() {
          this.$emit('my-first-modal');
        },
        async registration() {
          this.registerSubmitted = true;
          console.log("hey2");

          // stop here if form is invalid
          this.$v.$touch();
          if (this.$v.$invalid) {
            console.log("reg error");
            return;
          }
          console.log("hey");
          await this.$store.dispatch("addNewUser", {
            first_name: this.userRegister.first_name,
            last_name: this.userRegister.last_name,
            username: this.userRegister.username,
            phone: this.userRegister.phone,
            email: this.userRegister.email,
            password: this.userRegister.password,
          });
        },
      },
      mount () {
        this.show()
      }
    }
</script>

<style lang="scss">

.button-box{
  display: flex;
  padding-right: 10px;
}
.new-user {
  position: relative;
  z-index: 200;
}
.reg {
  margin-top: 150px;
}
.card{
  border: 1px solid lightgrey;
  border-radius: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.card-title{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;

  color: #2C5282;
  padding-top: 30px;
}
.form-group{
  margin: 0 2vw;
  width: 100%;
}
.form-group input{
  background-color: #edf2f7;
}
.labels-for-inputs{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  margin-bottom: 7px;
  /* identical to box height */


  color: #2A4365;
}
.form-control{
  background: #EDF2F7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}
.addUser-button{
  margin-bottom: 45px;
  background: linear-gradient(180deg, #F2994A 0%, #FF7A7A 100%);
  border-radius: 13.617px;
  color: white !important;
  font-size: 14px;
  margin-top: 10px;
}
.modal-title-orange{
  color: #f1612c !important;
  font-size: 32px !important;
  padding-bottom: 20px;
}
@media screen and (max-width: 960px){
.button-box{
  width: 400px !important;
}
}
</style>

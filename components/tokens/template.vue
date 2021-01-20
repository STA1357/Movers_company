<template>
  <!-- <div class="block mb-2">
      <t-block :text="options.title" :text2="options.balance" />
      <div class="d-flex justify-content-between mt-2">
        <span class="col-3 txt">
          <input
            type="text"
            class="inputs"
            placeholder="0.0"
            :disabled="options.isDisabled"

            :autocomplete="options.autocomplete"
            :maxlength="options.maxlength"
            :value="value"
            @input="$emit('input', $event.target.value)"
            @keydown.enter="$emit('keydown-enter')"
            @blur="$emit('blur')"
          />
        </span>
        <span class="col-7 pr-0">
          <span v-if="isDisabled" class="mark pl-2" @click="$emit('input', options.balance)">
            MAX
          </span>
          <span class="ml-3 txt">
            <img :src="options.icon" alt="" />
            <span class="count">{{ options.symbol }}</span>
          </span>
        </span>
      </div>
  </div> -->
  <div class="token">
    <div class="token__header">
      <div class="token__title txt txt--light">
        {{ options.title }}
      </div>
      <div class="token__balance txt txt--light">
        balance: {{ options.balance }}
      </div>
    </div>
    <div class="token__content">
      <div class="token__input-wrapper">
        <input
          type="text"
          class="token__input txt"
          placeholder="0.0"
          :disabled="options.isDisabled"

          :autocomplete="options.autocomplete"
          :maxlength="options.maxlength"
          :value="value"
          @input="$emit('input', $event.target.value)"
          @keydown.enter="$emit('keydown-enter')"
          @blur="$emit('blur')"
        />
      </div>
      <div v-if="!options.isDisabled" class="token__max txt txt--light" @click="$emit('input', options.balance)">
        MAX
      </div>
      <div class="token__info">
        <div class="token__icon-wrapper">
          <img :src="options.icon" alt="" class="token__icon">
        </div>
        <div class="token__symbol txt">
          {{ options.symbol }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TBlock from "@/components/UIComponents/TitleBlock";

export default {
  components: {
    TBlock,
  },
  props: {
    options: {
      type: Object,
      default() {
        return {
          title: {
            type: String,
            default: ''
          },
          balance: {
            type: String,
            default: ''
          },
          isDisabled: {
            type: Boolean,
            default: false
          },
          symbol: {
            type: String,
            default: ''
          },
          icon: {
            type: String,
            default: ''
          }
        }
      }
    },
    value: ''
  },
  computed: {

  },
}
</script>

<style lang="scss" scoped>
.mark {
  width: 32px;
  height: 15px;
  background: $surface4;
  border-radius: 4px;
  padding: 2px 5px;
  text-transform: uppercase;
  @font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 9px;
  line-height: 11px;
  /* identical to box height */
  cursor: pointer;

  position: relative;
  top: -2px;
  color: $brand;
}

.token {
  width: 100%;
  background-color: $white;
  border-radius: 11px;
  padding: 10px 14px;

  &:not(:last-child) {
    margin-bottom: 8px;
  }
}

.token__header  {
  display: flex;
  justify-content: space-between;

  * {
    font-size: 10px;
    color: $brand;
  }
}
.token__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.token__info {
  display: flex;
  align-items: center;
  width: auto;
  padding: 2px 5px;
  flex-shrink: 0;
}

.token__icon-wrapper {
  @include flex-box(20px);
  margin-right: 7px;
}
.token__icon {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.token__input-wrapper {
  position: relative;
  flex-grow: 1;
  margin-right: 8px;
}
.token__input {
  width: 100%;
  border: 0px;
  background-color: inherit;
  outline: none;
  padding: 0;

  &::placeholder {
    color: $text4;
  }
}

.token__max {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 9px;
  line-height: 11px;
  width: 32px;
  height: 15px;
  padding: 2px 5px;
  margin-right: 8px;

  background: $surface4;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid $surface4;

  &:hover {
    background: rgba($surface4, 0.8);
  }
}
.token__symbol {
  font-size: 14px;
}
</style>
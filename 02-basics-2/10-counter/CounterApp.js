import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const counter = ref(0);

    function onClickDecrement() {
      counter.value--;
    }


    function onClickIncrement() {
      counter.value++;
    }


    return {
      counter,
      onClickDecrement,
      onClickIncrement,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="counter === 0"
        @click="onClickDecrement"
      >➖</button>

      <span class="count" data-testid="count">
        {{ counter }}
       </span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="counter === 5"
        @click="onClickIncrement"
      >➕</button>
    </div>
  `,
})

import { defineComponent, createApp } from 'vue'

const App = defineComponent({
	name: 'App',

	setup() {
		const newDate = new Date();
		const date = newDate.toLocaleDateString(navigator.language, {
      dateStyle: 'long',
    });

		return {
			date,
		}
	},

	template: `
		<div>
      Сегодня {{date}}
    </div>
	`,
})

createApp(App).mount('#app');

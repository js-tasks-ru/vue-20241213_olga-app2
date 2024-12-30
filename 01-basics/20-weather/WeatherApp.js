import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function isNightTheme(dt, sunset, sunrise) {
  const currentTimeInMinutes = timeToMinutes(dt);
  const sunsetTimeInMinutes = timeToMinutes(sunset);
  const sunriseTimeInMinutes = timeToMinutes(sunrise);

  return currentTimeInMinutes > sunsetTimeInMinutes
    || currentTimeInMinutes < sunriseTimeInMinutes ;
}

const weatherData = getWeatherData().map(item => {
  return {
    ...item,
    icon: WeatherConditionIcons[item.current.weather.id],
    iconTitle: item.current.weather.description,
    pressureMmHg: (item.current.pressure * 0.75).toFixed(0),
    nightTheme: isNightTheme(item.current.dt, item.current.sunset, item.current.sunrise),
    tempCelsius: (item.current.temp - 273.15).toFixed(1),
  };
});


export default defineComponent({
  name: 'WeatherApp',
  setup() {
    return {
      weatherData,
    }
  },


  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li
          v-for="item in weatherData"
          class="weather-card"
          :class="{'weather-card--night': item.nightTheme }"
        >
          <div
            v-if="item.alert"
            class="weather-alert"
          >
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">
              {{ item.alert.sender_name }}: {{ item.alert.description }}
            </span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ item.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ item.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div
              class="weather-conditions__icon"
              :title="item.iconTitle"
            >
              {{ item.icon }}
            </div>
            <div class="weather-conditions__temp">
              {{ item.tempCelsius }} °C
            </div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">
                {{ item.pressureMmHg}}
              </div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">
                {{ item.current.humidity }}
              </div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">
                {{ item.current.clouds }}
              </div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">
                {{ item.current.wind_speed }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})

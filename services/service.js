const $api = require('../http/index');

module.exports = class Service {
    static async GetCurrentWeather(city) {
        return $api.get(`/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=ru`);
    }
};

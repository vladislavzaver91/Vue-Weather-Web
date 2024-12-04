<script>
import countries from 'i18n-iso-countries'
import countriesEn from 'i18n-iso-countries/langs/en.json'

countries.registerLocale(countriesEn)

export default {
  name: 'CountryName',
  props: {
    countryCode: {
      type: String,
      required: true,
    },
  },
  computed: {
    countryName() {
      const language = 'en'
      return countries.getName(this.countryCode, language) || 'Unknown country'
    },
  },
}
</script>

<template>
  {{ countryName }}
</template>

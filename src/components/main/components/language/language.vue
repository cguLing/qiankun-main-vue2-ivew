<template>
  <div>
    <Dropdown trigger="click" @on-click="selectLang">
      <Button type="default">
        {{ title }}
        <Icon type="ios-arrow-down"></Icon>
      </Button>
      <DropdownMenu slot="list">
        <DropdownItem v-for="(value, key) in localList" :name="key" :key="`lang-${key}`">{{ value }}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: 'Language',
  props: {
    lang: String
  },
  data () {
    return {
      langList: {
        'zh-CN': '语言',
        'en-US': 'Lang'
      },
      localList: {
        'zh-CN': '中文简体',
        'en-US': 'English'
      }
    }
  },
  watch: {
    lang (lang) {
      this.$i18n.locale = lang
    }
  },
  computed: {
    title () {
      return this.langList[this.lang]
    }
  },
  methods: {
    selectLang (name) {
      this.$emit('on-lang-change', name)
    }
  }
}
</script>

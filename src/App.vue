<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  width: 1920px;
  /*height: 100%;*/
  transform-origin: 0 0;
  position: relative;
  /*margin-top: 60px;*/
}

li {
  margin: 5px 0;
}

ul {
  display: block;
  list-style-type: none;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  -webkit-margin-start: 0;
  -webkit-margin-end: 0;
  -webkit-padding-start: 0;
}

  .fr{
    float: right;
  }

  .fl{
    float: left;
  }

.el-progress-bar__inner, .el-progress-bar__outer {
  border-radius: 0 !important;
}

.el-progress-bar__outer {
  background: #353643 !important;
}

.el-select-dropdown {
  border: 0;
  text-align: center;
}

.el-select-dropdown__list {
  padding: 0 5px 5px 5px;
  background: #353644;
}

.el-select-dropdown__list li {
  margin: 0;
  padding: 5px;
  border-bottom: 1px solid #949494;
}

.el-popper .popper__arrow, .el-popper .popper__arrow::after {
  border-style: none;
}

.el-select-dropdown__item.selected {
  color: white;
  font-weight: 100;
  background: #353644;
}

.el-select-dropdown__item.selected span {
  font-size: 12px !important;
}

.el-select-dropdown__item {
  height: initial;
  line-height: initial;
}

.el-select .el-input, .el-select, .el-select input {
  height: 20px !important;
  font-size: 14px;
  background: #353643;
  border: 1px solid #353643;
}

.el-select .el-input__icon {
  line-height: 20px;
}

</style>

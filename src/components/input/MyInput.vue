<script setup>
const props = defineProps({
  'type': String,
  'placeholder': String,
  'readonly': Boolean,
  'required': Boolean,
});

// 부모의 v-model과 연결되는 반응형 변수 선언 (v3.4+)
const model = defineModel();
</script>

<template>
<input
  :type="props.type"
  :readonly="props.readonly"
  :required="props.required"
  :placeholder="props.placeholder"
  v-model="model"
>
</template>

<style scoped>
input {
  padding: 0 10px;
  width: 300px;
  height: 85px;
  font-size: 24px;
  border: 2px solid #000;
  outline: none;
  display: flex;
  align-items: center;
  border-radius: 10px;
}

</style>

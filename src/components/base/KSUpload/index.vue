<template>
<div>
    <upload-list v-if="listType == 'list'"
        v-bind="params"
        :value="value"
        @input="v=>$emit('input', v)"
        @change="v=>$emit('change', v)"
        @preview="v=>$emit('preview', v)">
    </upload-list>
    <upload-card v-if="listType == 'card'"
        v-bind="params"
        :value="value"
        @input="v=>$emit('input', v)"
        @change="v=>$emit('change', v)"
        @preview="v=>$emit('preview', v)">
    </upload-card>
</div>
</template>

<script lang="ts" src="./index.ts"></script>

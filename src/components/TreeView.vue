<template>
    <div>
        <div @click="changeToggle()" :style="{ 'margin-left': `${branch * 45}px` }" class="node">
            <h3>
                <Icon icon="ep:arrow-up-bold" :rotate="rotate" :horizontalFlip="true" v-if="havechildern" /> {{ node.name }}
            </h3>

        </div>
        <TreeView v-if="toggel" v-for="child in node.children" :key="child.name" :node="child" :branch="branch + 1"
            @onClick="(node) => $emit('onClick', node)" />
    </div>
</template>

<script >
import TreeView from "../components/TreeView.vue";
import { Icon } from '@iconify/vue';
export default {
    components: {
        Icon,
    },
    name: "TreeView",
    props: {
        node: Object,
        branch: {
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            toggel: false,
            rotate: 1
        }

    },
    methods: {
        changeToggle() {
            this.toggel = !this.toggel
            this.rotate = this.rotate == 1 ? 2 : 1
            if (!this.havechildern) {
                this.$emit('onclick', this.node);

            }
        }
    },
    computed: {
        havechildern() {
            return this.node.children;
        }
    }
}

</script>

<style  scoped>
.node {
    text-align: left;
    font-size: 18px;
}
</style>
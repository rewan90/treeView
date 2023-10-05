<template>
    <div>
        <div @click="changeToggle()" :style="{ 'margin-left': `${branch * 45}px` }" class="folder">
            <h3>
                <Icon icon="ep:arrow-up-bold" :rotate="rotate" :horizontalFlip="true" v-if="havechildern" /> {{ folder.name }}
                <div class="icons">
            <span @click="deleteFolder"> <Icon icon="mdi:delete" />delete</span>
            <router-link :to="{ name: 'EditFolder', params: { FolderId: folder.id } }">
                <span ><Icon icon="line-md:edit" />edit</span>
            </router-link>
            <router-link :to="{ name: 'AddFolder' , params: { FolderId: folder.id } }">
                <span ><Icon icon="fluent:folder-add-24-filled" /> Add</span>
            </router-link>
        </div>
            </h3>

        </div>
        <TreeView v-if="toggel" v-for="child in folder.folders" :key="child.id" :folder="child" :branch="branch + 1"
            @onClick="(folder) => $emit('onClick', folder)" />
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
        folder:{
            type: Object,
        },
        branch: {
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            toggel: false,
            rotate: 1,
            uri: "http://localhost:3000/folders/" + this.folder.id,

        }

    },
    methods: {
        changeToggle() {
            this.toggel = !this.toggel
            this.rotate = this.rotate == 1 ? 2 : 1
            if (!this.havechildern) {
                this.$emit('onclick', this.folder);

            }
        },
        deleteFolder() {
            fetch(this.uri, {
                    method: "DELETE",
                })
                .then(() => this.$emit("delete", this.folder.id))
                .catch((err) => console.log(err));
        },
    },
    computed: {
        havechildern() {
            return this.folder.folders ? true : false;
        }
    }
}

</script>

<style  scoped>
.folder {
    text-align: left;
    font-size: 18px;
}
</style>
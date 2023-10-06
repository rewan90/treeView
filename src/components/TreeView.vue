<template>
  <div class="">
    <div
      @click="changeToggle()"
      :style="{ 'margin-left': `${branch * 45}px` }"
      class="mb-3"
    >
      <h3>
        <Icon
          icon="ep:arrow-up-bold"
          :rotate="rotate"
          :horizontalFlip="true"
          v-if="havechildern"
        />
        {{ folder.name }}
        <div class="list-group-item d-flex justify-content-end">
          <span
            class="badge bg-black rounded-pill px-2"
            @click="deleteFolder(folder.id)"
          >
            <Icon icon="mdi:delete" />
          </span>
          <router-link
            :to="{ name: 'EditFolder', params: { FolderId: folder.id } }"
          >
            <span class="badge bg-black rounded-pill px-2">
              <Icon icon="bx:edit" />
            </span>
          </router-link>
          <router-link
            :to="{ name: 'AddFolder', params: { FolderId: folder.id } }"
          >
            <span class="badge bg-black rounded-pill px-2">
              <Icon icon="fluent:folder-add-24-filled" />
            </span>
          </router-link>
        </div>
      </h3>
    </div>
    <TreeView
      class=""
      v-if="toggel"
      v-for="child in folder.folders"
      :key="child.id"
      :folder="child"
      :branch="branch + 1"
      @onClick="(folder) => $emit('onClick', folder)"
    />
  </div>
</template>

<script>
import TreeView from "../components/TreeView.vue";
import { Icon } from "@iconify/vue";
export default {
  components: {
    Icon,
  },
  name: "TreeView",
  props: {
    folder: {
      type: Object,
    },
    branch: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      toggel: false,
      rotate: 1,
      uri: "http://localhost:3000/folders/" + this.folder.id,
    };
  },
  methods: {
    changeToggle() {
      this.toggel = !this.toggel;
      this.rotate = this.rotate == 1 ? 2 : 1;
      if (!this.havechildern) {
        this.$emit("onclick", this.folder);
      }
    },
    async deleteFolder(id) {
      await fetch("http://localhost:3000/folders/" + id, {
        method: "DELETE",
      }).then(location.reload());
      swal({
        text: "folder deleted successfully",
        icon: "success",
      }).catch((err) => console.log(err));
      swal({
        text: errorsText,
        icon: "error",
      });
    },
  },
  computed: {
    havechildern() {
      return this.folder.folders ? true : false;
    },
  },
};
</script>

<style scoped></style>

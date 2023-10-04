

<template>
  <main>
    <div class="card text-center">
      <h1 class="card-header">View Tree Window
        <router-link :to="{ name: 'AddFolder',  }">
                <span ><Icon icon="fluent:folder-add-24-filled" /> Add</span>
            </router-link>
      </h1>
      <treeView  v-for="folder in folders"  :folder="folder" @onClick="nodewasClicked" @delete="handleDelete(folder.id)"/>


    </div>
  </main>
</template>


<script >
import TreeView from "../components/TreeView.vue";
import { Icon } from '@iconify/vue';


export default {
  name: "home",
  data() {
    return {
      folders:[]
    }
  },
  components: {
    TreeView,
        Icon,
    
  },
  mounted() {
    fetch('http://localhost:3000/folders')
      .then(res => res.json())
      .then(data => this.folders = data )
      .catch(err => console.log(err))
  },
  methods: {
    nodewasClicked(node) {

    }
  },
    handleDelete(id) {
      this.folders = this.folders.filter(folder => {
        return folder.id !== id
      })
    },
}
</script>

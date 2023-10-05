

<template>
  <main>
    <div class="card text-center">
      <h1 class="card-header">View Tree Window
        <router-link :to="{ name: 'AddFolder', params: { FolderId: 0 } }">
          <span>
            <Icon icon="fluent:folder-add-24-filled" /> Add
          </span>
        </router-link>
      </h1>
      <treeView v-for="folder in folders" :folder="folder" />


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
      folders: [],
      foldersArrsy: []
    }
  },
  components: {
    TreeView,
    Icon,

  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      // fetch json data
      await fetch('http://localhost:3000/folders')
        .then(res => res.json())
        .then(data => this.folders = data)
        .catch(err => console.log(err))
        // loop in data to make a tree
      this.folders.forEach(myFunction.bind(this));
      function myFunction(folder) {
        // if the folder is main folder 
        if (folder.parent_id == null) {
          this.foldersArrsy.push(folder)
        } else {
          // get the folder parent 
          let parent;
          parent = this.folders.filter(item => {
            return folder.parent_id == item.id
          })
          parent = parent[0]
          // if folder has  vaild parent 
          if (parent) {
            // loop in all parent and push childern to the parent 
            this.loopInarray(parent, this.foldersArrsy, folder);
          }
        }
      }
      this.folders = this.foldersArrsy;
    },
    loopInarray(parent, foldersArrsy, folder) {
      // rename this to bind with new name vm
      let vm = this
      // loop in the latest folder array,
      foldersArrsy.map(function (value) {
        // if the parent == this folder parent_id
        // push the folder in to the parent with attr folders
        if (value.id == parent.id) {
          if (value.folders) {
            value.folders.push(folder)
          }else{
            value.folders = [folder];
          }
          
          return value;
        }
        // else looop in the folder folders 
        // search in childern and grand childern ...etc
        if (value.folders) {
          vm.loopInarray(parent, value.folders, folder)
        }
      }.bind([parent, folder, vm]));
      this.foldersArrsy = foldersArrsy;
    },
  }
}
</script>

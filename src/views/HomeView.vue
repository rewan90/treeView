

<template>
  <main>
    <div class="card text-center">
      <h1 class="card-header">View Tree Window
        <router-link :to="{ name: 'AddFolder'  ,params: { FolderId:0}  }">
                <span ><Icon icon="fluent:folder-add-24-filled" /> Add</span>
            </router-link>
      </h1>
      <treeView  v-for="folder in folders"  :folder="folder" @delete="handleDelete(folder.id)"/>


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
  async mounted() {
    await fetch('http://localhost:3000/folders')
      .then(res => res.json())
      .then( data => this.folders = data )
      .catch(err => console.log(err))
    let foldersArrsy = []
    this.folders.forEach(myFunction.bind(this));
    function myFunction(folder) {
      
      // console.log("folder" , folder.parent_id == null);
      if (folder.parent_id == null) {
        foldersArrsy.push(folder)
      } else {
        let parent;
        parent = this.folders.filter(item => {
          return folder.parent_id == item.id
        })
        parent = parent[0]
        // console.log(parent.id);
        foldersArrsy.map(function (value) {
          // console.log(value.id == parent.id, value.id , parent.id);
          if (value.id == parent.id) {
            value.folders = [folder];
            return value;
          }
        }.bind(parent));
      }
    }
    this.folders = foldersArrsy;
    console.log(this.folders);
    
  },
  methods: {
    

    handleDelete(id) {
      this.folders = this.folders.filter(folder => {
        return folder.id !== id
      })
    },
}  }
</script>

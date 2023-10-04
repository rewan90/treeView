

<template>
  <main>
    <div>
      <h1>View Tree Window</h1>
      <treeView :node="root" @onClick="nodewasClicked" />


    </div>
  </main>
</template>


<script >
import TreeView from "../components/TreeView.vue";

export default {
  name: "home",
  data() {
    return {
      root: {
        name: 'my computer',
        "children": [
          {
            name: 'documents',
            children: [
              {
                name: "book.pdf"
              },
              {
                name: "Home",
                children: [
                  {
                    name: "music"
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  components: {
    TreeView
  },
  methods: {
    nodewasClicked(node) {

    }
  },
}
</script>

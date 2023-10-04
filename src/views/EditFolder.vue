<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-primary fw-bold">Edit Folder</p>
      </div>
    </div>
  </div>
  <div v-if="loading">
    <div class="container">
      <div class="row">
        <div class="col">
          <spinner />
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="handleSubmit">
          <div class="mb-2">
            <input
              type="text"
              placeholder="Name"
              class="form-control"
              v-model="folder.name"
              required
            />
          </div>

          <div class="mb-2">
            <input type="submit" class="btn btn-primary" value="Update" />
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import spinner from "../components/spinner.vue";
export default {
  name: "editFolder",
  components: { spinner },

  props: ["id"],
  data() {
    return {
      uri: "http://localhost:3000/folders/" + this.id,
      name: "",
    };
  },

  created: async function () {
    try {
      this.loading = true;
      let response = await UsersService.getFolder(this.folderId);
      this.folder = response.data;
      this.loading = false;
    } catch (error) {
      this.errorMessage = error;
      this.loading = false;
    }
  },

  methods: {
    handleSubmit() {
      fetch(this.uri, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.name }),
      })
        .then(() => {
          this.$router.push("/");
          swal({
            text: "folder updateed successfully",
            icon: "success",
          });
        })
        .catch(function (error) {
          if (error.response) {
            let errorsText = "";
            error.response.data.forEach((element) => {
              errorsText =
                errorsText +
                element.field.toUpperCase() +
                " : " +
                element.message +
                "\n";
            });
            swal({
              text: errorsText,
              icon: "error",
            });
          } else if (error.request) {
            swal({
              text: error.request,
              icon: "error",
            });
          } else {
            swal({
              text: error.message,
              icon: "error",
            });
          }
        });
    },
  },
};
</script>

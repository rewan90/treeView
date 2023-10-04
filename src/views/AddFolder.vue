<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-primary fw-bold">Add folder</p>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="handleSubmit">
          <div class="mb-2">
            <input
              type="text"
              placeholder="Name"
              class="form-control"
              v-model="name"
              required
            />
            <span class="text-danger" v-if="msg.name">{{ msg.name }}</span>
          </div>
          <div class="mb-2">
            <button type="submit" class="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';

export default {
  name: "addFolder",
  data: function () {
    return {
      name: "",
      msg: [],
    };
  },

  methods: {
    handleSubmit() {
      let project = {
        name: this.name,
        id: Math.floor(Math.random() * 10000),
      };

      fetch("http://localhost:3000/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      })
        .then(() => {
          this.$router.push("/");
          swal({
            text: "folder added successfully",
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

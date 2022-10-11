<script>
  export default {
    data() {
      return {
        id: 0,
        form : {
          name: '',
          color: '',
          duration: '',
          status: ''
        }
      }
    },
    methods: {
      async fetchData() {
        let self = this;
        axios
          .get(this.apiUrl + '/types/' + this.id)
          .then(function (response) {
            self.form = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      submit() {
        let self = this;
        axios
          .put(this.apiUrl + '/types/' + this.id, this.form)
          .then(function (response) {
            self.$router.push('/types');
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    mounted() {
      this.id = this.$route.params.idType;
      this.fetchData();
    }
  }
</script>

<template>
  <div class="row">
    <div class="col-lg-12">
      <h1 class="text-center">Edit Type</h1>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12">
      <form>
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" v-model="form.name" aria-describedby="nameHelp" required>
          <div id="nameHelp" class="form-text"></div>
        </div>
        <div class="mb-3">
          <label for="color" class="form-label">Color</label>
          <input type="color" class="form-control form-control-color" v-model="form.color" title="Choose your color" required>
        </div>
        <div class="mb-3">
          <label for="duration" class="form-label">Duration</label>
          <select class="form-select" v-model="form.duration" aria-label="Duration" required>
            <option value="O">Once</option>
            <option value="P">Permanent</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="status" class="form-label">Status</label>
          <select class="form-select" v-model="form.status" aria-label="Status" required>
            <option value="A">Active</option>
            <option value="I">Inactive</option>
          </select>
        </div>
        <button type="button" @click="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>

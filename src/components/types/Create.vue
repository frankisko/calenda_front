<script>
  export default {
    data() {
      return {
        form : {
          name: '',
          color: '#112233',
          duration: 'O'
        }
      }
    },
    methods: {
      submit() {
        let self = this;
        axios
          .post(this.apiUrl + '/types', this.form)
          .then(function (response) {
            self.$router.push('/types');
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>

<template>
  <div class="row">
    <div class="col-lg-12">
      <h1 class="text-center">Create Type</h1>
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
        <button type="button" @click="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>

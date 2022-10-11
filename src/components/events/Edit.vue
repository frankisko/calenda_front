<script>
  export default {
    data() {
      return {
        id: 0,
        form : {
          name: '',
          description: '',
          type: {
            idType: ''
          },
          date: '',
          status: ''
        }
      }
    },
    methods: {
      async fetchData() {
        let self = this;
        axios
          .get(this.apiUrl + '/events/' + this.id)
          .then(function (response) {
            self.form = response.data;
            $('#date').datepicker('update', self.form.date);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      async fetchTypes() {
        let self = this;
        axios
          .get(this.apiUrl + '/types')
          .then(function (response) {
            self.catalogType = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      submit() {
        let self = this;
        axios
          .put(this.apiUrl + '/events/' + this.id, this.form)
          .then(function (response) {
            self.$router.push('/events');
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    mounted() {
      let self = this;

      this.fetchTypes().then(function() {
        self.id = self.$route.params.idEvent;
        self.fetchData();
      });

      $(document).ready(function(){
        $('.datepicker').datepicker({
          format: 'yyyy-mm-dd',
        }).on("changeDate", function(e){
          self.form.date =  $("#date").val();
        });
      });

    }
  }
</script>

<template>
  <div class="row">
    <div class="col-lg-12">
      <h1 class="text-center">Update Event</h1>
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
          <label for="description" class="form-label">Description</label>
          <textarea class="form-control" v-model="form.description" required></textarea>
        </div>
        <div class="mb-3">
          <label for="type" class="form-label">Type</label>
          <select class="form-select" v-model="form.type.idType" aria-label="type" required>
            <option v-for="row in catalogType" :value="row.idType" :key="row.idType">
              {{ row.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="date" class="form-label">Date</label>
          <input type="text" class="form-control datepicker" id="date" v-model="form.date" aria-describedby="dateHelp" required>
          <div id="dateHelp" class="form-text"></div>
        </div>
          <div class="mb-3">
          <label for="status" class="form-label">Status</label>
          <select class="form-select" v-model="form.status" aria-label="status" required>
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

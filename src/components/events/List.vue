<script>
  export default {
    data() {
      return {
        id: 0,
        modalActive: false,
        rows: []
      }
    },
    methods: {
      create() {
        this.$router.push('/events/create');
      },
      edit(id) {
        this.$router.push('/events/' + id + '/edit');
      },
      showModal(id) {
        this.id = id;
        this.modalActive = true;
        document.querySelector("body").classList.add("modal-open");
      },
      hideModal() {
        this.modalActive = false;
        document.querySelector("body").classList.remove("modal-open");
      },
      async remove() {
        let self = this;
        axios
          .delete(this.apiUrl + '/events/' + this.id)
          .then(function (response) {
            $('#table').DataTable().ajax.reload();
            self.hideModal();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      async refresh() {
        axios
          .get(this.apiUrl + '/events/refresh')
          .then(function (response) {
            $('#table').DataTable().ajax.reload();
            alert("Events refreshed!");
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    },
    mounted() {
      let self = this;

      this.emitter.on("edit-row", id => {
        this.edit(id);
      });

      this.emitter.on("delete-row", id => {
        this.showModal(id);
      });

      $(document).ready(function () {
        $('#table').DataTable({
          processing: true,
          serverSide: true,
          ajax: {
            url: self.apiUrl + '/events/paged',
            type: "POST",
            contentType: 'application/json',
            data: function (d) {
              return JSON.stringify(d);
            }
          },
          columns: [
              { data: 'idEvent' },
              { data: 'name' },
              { data: 'type.name' },
              { data: 'date' },
              {
                data: 'idEvent',
                orderable: false,
                render: function (data, type, row, meta) {
                  let html = '<span data-id="' + row.idEvent + '"><i class="fa fa-pencil edit"> </i></span>'
                           + '&nbsp;'
                           + '<span data-id="' + row.idEvent + '"><i class="fa fa-times delete"> </i></span>';

                  return html;
                }
              },
          ]
        });

        $("#table").on("click", ".edit", function() {
          self.emitter.emit("edit-row", $(this).parent().data("id"));
        })

        $("#table").on("click", ".delete", function() {
          self.emitter.emit("delete-row", $(this).parent().data("id"));
        })
      });
    }
  }
</script>

<template>
  <div class="row">
    <div class="col-lg-12">
      <h1 class="text-center">Events</h1>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12">
      <table id="table" style="width:100%">
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12  pt-lg-5">
      <div class="text-center">
        <button class="btn btn-info" @click="create">Create</button>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12  pt-lg-5">
      <div class="text-center">
        <button class="btn btn-secondary" @click="refresh">Refresh</button>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div ref="modal" class="modal fade" :class="{ show: modalActive, 'd-block': modalActive }" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Delete record</h5>
        </div>
        <div class="modal-body">
          Do you want to delete record {{ id }}?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="hideModal()">Cancel</button>
          <button type="button" class="btn btn-primary" @click="remove()">Confirm</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="modalActive" class="modal-backdrop fade show"></div>

</template>

<style scoped>
</style>

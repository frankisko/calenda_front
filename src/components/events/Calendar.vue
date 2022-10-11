<script>
  import { useRoute } from 'vue-router'
  import date from 'date-and-time';

  export default {
    data() {
      return {
        month_name : "",
        year : 0,
        previous_calendar_url : "",
        next_calendar_url : "",
        days_blocks : "",
        event: {
          name: '',
          description: '',
          type: {
            name: '',
            color: ''
          }
        },
        today_day: 0
      }
    },
    methods: {
      //check how many days are in the month
      daysInMonth(calendar_date, year) {
        const calendar_month = date.format(calendar_date, "M");
        const months_31 = [1, 3, 5, 7, 8, 10, 12];
        const months_30 = [4, 6, 9, 11];

        //months with 31 days
        if (months_31.indexOf(calendar_month) !== -1) {
          return 31;
        }

        //months with 30 days
        if (months_30.indexOf(calendar_month) !== -1) {
          return 30;
        }

        //february
        if (date.isLeapYear(year)) {
          return 29;
        }

        return 28;
      },
      eventDetail(event) {
        this.event = event;
        $('#myModal').modal("toggle");
      },
      hideModal() {
        $('#myModal').modal("toggle");
      }
    },
    mounted() {
      let self = this;

      const route = useRoute();

      const now = new Date();
      this.today_day = date.format(now, 'D');

      const calendar_date = date.parse(route.params.year + "-" + route.params.month + "-01", 'YYYY-MM-DD');
      const previous_calendar_date = date.addMonths(calendar_date, -1);
      const next_calendar_date = date.addMonths(calendar_date, 1);
      const days_in_month = this.daysInMonth(calendar_date, route.params.year);

      //check how many blocks to prepend/append
      const days_of_week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const first_month_day = date.format(calendar_date, "ddd");
      const day_of_week = days_of_week.indexOf(first_month_day);

      let days_blocks = [];
      let index_key = 0;

      axios
          .get(this.apiUrl + '/events/calendar/' + route.params.year + '/' + route.params.month)
          .then(function (response) {
            let events = response.data;

            //group events by day
            let events_by_day = {};

            for (let i = 0; i < events.length; i++) {
              let event_date = events[i]["date"];
              if (!(event_date in events_by_day)) {
                events_by_day[event_date] = [];
              }

              events_by_day[event_date].push(events[i]);
            }

            //prepend
            for (let i = 0; i < day_of_week; i++) {
              days_blocks.push({
                "key": index_key,
                "label" : "",
                "events": []
              });
              index_key++;
            }

            //days
            for (let i = 1; i <= days_in_month; i++) {
              let this_day = route.params.year + "-" + route.params.month + "-" + String(i).padStart(2, '0');

              let events_this_day = [];

              if (this_day in events_by_day) {
                events_this_day = events_by_day[this_day];
              }

              days_blocks.push({
                "key": index_key,
                "label" : i,
                "events": events_this_day
              });
              index_key++;
            }

            //append
            let append_size = 35 - days_blocks.length;
            //dont append anything if february fits in 4 rows
            if (days_in_month == 28 && first_month_day == "Sun") {
              append_size = 0;
            }

            for (let i = 0; i < append_size; i++) {
              days_blocks.push({
                "key": index_key,
                "label" : "",
                "events": []
              });
              index_key++;
            }

            self.month_name = date.format(calendar_date, "MMM");
            self.year = route.params.year;
            self.previous_calendar_url = date.format(previous_calendar_date, "YYYY/MM");
            self.next_calendar_url = date.format(next_calendar_date, "YYYY/MM");
            self.days_blocks = days_blocks;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
</script>

<style>
</style>

<template>
  <div class="row">
    <div class="col-1">
      <h1>
        <router-link :to="{ path: '/events/calendar/' + previous_calendar_url }">&lt;</router-link>
      </h1>
    </div>
    <div class="col-10">
      <h1 class="text-center">{{ month_name }} {{ year }}</h1>
    </div>
    <div class="col-1">
      <h1>
        <router-link :to="{ path: '/events/calendar/' + next_calendar_url }">&gt;</router-link>
      </h1>
    </div>
  </div>
  <div class="row">
    <div class="card" style="width: 11rem;">
      <h1 class="text-center">Sun</h1>
    </div>
    <div class="card" style="width: 11rem;">
      <h1 class="text-center">Mon</h1>
    </div>
    <div class="card" style="width: 11rem;">
      <h1 class="text-center">Tue</h1>
    </div>
    <div class="card" style="width: 11rem;">
      <h1 class="text-center">Wed</h1>
    </div>
    <div class="card" style="width: 11rem;">
      <h1 class="text-center">Thu</h1>
    </div>
    <div class="card" style="width: 11rem;">
      <h1 class="text-center">Fri</h1>
    </div>
    <div class="card" style="width: 11rem;">
      <h1 class="text-center">Sat</h1>
    </div>
  </div>
  <div class="row">
    <div class="card" v-for="block in days_blocks" :key="block.key" style="width: 11rem;" :style="{'background-color': block.key == today_day? '#FFFF00' : '#FFFFFF'}">
      <div class="card-body">
        <h5 class="card-title">{{ block.label }}</h5>
        <p class="card-text" v-for="event in block.events" :key="event.idEvent" @click="eventDetail(event)">
          <a href="#" class="card-link" >
            <span class="badge" :style="{'background-color': event.type.color }">{{ event.name }}</span>
          </a>
        </p>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="myModalTitle">
            {{ event.name }}
          </h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>{{ event.date }}</p>
          <span class="badge" :style="{'background-color': event.type.color }">
            {{ event.type.name }}
          </span>
          <p>{{ event.description }}</p>
        </div>
      </div>
    </div>
</div>
</template>
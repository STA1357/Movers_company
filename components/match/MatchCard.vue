<template>
  <div class="match-card mb-3">
    <div class="d-flex justify-content-around">
      <span class="state" v-if="!isLive"
        ><img src="@/assets/images/pause.svg" alt="" style="margin-top: -2px" />
        Pause</span
      >
      <span class="state" v-else style="color: red"
        ><img src="@/assets/images/live.svg" alt="" style="margin-top: -2px;" />
        Live</span
      >
      <span class="type">Football</span>
      <span class="teams">FC Barcelona - Real Madrid</span>
      <span class="time">18:00</span>
    </div>
    <div class="d-flex justify-content-around counter">
      <div class="team col-3">WHITE TEAM</div>
      <div class="count col-6">
        <span :style="{ color: teamWhiteCount.color }">{{
          teamWhiteCount.count
        }}</span
        ><span>:</span
        ><span :style="{ color: teamBlackCount.color }">{{
          teamBlackCount.count
        }}</span>
      </div>
      <div class="team  col-3">BLACK TEAM</div>
    </div>
    <div class="d-flex justify-content-around event">
      <div class="team col-3">0.5</div>
      <div class="col-6 info">
        Initial Price
      </div>
      <div class="team  col-3">0.5</div>
    </div>
    <div class="d-flex justify-content-around event">
      <div class="team col-3">0.5</div>
      <div class="col-6 info">
        Initial Price
      </div>
      <div class="team  col-3">0.5</div>
    </div>
    <div class="d-flex justify-content-around event">
      <div class="team col-3">0.5</div>
      <div class="col-6 info">
        Initial Price
      </div>
      <div class="team  col-3">0.5</div>
    </div>
    <div class="d-flex justify-content-around event">
      <div class="team col-3">0.5</div>
      <div class="col-6 info">
        Initial Price
      </div>
      <div class="team  col-3">0.5</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MatchCard",
  data() {
    return {
      teamWhiteCount: {
        color: "",
        count: 205
      },
      teamBlackCount: {
        color: "",
        count: 50
      },
      isLive: false,
      eventSport: "",
      time: "12:00",
      matchEvent: ""
    };
  },
  mounted() {
    this.counter();
  },
  methods: {
    counter() {
      let teamWhite = this.teamWhiteCount.count;
      let teamBlack = this.teamBlackCount.count;
      console.log(teamWhite < teamBlack);
      console.log(teamWhite, teamBlack);
      if (teamBlack > teamWhite) {
        console.log(11);
        this.teamBlackCount.color = "rgba(14, 112, 42, 0.47)";
        this.teamWhiteCount.color = "rgba(142, 15, 15, 0.47)";
      } else if (teamBlack < teamWhite) {
        console.log(22);
        this.teamBlackCount.color = "rgba(142, 15, 15, 0.47)";
        this.teamWhiteCount.color = "rgba(14, 112, 42, 0.47)";
      } else {
        console.log(33);

        this.teamWhiteCount.color = "#B4B4B4";
        this.teamBlackCount.color = "#B4B4B4";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.match-card {
  padding-top: 15px;
  width: 314px;
  height: 178px;
  margin: 0 auto;
  background: #f9f9f9;
  border-radius: 15px;
  @font-family: Montserrat;
  font-style: normal;
  .state {
    font-weight: bold;
    font-size: 10px;

    color: #979797;
  }
  .type {
    font-weight: 300;
    font-size: 9px;
    /* identical to box height */

    color: #7b7b7b;
  }
  .teams {
    font-weight: 300;
    font-size: 9px;
    /* identical to box height */

    color: #0f2f31;
  }
  .time {
    font-style: normal;
    font-weight: 300;
    font-size: 8px;
    /* identical to box height */

    text-align: right;

    color: #0f2f31;
  }
  .counter {
    margin-top: 10px;
    margin-bottom: 9px;
    .team {
      font-weight: bold;
      font-size: 10px;
      margin-top: 6px;
      color: #6c6c6c;
    }
    .count {
      font-weight: bold;
      font-size: 34px;
      line-height: 41px;
      color: #b4b4b4;
    }
  }
  .event {
    margin-top: 6px;
    .team {
      font-weight: 500;
      font-size: 9px;
      line-height: 11px;
      /* identical to box height */
      color: #7b7b7b;
    }
    .info {
      font-weight: 300;
      font-size: 9px;
      line-height: 11px;
      /* identical to box height */

      color: #0f2f31;
    }
  }
  .active {
    background: #ffffff;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 7px;
    padding-top: 6px;
    padding-bottom: 6px;
    width: 276px;
    .team {
      font-weight: bold;
      font-size: 11px;
      line-height: 13px;
      color: #0f2f31;
    }
    .info {
      font-weight: 500;
      font-size: 9px;
      line-height: 11px;
      /* identical to box height */

      color: #0f2f31;
    }
  }
}
</style>

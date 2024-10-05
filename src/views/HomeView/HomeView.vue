<script setup>
import { inject } from 'vue'
import DrinkTarget from './components/DrinkTarget.vue'
import TodaysRecords from './components/TodaysRecords.vue'
import SwitchCup from './components/SwitchCup.vue'

const showWelcomeView = inject('showWelcomeView')

</script>

<template>
  <div v-if="!showWelcomeView">
    <div class="row justify-content-center drink-target-row">
      <div class="drink-target-wrapper">
        <DrinkTarget />
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6">
        <div class="switch-cup-wrapper mb-3">
          <SwitchCup />
        </div>
      </div>
    </div>

    <div class="row justify-content-center mb-3">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6">
        <div class="todays-records-wrapper">
          <TodaysRecords />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.drink-target-row {
  height: 40vh;
}

.drink-target-wrapper {
  width: 80vw;
  height: 50vw;
  max-width: 380px;
  max-height: 275px;
  margin-top: 60px;
}


.switch-cup-wrapper,
.todays-records-wrapper {
  width: 100%;
}

.switch-cup-wrapper {
  overflow-x: auto;
  padding: 10px 0;
  max-width: 420px;
  margin: 0 auto;
}

@media (min-width: 576px) {
  .drink-target-wrapper {
    width: 60vw;
    height: 60vw;
  }

  .switch-cup-wrapper {
    overflow-x: auto;
    padding: 10px 0;
    max-width: 420px;
    margin: 0 auto;
  }
}

@media (min-width: 768px) {
  .drink-target-wrapper {
    width: 50vw;
    height: 50vw;
  }

  .switch-cup-wrapper {
    overflow-x: auto;
    padding: 10px 0;
    max-width: 420px;
    margin: 0 auto;
  }
}

@media (min-width: 768px) and (min-height: 840px) {
  .drink-target-wrapper {
    margin-top: 20px;
  }

  .switch-cup-wrapper {
    margin-top: 20px;
    overflow-x: auto;
    padding: 10px 0;
    max-width: 420px;
    margin: 0 auto;
  }
}

@media (min-width: 992px) {
  .drink-target-wrapper {
    width: 380px;
    height: 380px;
  }

  .switch-cup-wrapper {
    overflow-x: auto;
    padding: 10px 0;
    max-width: 420px;
    margin: 0 auto;
  }
}

@media (max-width: 477px) and (max-height: 840px) {
  .drink-target-wrapper {
    width: 70vw;
    height: 70vw;
  }

  .switch-cup-wrapper {
    overflow-x: auto;
    padding: 10px 0;
    max-width: 420px;
    margin: 0 auto;
  }
}

@media (min-width: 1024px) and (min-height: 840px) {
  .drink-target-wrapper,
  .switch-cup-wrapper,
  .todays-records-wrapper {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    max-width: 380px;
  }

  .drink-target-wrapper {
    top: 7%;
  }

  .switch-cup-wrapper {
    top: 50%;
    overflow-x: auto;
    padding: 10px 0;
    max-width: 420px;
    margin: 0 auto;
  }

  .todays-records-wrapper {
    top: 62%;
  }

  .container-lg {
    justify-content: center;
    align-items: center;
  }
}

@media (width: 320px) and (height: 840px) {
  .drink-target-wrapper {
    margin-top: 115px;
    height: 170px;
    
  }

  .switch-cup-wrapper {
    overflow-x: auto;
    padding: 10px 0;
    max-width: 420px;
    margin: 0 auto;
  }
}

@media (width: 375px) and (height: 840px) {
  .drink-target-wrapper {
    margin-top: 85px;
  }

  .switch-cup-wrapper {
    overflow-x: auto;
    padding: 10px 0;
    max-width: 420px;
    margin: 0 auto;
  }
}

@media (width: 425px) and (height: 840px) {
  .drink-target-wrapper {
    margin-top: 50px;
  }

  .switch-cup-wrapper {
    overflow-x: auto;
    padding: 10px 0;
    max-width: 420px;
    margin: 0 auto;
  }
}

@media (width: 768px) and (height: 840px) {
  .drink-target-wrapper {
    margin-top: 45px;
  }

  .switch-cup-wrapper {
    overflow-x: auto;
    padding: 10px 0;
    max-width: 420px;
    margin: 0 auto;
  }
}
</style>

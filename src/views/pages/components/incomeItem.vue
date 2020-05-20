<template>
  <div class="income-details flex">
    <div class="content-item flex-around">
      <i class="icon icon-plant-day hidden-sm-and-down"></i>
      <div class="plant-text">
        {{$t('plant.genTod')}} (kwh)
      </div>
      <div class="plant-money text-cut txt-c">
        {{incomeDetail.today.generation}}
      </div>
    </div>
    <div class="content-item flex-around">
      <i class="icon icon-plant-month hidden-sm-and-down"></i>
      <div class="plant-text">
        {{$t('plant.genMon')}} (kwh)
      </div>
      <div class="plant-money text-cut">
        {{incomeDetail.month.generation}}
      </div>
    </div>
    <div class="content-item flex-around">
      <i class="icon icon-plant-total hidden-sm-and-down"></i>
      <div class="plant-text">
        {{$t('plant.genTot')}} (kwh)
      </div>
      <div class="plant-money text-cut txt-c">
        {{incomeDetail.cumulate.generation}}
      </div>
    </div>
    <div class="content-item flex-around">
      <i class="icon icon-incomeT hidden-sm-and-down"></i>
      <div class="plant-text">
        {{$t('plant.earnTot')}} ({{incomeDetail.currency}})
      </div>
      <div class="plant-money text-cut plant-money-green">
        {{incomeDetail.cumulate.earnings}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    incomeDetail: {
      default () {
        return {
          currency: '', // 货币种类
          power: '', // 功率
          today: {
            generation: 0,
            earnings: 0
          },
          month: {
            generation: 0,
            earnings: 0
          },
          year: {
            generation: 0,
            earnings: 0
          },
          cumulate: {
            generation: 0,
            earnings: 0
          }
        }
      }
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.income-details {
  height: 240px;
  flex-wrap: wrap;
  .content-item {
    padding: 10px 0;
    width: 50%;
    box-sizing: border-box;
    &:nth-child(2n+1) {
      border-right: 1px solid #f5f5f5;
    }
    .plant-money {
      width: 60px;
      color: #FFC245;
      font-weight: bold;
      text-align: right;
    }
    .txt-c {
      text-align: center;
    }
    .plant-money-green {
      color: #67C23A;
      font-weight: bold;
    }
  }
}
</style>

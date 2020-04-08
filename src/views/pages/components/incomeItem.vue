<template>
  <div class="income-details flex">
    <div class="content-item flex-around">
      <i class="icon icon-plant-day"></i>
      <div class="plant-text">
        <p><span>{{$t('common.elec')}} (kwh)</span></p>
        <p><span>{{$t('common.income')}} ({{incomeDetail.currency}})</span></p>
      </div>
      <div class="plant-money">
        <p><span class="num">{{incomeDetail.today.generation}}</span></p>
        <p><span class="money">{{incomeDetail.today.earnings}}</span></p>
      </div>
    </div>
    <div class="content-item flex-around">
      <i class="icon icon-plant-month"></i>
      <div class="plant-text">
        <p><span>{{$t('common.elec')}} (kwh)</span></p>
        <p><span>{{$t('common.income')}} ({{incomeDetail.currency}})</span></p>
      </div>
      <div class="plant-money">
        <p><span class="num">{{incomeDetail.month.generation}}</span></p>
        <p><span class="money">{{incomeDetail.month.earnings}}</span></p>
      </div>
    </div>
    <div class="content-item flex-around">
      <i class="icon icon-plant-year"></i>
      <div class="plant-text">
        <p><span>{{$t('common.elec')}} (kwh)</span></p>
        <p><span>{{$t('common.income')}} ({{incomeDetail.currency}})</span></p>
      </div>
      <div class="plant-money">
        <p><span class="num">{{incomeDetail.year.generation}}</span></p>
        <p><span class="money">{{incomeDetail.year.earnings}}</span></p>
      </div>
    </div>
    <div class="content-item flex-around">
      <i class="icon icon-plant-total"></i>
      <div class="plant-text">
        <p><span>{{$t('common.elec')}} (kwh)</span></p>
        <p><span>{{$t('common.income')}} ({{incomeDetail.currency}})</span></p>
      </div>
      <div class="plant-money">
        <p><span class="num">{{incomeDetail.cumulate.generation}}</span></p>
        <p><span class="money">{{incomeDetail.cumulate.earnings}}</span></p>
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
  flex-wrap: wrap;
  .content-item {
    padding: 10px 0;
    width: 50%;
    box-sizing: border-box;
    &:nth-child(2n+1) {
      border-right: 1px solid #f5f5f5;
    }
    .plant-money {
      .num {
        color: #FFC245;
        font-weight: bold;
      }
      .money {
        color: #67C23A;
        font-weight: bold;
      }
    }
  }
}
</style>

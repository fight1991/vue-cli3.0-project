export default {
  data () {
    return {
      tableHeadData: [
        { // 实时数据 状态
          label: 'status',
          prop: 'status',
          checked: true,
          slotName: 'status'
        },
        {
          label: 'name',
          prop: 'name',
          checked: true
        },
        {
          label: 'account',
          prop: 'owner',
          checked: true
        },
        {
          label: 'country',
          prop: 'country',
          checked: true
        },
        {
          label: 'city',
          prop: 'city',
          checked: true
        },
        {
          label: 'equipment quantity',
          prop: 'quantity',
          checked: true,
          width: '80',
          renderHeader: true
        },
        {
          label: 'installed capacity',
          prop: 'capacity',
          checked: true,
          width: '80',
          renderHeader: true
        },
        { // 实时数据 发电功率
          label: 'generating power',
          prop: 'power',
          checked: true,
          width: '80',
          renderHeader: true
        },
        { // 实时数据 今日发电量
          label: 'generation today',
          prop: 'generationToday',
          checked: true,
          width: '80',
          renderHeader: true
        },
        {
          label: 'station time',
          prop: 'createdDate',
          checked: true,
          width: '80',
          renderHeader: true,
          slotName: 'createdDate'
        },
        {
          label: 'operation',
          prop: '',
          width: '100',
          checked: true,
          slotName: 'op',
          fixed: 'right'
        }
      ]
    }
  }
}

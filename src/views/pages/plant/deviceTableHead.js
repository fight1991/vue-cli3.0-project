
export default {
  data () {
    return {
      deviceTableHead: [
        {
          label: 'Inverter SN',
          prop: 'deviceSN',
          checked: true,
          renderHeader: true
        },
        {
          label: 'DataCollector SN',
          prop: 'moduleSN',
          checked: true,
          renderHeader: true
        },
        {
          label: 'Battery SN',
          prop: 'batteryMainSN',
          checked: true,
          renderHeader: true
        },
        {
          label: 'Type',
          prop: 'deviceType',
          checked: true
        },
        {
          label: 'Gernerating power',
          prop: 'power',
          checked: true,
          renderHeader: true
        },
        {
          label: 'Gerneration today',
          prop: 'generationToday',
          checked: true,
          renderHeader: true
        },
        {
          label: 'Gerneration Total',
          prop: 'generationTotal',
          checked: true,
          renderHeader: true
        },
        {
          label: 'Grid-connected time',
          prop: 'feedinDate',
          checked: true,
          renderHeader: true,
          slotName: 'feedinDate'
        },
        {
          label: 'Status',
          prop: 'status',
          checked: true,
          slotName: 'status',
          fixed: 'right'
        }
      ]
    }
  }
}

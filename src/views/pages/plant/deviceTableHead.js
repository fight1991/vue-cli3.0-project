
export default {
  data () {
    return {
      deviceTableHead: [
        {
          label: 'Inverter SN',
          prop: 'age',
          checked: true,
          renderHeader: true
        },
        {
          label: 'DataCollector SN',
          prop: 'age',
          checked: true,
          renderHeader: true
        },
        {
          label: 'Battery SN',
          prop: 'age',
          checked: true,
          renderHeader: true
        },
        {
          label: 'Type',
          prop: 'age',
          checked: true
        },
        {
          label: 'Gernerating power',
          prop: 'age',
          checked: true,
          renderHeader: true
        },
        {
          label: 'Gerneration today',
          prop: 'age',
          checked: true,
          renderHeader: true
        },
        {
          label: 'Gerneration Total',
          prop: 'age',
          checked: true,
          renderHeader: true
        },
        {
          label: 'Grid-connected time',
          prop: 'age',
          checked: true,
          renderHeader: true
        },
        {
          label: 'Country',
          prop: 'age',
          checked: true
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

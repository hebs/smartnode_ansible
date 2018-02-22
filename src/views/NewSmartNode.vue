<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm=6>
        <b-card>
          <div slot="header">
            <strong>New</strong> <small>SmartNode</small>
          </div>
          <form v-on:submit.prevent="createSmartNode">
            <b-row>
              <b-col sm="12">
                <b-form-group>
                  <label for="label">Label</label>
                  <b-form-input v-model="label" type="text" id="label"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group>
                  <label for="address">Address</label>
                  <b-form-input v-model="address" type="text" id="address"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="12">
                <b-form-group>
                  <b-button type="submit">New SmartNode</b-button>
                </b-form-group>
              </b-col>
            </b-row>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import toastr from 'toastr'
import { api } from '../feathers'

export default {
  name: 'NewSmartNode',
  components: {},
  data: function () {
    return {
      label: '',
      address: ''
    }
  },
  methods: {
    createSmartNode (event) {
      const { label, address } = this
      api.service('smart-nodes').create({ label, address })
        .then(results => {
          console.log(results.data)
          toastr.success('Created')
        })
        .catch(err => {
          console.log(toastr)
          toastr.error(err.message)
        })
    }
  }
}
</script>
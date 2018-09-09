import context from '../../../api/group'
import * as types from '../../types'

const state = {
  model: []
}

// const fakeUser = {
//   id: '123456789'
// }

// actions
const actions = {
  reciveGroups ({commit}) {
    context.reciveGroups().then(x => commit(types.RECIVE_GROUPS, x))
  },
  editGroup ({commit}, group) {
    context.store(group).then(x => commit(types.SAVE_GROUP, x))
  },
  newGroup ({commit, getters}) {
    const countGroups = getters.model.length
    const newGroup = {id: countGroups + 1, name: 'Новая группа №' + countGroups}
    context.store(newGroup).then(x => commit(types.CREATE_GROUP, x))
  }
}

// mutations
const mutations = {
  [types.RECIVE_GROUPS] (state, payload) {
    state.model = payload
  },
  [types.SAVE_GROUP] (state, payload) {
    const group = state.model.find(x => x.id === payload.id)
    if (group !== null) group.name = payload.name
  },
  [types.CREATE_GROUP] (state, payload) {
    state.model.push(payload)
  }
}

// getters
const getters = {
  model: state => state.model
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}

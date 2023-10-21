import { toBoolean } from '../utils/utils.js'

const toArrayModel = (employes) => {
  const _modelList = []

  for (const employe of employes) {
    _modelList.push(toModel(employe))
  }

  return _modelList
}

const toModel = (employe) => {
  const _employe = {
    employe_id: employe.employe_id,
    name: employe.name,
    last_name: employe.last_name,
    job: employe.job,
    like_node: toBoolean(employe.like_node[0])
  }

  return _employe
}

export {
  toArrayModel,
  toModel
}

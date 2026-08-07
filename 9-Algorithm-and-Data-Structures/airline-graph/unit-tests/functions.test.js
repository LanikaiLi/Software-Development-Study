const { expect } = require('chai')
const fs = require('fs')
const path = require('path')
const vm = require('vm')

const loadContext = () => {
  const context = {
    console,
    Math
  }

  context.window = context
  vm.createContext(context)

  const base = path.join(__dirname, '..')

  const graphCode = fs.readFileSync(path.join(base, 'graph.js'), 'utf8')
  vm.runInContext(graphCode, context, { filename: 'graph.js' })
  vm.runInContext('window.graph = graph', context)

  const utilsCode = fs.readFileSync(path.join(base, 'utils.js'), 'utf8')
  vm.runInContext(utilsCode, context, { filename: 'utils.js' })

  const functionsCode = fs.readFileSync(path.join(base, 'functions.js'), 'utf8')
  vm.runInContext(functionsCode, context, { filename: 'functions.js' })

  return context.window
}

describe('Airline functions', () => {
  const api = loadContext()

  it('#1 GET NEIGHBORS returns city names', () => {
    expect(api.getNeighbors('Atlanta')).to.deep.equal([
      'Montreal',
      'Guadalajara',
      'Panama City',
      'Madrid'
    ])
  })

  it('#2 MILEAGE returns an integer liters value', () => {
    const liters = api.getFuelConsumptionLiters(1000)
    expect(liters).to.equal(333)
    expect(Number.isInteger(liters)).to.equal(true)
  })

  it('#3 DIRECT FLIGHT checks direct connectivity', () => {
    expect(api.hasDirectFlight('Atlanta', 'Madrid')).to.equal(true)
    expect(api.hasDirectFlight('Montreal', 'Lagos')).to.equal(false)
  })

  it('#4 JUST ONE TRANSFER checks one transfer or less', () => {
    expect(api.hasOneTransferRoute('Montreal', 'Atlanta')).to.equal(true)
    expect(api.hasOneTransferRoute('Montreal', 'Guadalajara')).to.equal(true)
    expect(api.hasOneTransferRoute('Montreal', 'Lagos')).to.equal(false)
  })

  it('#5 COUNT ALL CITIES returns total city count', () => {
    expect(api.countAllCities('Atlanta')).to.equal(8)
  })

  it('#6 PATH DISTANCE adds up full path distance', () => {
    const path = ['Montreal', 'Atlanta', 'Madrid']
    const expected =
      api.utils.getKmDistance('Montreal', 'Atlanta') +
      api.utils.getKmDistance('Atlanta', 'Madrid')

    expect(api.getPathDistance(path)).to.equal(expected)
  })

  it('#7 PATH FUEL CONSUMPTION uses path distance as helper', () => {
    const path = ['Montreal', 'Atlanta', 'Madrid']
    const expected = api.getFuelConsumptionLiters(api.getPathDistance(path))

    expect(api.getPathFuelConsumption(path)).to.equal(expected)
  })

  it('#8 FEWEST TRANSFERS returns airport code path', () => {
    expect(api.getFewestTransfersPath('Montreal', 'Lagos')).to.deep.equal([
      'YUL',
      'ATL',
      'PTY',
      'LOS'
    ])
  })

  it('#9 SHORTEST PATH returns airport code path', () => {
    expect(api.getShortestDistancePath('Montreal', 'Lagos')).to.deep.equal([
      'YUL',
      'ATL',
      'PTY',
      'LOS'
    ])
  })

  it('#10 FIND HUB CITY returns airport name', () => {
    expect(api.findHubCity()).to.equal('Hartsfield-Jackson Atlanta International Airport')
  })
})

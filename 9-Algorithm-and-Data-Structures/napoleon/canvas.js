if (typeof document !== 'undefined') {
  const graphData = graph
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  const minLon = -12
  const maxLon = 44
  const minLat = 28
  const maxLat = 61

  const xFromLon = lon => ((lon - minLon) / (maxLon - minLon)) * canvas.width + 76
  const yFromLat = lat => ((maxLat - lat) / (maxLat - minLat)) * canvas.height - 10
  let currentBackground = null

  const draw = bg => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (bg) {
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
    }

    ctx.strokeStyle = '#9b5a75'
    ctx.lineWidth = 1

    for (const [a, b] of graphData.connections) {
      const from = graphData.cities[a]
      const to = graphData.cities[b]

      ctx.beginPath()
      ctx.moveTo(xFromLon(from.lon), yFromLat(from.lat))
      ctx.lineTo(xFromLon(to.lon), yFromLat(to.lat))
      ctx.stroke()
    }

    ctx.font = '16px "Atkinson Hyperlegible", sans-serif'
    ctx.textBaseline = 'middle'

    const cities = Object.values(graphData.cities)
    const pops = cities.map(city => city.pop)
    const minPop = Math.min(...pops)
    const maxPop = Math.max(...pops)

    for (const [cityName, city] of Object.entries(graphData.cities)) {
      const x = xFromLon(city.lon)
      const y = yFromLat(city.lat)
      const popRatio = (city.pop - minPop) / (maxPop - minPop)
      const isSelected = !!city.selected
      const radius = 2 + popRatio * 6 + (isSelected ? 2 : 0)

      ctx.beginPath()
      ctx.fillStyle = isSelected ? '#ff7a00' : '#000'
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()

      let labelX = x + 6
      let labelY = y

      if (cityName === 'London') {
        labelX += 6
      }

      if (cityName === 'Paris' || cityName === 'Constantinople') {
        labelX += 3
      }

      if (cityName === 'St. Petersburg') {
        labelY += 6
      }

      if (cityName === 'Moscow') {
        labelX = x - 6 - ctx.measureText(cityName).width
      }

      ctx.fillStyle = '#000'
      ctx.fillText(cityName, labelX, labelY)
    }
  }

  graphData.onSelectionChange = () => {
    draw(currentBackground)
  }

  for (const city of Object.values(graphData.cities)) {
    city.onSelectionChange = graphData.onSelectionChange
  }

  const bg = new Image()
  bg.onload = () => {
    currentBackground = bg
    draw(bg)

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => draw(bg))
    }
  }

  bg.onerror = () => {
    currentBackground = null
    draw(null)

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => draw(null))
    }
  }

  bg.src = 'map.png'
}
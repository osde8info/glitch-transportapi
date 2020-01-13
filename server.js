const fs = require('node-fs')
const express = require('express')
const app = express()
const pug = require('pug')

const axios = require('axios')

// ++ get my google tag manager id from env
const mygtmid = process.env.MY_GTM_ID
const mygtmurl = 'https://www.googletagmanager.com/ns.html?id=' + mygtmid
// -- get my google tag manager id from env

const myappid = process.env.MY_APP_ID
const myappkey = process.env.MY_APP_KEY

// const url = 'http://transportapi.com/v3/uk/places.json' // query=euston&type=train_station&app_id=YOUR_APP_ID&app_key=YOUR_APP_KEY
const url = 'http://transportapi.com/v3/uk/train/station/crs:wat/live.json' // query=euston&type=train_station&app_id=YOUR_APP_ID&app_key=YOUR_APP_KEY

//
const ONE_DAY = 60 * 60 * 24

async function gettraindata(url, params) {
  console.log(new Date())
  try {
    var response = await axios.get(url, { params })
    console.log(response.data)
    console.table(response.data.departures.all)

    //console.log(response.data)

    /*
    var flights = response.data

    var details = []
    if (flights) {
      flights.forEach(flight => {
        var fl = {
          callsign: flight.callsign,
          estDepartureAirport: flight.estDepartureAirport ? flight.estDepartureAirport : 'null',
          estArrivalAirport: flight.estArrivalAirport ? flight.estArrivalAirport : 'null',
          estArrivalAirportHorizDistance: Math.floor(flight.estArrivalAirportHorizDistance / 10),
          estArrivalAirportVertDistance: Math.floor(flight.estArrivalAirportVertDistance / 1),
          firstSeen: new Date(flight.firstSeen * 1000).toLocaleTimeString('en-GB'),
          lastSeen: new Date(flight.lastSeen * 1000).toLocaleTimeString('en-GB'),
        }
        details.push(fl)
      })
    }

    return details
    */
  } catch (error) {
    console.log(error)
  }
}

async function gettrains() {
  let flightinfo = {
    date: '',
    arrivals: '',
    departures: '',
  }

  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  var start = new Date()
  flightinfo.date = start.toLocaleDateString('en-GB', options)
  var start = Math.floor(start / 1000) - ONE_DAY
  var end = start + 10 * 60 // N min window

  //  var params = { airport: airport, begin: start, end: end }
  // var params = { query: 'euston', type: 'train_station', app_id: myappid, app_key: myappkey }

  var params = { /* query: 'euston', type: 'train_station', */ app_id: myappid, app_key: myappkey }

  console.log(0)
  var flights = await gettraindata(url, params)
}

/*
  if (flights) {
    var s = ''
    flights.forEach(flight => {
      var details = [
        flight.callsign,
        flight.estDepartureAirport,
        flight.estArrivalAirport,
        flight.estArrivalAirportHorizDistance,
        flight.estArrivalAirportVertDistance,
        flight.firstSeen,
        flight.lastSeen,
      ]
      s += details.join(' ') + '\n'
    })
    flightinfo.arrivals = s
  }
  var params = { airport: airport, begin: start, end: end }
  var flights = await getflightsdetails(url + 'departure', params)
  if (flights) {
    var s = ''
    flights.forEach(flight => {
      var details = [
        flight.callsign,
        flight.estDepartureAirport,
        flight.estArrivalAirport,
        flight.estArrivalAirportHorizDistance,
        flight.estArrivalAirportVertDistance,
        flight.firstSeen,
        flight.lastSeen,
      ]
      s += details.join(' ') + '\n'
    })
    flightinfo.departures = s
  }

  return flightinfo
  */

app.get('/dynamic/dyncss.css', function(req, res) {
  const backgrounds = ['lightgray', 'lightgreen', 'lightpurple', 'lightpink']
  var i = Math.floor(Math.random() * backgrounds.length)

  var css = fs.readFileSync('./templates/dyncss.css')
  css = css.toString().replace('%bgcolour%', backgrounds[i])

  res.write(css)
  res.end()
})

app.get('/dynamic/dynjs.js', async function(req, res) {
  var planes = 'dynamic'
  /*
  var start = new Date()
  var start = Math.floor(start / 1000) - ONE_DAY
  var end = start + 10 * 60 // N min window

  
  var s = ''

  var params = {  query: 'euston', type: 'train_station', app_id: myappid, app_key: myappkey }

  var flights = await gettrains(url, params)

  if (flights) {
    flights.forEach(flight => {
      var cs = flight.callsign
      var x = flight.estArrivalAirportHorizDistance
      var y = flight.estArrivalAirportVertDistance
      s += `ctx.fillText('${flight.callsign}', -${x}, 300-${y})\n`
      s += `ctx.drawImage(plane, -${x}, 300-${y})\n`
    })
    
  }

  var flights = await getflightsdetails(url + 'departure', params)
  if (flights) {
    flights.forEach(flight => {
      var cs = flight.callsign
      var x = flight.estArrivalAirportHorizDistance
      var y = flight.estArrivalAirportVertDistance
      s += `ctx.fillText('${flight.callsign}', ${x}, 300-${y})\n`
      s += `ctx.drawImage(plane, ${x}, 300-${y})\n`
    })
  }

  var js = fs.readFileSync('./templates/dynjs.js')
  js = js.toString().replace('//%planes%', s)

  res.setHeader('content-type', 'text/javascript')
  res.write(js)
  res.end()
  */
})

app.locals.pretty = true

app.use(express.static('public'))

app.set('view engine', 'pug')

app.get('/', async (_, res) => {
  console.info(new Date())
  //  const pugdata = await gettrains()
  //pugdata.mygtmurl = mygtmurl

  var html = pug.render('h=myhead', { myhead: 'fancyTemplateFun' })
  console.log(html)

  var html = await pug.renderFile('./templates/table.pug', { tablerows: [[1, 2], [3, 4]] })

  console.log(html)
/*
  var fn = pug.compile('string of pug', options);
var html = fn(locals);

var fn = pug.compileFile('path to pug file', options);
var html = fn(locals);

var html = pug.render('string of pug', options);
var html = pug.renderFile('path/to/file.pug', options);
  */
  //  res.render('index', pugdata)
})

app.get('/dynamic/js/gtaghead.js', async function(req, res) {
  var js = fs.readFileSync('./googtagmgr/gtaghead.js')
  js = js.toString().replace('GTM-XXXXXXX', mygtmid)
  res.setHeader('content-type', 'text/javascript')
  res.write(js)
  res.end()
})

app.listen(process.env.PORT)

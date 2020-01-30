const hours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm']
const plan = JSON.parse(localStorage.getItem('timetable')) || []
plan.length = hours.length
// console.log(plan)
const now = moment()

const colorRow = x => {
  const hour = parseInt(parseInt(now.format('H')) - 9)
  if (x < hour) {
    return 'gray-bkg'
  } else if (x > hour) {
    return 'green-bkg'
  }
  return 'red-bkg'
}

const buildTable = _ => {
  document.getElementById('today').textContent = now.format('dddd, MMMM D, YYYY')
  for (let i = 0; i < hours.length; i++) {
    document.getElementById('timetable').innerHTML += `
<div class="uk-grid-collapse uk-child-width-expand" uk-grid>
  <div class="uk-padding-small uk-width-1-6 uk-text-right uk-background-muted">
    ${hours[i]}
  </div>
  <div class="uk-width-2-3 ${colorRow(i)} pad-8" id="box${i}">
    <input class="uk-input ${colorRow(i)}" type="text" id="input${i}" />
  </div>
  <div class="uk-padding-small uk-width-1-6 uk-text-center uk-background-primary point" id="save${i}">
    💾
  </div>
</div>
`
  }
  for (let i = 0; i < hours.length; i++) {
    if (plan[i]) {
      // console.log(`input${i}`)
      document.getElementById(`input${i}`).value = plan[i]
    }
  }
}

const doSave = id => {
  // console.log('LETS GO')
  const slot = id[4]
  plan[slot] = document.getElementById(`input${slot}`).value
  localStorage.setItem('timetable', JSON.stringify(plan))
}

const saveArray = {
  save1: doSave,
  save2: doSave,
  save3: doSave,
  save4: doSave,
  save5: doSave,
  save6: doSave,
  save7: doSave,
  save8: doSave,
  save9: doSave,
  save0: doSave
}

const setListener = _ => {
  document.getElementById('timetable').addEventListener('click', event => {
    // console.log(event.target.id)
    try {
      saveArray[event.target.id](event.target.id)
    } catch (e) {
      console.log('No action taken!')
    }
  })
}

setListener()
buildTable()

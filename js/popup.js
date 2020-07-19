const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove('active')
    })
    tabs.forEach((tab) => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
})

let data = []
let pageData = []
let perPage = 10
let activePage = 1
let select

fetch('https://api.covid19api.com/summary')
  .then((response) => response.json())
  .then(
    (res) =>
      (data = res.Countries.sort(function (a, b) {
        return b.TotalConfirmed - a.TotalConfirmed
      }))
  )
  .then((res) => pagination(activePage))
function loadData() {
  page = activePage
  let low = (page - 1) * perPage
  let high = page * perPage
  pageData = data.filter((a, i) => i >= low && i < high)
  fillPage(page)
}

function pagination(page) {
  let total = data.length
  let pageCOunt = 8
  let pages = document.getElementById('pages')
  pages.innerHTML = ''

  for (let i = 0; i < pageCOunt; i++) {
    let li = document.createElement('li')
    li.id = i
    li.addEventListener('click', () => changePage(i + 1))
    if (i === page - 1) {
      li.setAttribute('class', 'page-item active')
    } else {
      li.setAttribute('class', 'page-item')
    }
    let a = document.createElement('a')
    a.setAttribute('class', 'page-link')
    a.setAttribute('href', `#${i + 1}`)
    a.textContent = i + 1

    li.append(a)
    pages.append(li)
  }
  loadData()
}

function changePage(newPage) {
  console.log(newPage)
  let liActive = document.querySelector(`#pages li:nth-child(${activePage})`)
  liActive.setAttribute('class', 'page-item')
  activePage = newPage
  let liNew = document.querySelector(`#pages li:nth-child(${activePage})`)
  liNew.setAttribute('class', 'page-item active')
  loadData()
}

function fillPage() {
  var div = document.querySelector('tbody')
  div.innerHTML = ''

  pageData.forEach((item) => {
    const singleData = ` <tr>
            <td class="border" style="color:white" >${item.Country}</td>
            <td class="border" style="color:orange">${item.TotalConfirmed}</td>
            <td class="border" style="color:#00FFFF">${item.NewConfirmed}</td>
            <td class="border" style="color:red">${item.TotalDeaths}</td>
         
            <td class="border" style="color:#00FF00">${item.TotalRecovered}</td>
          </tr>`
    div.insertAdjacentHTML('beforeend', singleData)
  })
}

window.addEventListener('load', () => {
  pagination(activePage)
})

fetch('https://thevirustracker.com/free-api?global=stats')
  .then((response) => response.json())
  .then((res) => {
    console.log(res)
    var tot = document.getElementById('tota')
    var h1 = document.createElement('h4')
    h1.style.color = '#00FFFF'
    h1.textContent = res.results[0].total_cases
    h1.style.marginLeft = '35px'
    h1.style.marginRight = '25px'
    h1.style.cssFloat = 'left'
    var h2 = document.createElement('h4')
    h2.style.color = 'orange'
    h2.textContent = res.results[0].total_unresolved
    tot.append(h1, h2)
    var tot2 = document.getElementById('tota2')
    var h3 = document.createElement('h4')
    h3.style.color = '#00FF00'
    h3.textContent = res.results[0].total_recovered
    h3.style.marginLeft = '45px'
    h3.style.marginRight = '35px'
    h3.style.cssFloat = 'left'
    var h4 = document.createElement('h4')
    h4.style.color = 'red'
    h4.textContent = res.results[0].total_deaths

    tot2.append(h3, h4)
  })

//function for search
document.getElementById('searching').addEventListener('click', function () {
  document.getElementById('global').innerHTML = ''
  var search = document.getElementById('searching').value
  fetch('https://api.covid19api.com/live/country/south-africa/status/confirmed')
    .then((response) => response.json())
    .then((res) => {
      var glob = document.getElementById('global')
      var h6 = document.createElement('h6')
      h6.style.textAlign = 'center'
      h6.style.color = '#00FF00'
      h6.style.marginLeft = '40px'
      h6.textContent = 'Cases:' + res[0].Confirmed
      glob.append(h6)
    })
})

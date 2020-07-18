let data = [];
let pageData = [];
let perPage = 10;
let activePage = 1;
let select;

fetch("https://api.covid19api.com/summary")
  .then((response) => response.json())
  .then(
    (res) =>
      (data = res.Countries.sort(function (a, b) {
        return b.TotalConfirmed - a.TotalConfirmed;
      }))
  )
  .then((res) => pagination(activePage));
function loadData() {
  page = activePage;
  let low = (page - 1) * perPage;
  let high = page * perPage;
  pageData = data.filter((a, i) => i >= low && i < high);
  fillPage(page);
}

function pagination(page) {
  let total = data.length;
  let pageCOunt = 10;
  let pages = document.getElementById("pages");
  pages.innerHTML = "";

  for (let i = 0; i < pageCOunt; i++) {
    let li = document.createElement("li");
    li.id = i;
    li.addEventListener("click", () => changePage(i + 1));
    if (i === page - 1) {
      li.setAttribute("class", "page-item active");
    } else {
      li.setAttribute("class", "page-item");
    }
    let a = document.createElement("a");
    a.setAttribute("class", "page-link");
    a.setAttribute("href", `#${i + 1}`);
    a.textContent = i + 1;

    li.append(a);
    pages.append(li);
  }
  loadData();
}

function changePage(newPage) {
  console.log(newPage);
  let liActive = document.querySelector(`#pages li:nth-child(${activePage})`);
  liActive.setAttribute("class", "page-item");
  activePage = newPage;
  let liNew = document.querySelector(`#pages li:nth-child(${activePage})`);
  liNew.setAttribute("class", "page-item active");
  loadData();
}

function fillPage() {
  var div = document.querySelector("tbody");
  div.innerHTML = "";

  pageData.forEach((item) => {
    const singleData = ` <tr>
            <td class="border">${item.Country}</td>
            <td class="border">${item.TotalConfirmed}</td>
            <td class="border">${item.NewConfirmed}</td>
            <td class="border">${item.TotalDeaths}</td>
            <td class="border">${item.NewDeaths}</td>
            <td class="border">${item.NewRecovered}</td>
            <td class="border">${item.TotalRecovered}</td>
          </tr>`;
    div.insertAdjacentHTML("beforeend", singleData);
  });
}

window.addEventListener("load", () => {
  pagination(activePage);
});

const api_url =
  "https://fi.fazer.com/collections/suklaat//products.json?limit=250";

const pagination_element = document.getElementById("pagination");
const list_element = document.getElementById("shopList");

let items;

let current_page = 1;
let rows = 50;

/**
 * Retrieves data from Fazer's products
 */
const getData = async () => {
  const response = await fetch(api_url);
  const jsonData = await response.json();

  dataJson = jsonData.products;
  items = dataJson;
};

/**
 * Function for displaying retrieved data
 * @param items Retrieved data
 * @param wrapper Shoplist <div>
 * @param items_per_page How many items are displayed one page
 * @param page Selected page
 */
const DisplayList = (items, wrapper, items_per_page, page) => {
  console.log[items];

  wrapper.innerHTML = "";
  page--;

  let start = items_per_page * page;
  let end = start + items_per_page;
  let paginatedItems = items.slice(start, end);

  /**
   * Make <article> for each item, that inculdes picture, name and price
   */
  for (let i = 0; i < paginatedItems.length; i++) {
    let article = document.createElement("article");
    article.className = "ListArticle";

    let image = document.createElement("img");
    image.className = "ListImage";
    image.src = paginatedItems[i].images[0].src;
    article.appendChild(image);

    let name = document.createElement("h3");
    name.className = "ListText";
    name.innerText = paginatedItems[i].title;
    article.appendChild(name);

    let price = document.createElement("p");
    price.className = "ListPrice";
    price.innerText = paginatedItems[i].variants[0].price + "€";
    article.appendChild(price);

    list_element.appendChild(article);
  }
};

/**
 * Function to initialize pagination creation
 * @param items Retrieved data
 * @param wrapper pagination <div>
 * @param items_per_page How many items are displayed one page
 */
const setupPagination = (items, wrapper, items_per_page) => {

  let page_count = Math.ceil(items.length / items_per_page);

  /**
   * Creates pagination buttons and attach them to the page
   */
  for (let i = 1; i < page_count + 1; i++) {
    let btn = PaginationButton(i, items);
    wrapper.appendChild(btn);
  }
};

/**
 * Creates pagination button
 * @param  page Page number
 * @param  items Retrieved data
 * @returns Pagination button
 */
const PaginationButton = (page, items) => {
  let button = document.createElement("button");
  let element = document.getElementById("shopList");
  button.innerText = page;

  if (current_page == page) button.classList.add("active");

  button.addEventListener("click", function () {
    current_page = page;

    element.scrollIntoView({
      behavior: "smooth",
    });

    setTimeout(() => {
      DisplayList(items, list_element, rows, current_page);
    }, 700);

    let current_btn = document.querySelector(".pagenumbers button.active");
    current_btn.classList.remove("active");

    button.classList.add("active");
  });

  return button;
};

getData();

setTimeout(() => {
  items = dataJson;
  DisplayList(items, list_element, rows, current_page);
  setupPagination(items, pagination_element, rows);
}, 500);

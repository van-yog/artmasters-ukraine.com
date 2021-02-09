var phoneModelsJS = document.createElement("script");
phoneModelsJS.src = "https://cases.in.ua/js/phoneModels.js";
document.head.appendChild(phoneModelsJS);
phoneModelsJS.onload = function () {
  console.log("phoneModelsJS");
  cart_models = phoneModels;
};

// var JQscript = document.createElement("script");
// JQscript.src = 'https://cases.in.ua/jquery-3.4.1.min.js';
// document.head.appendChild(JQscript);

// var Cartscript = document.createElement("script");
// Cartscript.src = 'https://cases.in.ua/jquery-3.4.1.min.js';
// document.head.appendChild(Cartscript);
// Cartscript.onload = function () {
// console.log("Cartscript");
// };

var axiosJS = document.createElement("script");
axiosJS.src = "https://unpkg.com/axios/dist/axios.min.js";
document.head.appendChild(axiosJS);
axiosJS.onload = function () {
  console.log("axiosJS");
};
var vendorsJS = document.createElement("script");
vendorsJS.src = "https://cases.in.ua/vendors.js";
document.head.appendChild(vendorsJS);
vendorsJS.onload = function () {
  console.log("vendorsJS");
  //alert("vendorsJS");
};
let show_items = 8;
let cart_selected_mark = {};
let cart_selected_model = {};
const cart_marks = [
  { name: "iPhone", value: "iphone" },
  { name: "Samsung", value: "samsung" },
  { name: "Xiaomi", value: "xiaomi" },
  { name: "Huawei", value: "huawei" },
  { name: "Lenovo", value: "lenovo" },
  { name: "Meizu", value: "meizu" },
  { name: "Realme", value: "realme" },
  { name: "LG", value: "lg" },
  { name: "Sony", value: "sony" },
  { name: "OnePlus", value: "oneplus" },
  { name: "Nokia", value: "nokia" },
  { name: "Asus", value: "asus" },
  { name: "Google", value: "google" },
  { name: "Motorola", value: "motorola" },
  { name: "ZTE", value: "zte" },
  { name: "TPLINK", value: "tplink" },
  { name: "HTC", value: "htc" },
  { name: "LeTV", value: "letv" },
  { name: "Fly", value: "fly" },
  { name: "Doogee", value: "doogee" },
  { name: "Alcatel", value: "alcatel" },
  { name: "BlackBerry", value: "blackberry" },
];
let cart_models = {};

function getdomen() {
  var href = document.location.href;
  if (href.indexOf("index.php") > -1) {
    var domen = href.split("index.php")[0];
  } else {
    var domen = href;
  }
  console.log("domen - " + domen);
  return domen;
}

function getdomenwpath() {
  var hostname = window.location.hostname;
  var path = window.location.pathname;
  var domen = "https://" + hostname + "" + path + "";
  return domen;
}

if ($("#catalog").length > 0) {
}
const nextUsersButton = document.querySelector("#next-users");
const remainedValueButton = document.querySelector("#remained-value");
const selectCollection = document.querySelector("#select");
const selectSort = document.querySelector("#select-sort");
$("#select-sort").hide();
const usersDiv = document.querySelector("#box");

a = casesArr.reverse();

let casesByCategories = {};

vendorsJS.onload = function () {
  //JQscript.onload = function () {
  // window.onload = () => { };

  $(document).ready(function () {
    casesArr.map((it) => {
      if (!it.hasOwnProperty("price")) {
        it.price = 199;
      }
    });
    casesArr.sort(() => 0.5 - Math.random());
    // получаем параметры из ссылки
    var href = document.location.href;
    console.warn("href", href);
    // https://iphone-cases.in.ua/games/index.php?cat=art
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
      url = href,
      url_params = {},
      match;
    while ((match = regex.exec(url))) {
      url_params[match[1]] = match[2];
    }
    /* if (href.indexOf('games') > -1){
    console.warn("games");
    } */
    var url_cat = "";
    for (var param in url_params) {
      if (param == "cat") {
        url_cat = url_params[param];
      }
      console.log("param " + param + " value " + url_params[param]);
    }

    console.warn("href params", url_params);

    function urlcat() {
      // проверяем есть ли в параметрах ссылки категория
      var urlcat = "";
      for (var cat in casesByCategories) {
        //console.log("cat "+cat+" value "+casesByCategories[cat]);

        if (url_cat == cat) {
          //console.log("url has cat "+param+" value "+url_params[param]);
          console.log("url has cat " + url_cat);
          // запускаем отображение категории из параметра ссылки
          urlcat = url_cat;
        }
      }
      if (urlcat != "") {
        return urlcat;
      } else {
        return false;
      }
    }

    //alert('docready');

    function init() {
      //  alert('init');
      casesByCategories = {};
      casesArr.forEach((item) => {
        if (item.collection in casesByCategories) {
          casesByCategories[item.collection].push(item);
          //console.table(item);
        } else {
          casesByCategories[item.collection] = [item];
        }
      });
    }

    function getFromAllCategories(count) {
      let index = 0;
      const items = [];
      while (index < count) {
        items.push(casesArr[index]);
        index++;
      }
      console.warn("render");
      console.table(items);
      return items;
    }

    function getRandomFromAllCategories(count) {
      const categories = Object.keys(casesByCategories);
      let index = 0;
      const items = [];
      while (getTotalSize() > 0) {
        const categorizedItems = casesByCategories[categories[index]];
        index++;
        if (categorizedItems.length > 0) items.push(categorizedItems.shift());
        if (items.length === count) break;
        if (index >= categories.length) index = 0;
      }
      console.warn("render random");
      console.table(items);
      return items;
    }

    function getFromCategory(categoryName, count) {
      if (categoryName in casesByCategories) {
        let array_items = casesByCategories[categoryName];
        let items = [];
        let i = 0;
        while (i < count) {
          items.push(array_items[i]);
          i++;
        }
        // console.log("cat gets items", items)
        return items;
      }
      console.warn("Category", categoryName, "does not exist!");
      return [];
    }

    function getTotalSize() {
      const categories = Object.keys(casesByCategories);
      let sum = 0;
      categories.forEach(
        (category) => (sum += casesByCategories[category].length)
      );
      return sum;
    }
    // +
    //   '<img class="sale__' +
    //   item.sale +
    //   '" src="https://cases.in.ua/img/sale.png"></img>'
    function render(items) {
      // распродажа 11.11
      const sale1111 = false;
      const sale1111Price = 149;

      var price = 149;

      if (window.location.hostname === "iphone-cases.in.ua") {
        price = 199;
      }

      if (sale1111) {
        price = sale1111Price;
      }
      console.log("item render", items);
      return items
        .map((item) => {
          var item_price = "";
          if (item.price) {
            item_price = item.price;
          } else {
            item_price = price;
          }
          return (
            '<div class="box__item" data-cat="' +
            item.collection +
            '">' +
            '<div class="box__images"><img class="card__img" src="' +
            item.img +
            '"/>' +
            "<style> .box__images {position: relative; z-index: 20} .sale__undefined {display: none;}.card__img {z-index: 200;}.sale__true {position: absolute;width: 46%;height: 30%;top: 0%;right: -39%;z-index: -5;}@media(max-width:400px){}.box .bay{width: 70%;}}</style></div>" +
            '<p class="name">' +
            item.name +
            "</p>" +
            '<p style="color:#999"><strike>249&nbsp;грн</strike><br>' +
            '<p class="price" >' +
            item_price +
            "&nbsp;грн</p>" +
            '<p class="art">' +
            item.atr +
            "</p>" +
            '<button class="bay">Выбрать модель</button>' +
            "</div>"
          );
        })
        .join("");
    }

    function hideUsersButton(more) {
      //var next = getTotalSize();
      //var next = more;
      var next = remainedValueButton.innerHTML;
      if (parseInt(next) < 1) {
        if (nextUsersButton.classList) nextUsersButton.classList.add("hide");
        else nextUsersButton.className += " " + className;
        nextUsersButton.style.display = "none";
      } else {
        if (nextUsersButton.classList) nextUsersButton.classList.remove("hide");
        else
          nextUsersButton.className = nextUsersButton.className.replace(
            new RegExp(
              "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
              "gi"
            ),
            " "
          );
        nextUsersButton.style.display = "";
      }
      console.log("more " + more);
      console.log("remainedValueButton " + remainedValueButton.innerHTML);
    }

    if ($("#catalog").length > 0) {
      // BEHAVIOUR

      nextUsersButton.addEventListener("click", () => {
        show_items = show_items + 8;
        console.log("show_items", show_items);
        if (selectCollection.value === "all") {
          if (show_items > getTotalSize()) {
            show_items = getTotalSize();
          }
          const add_new_items = case_sort_mass(
            getFromAllCategories(show_items)
          );
          // if (selectSort.value === "price_biger") {
          //   add_new_items.sort((a, b) => {
          //     return Number(a.price) - Number(b.price)
          //   })
          // }
          // if (selectSort.value === "price_lowwer") {
          //   add_new_items.sort((a, b) => {
          //     return Number(b.price) - Number(a.price)
          //   })
          // }
          usersDiv.innerHTML = render(add_new_items);
          remainedValueButton.innerHTML = getTotalSize();
        } else {
          if (show_items > casesByCategories[selectCollection.value].length) {
            show_items = casesByCategories[selectCollection.value].length;
          }
          const add_new_items = case_sort_mass(
            getFromCategory(selectCollection.value, show_items)
          );
          // if (selectSort.value === "price_biger") {
          //   add_new_items.sort((a, b) => {
          //     return Number(a.price) - Number(b.price)
          //   })
          // }
          // if (selectSort.value === "price_lowwer") {
          //   add_new_items.sort((a, b) => {
          //     return Number(b.price) - Number(a.price)
          //   })
          // }
          usersDiv.innerHTML = render(add_new_items);
          remainedValueButton.innerHTML =
            casesByCategories[selectCollection.value].length;
        }

        hideUsersButton(getTotalSize());
      });

      selectCollection.addEventListener("change", () => {
        console.log(
          "casesByCategories 1 " + casesByCategories[selectCollection.value]
        );
        init();
        show_items = 4;
        console.log("get from cat 4");
        var items_cat = case_sort_mass(
          getFromCategory(selectCollection.value, show_items)
        );
        // if (selectSort.value === "price_biger") {
        //   items_cat.sort((a, b) => {
        //     return Number(a.price) - Number(b.price)
        //   })
        // }
        // if (selectSort.value === "price_lowwer") {
        //   items_cat.sort((a, b) => {
        //     return Number(b.price) - Number(a.price)
        //   })
        // }
        usersDiv.innerHTML = render(items_cat);
        remainedValueButton.innerHTML =
          casesByCategories[selectCollection.value].length;

        hideUsersButton(casesByCategories[selectCollection.value].length);
        console.log("update 1");
      });

      $("#catalog .select-box").append(
        '<div id="catsel" class="custom-select"><span>Категория</span><ul></ul></div>'
      );

      $("#catalog .select-box").append(
        '<div id="catsort" class="custom-select"><span>Сортировка</span><ul></ul></div>'
      );

      $("head").append(
        '<style>.modal-dialog .btc-group .btn-submit { margin-bottom: 10px; } .custom-select{margin: 5px; padding:21px 25px 21px 14px;width:260px;max-width:100%;border:1px solid #393939;border-radius:5px;font-family:"Lato Semibold";text-transform:uppercase;cursor:pointer;font-size:1rem;position:relative;background:#fff url("../img/arrow-select.png") 95% center no-repeat}.custom-select span{display:inline-block;cursor:pointer}.custom-select ul{position:absolute;display:none;width:100%;left:0;top:60px;border:1px solid #000;overflow:auto;z-index:10000;z-index:99999;background:#fff}.custom-select ul li{padding:5px;cursor:pointer}.custom-select ul li:hover{background-color:#666;color:#FFF}.custom-select ul li:last-child{border-bottom:none}#catalog .select-box{display: inline-grid;} #select{position: absolute; top: -55555px; right: -55555px;} .add2cart.btn{background: #393939 !important;} .bline { text-align: center; padding-bottom: 10px;} .bline span { font-size: 13px; } .empty_model {display: none; text-align: center; font-size: 12px; color: red;} @media (max-width: 1024px) { #catsel span {font-size: 14px;}  #catsort span {font-size: 14px;} .custom-select { margin: 10px 1px 1px 1px;} .bline { width: 100%;}} .dop_wrap{display:none}.dop_wrap .dop{background:0 0}.x-cart-overlay .x-title{padding:30px;margin:0}.x-title{margin:0 0 15px;font-size:24px;font-weight:400}.x-shc-item__content{display:table;width:100%;table-layout:fixed}.x-shc-item__image-cell{display:table-cell;width:100px;padding-right:20px;vertical-align:top;text-align:center;font-size:0}.x-shc-item__image{vertical-align:middle;max-height:100px}.x-shc-item__info-cell{display:table-cell;vertical-align:top}.x-shc-item__main-info-cell{display:table-cell;padding-right:20px;vertical-align:top;width:180px}.x-shc-item__info .model_wrap{display:table-cell;width:180px;padding-right:20px;vertical-align:top}.x-shc-item__info .model_wrap{max-width:100%;width:100%}.x-shc-item__title-holder{position:relative;max-height:2.6em;line-height:1.3;overflow:hidden;font-weight:700}.x-shc-item__title-link{color:#333;text-decoration:none;font-weight:700}.x-shc-item__price-holder{margin:10px 0 0;color:#989898}.dop,.dop_wrap,.x-shc-item__price-holder,.x-shc-item__summary-cell .x-shc-item__cell-label{font-size:12px}.dop_img{width:40px}.x-shc-item__price{margin-right:10px}.x-shc-item__presence{margin:10px 0 0;color:#989898}.x-shc-item__labels-holder{margin:10px 0 0}.x-shc-item__quantity-cell{display:none;width:200px;padding-right:20px;vertical-align:top}.x-shc-item__cell-label{display:block;margin-bottom:10px}.x-quantity__holder{position:relative;overflow:hidden;width:94px;height:40px;padding:0 26px;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid #dfe1f0;border-radius:2px}.x-quantity__button{position:absolute;top:0;bottom:0;background:#f6f8fd;width:26px;font-size:0}.x-quantity__button_type_minus{left:0}.x-quantity__button:before{position:absolute;top:50%;left:50%;height:2px;width:8px;margin:-1px 0 0 -4px;background:#000;content:""}.x-quantity__button_type_plus{right:0}.x-quantity__input{display:block;width:100%;padding:10px 0;border:none;line-height:18px;text-align:center}.x-shc-item__summary-cell{display:table-cell;width:50px;vertical-align:top}.x-shc-item__cell-label{display:block;margin-bottom:10px}.x-shc-item__summary-price{display:block;font-size:16px;font-weight:700}.x-shc-item__control-cell{display:table-cell;width:50px;padding-left:20px;vertical-align:top;text-align:left;position:relative}.x-shc-item__control{display:inline-block;vertical-align:middle;color:#989898}.x-shc-item__control-icon{display:inline-block;width:16px;height:16px;vertical-align:middle;fill:currentColor}.x-shc-item{padding-bottom:10px}.x-cart-overlay .x-shc-group{padding:20px 30px 40px}.x-shc-group{background:#fff}.x-cart-overlay .x-shc-total{padding:20px 0 0}.x-shc-total{padding:20px 20px 30px;line-height:1}.x-shc-total__info-wrapper{width:100%;text-align:right}.x-shc-total__label{display:block;margin:0 0 5px}.x-shc-total__price{display:block;font-size:24px;font-weight:700}.x-shc-total__controls-wrapper{margin:20px 0 0}.x-shc-total__main-control-holder span{color:#fff}.x-shc-total__main-control-holder{float:right}.x-shc-total__button{padding:0 45px;font-weight:700}.x-button_theme_dark-blue{background:#393939;border-color:#393939;color:#fff}.x-button{position:relative;overflow:hidden;display:inline-block;padding:0 20px;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid #dfe1f0;border-radius:2px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:top;text-align:center;font-weight:400;font-size:0;color:#333;cursor:pointer;-webkit-transition:background .1s,border-color .1s,color .1s;-o-transition:background .1s,border-color .1s,color .1s;transition:background .1s,border-color .1s,color .1s;pointer-events:auto}.x-button:before{position:absolute;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.2);opacity:0;-webkit-transition:opacity .1s;-o-transition:opacity .1s;transition:opacity .1s;content:""}.x-shc-total__button .x-button__text{font-size:14px;font-weight:700}.x-button__text{position:relative;display:inline-block;vertical-align:middle;line-height:1;font-size:13px}.x-shc-total__button:after{height:48px}.x-button:after{display:inline-block;height:38px;vertical-align:middle;content:""}.x-shc-total__continue-control-holder{display:inline-block;margin-right:30px}.x-shc-total__button_type_continue{padding:0 25px}.x-button_theme_purple.x-button_type_contour{color:#393939}.x-shc-total__button_type_continue{padding:0 25px;font-weight:400}.x-button_theme_purple{border-color:#393939}.x-shc-total__button_type_continue .x-button__text{font-weight:400}.modal-open .modal{overflow-x:hidden;overflow-y:auto}.cart_wrap{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;display:none;overflow:scroll;outline:0;-webkit-overflow-scrolling:touch}body.modal-open{overflow:hidden}.fade.in{opacity:1}.fade{opacity:0;-webkit-transition:opacity .15s linear;-o-transition:opacity .15s linear;transition:opacity .15s linear}.cart_wrap.fade .modal-dialog{-webkit-transition:-webkit-transform .3s ease-out;transition:-webkit-transform .3s ease-out;-o-transition:-o-transform .3s ease-out;transition:transform .3s ease-out;transition:transform .3s ease-out,-webkit-transform .3s ease-out,-o-transform .3s ease-out;-webkit-transform:translate(0,-25%);-ms-transform:translate(0,-25%);-o-transform:translate(0,-25%);transform:translate(0,-25%)}.cart_wrap.in .modal-dialog{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);-o-transform:translate(0,0);transform:translate(0,0)}.modal-dialog{position:relative;width:auto;margin:10px;background-color:#fff;padding:20px;border-radius:5px;z-index:5}@media (min-width:544px){.modal-dialog{max-width:600px;margin:30px auto}}.form-group{margin-bottom:1rem}.modal-close{position:absolute;right:15px;top:15px;font-family:"Lato Black";cursor:pointer;font-size:17px;color:#40b934}@media (max-width:768px){.modal{width:100%;padding:10px}}#order_send_form{margin-top:20px}.delete_product_icon svg{width:15px;height:15px;margin-top:10px;cursor:pointer}.name4print.alert input,.user-name.alert,.user-phone.alert,select#model.alert{border-color:#e6143c}@media (max-width:765px){.x-shc-item__info .model_wrap{display:block;width:100%;padding-right:0;position:relative;top:-10px}.x-shc-item__summary-cell{display:block;width:100%;vertical-align:middle}.x-shc-total__continue-control-holder{width:100%;display:inline-block;margin-right:0}.x-shc-total__main-control-holder{margin-top:20px;float:none;width:100%}.x-shc-item{padding-bottom:20px}.x-button_theme_purple.x-button_type_contour{width:100%}.x-shc-total__main-control-holder span{color:#fff;width:100%}}.name4print{margin-top:5px}.name4print label{font-size:12px;line-height:12px;display:block;padding-bottom:5px}.name4print input{margin-top:8px;display:block;width:100%;height:calc(2.25rem + 2px);padding:.375rem .75rem;font-size:1rem;line-height:1.5;color:#aaa;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;border-radius:1.45rem;-webkit-transition:border-color .15s;-o-transition:border-color .15s;transition:border-color .15s}.cart_wrap .qa-sc_list-buy_button .x-button__text.send,.cart_wrap.order_form .qa-sc_list-buy_button .x-button__text{display:none}.cart_wrap.order_form .qa-sc_list-buy_button .x-button__text.send{display:inline-block} .x-shc-total form input[type="image"]{position: absolute; top: -88888px; left: -88888px;} .additional .form-check-input {pointer-events: none;} .form-check-input{position:absolute!important;z-index:888;pointer-events:none;margin:10px 0 0 0;width:20px;height:20px;cursor:pointer; opacity: 0 !important; border: 0 !important; display: block !important;}</style>'
      );

      var a2cw = $(".modal-dialog .btc-group");

      a2cw.append(
        '<div class="bline empty_model">выберите модель</div><div class="bline"><span class="add2cart btn">Заказать</span></div>'
      );
      a2cw.append(
        '<div class="bline"><span class="modal_close_b btn">Продолжить покупки</span></div>'
      );

      init();
    }

    $("body").on("click", ".modal_close_b", function () {
      removeModal();
    });

    /* Корзина */

    var cart_products = [];

    // function shuffle(casesArr) {
    //   console.log("suffle a", casesArr)
    //   console.log("suffle b", casesArr.sort( () => .5 - Math.random() ))
    //   return casesArr;
    // }

    $(document).ready(function () {
      // casesArr = shuffle(casesArr);
      init_cart();
    });
    var cart_item_tpl = "";
    var order_send_form = "";
    var Articl = "";
    var Articl1 = "";
    var Articl2 = "";
    var Articl3 = "";
    var Articl4 = "";
    var Articl5 = "";
    var Articl6 = "";
    var Articl7 = "";
    var Articl8 = "";
    var Articl9 = "";

    function init_cart() {
      // инициализация корзины
      $("div.modal").addClass("hidden");

      //console.log('model_select '+model_select);
      var minicart_icon =
        '<div id="shop-cart-btn" class="white circle"> <svg class="cart-ico" baseProfile="tiny" height="24px" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Layer_1"><g><path d="M20.756,5.345C20.565,5.126,20.29,5,20,5H6.181L5.986,3.836C5.906,3.354,5.489,3,5,3H2.75c-0.553,0-1,0.447-1,1 s0.447,1,1,1h1.403l1.86,11.164c0.008,0.045,0.031,0.082,0.045,0.124c0.016,0.053,0.029,0.103,0.054,0.151 c0.032,0.066,0.075,0.122,0.12,0.179c0.031,0.039,0.059,0.078,0.095,0.112c0.058,0.054,0.125,0.092,0.193,0.13 c0.038,0.021,0.071,0.049,0.112,0.065C6.748,16.972,6.87,17,6.999,17C7,17,18,17,18,17c0.553,0,1-0.447,1-1s-0.447-1-1-1H7.847 l-0.166-1H19c0.498,0,0.92-0.366,0.99-0.858l1-7C21.031,5.854,20.945,5.563,20.756,5.345z M18.847,7l-0.285,2H15V7H18.847z M14,7 v2h-3V7H14z M14,10v2h-3v-2H14z M10,7v2H7C6.947,9,6.899,9.015,6.852,9.03L6.514,7H10z M7.014,10H10v2H7.347L7.014,10z M15,12v-2 h3.418l-0.285,2H15z"></path><circle cx="8.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle></g></g></svg> <div id="shopCartAmount">0</div></div>';
      $("body").append(minicart_icon); // добавление иконки миникорзины на страницу
      cartFromcookie();
      var cart_styles =
        "<style>.cart-select-mark-container{padding:2px}.cart-select-model-container{padding:2px}#shop-cart-btn{color:#fff;cursor:pointer;display:none;fill:#fff;font-size:13px;height:75px;opacity:.9;position:fixed;right:25px;text-align:center;top:90px;width:75px;z-index:998}#shop-cart-btn.white{background-color:#fff;border:1px solid #e4eaec;color:#555;fill:#555}#shop-cart-btn.circle{border-radius:50%}#shop-cart-btn .cart-ico{height:40px;left:50%;margin:-20px 0 0 -20px;position:absolute;top:50%;width:40px}#shop-cart-btn #shopCartAmount{    font-size: 14px; line-height: 20px; background-color:#e6143c;border-radius:50%;top:-5px;font-weight:700;right:-5px;height:30px;padding:5px;position:absolute;color:#fff;width:30px} div.modal.hidden { top: -88888px; left: -88888px;} </style>";
      $("body").append(cart_styles); // добавлние css UI корзины и связных UI в DOM
      $("body").append(
        '<div class=cart_wrap><div class=modal-dialog role=document><div class=modal-content><div class=qa-shoping-cart-list data-qaid=shopping_cart_list><h4 class=x-title>Корзина заказов</h4><div class=cart_items></div><div class="qa-shopping-company-cart x-shc-group"data-qaid=shopping_company_cart><div class=x-shc-total><div class=x-shc-total__info-wrapper><div class=x-shc-total__label>Всего:</div><div class=x-shc-total__price data-qaid=total_sum_order></div></div><div class=x-shc-total__controls-wrapper><div class=x-shc-total__continue-control-holder><span class="x-button x-shc-total__button x-button_theme_purple x-button_type_contour x-shc-total__button_type_continue"><span class=x-button__text data-qaid=continue_shopping>Продолжить покупки</span></span></div><div class=x-shc-total__main-control-holder><span class="x-button x-shc-total__button qa-sc_list-buy_button x-button_theme_dark-blue"data-qaid=create_order_btn><span class=x-button__text>Оформить заказ</span><span class="x-button__text send">Отправить заказ</span></span></div></div></div></div></div><span class=modal-close>x</span></div></div><div class=modal-backdrop></div></div>'
      ); // добавлние UI обертки корзины в DOM
      cart_item_tpl =
        '<div class="x-shc-item" data-qaid="product_item"><div class="x-shc-item__content"><div class="x-shc-item__image-cell"><img class="x-shc-item__image" src=""></div><div class="x-shc-item__info-cell"><div class="x-shc-item__info"><div class="x-shc-item__main-info-cell"><div class="x-shc-item__title-holder">sneakers	</div><div class="x-shc-item__price-holder">Код/Артикул: <span class="x-shc-item__price articul"></span></div><div class="x-shc-item__price-holder">Модель: <span class="x-shc-item__price model"></span></div><div class="x-shc-item__presence   dop_wrap">Посокет: <span class="x-shc-item__price dop"></span></div><div><div class="x-shc-item__labels-holder"><img src="" alt="" class="dop_img"></div></div></div><div class="x-shc-item__quantity-cell"><div class="x-shc-item__cell-label">Количество шт.</div><div class="x-quantity"><div class="x-quantity__holder"><span class="x-quantity__button x-quantity__button_type_minus" data-qaid="quantity_down_btn">-</span><span class="x-quantity__button x-quantity__button_type_plus" data-qaid="quantity_up_btn">+</span><input class="x-quantity__input" data-qaid="quantity_input" value="1"></div><span class="x-shc-item__quantity-error x-hidden" data-qaid="error_quantity_field">Минимальное количество для заказа 0.01 шт.</span></div></div><div class="model_wrap"></div><div class="x-shc-item__summary-cell"><div class="x-shc-item__cell-label">Сумма</div><div><div class="x-shc-item__summary-price" data-qaid="product_price"></div></div></div></div></div><div class="x-shc-item__control-cell"><div><span class="x-shc-item__control delete_product_icon" data-qaid="delete_product_icon"><svg viewPort="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg"><line x1="1" y1="11" x2="11" y2="1" stroke="black" stroke-width="2" /><line x1="1" y1="1" x2="11" y2="11" stroke="black" stroke-width="2" /></svg></span></div></div></div></div>'; // шаблон позиции в корзине
      order_send_form =
        '<div id="order_send_form">' +
        '<div class="form-group">' +
        '<label for="">Имя*:</label>' +
        '<input type="text" class="form-control user-name" placeholder="Имя" title="Напишите имя в указанном формате (Иван Петров)" required="">' +
        "</div>" +
        '<div class="form-group">' +
        '<label for="">Телефон*:</label>' +
        '<input type="tel" class="form-control user-phone" minlength="13" maxlength="13" placeholder="Телефон" title="Формат: +380975555555" required="">' +
        '</div></div><div class="dop-info">' +
        '<div class="delivery">' +
        '<div class="form-row bd-example">' +
        '<div class="col-12">' +
        "<p>Варианты доставки:</p>" +
        "</div>" +
        '<div class="col-4">' +
        '<div class="form-check form-check-inline">' +
        '<input class="form-check-input user-post" type="radio" name="delivery-post" id="new-post-checkbox" value="Новая Почта" checked="">' +
        '<label class="form-check-label" id="new-post-label" for="new-post-checkbox">Новая почта</label>' +
        "</div>" +
        "</div>" +
        '<div class="col-4">' +
        '<div class="form-check form-check-inline">' +
        '<input class="form-check-input user-post" type="radio" id="ukr-post-check" name="delivery-post" value="Укр Почта">' +
        '<label class="form-check-label" id="ukr-post-label" for="ukr-post-check">УкрПочта</label>' +
        "</div>" +
        "</div>" +
        '<div class="col-4">' +
        '<div class="form-check form-check-inline">' +
        '<input class="form-check-input user-post" type="radio" id="justin-post-check" name="delivery-post" value="Justin">' +
        '<label class="form-check-label" id="justin-post-label" for="justin-post-check">Justin</label>' +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="bd-example" id="new-post">' +
        '<div class="form-group form-row">' +
        '<div class="col-12 mb-2">' +
        '<input class="form-control user-surname" type="text" placeholder="Фамилия">' +
        "</div>" +
        "</div>" +
        '<div class="form-group form-row">' +
        '<div class="col-6 mb-2">' +
        '<input class="form-control city" type="text" placeholder="Город">' +
        "</div>" +
        '<div class="col-6 mb-2">' +
        '<input class="form-control branch_number" type="text" placeholder="Номер отделения">' +
        "</div>" +
        "</div>" +
        '<div class="form-group form-row">' +
        '<div class="col-6 mb-2">' +
        '<select class="form-control" id="type-post">' +
        '<option value="">Тип доставки:</option>' +
        '<option value="До отделения">До отделения</option>' +
        '<option value="Курьерская доставка">Курьерская доставка</option>' +
        "</select>" +
        "</div>" +
        '<div class="col-6 mb-2">' +
        '<select class="form-control" id="payment-np">' +
        '<option value="">Тип оплаты:</option>' +
        '<option value="Наложенный платёж">Наложенный платёж</option>' +
        '<option value="Оплата на карту">Оплата на карту</option>' +
        "</select>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="bd-example" id="ukr-post">' +
        '<div class="form-group form-row">' +
        '<div class="col-12 mb-2">' +
        '<input class="form-control user-surname-ukr" type="text" placeholder="Фамилия">' +
        "</div>" +
        "</div>" +
        '<div class="form-group form-row">' +
        '<div class="col-6 mb-2">' +
        '<input class="form-control region" type="text" placeholder="Область">' +
        "</div>" +
        '<div class="col-6 mb-2">' +
        '<input class="form-control user-area" type="text" placeholder="Район">' +
        "</div>" +
        "</div>" +
        '<div class="form-group form-row">' +
        '<div class="col-6 mb-2">' +
        '<input class="form-control city-ukr" type="text" placeholder="Город">' +
        "</div>" +
        '<div class="col-6 mb-2">' +
        '<input class="form-control branch_number-ukr" type="text" placeholder="Номер отделения">' +
        "</div>" +
        "</div>" +
        '<div class="form-group form-row">' +
        '<div class="col-6 mb-2">' +
        '<input class="form-control city-index" type="text" minlength="3" inputmode="numeric" placeholder="Индекс">' +
        "</div>" +
        '<div class="col-6 mb-2">' +
        '<select class="form-control" id="payment-ukr">' +
        '<option value="">Тип оплаты:</option>' +
        '<option value="Наложенный платёж">Наложенный платёж</option>' +
        '<option value="Оплата на карту">Оплата на карту</option>' +
        "</select>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="bd-example" id="justin-post">' +
        '<div class="form-group form-row">' +
        '<div class="col-12 mb-2">' +
        '<input class="form-control user-surname-just" type="text" placeholder="Фамилия">' +
        "</div>" +
        "</div>" +
        '<div class="form-group form-row">' +
        '<div class="col-6 mb-2">' +
        '<input class="form-control city-just" type="text" placeholder="Город">' +
        "</div>" +
        '<div class="col-6 mb-2">' +
        '<input class="form-control branch_number-just" type="text" placeholder="Номер отделения">' +
        "</div>" +
        "</div>" +
        '<div class="form-group form-row">' +
        '<div class="col-6 mb-2">' +
        '<select class="form-control" id="type-post">' +
        '<option value="">Тип доставки:</option>' +
        '<option value="До отделения" selected="true">До отделения</option>' +
        "</select>" +
        "</div>" +
        '<div class="col-6 mb-2">' +
        '<select class="form-control" id="payment-just">' +
        '<option value="">Тип оплаты:</option>' +
        '<option value="Наложенный платёж">Наложенный платёж</option>' +
        '<option value="Оплата на карту">Оплата на карту</option>' +
        "</select>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="bd-example additional">' +
        '<div class="form-check form-check-inline">' +
        '<input class="form-check-input" type="checkbox" id="click" name="click" value="3">' +
        '<label class="form-check-label additional-link action-elem" for="click" style="border:none;background:transparent;font-weight:bold;color:#793896;cursor:pointer;text-align:left">Добавить дополнительную информацию к заказу</label>' +
        "</div>" +
        "</div>";
    }

    function checkPrintName() {
      $(".x-shc-item").each(function () {
        var namei = $(this).find(".name4print input");
        if (namei.length > 0) {
          var name = namei.val();
          if (name == "" || name.length > 19) {
            $(this).find(".name4print").addClass("alert");
            // return false;
          } else {
            $(this).find(".name4print").removeClass("alert");
            var i = $(this).index();
            console.log("index  " + i);
            cart_products[i]["pname"] = name;
            return true;
          }
        }
      });
      return true;
    }

    function open_cart_modal() {
      // открытие модального окна корзины
      $("body").toggleClass("modal-open");
      $(".cart_wrap").toggleClass("fade in").show();
      $(".cart_wrap .modal-backdrop").show();
    }
    function removeCModal() {
      // закрытие модального окна корзины
      $("body").removeClass("modal-open");
      $(".cart_wrap").removeClass("fade in").removeClass("order_form").hide();
      $(".cart_wrap .modal-backdrop").hide();
      var names = checkPrintName();
      if (names) {
        cart2cookie();
      }
    }

    // Обработчики событий
    $("body").on(
      "click",
      ".cart_wrap .modal-close, .cart_wrap .x-shc-total__button_type_continue, .modal-backdrop",
      function () {
        // события с закрытием модального окна корзины
        removeCModal();
      }
    );

    $("body").on("click", ".add2cart", function () {
      // событие добаление товарв в корзину
      add2cart();
    });

    $("body").on("click", "#shop-cart-btn", function () {
      // событие отображения корзины
      show_cart2();
    });
    $("body").on("click", "#del", function () {
      $(".bay-art").text("");
    });

    $("body").on("click", ".additional-link", function () {
      console.log("SHOW POST");
      const hBlock = document.querySelector(".dop-info");
      const addButton = document.querySelector(".additional-link");
      const additional = hBlock.textContent;
      $(".dop-info").toggle("slow");
      if (
        addButton.textContent === "Скрыть дополнительную информацию к заказу"
      ) {
        addButton.textContent = "Не перезванивайте мне, я уверен в заказе";
        $("#new-post .form-control").prop("required", false);
        $("#ukr-post .form-control").prop("required", false);
        $("#justin-post .form-control").prop("required", false);
        $(addButton).prop("checked", true);
      } else {
        addButton.textContent = "Скрыть дополнительную информацию к заказу";
        $("#new-post .form-control").prop("required", true);
        $(".cart_wrap #ukr-post").hide("slow");
        $(".cart_wrap #justin-post").hide("slow");
        $(addButton).prop("checked", false);
      }
    });

    $("#box").on("click", ".box__item", function (e) {
      e.preventDefault();
      var t = e.target;
      var btn = $(".bay");
      var result = $(this);
      var name = result.find(".name").text();
      var articul = result.find(".art").text();
      var price = parseFloat(result.find(".price").text());
      var img = result.find("img").attr("src");
      var cat = result.attr("data-cat");
      add2cart2(name, articul, price, img, cat);
      return false;
    });

    $("body").on("click", ".cart_wrap .delete_product_icon", function () {
      // var item = $(this).closest(".x-shc-item");
      // var index = index(item);
      var index = $(this).closest(".x-shc-item").index();
      cart_product_delete(index);
    });

    $("body").on("change", ".cart_wrap .model_wrap #model", function () {
      var item = $(this).closest(".x-shc-item");
      var index = $(this).closest(".x-shc-item").index();
      var model = $(this).val();
      cart_products[index]["model"] = model;
      item.find(".x-shc-item__price.model").text(model);
      $(this).removeClass("alert");
      cart2cookie();
    });

    $("body").on("click", ".cart_wrap #new-post-checkbox", function () {
      $(".cart_wrap #new-post").show("slow");
      $(".cart_wrap #ukr-post").hide("slow");
      $(".cart_wrap #justin-post").hide("slow");
      $(".cart_wrap #new-post .form-control").prop("required", true);
      $(".cart_wrap #ukr-post .form-control").prop("required", false);
      $(".cart_wrap #justin-post .form-control").prop("required", false);
    });
    $("body").on("click", ".cart_wrap #ukr-post-check", function () {
      $(".cart_wrap #ukr-post").show("slow");
      $(".cart_wrap #new-post").hide("slow");
      $(".cart_wrap #justin-post").hide("slow");
      $(".cart_wrap #new-post .form-control").prop("required", false);
      $(".cart_wrap #ukr-post .form-control").prop("required", true);
      $(".cart_wrap #justin-post .form-control").prop("required", false);
    });
    $("body").on("click", ".cart_wrap #justin-post-check", function () {
      $(".cart_wrap #justin-post").show("slow");
      $(".cart_wrap #new-post").hide("slow");
      $(".cart_wrap #ukr-post").hide("slow");
      $(".cart_wrap #justin-post .form-control").prop("required", false);
      $(".cart_wrap #ukr-post .form-control").prop("required", true);
      $(".cart_wrap #ukr-post .form-control").prop("required", false);
    });

    $("body").on("click", ".cart_wrap .qa-sc_list-buy_button", function () {
      var order_ready = 1;
      $(".x-shc-item").each(function () {
        var model = $(this).find(".x-shc-item__price.model").text();
        if (model == "") {
          order_ready = 0;
          var name = $(this).find(".x-shc-item__title-holder").text();
          var articul = $(this).find(".x-shc-item__price.articul").text();
          $(this).find("select#model").addClass("alert");
          // alert('Выберите у '+name+' ('+articul+') модель телефона');
          return false;
        } else {
          $(this).find("select#model").removeClass("alert");
        }
      });

      var names = checkPrintName();
      if (!names) {
        order_ready = 0;
        return false;
      }

      if (order_ready == 1) {
        cart2cookie();
        if ($(".cart_items #order_send_form").length < 1) {
          $(".cart_items").append(order_send_form);
          $(".cart_wrap").addClass("order_form");
          $(".cart_wrap .user-phone").mask("+380000000000");
          return false;
        }
        if (!$(".cart_wrap").hasClass("order_form")) {
          $(".cart_wrap").addClass("order_form");
          //$('.cart_wrap .qa-sc_list-buy_button')
        } else {
          var name = $(".cart_wrap.order_form .user-name").val();
          if (name == "" || !name) {
            //alert('Укажите ваше имя');
            $(".cart_wrap.order_form .user-name").addClass("alert");
            return false;
          } else {
            $(".cart_wrap.order_form .user-name").removeClass("alert");
          }
          //var phone = $(".cart_wrap.order_form .user-phone").val();
          //if (phone == '' || !phone){
          var phone = $(".cart_wrap .user-phone").val();
          if (phone.length < 13 || phone.length > 13) {
            $(".cart_wrap.order_form .user-phone").addClass("alert");
            //alert('Укажите ваш номер телефона');
            return false;
          } else {
            $(".cart_wrap.order_form .user-phone").removeClass("alert");
          }
          console.log("user-name " + $(".cart_wrap .user-name").val());
          console.log("user-phone " + $(".cart_wrap .user-phone").val());
          console.log("send order");
          var products = make_order_data();
          console.log("RENDER POST");
          var domen = getdomen();
          if (
            $(".cart_wrap input[name='delivery-post']:checked").val() ==
            "Новая Почта"
          ) {
            var city = $(".cart_wrap .city").val();
            var surname = $(".cart_wrap .user-surname").val();
            var branchNumber = $(".cart_wrap .branch_number").val();
            var deliveryPaymentType = $(
              ".cart_wrap #payment-np option:selected"
            ).val();
            customRegion = " - ";
            areaUk = " - ";
            cityIndex = " - ";
            paymentN = payment;
          }
          if (
            $(".cart_wrap input[name='delivery-post']:checked").val() ==
            "Укр Почта"
          ) {
            var city = $(".cart_wrap .city-ukr").val();
            var surname = $(".cart_wrap .user-surname-ukr").val();
            var branchNumber = $(".cart_wrap .branch_number-ukr").val();
            var deliveryPaymentType = $(
              ".cart_wrap #payment-ukr option:selected"
            ).val();
            customRegion = $(".cart_wrap .region").val();
            areaUk = $(".cart_wrap .user-area").val();
            cityIndex = $(".cart_wrap .city-index").val();
            paymentN = paymentUkr;
            typePost = " - ";
          }

          if (
            $(".cart_wrap input[name='delivery-post']:checked").val() ==
            "Justin"
          ) {
            var city = $(".cart_wrap .city-just").val();
            var surname = $(".cart_wrap .user-surname-just").val();
            var branchNumber = $(".cart_wrap .branch_number-just").val();
            var deliveryPaymentType = $(
              ".cart_wrap #payment-just option:selected"
            ).val();
            customRegion = " - ";
            areaUk = " - ";
            cityIndex = " - ";
            paymentN = payment;
          }

          //for (var product in cart_products) {}

          if (
            cart_products[0]["articul"] &&
            cart_products[0]["articul"] != "" &&
            cart_products[0]["articul"] != undefined
          ) {
            Articl = cart_products[0]["articul"];
          }

          if (
            cart_products[1] &&
            cart_products[1]["articul"] != "" &&
            cart_products[1]["articul"] != undefined
          ) {
            Articl1 = cart_products[1]["articul"];
          }

          if (
            cart_products[2] &&
            cart_products[2]["articul"] != "" &&
            cart_products[2]["articul"] != undefined
          ) {
            Articl2 = cart_products[2]["articul"];
          }

          if (
            cart_products[3] &&
            cart_products[3]["articul"] != "" &&
            cart_products[3]["articul"] != undefined
          ) {
            Articl3 = cart_products[3]["articul"];
          }

          if (
            cart_products[4] &&
            cart_products[4]["articul"] != "" &&
            cart_products[4]["articul"] != undefined
          ) {
            Articl4 = cart_products[4]["articul"];
          }

          if (
            cart_products[5] &&
            cart_products[5]["articul"] != "" &&
            cart_products[5]["articul"] != undefined
          ) {
            Articl5 = cart_products[5]["articul"];
          }

          if (
            cart_products[6] &&
            cart_products[6]["articul"] != "" &&
            cart_products[6]["articul"] != undefined
          ) {
            Articl6 = cart_products[6]["articul"];
          }

          if (
            cart_products[7] &&
            cart_products[7]["articul"] != "" &&
            cart_products[7]["articul"] != undefined
          ) {
            Articl7 = cart_products[7]["articul"];
          }

          if (
            cart_products[8] &&
            cart_products[8]["articul"] != "" &&
            cart_products[8]["articul"] != undefined
          ) {
            Articl8 = cart_products[8]["articul"];
          }

          if (
            cart_products[9] &&
            cart_products[9]["articul"] != "" &&
            cart_products[9]["articul"] != undefined
          ) {
            Articl9 = cart_products[9]["articul"];
          }

          _rc("send", "order", {
            name: name,
            phone: phone,
            orderMethod: "landing-page",
            customArticl: Articl,
            customArticl1: Articl1,
            customArticl2: Articl2,
            customArticl3: Articl3,
            customArticl4: Articl4,
            customArticl5: Articl5,
            customArticl6: Articl6,
            customArticl7: Articl7,
            customArticl8: Articl8,
            customArticl9: Articl9,
            customRegion: customRegion,
            customArea: areaUk,
            customerComment: products,
            // customModel: modelPhoneUser,
            customModel: "",
            customDelivery: $(
              ".cart_wrap input[name='delivery-post']:checked"
            ).val(),
            customTypepost: typePost,
            customSurname: surname,
            customCity: city,
            customBranchNumber: branchNumber,
            customType: deliveryPaymentType,
            // customSoket: $(".block .bay-art").text(), //артикул сокета
            customUserIndex: cityIndex,
            callback: function (success, response) {
              if (success) {
                var domen = getdomen();
                Cookies.set("" + domen + "_order", response.id);

                var lpdata = {
                  amount: "" + cart_products.length + "",
                  domen: "" + domen + "",
                  sum: "" + order_sum + "",
                  liqpay: 1,
                  desc: "Оплата заказа " + response.id + "",
                  order_id: response.id,
                  result_url: "" + domen + "thank.php",
                  server_url: "" + domen + "thank.php",
                };

                //Cookies.set(''+domen+'_lorder', response.id);
                Cookies.set("lorder", response.id);

                $.ajax({
                  type: "POST",
                  url: "" + domen + "LiqPayAjax.php",
                  data: lpdata,
                }).done(function (msg) {
                  var domen = getdomen();
                  // alert( "Data Saved: " + msg );
                  $(".x-shc-total").append(msg);
                  //Cookies.set(''+domen+'_liqpaybutton', msg);
                  Cookies.set("liqpaybutton", msg);
                  console.table(msg);
                  var ptype = $(".cart_wrap #payment option:selected").val();
                  //Cookies.set(''+domen+'_ptype', ptype);
                  Cookies.set("ptype", ptype);
                  console.log("ptype - " + ptype);
                  // if (ptype == 'Оплата на карту') {
                  // $('.x-shc-total form input[type="image"]').click();
                  // console.table(lpdata);
                  // }else{
                  //  window.location.href = domen+"thank.php";
                  // }
                  window.location.href = domen + "thank.php";
                  clearCartCookie();
                });

                //  window.location.href = domen+"thank.php";
              } else {
                alert("К сожалению, не удалось отправить заявку.");
              }
            },
          });

          return false;
        }
      }
    });

    var domen = getdomen();
    var lpb = Cookies.get("" + domen + "_liqpaybutton");
    if (lpb && $(".callback_info").length > 0) {
      $(".callback_info").append(lpb);
    }

    // var lorderN = ''+domen+'_lorder';
    // var lorder = Cookies.get(lorderN);
    // console.log('lorderN: '+lorderN);
    console.log("lorder: " + Cookies.get("lorder"));
    Cookies.set("test", "testcookie");
    // document.cookie = 'name=David' ;
    console.log("testcookie: " + Cookies.get("test"));

    function clear_cart() {
      $(".cart_items").html("");
      $(".cart_wrap").removeClass("order_form");
    }

    var order_sum = 0;
    function make_order_data() {
      var products = "";
      var order_total = 0;
      for (var product in cart_products) {
        var name = cart_products[product]["name"];
        var image = cart_products[product]["image"];
        var model = cart_products[product]["model"];
        var articul = cart_products[product]["articul"];
        /*
        var dop = cart_products[product]['dop'];
        var dop_img = cart_products[product]['dop_img'];
        if (dop.length > 0) {
        psum = psum + cart_products[product]['priced'];
        }
        */
        var price = cart_products[product]["price"];
        if (product === "0") {
          price = Math.floor(price);
        }
        if (product === "1") {
          price = Math.floor(price - (price / 100) * 15);
        }
        if (product > 1) {
          price = Math.floor(price - (price / 100) * 25);
        }
        var psum = price;
        order_total = order_total + parseFloat(psum);
        //products = products+' Артикул: '+articul+' Модель: '+model+' Наименование: '+name+' Цена: '+price+' Сокет: '+dop+' Сумма: '+psum+' <br/>';
        var num = parseInt(product) + 1;
        var pname = "";
        if (
          cart_products[product]["pname"] != "" &&
          cart_products[product]["pname"] != undefined
        ) {
          pname = "Имя для печати: " + cart_products[product]["pname"] + "";
        }
        products =
          products +
          "[" +
          num +
          ". Артикул: " +
          articul +
          ". Марка: " +
          cart_selected_mark[articul] +
          " Модель: " +
          cart_selected_model[articul] +
          " " +
          pname +
          " Цена: " +
          price +
          " ] <br/>";
      }
      products = products + " Итого: " + order_total + "";
      products = products + " new_land ";
      order_sum = order_total;
      console.log("Данные заказа: " + products);
      return products;
    }

    function show_cart() {
      // отображение корзины
      open_cart_modal();
      $(".cart_wrap .cart_items").html("");
      var order_total = 0;
      for (var [index, product] in cart_products) {
        var name = cart_products[product]["name"];
        var image = cart_products[product]["image"];
        var model = cart_products[product]["model"];
        var articul = cart_products[product]["articul"];
        var dop = cart_products[product]["dop"];
        var dop_img = cart_products[product]["dop_img"];
        var price = cart_products[product]["price"];
        var psum = "";
        if (index === 0) {
          psum = price;
        }
        if (index === 1) {
          psum = price - (price / 100) * 15;
        }
        if (index > 1) {
          psum = price - (price / 100) * 25;
        }
        // if (dop.length > 0) {
        //   psum = psum + cart_products[product]["priced"];
        // }
        //console.log('cart price '+price);
        //console.log('cart dop price '+cart_products[product]['priced']);
        $(".cart_wrap .cart_items").append(cart_item_tpl);
        var li = $(".cart_wrap .cart_items .x-shc-item:last");
        li.find(".x-shc-item__title-holder").html(name);
        li.find(".x-shc-item__image").attr("src", image);
        li.find(".model").html(model);
        li.find(".articul").html(articul);
        if (dop.length > 0) {
          li.find(".dop_wrap").show();
          li.find(".dop").html(dop);
        }
        if (dop_img.length > 0) {
          li.find(".dop_img").attr("src", dop_img);
        }
        li.find(".x-shc-item__summary-price").html(psum);
        order_total = order_total + parseFloat(psum);
      }
      $(".cart_wrap .x-shc-total__info-wrapper .x-shc-total__price").html(
        order_total + " грн."
      );

      offer_modal_update();
    }

    var disc1 = 25; // % скидки на товары после добавления 1-го товара в корзину
    var disc2 = 37; // % скидки на товары после добавления 1-го товара в корзину
    var pprice1 = 149;
    var pprice2 = 125;
    var pprice3 = 100;
    var ppriced = 75;

    function offer_modal_update() {
      // for (var product in cart_products) {
      // if (product < 1) {
      //   cart_products[product]["price"] = pprice1;
      // }
      // if (product == 1) {
      //   cart_products[product]["price"] = pprice2;
      // }
      // if (product > 1) {
      //   cart_products[product]["price"] = pprice3;
      // }
      // }
      // var prod2 = "Купить второй чехол за 125 грн";
      // var prod3 = "Купить еще чехол за 100 грн";
      var cpid = cart_products.length;

      if (cpid == 0) {
        $(".x-shc-total__button_type_continue span").html("продолжить покупки");
      }
      if (cpid == 1) {
        $(".x-shc-total__button_type_continue span").html(
          "Купить еще чехол со скидкой 15%"
        );
      }
      if (cpid > 1) {
        $(".x-shc-total__button_type_continue span").html(
          "Купить еще чехол со скидкой 25%"
        );
      }
      //console.log('offer_modal_update cpid '+cpid);
      cart2cookie();
    }

    function cart_product_delete(index) {
      const articul = cart_products[index]["articul"];
      cart_products.splice(index, 1);
      delete cart_selected_mark[articul];
      delete cart_selected_model[articul];
      cart_update2();
    }

    function cart_update() {
      // обработка события добавления товара в корзину
      var cpid = cart_products.length;
      $("#shopCartAmount").html(cpid);
      if (cpid > 0) {
        $("#shop-cart-btn").show();
      } else {
        $("#shop-cart-btn").hide();
      }
      $("body").removeClass("modal-open");
      $(".modal").removeClass("fade in").hide();

      show_cart();
    }

    function add2cart() {
      // добавление товара в корзину и обновление данных товара если он уже есть в корзине
      var p = {};
      var cpid = cart_products.length;
      var update = 0;

      p["model"] = $("#feedback-form #model option:selected").val();
      if (p["model"].length < 1) {
        p["price"] = $("#feedback-form .bd-example .price").text();
        $(".empty_model").show();
      } else {
        //	console.log('cpid '+cpid);
        $(".empty_model").hide();
        p["articul"] = $("#feedback-form .case-art").text();
        p["dop"] = $("#feedback-form .bay-art").text();
        if (p["dop"].length > 0) {
          p["priced"] = ppriced;
        }
        p["dop_img"] = $("#feedback-form .bay-img").attr("src");
        p["quant"] = 1;
        p["name"] = $("#feedback-form .modal-name").text();
        p["image"] = $("#feedback-form .modal-img").attr("src");
        p["price"] = $("#feedback-form .price").text();
        if (cpid > 0) {
          for (var product in cart_products) {
            //console.log('cart_products[product][articul] '+cart_products[product]['articul']);
            //console.log('p[articul] '+p['articul']);
            if (product < 1) {
              cart_products[product]["price"] = pprice1;
            }
            if (product == 1) {
              cart_products[product]["price"] = pprice2;
            }
            if (product > 1) {
              cart_products[product]["price"] = pprice3;
            }
            if (cart_products[product]["articul"] == p["articul"]) {
              update = 1;

              if (p["dop"].length > 0) {
                cart_products[product]["priced"] = ppriced;
              } else {
                cart_products[product]["priced"] = 0;
              }
              cart_products[product]["dop"] = p["dop"];
              cart_products[product]["dop_img"] = p["dop_img"];
              /* var nq = parseInt(cart_products[product]['quant']) + 1;
              cart_products[product]['quant'] = nq; */
              //console.log('update product '+cart_products[product]['articul']);
              //console.table(cart_products);
            }
            //console.log('name '+cart_products[product]['name']);
          }
        }
        //console.log('update '+update);
        //console.log('cpid '+cpid);
        if (update == 0) {
          // if (cpid < 1) {
          //   p["price"] = pprice1;
          // }
          // if (cpid == 1) {
          //   p["price"] = pprice2;
          // }
          // if (cpid > 1) {
          //   p["price"] = pprice3;
          // }
          cart_products[cpid] = p;

          //cart_products.push(p);
        }

        console.table(cart_products);
        cart_update();
      }
    }

    function add2cart2(name, articul, price, img, cat) {
      // добавление товара в корзину без модального окна
      var p = {};
      var cpid = cart_products.length;
      var update = 0;
      //	console.log('cpid '+cpid);
      p["articul"] = articul;
      p["quant"] = 1;
      p["name"] = name;
      p["image"] = img;
      p["cat"] = cat;
      p["price"] = price;

      if (cpid > 0) {
        for (var product in cart_products) {
          //console.log('cart_products[product][articul] '+cart_products[product]['articul']);
          //console.log('p[articul] '+p['articul']);

          if (cart_products[product]["articul"] == p["articul"]) {
            update = 1;
          }
          //console.log('name '+cart_products[product]['name']);
        }
      }
      //console.log('update '+update);
      //console.log('cpid '+cpid);
      if (update == 0) {
        // if (cpid < 1) {
        //   p["price"] = pprice1;
        // }
        // if (cpid == 1) {
        //   p["price"] = price - (price / 100 * 15);
        // }
        // if (cpid > 1) {
        //   p["price"] = price - (price / 100 * 25);
        // }
        cart_products[cpid] = p;

        //cart_products.push(p);
      }
      var shopCartAmount = cart_products.length;
      $("#shopCartAmount").html(shopCartAmount);

      console.table(cart_products);
      cart_update2();
    }

    function cart_widget() {
      var cpid = parseInt(cart_products.length);
      $("#shopCartAmount").html(cpid);
      if (cpid > 0) {
        $("#shop-cart-btn").show();
        console.log("cart_widget " + cpid);
      } else {
        $("#shop-cart-btn").hide();
      }
    }

    function cart_update2() {
      // обработка события добавления товара в корзину без модального окна
      cart_widget();
      $("body").removeClass("modal-open");
      $(".modal").removeClass("fade in").hide();

      show_cart2();
    }

    function cart_update_model_list(li, articul) {
      li.find(".cart-select-model-container").remove();
      if (cart_selected_mark[articul]) {
        li.find(".model_wrap").append(
          '<div class="cart-select-model-container">' +
            '<select name="cart-model" id="cart-model" data-placeholder="Выбрать модель" class="form-control" required>' +
            '<option value="">Выбрать модель</option>' +
            "</select>" +
            "</div>"
        );
        const selectModel = li.find("#cart-model").get(0);
        const optionsModelSet = new Set();
        optionsModelSet.add('<option value="">Выбрать модель</option>');
        cart_models[cart_selected_mark[articul]].forEach((it) => {
          let selected = "";
          if (cart_selected_model.hasOwnProperty(articul)) {
            selected =
              cart_selected_model[articul] === it.value ? "selected" : "";
          }
          optionsModelSet.add(
            '<option value="' +
              it.value +
              '" ' +
              selected +
              ">" +
              it.name +
              "</option>"
          );
        });
        selectModel.innerHTML = Array.from(optionsModelSet).join("");
        selectModel.addEventListener("change", (event) => {
          cart_selected_model[articul] = event.target.value;
          li.find(".model").html(event.target.value);
        });
        // selectModel.select2();
        // selectModel.selectize({
        //   sortField: 'text'
        // })
        if (cart_selected_model[articul]) {
          li.find(".model").html(cart_selected_model[articul]);
        } else {
          li.find(".model").html("");
        }
      } else {
        li.find(".model").html("");
      }
    }

    function cart_update_mark_list(li, articul) {
      li.find(".cart-select-mark-container").remove();
      li.find(".model_wrap").append(
        '<div class="cart-select-mark-container">' +
          '<select name="cart-mark" id="cart-mark" data-placeholder="Выбрать марку" class="form-control" required>' +
          '<option value="">Выбрать марку</option>' +
          "</select>" +
          "</div>"
      );
      const selectMark = li.find("#cart-mark").get(0);
      const optionsMarkSet = new Set();
      optionsMarkSet.add('<option value="">Выбрать марку</option>');
      cart_marks.forEach((it) => {
        let selected = "";
        if (cart_selected_mark.hasOwnProperty(articul)) {
          selected = cart_selected_mark[articul] === it.value ? "selected" : "";
        }
        optionsMarkSet.add(
          '<option value="' +
            it.value +
            '" ' +
            selected +
            ">" +
            it.name +
            "</option>"
        );
      });
      selectMark.innerHTML = Array.from(optionsMarkSet).join("");
      selectMark.addEventListener("change", (event) => {
        cart_selected_mark[articul] = event.target.value;
        cart_selected_model[articul] = "";
        cart_update_mark_list(li, articul);
      });
      cart_update_model_list(li, articul);
    }

    function show_cart2() {
      // отображение корзины без модального окна
      console.log("show_cart2");
      open_cart_modal();
      offer_modal_update();
      $(".cart_wrap .cart_items").html("");
      // if (cpid == 1) {
      //   p["price"] = price - (price / 100 * 15);
      // }
      // if (cpid > 1) {
      //   p["price"] = price - (price / 100 * 25);
      // }
      var order_total = 0;
      for (var product in cart_products) {
        console.log("product -" + product);
        var name = cart_products[product]["name"];
        var image = cart_products[product]["image"];
        var model = cart_products[product]["model"];
        var articul = cart_products[product]["articul"];
        //var dop = cart_products[product]['dop'];
        //var dop_img = cart_products[product]['dop_img'];
        var price = cart_products[product]["price"];
        var psum = "";
        if (product === "0") {
          psum = Math.floor(price);
        }
        if (product === "1") {
          psum = Math.floor(price - (price / 100) * 15);
        }
        if (product > 1) {
          psum = Math.floor(price - (price / 100) * 25);
        }
        // var marka = <div class="select-container choose-phone">
        //   <select name="mark" id="mark" data-placeholder="Выбрать марку" class="form-control" required>
        //     <option value=''></option>
        //     <option value="IPhone">iPhone</option>
        //     <option value="Samsung">Samsung</option>
        //     <option value="Xiaomi">Xiaomi</option>
        //     <option value="Huawei">Huawei</option>
        //     <option value="Meizu">Meizu</option>
        //     <option value="Lenovo">Lenovo</option>
        //     <option value="LG">LG</option>
        //     <option value="Sony">Sony</option>
        //     <option value="Nokia">Nokia</option>
        //   </select>
        // </div>;
        /*
        if (dop.length > 0) {
        psum = psum + cart_products[product]['priced'];
        }
        */
        //console.log('cart price '+price);
        //console.log('cart dop price '+cart_products[product]['priced']);
        $(".cart_wrap .cart_items").append(cart_item_tpl);
        //console.log('append product tpl');
        var li = $(".cart_wrap .cart_items .x-shc-item:last");
        li.find(".x-shc-item__title-holder").html(name);
        li.find(".x-shc-item__image").attr("src", image);
        var model_wrap = li.find(".model_wrap");
        var model_select = $("#feedback-form #model");
        // li.find(".model").html(model);
        // if (model != "") {
        //   var pms = li.find(".model_wrap select");
        //   pms.find("option").each(function () {
        //     var v = $(this).attr("value");
        //     if (v == model) {
        //       $(this).prop("selected", "selected");
        //     }
        //   });
        // }
        cart_update_mark_list(li, articul);
        if (cart_products[product]["cat"] == "name") {
          var pname = "";
          if (
            cart_products[product]["pname"] != "" &&
            cart_products[product]["pname"] != undefined
          ) {
            pname = cart_products[product]["pname"];
          }
          li.find(".model_wrap").append(
            "<div class='name4print'><input value='" +
              pname +
              "' placeholder='Имя для печати'></div>"
          );
        }
        li.find(".articul").html(articul);
        //if (dop.length > 0) { li.find('.dop_wrap').show(); li.find('.dop').html(dop);  }
        //if (dop_img.length > 0) { li.find('.dop_img').attr('src',dop_img); }
        li.find(".x-shc-item__summary-price").html(psum);
        order_total = order_total + parseFloat(psum);
        //var sumdiv = li.find('.model_wrap');
      }
      $(".cart_wrap .x-shc-total__info-wrapper .x-shc-total__price").html(
        order_total + " грн."
      );
    }

    function cartFromcookie() {
      var domen = getdomen();
      if (Cookies.get("" + domen + "")) {
        cart_products = JSON.parse(Cookies.get("" + domen + ""));
      }
      if (cart_products.length > 0) {
        $(window).on("load", function () {
          cart_widget();
        });
        console.log("cart in cookie - " + cart_products);
        console.table(cart_products);
      }
    }

    function cart2cookie() {
      for (var product in cart_products) {
        //console.log('product -'+product);
        var name = cart_products[product]["name"];
        var image = cart_products[product]["image"];
        var model = cart_products[product]["model"];
        var articul = cart_products[product]["articul"];
        var price = cart_products[product]["price"];
      }
      var domen = getdomen();
      Cookies.set("" + domen + "", cart_products);
    }

    function clearCartCookie() {
      var domen = getdomen();
      Cookies.set("" + domen + "", "");
    }

    /* END Корзина */

    var html = [];
    var catselt1 = "";

    $("#select option").each(function (i) {
      var dis = "";
      if ($(this).attr("disabled") !== undefined) {
        //dis = 'style="display: none;"';
        dis = 'class="all"';
        catselt1 = $(this).text();
      }
      var lit = "";
      if (dis == "") {
        lit = $(this).text();
      } else {
        lit = "Новинки";
        html.push(
          "<li " +
            'class="allc"' +
            ' rel="' +
            $(this).val() +
            '">' +
            "Все" +
            "</li>"
        );
      }

      html.push("<li " + dis + ' rel="' + $(this).val() + '">' + lit + "</li>");
      stripSelectText();
    });

    $("#catsel ul").html(html.join(""));

    var $lists = $("#catsel");

    var html_sort = [];
    var catselt1_sort = "";

    $("#select-sort option").each(function (i) {
      var dis = "";
      if ($(this).attr("disabled") !== undefined) {
        //dis = 'style="display: none;"';
        // dis = 'class="all"';
        catselt1_sort = $(this).text();
        return;
      }
      var lit = "";
      if (dis == "") {
        lit = $(this).text();
      }

      html_sort.push(
        "<li " + dis + ' rel="' + $(this).val() + '">' + lit + "</li>"
      );
      stripSelectSortText();
    });

    $("#catsort ul").html(html_sort.join(""));

    var $lists_sort = $("#catsort");

    function stripSelectSortText() {
      var tb = $(".custom-select span:eq(0)");
      var t = tb.text();
      var tl = parseInt(t.length);
      if (tl > 25) {
        var ft = t.substr(0, 22);
        var nt = ft + "...";
        tb.html(nt);
      }
      console.log("select sort text length " + tl);
    }

    function stripSelectText() {
      var tb = $(".custom-select span:eq(0)");
      var t = tb.text();
      var tl = parseInt(t.length);
      if (tl > 25) {
        var ft = t.substr(0, 22);
        var nt = ft + "...";
        tb.html(nt);
      }
      console.log("select text length " + tl);
    }

    $lists.on("click", function (e) {
      e.stopPropagation();
      console.log("click lists = #catsort ", e.target);
      $lists.not(this).find("ul:visible").hide();
      var $tgt = $(e.target);
      $(this).find("ul").slideToggle("fast");
      if ($tgt.is("li")) {
        var optv = $tgt.html();
        var td = ":";
        if (catselt1.indexOf(":") > -1) {
          td = "";
        }
        if (href.indexOf("games") > -1) {
          lit = "catselt1 ";
        }
        var optvf =
          '<span class="catseln">' +
          catselt1 +
          "</span>" +
          td +
          "<br>" +
          ' <span class="catselv">' +
          optv +
          "</span>";
        $(this).find("span").html(optvf);
        var value = $tgt.attr("rel");
        $("#select").val(value);
        stripSelectText();
        show_items = 8;
        //console.log('selectCollection.value - '+selectCollection.value);
        if (
          selectCollection.value == "all" ||
          selectCollection.value == "allc"
        ) {
          init();

          usersDiv.innerHTML = render(getFromAllCategories(show_items));
          remainedValueButton.innerHTML = getTotalSize();
          hideUsersButton(getTotalSize());

          console.warn("getFromCategory all");
        } else {
          init();

          // 	console.table('casesByCategories ', casesByCategories[selectCollection.value]);
          // console.log("get from CATTTTTTTGFGDGHJHLJ", getFromCategory(selectCollection.value, show_items))
          if (show_items > casesByCategories[selectCollection.value].length) {
            show_items = casesByCategories[selectCollection.value].length;
          }
          usersDiv.innerHTML = render(
            getFromCategory(selectCollection.value, show_items)
          );
          remainedValueButton.innerHTML =
            casesByCategories[selectCollection.value].length;
          hideUsersButton(casesByCategories[selectCollection.value].length);
        }

        console.log("update 2");
      }
    });

    function case_sort_mass(items) {
      if (selectSort.value === "default") {
        // show_items = 8
        items.sort(() => 0.5 - Math.random());
      }
      if (selectSort.value === "price_biger") {
        // show_items = 8
        items.sort((a, b) => {
          return Number(a.price) - Number(b.price);
        });
      }
      if (selectSort.value === "price_lowwer") {
        // show_items = 8
        items.sort((a, b) => {
          return Number(b.price) - Number(a.price);
        });
      }
      return items;
    }

    function case_sort() {
      if (selectSort.value === "default") {
        show_items = 8;
        casesArr.sort(() => 0.5 - Math.random());
      }
      if (selectSort.value === "price_biger") {
        show_items = 8;
        casesArr.sort((a, b) => {
          return Number(a.price) - Number(b.price);
        });
      }
      if (selectSort.value === "price_lowwer") {
        show_items = 8;
        casesArr.sort((a, b) => {
          return Number(b.price) - Number(a.price);
        });
      }
    }

    $lists_sort.on("click", function (e) {
      e.stopPropagation();
      $lists_sort.not(this).find("ul:visible").hide();
      var $tgt = $(e.target);
      $(this).find("ul").slideToggle("fast");
      if ($tgt.is("li")) {
        var optv = $tgt.html();
        var td = ":";
        if (catselt1_sort.indexOf(":") > -1) {
          td = "";
        }
        if (href.indexOf("games") > -1) {
          lit = "catsortt1 ";
        }
        // var optvf =
        //     ' <span class="catsortv">' +
        //     optv +
        //     "</span>";

        var optvf =
          '<span class="catseln">' +
          catselt1_sort +
          "</span>" +
          td +
          "<br>" +
          ' <span class="catsortv">' +
          optv +
          "</span>";
        $(this).find("span").html(optvf);
        var value = $tgt.attr("rel");
        $("#select-sort").val(value);
        stripSelectSortText();
        //console.log('selectCollection.value - '+selectCollection.value);
        if (selectSort.value == "no_sort") {
          if (
            selectCollection.value == "all" ||
            selectCollection.value == "allc"
          ) {
            init();

            usersDiv.innerHTML = render(
              case_sort_mass(getFromAllCategories(show_items))
            );
            remainedValueButton.innerHTML = getTotalSize();
            hideUsersButton(getTotalSize());

            console.warn("getFromCategory all");
          } else {
            init();
            //	console.table('casesByCategories '+casesByCategories[selectCollection.value]);
            console.log("get from cat on load 4");
            if (show_items > casesByCategories[selectCollection.value].length) {
              show_items = casesByCategories[selectCollection.value].length;
            }
            usersDiv.innerHTML = render(
              case_sort_mass(
                getFromCategory(selectCollection.value, show_items)
              )
            );
            remainedValueButton.innerHTML =
              casesByCategories[selectCollection.value].length;
            hideUsersButton(casesByCategories[selectCollection.value].length);
          }
        } else {
          init();
          let items = [];
          case_sort();
          // if (selectSort.value === "default") {
          //   show_items = 8
          //   casesArr.sort( () => .5 - Math.random() )
          // }
          // if (selectSort.value === "price_biger") {
          //   show_items = 8
          //   casesArr.sort((a, b) => {
          //     return Number(a.price) - Number(b.price)
          //   })
          // }
          // if (selectSort.value === "price_lowwer") {
          //   show_items = 8
          //   casesArr.sort((a, b) => {
          //     return Number(b.price) - Number(a.price)
          //   })
          // }
          if (
            selectCollection.value == "all" ||
            selectCollection.value == "allc"
          ) {
            items = getFromAllCategories(show_items);
            // usersDiv.innerHTML = render(getRandomFromAllCategories(8));
            // remainedValueButton.innerHTML = getTotalSize();
            // hideUsersButton(getTotalSize());
            //
            // console.warn("getFromCategory all");
          } else {
            // console.log("get from catttttttt")
            if (show_items > casesByCategories[selectCollection.value].length) {
              show_items = casesByCategories[selectCollection.value].length;
            }
            items = case_sort_mass(
              getFromCategory(selectCollection.value, show_items)
            );
            // init();
            //	console.table('casesByCategories '+casesByCategories[selectCollection.value]);
            // usersDiv.innerHTML = render(
            //     getFromCategory(selectCollection.value, 4)
            // );
            // remainedValueButton.innerHTML =
            //     casesByCategories[selectCollection.value].length;
            // hideUsersButton(casesByCategories[selectCollection.value].length);
          }

          usersDiv.innerHTML = render(items);
          // remainedValueButton.innerHTML =
          //     casesByCategories[selectCollection.value].length;
          // hideUsersButton(casesByCategories[selectCollection.value].length);

          //	console.table('casesByCategories '+casesByCategories[selectCollection.value]);
          // usersDiv.innerHTML = render(
          //     getFromCategory(selectCollection.value, 4)
          // );
          // remainedValueButton.innerHTML =
          //     casesByCategories[selectCollection.value].length;
          // hideUsersButton(casesByCategories[selectCollection.value].length);
        }

        console.log("update sort");
      }
    });

    if ($("#catalog").length > 0) {
      var cat_from_url = urlcat();
      if (cat_from_url) {
        $("#catsel ul li").each(function () {
          var so = $(this).attr("rel");
          // console.warn("so "+so);
          if (so == cat_from_url) {
            console.warn("catsel has url cat");
            $(this).click();
            $("#catsel ul").hide();
          }
        });

        console.warn("render from url");
      } else {
        window.all_list_random = render(getFromAllCategories(show_items));
        usersDiv.innerHTML += window.all_list_random;
        window.all_list_random_size = getTotalSize();
        remainedValueButton.innerHTML = window.all_list_random_size;
      }
    }

    $(document).click(function (e) {
      $lists.find("ul:visible").hide();
    });

    $(document).click(function (e) {
      $lists_sort.find("ul:visible").hide();
    });

    console.log("ready");
  });
};

/*
- раскомм $("body").append(minicart_icon)
- раскомм cartFromcookie();
- раскомм $("body").append(cart_styles)
- раскомм $("body").append('<div class=cart_wrap>
- раскомм Обработчики событий
- раскомм a2cw.append('<div
- в динамич стили добавить .modal-dialog .btc-group .btn-submit { display: none; }
*/

var productName = document.getElementById("productname");
var productPrice = document.getElementById("productprice");
var productCat = document.getElementById("productCat");
var productDesc = document.getElementById("productDesc");
var productList;
var mainBtn = document.getElementById("mainBtn");
let tmp;

if (localStorage.getItem("list") != null) {
  productList = JSON.parse(localStorage.getItem("list"));
  displayProduct(productList);
} else {
  productList = [];
}
function addProduct() {
 if(validateProductName()){
  var product = {
    name: productName.value,
    price: productPrice.value,
    Cat: productCat.value,
    desc: productDesc.value,
  };
  productList.push(product);
  setToLocalStorage();
  displayProduct(productList);
  clearform();
 }
}
function displayProduct(list) {
  var cartona = ``;
  for (var i = 0; i < list.length; i++) {

    cartona += `
        <tr>
        <td>${i + 1}</td>
        <td>${list[i].newName?list[i].newName:list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].Cat}</td>
        <td>${list[i].desc}</td>
        <td><button class="btn btn-warning" onclick="getProductData(${i})">Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteproduct(${i})">Delete</button></td>
        </tr>
        
        `;
  }
  document.getElementById("tableData").innerHTML = cartona;
}
function clearform(flag) {
  productName.value = flag?flag.name:"";
  productPrice.value = flag?flag.price:"";
  productCat.value = flag?flag.Cat:"";
  productDesc.value = flag?flag.desc:"";
}
function deleteproduct(index) {
  productList.splice(index, 1);
  displayProduct(productList);
  setToLocalStorage();
}
function setToLocalStorage() {
  localStorage.setItem("list", JSON.stringify(productList));
}
function getProductData(index) {
  clearform(productList[index])
  mainBtn.classList.add("d-none");
  document.getElementById("UpdateBtn").classList.replace("d-none", "d-block");
  tmp = index;
}
function Update() {

  
  productList[tmp].name = productName.value;
  productList[tmp].price = productPrice.value;
  productList[tmp].Cat = productCat.value;
  productList[tmp].desc = productDesc.value;
  setToLocalStorage();
  displayProduct(productList);
  clearform();
  document.getElementById("UpdateBtn").classList.replace("d-block", "d-none");
  document.getElementById("mainBtn").classList.replace("d-none","d-block")

   

}

function search(searchKey){
    var searchList=[]
 for(var i =0 ; i<productList.length;i++){
   if(productList[i].name.toLowerCase().includes(searchKey.toLowerCase())){
      productList[i].newName = productList[i].name.replace(searchKey,`<span class="text-danger fw-bolder">${searchKey}</span>`)  
      searchList.push(productList[i])


   }


 }
 displayProduct(searchList);


}        
function validateProductName(){
  var regex = /^[A-Z][a-z]{2,6}$/gm;
  if(regex.test(productName.value)){
    document.getElementById("name-error").classList.add("d-none")

        return true;
      }
  else{
    document.getElementById("name-error").classList.remove("d-none")

    return false;
  }


}
function validateProductPrice(){
  var regex = /^(100[0-9]|10[1-9][0-9]|1[1-9][0-9]{2}|[2-9][0-9]{3}|10000)$/gm;
  if(regex.test(productPrice.value)){

    document.getElementById("price-error").classList.add("d-none")
    return true;

    

  }
  else{
      document.getElementById("price-error").classList.remove("d-none")
      return false
    }

  


}
function validateProductCat(){
  var regex = /^(mobile|TV|Device)$/gim;
   if(regex.test(productCat.value)){
       
    document.getElementById("cat-error").classList.add("d-none");
      return true

   }
   else{
    document.getElementById("cat-error").classList.remove("d-none");
    return false;
    

   }
  


}









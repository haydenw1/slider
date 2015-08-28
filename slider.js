function Slider(id){
  var testJSON = {
    test:[
      {
        "desc":"This it the first test description text.",
        "pic":"test1.jpg",
        "title":"Test Project 1"
      },
      {
        "desc":"This is the second test decription text.",
        "pic":"test2.jpg",
        "title":"Test Project 2"
      }
    ]
  };

  this.class = "slider";
  this.id = id;

  getDivSetClass(this.id, this);
  addHolderDiv(this);
  addNavButtons(this);
  addContent(this);

  queryData(testJSON, this);
}

function getDivSetClass(id, obj){
  obj.mainDiv = document.getElementById(id);
  obj.mainDiv.setAttribute("class", obj.class);
}

function addHolderDiv(obj){
  var holderDiv = document.createElement("div");
  obj.holderDiv = holderDiv;
  holderDiv.setAttribute("class","holder");
  obj.mainDiv.appendChild(holderDiv);
}

function addNavButtons(obj){
  for(var i = 0; i < 2; i++){
    var navButton = document.createElement("div");
    var arrow = document.createElement("img");
    arrow.setAttribute("src","assets/arrow.svg");

    if(i < 1){
      obj.navLeft = navButton;
      obj.navLeft.setAttribute("class","nav left");
      console.log(obj.navLeft);
      obj.navLeft.appendChild(arrow);
    }else{
      obj.navRight = navButton;
      obj.navRight.setAttribute("class","nav right");
      obj.navRight.appendChild(arrow);
    }

    navButton.addEventListener("mouseover", function(event) {
      var go = event.target.childNodes[0] ? true : false;

      if(go){
        event.target.childNodes[0].style.width = "30%";
        event.target.childNodes[0].style.top = "calc(50% - 26.5px)";
        event.target.childNodes[0].style.opacity = ".85";
      }
    });

    navButton.addEventListener("mouseleave", function(event) {
      var go = event.target.childNodes[0] ? true : false;

      if(go && event.target.childNodes[0]) {
        event.target.childNodes[0].style.width = "20%";
        event.target.childNodes[0].style.top = "calc(50% - 18px)";
        event.target.childNodes[0].style.opacity = ".5";
      }
    });

    navButton.addEventListener("click", function(event) {
      if(event.target.className == "nav left") {
        cycle("left");
      }else{
        cycle("right");
      }
    });

    obj.holderDiv.appendChild(navButton);
  }
}

function addContent(obj){
  //make div to hold content and give class
  var contentDiv = document.createElement("div");
  obj.contentDiv = contentDiv;
  contentDiv.setAttribute("class","content");

  //make img to hold slider image and give id
  var sliderImage = document.createElement("img");
  obj.sliderImage = sliderImage;
  sliderImage.setAttribute("class","slider-image");

  //make div to hold shadow that goes behind title, and give class
  var sliderTitleShadow= document.createElement("div");
  obj.sliderTitleShadow = sliderTitleShadow;
  sliderTitleShadow.setAttribute("class","slider-title-shadow");

  //make div to hold shadow that goes behind description, and give class
  var sliderDescShadow = document.createElement("div");
  obj.sliderDescShadow = sliderDescShadow;
  sliderDescShadow.setAttribute("class","slider-desc-shadow");

  //make p to hold slider description and give class
  var sliderTitle = document.createElement("p");
  obj.sliderTitle = sliderTitle;
  sliderTitle.setAttribute("class","slider-title");

  //make p to hold slider description and give class
  var sliderDesc = document.createElement("p");
  obj.sliderDesc = sliderDesc;
  sliderDesc.setAttribute("class","slider-desc");

  //append the image, text shadow, and text to the content div
  contentDiv.appendChild(sliderImage);
  contentDiv.appendChild(sliderTitleShadow);
  contentDiv.appendChild(sliderTitle);
  contentDiv.appendChild(sliderDescShadow);
  contentDiv.appendChild(sliderDesc);

  //append the new content div to the holder div
  obj.holderDiv.appendChild(contentDiv);
}



function queryData(mainDataObj, obj){
  if(mainDataObj[obj.id]){
    var sliderDataArr = mainDataObj[obj.id];
    setInitialContent(obj, sliderDataArr);
  }else{
    alert("ERROR - No data found for this slider\nPlease update the slider JSON object");
  }
}

function setInitialContent(obj, sliderDataArr){
  var imageSrc;
  var descSrc;
  var titleSrc;

  obj.position = 0;

  imageSrc = sliderDataArr[obj.position].pic;
  descSrc = sliderDataArr[obj.position].desc;
  titleSrc = sliderDataArr[obj.position].title;

  obj.sliderImage.setAttribute("src", imageSrc);
  obj.sliderDesc.innerHTML = descSrc;
  obj.sliderTitle.innerHTML = titleSrc;

  obj.position++;
}



function cycle(dir){
  console.log(dir);
}


var testSlider = new Slider("test");
//var testSlider = new Slider("test2");
  //console.log(testSlider.class);
  //console.log(testSlider.id);
  //console.log(testSlider.mainDiv);



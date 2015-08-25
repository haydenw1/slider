function Slider(id){
  var testJSON = {
    test:[
      {"desc":"this it the first test description text.", "pic":"test1.jpg"},
      {"desc":"this is the second test decription text.", "pic":"test2.jpg"}
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

    obj.holderDiv.appendChild(navButton);
  }
}

function addContent(obj){
  var contentDiv = document.createElement("div");
  obj.contentDiv = contentDiv;
  contentDiv.setAttribute("class","content");
  obj.mainDiv.appendChild(contentDiv);

  var sliderImage = document.createElement("img");
  obj.sliderImage = sliderImage;
  sliderImage.setAttribute("id","slider-image");

  var sliderDesc = document.createElement("p");
  obj.sliderDesc = sliderDesc;
  sliderDesc.setAttribute("id","slider-desc");

  contentDiv.appendChild(sliderImage);
  contentDiv.appendChild(sliderDesc);
  obj.holderDiv.appendChild(contentDiv);
}



function queryData(mainDataObj, obj){
  if(mainDataObj[obj.id]){
    var sliderDataArr = mainDataObj[obj.id];
    setInitialImg(obj, sliderDataArr);
  }else{
    alert("ERROR - No data found for this slider\nPlease update the slider JSON object");
  }
}

function setInitialImg(obj, sliderDataArr){
  var imageSrc;
  obj.imagePos = 0;
  imageSrc = sliderDataArr[obj.imagePos]["pic"];
  obj.sliderImage.setAttribute("src", imageSrc);
}

var testSlider = new Slider("test");
  //console.log(testSlider.class);
  //console.log(testSlider.id);
  //console.log(testSlider.mainDiv);



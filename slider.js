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
  addContentDiv(this);
  addNavButtons(this);

  queryData(testJSON, this);
}

function addContentDiv(obj){
  var contentDiv = document.createElement("div");
  obj.contentDiv = contentDiv;
  contentDiv.setAttribute("class","content");
  obj.mainDiv.appendChild(contentDiv);
}

function addNavButtons(obj){
  for(var i = 0; i < 2; i++){
    var navButton = document.createElement("div");

    if(i < 1){
      obj.navLeft = navButton.setAttribute("class","nav left");
    }else{
      obj.navRight = navButton.setAttribute("class","nav right");
    }

    obj.mainDiv.appendChild(navButton);
  }
}

function getDivSetClass(id, obj){
  obj.mainDiv = document.getElementById(id);
  obj.mainDiv.setAttribute("class", obj.class);
}

function queryData(mainDataObj, obj){
  if(mainDataObj[obj.id]){
    var sliderDataArr = mainDataObj[obj.id];
    useData(sliderDataArr);
  }else{
    alert("ERROR - No data found for this slider\nPlease update the slider JSON object");
  }
}

function useData(sliderDataArr){
  console.log(sliderDataArr.length);
}

var testSlider = new Slider("test");
  //console.log(testSlider.class);
  //console.log(testSlider.id);
  //console.log(testSlider.mainDiv);


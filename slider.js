function Slider(id){

  this.testJSON = {
    test:[
      {
        "desc":"This it the first test description text.",
        "image":"test1.jpg",
        "title":"Test Project 1"
      },
      {
        "desc":"This is the second test decription text.",
        "image":"test2.jpg",
        "title":"Test Project 2"
      },
      {
        "desc":"This is the third test decription text.",
        "image":"test3.jpg",
        "title":"Test Project 3"
      }
    ]
  };

  this.current = [
    {

    }
  ];

  this.class = "slider";
  this.id = id;

  getDivSetClass(this.id, this);
  addHolderDiv(this);
  addNavButtons(this);
  addContent(this);

  console.log(this.testJSON.test);
  queryData(this.testJSON, this);
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
      if(event.target.className == "nav left" || event.target.parentElement.className == "nav left") {
        console.log(event.target.className);
        cycle(obj, "left");
      }else{
        console.log(event.target.className);
        cycle(obj, "right");
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

  //contentDiv.appendChild(sliderImage);
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

  imageSrc = sliderDataArr[obj.position].image;
  descSrc = sliderDataArr[obj.position].desc;
  titleSrc = sliderDataArr[obj.position].title;

  //obj.sliderImage.setAttribute("src", imageSrc);
  obj.sliderDesc.innerHTML = descSrc;
  obj.sliderTitle.innerHTML = titleSrc;

  obj.current[0].desc = descSrc;
  obj.current[0].image = imageSrc;
  obj.current[0].title = titleSrc;



  //var current = obj.current;

  console.log(obj.current);
  console.log(obj.testJSON.test);

  d3.select(".content").selectAll(".slider-image")
    .data(obj.current, function(d) {console.log(d.title);return d.title; })
    .enter()
    .append("img")
    .attr("class","slider-image")
    .attr("src",function(d){return d.image;});
}



function cycle(obj, dir){
  /*console.log(dir);
  obj.current.image = "test2.jpg";

  console.log(obj.current.image);
  var content = d3.select(".content");

  console.log(content);

  var image = content.selectAll(".slider-image")
    .data(obj.current);

  image.exit().remove();

  image.enter().append("img")
    .attr("class","pleaseworknow");*/

  if( dir === "left" ) {
    if( obj.position === 0 ) {
      obj.position = obj.testJSON.test.length - 1;
    }else {
      obj.position--;
    }
  }else {
    if( obj.position === obj.testJSON.test.length - 1 ) {
      obj.position = 0;
    }else {
      obj.position++;
    }
  }

  obj.current[1]={};
  obj.current[1].image = obj.testJSON.test[obj.position].image;
  obj.current[1].desc = obj.testJSON.test[obj.position].desc;
  obj.current[1].title = obj.testJSON.test[obj.position].title;

  console.log(obj.current);


  var image = d3.select(".content").selectAll(".slider-image")
    .data(obj.current, function(d) {console.log(d.title);return d.title; });

  //image.exit().remove();


  console.log(dir);

  //update image that was already in slider
  image
    .style("position","absolute")
    .style("left","0px")
    .transition()
      .style("left",function(){
          if(dir === "left"){
            return "-600px";
          }else{
            return "600px";
          }
        })
      .style("opacity","0")
      .remove();

  //add image that is next
  image.enter()
    .append("img")
    .attr("class","slider-image")
    .attr("src",function(d){return d.image;});

  obj.sliderDesc.innerHTML = obj.current[1].desc;
  obj.sliderTitle.innerHTML = obj.current[1].title;

  obj.current.shift();


}


var testSlider = new Slider("test");
//var testSlider = new Slider("test2");
  //console.log(testSlider.class);
  //console.log(testSlider.id);
  //console.log(testSlider.mainDiv);



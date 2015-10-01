//Constructor function that makes sliders
//
//  needs:
//  - json object with image/title/description data  -  "sliderJSON" in example files
//  - d3.js
//  - jquery


function Slider(id){
  var obj = this;  //save reference to 'this' to use in jquery ready function

  this.current = [
    {

    }
  ];

  this.class = "slider";
  this.id = id;

  this.assetsPath = "assets/"; //sets asset path in one location - change if including slider directory in project

  $( document ).ready(function() {
    console.log();
    getDivSetClass(obj.id, obj);
    addHolderDiv(obj);
    addNavButtons(obj);
    addElements(obj);
    queryData(sliderJSON, obj);
    makeDots(obj);
    addListeners(obj);
  });

}

/**
 * Function that gets and stores the element where the slider will go, and gives
 * it the class stored in obj.class
 * @param {string} id  The id of the element where the slider will go
 * @param {object} obj The current slider object being constructed
 */
function getDivSetClass(id, obj) {
  obj.mainDiv = document.getElementById(id);
  console.log(id);
  console.log(obj.mainDiv);
  obj.mainDiv.setAttribute("class", obj.class);
}

/**
 * Function that creates, stores, and appends a 'div' to the main div that will hold
 * the content and navigation buttons
 * @param {object} obj The current slider object being constructed
 */
function addHolderDiv(obj) {
  var holderDiv = obj.holderDiv = document.createElement("div");
  holderDiv.setAttribute("class","s-holder");

  obj.mainDiv.appendChild(holderDiv);
}

/**
 * Function that creates two navigation divs, gives different class to both, and adds
 * 'mouseover', 'mouseleave', and 'click' event listeners to the nav divs. The 'click'
 * listener cycles the slider and updates the slider dots
 * @param {object} obj The current slider object being constructed
 */
function addNavButtons(obj) {
  for (var i = 0; i < 2; i++) {
    var navButton = document.createElement("div");
    var arrow = document.createElement("img");
    console.log(obj.assetsPath);
    arrow.setAttribute("src", obj.assetsPath + "arrow.svg");

    if (i < 1) {
      obj.navLeft = navButton;
      obj.navLeft.setAttribute("class","s-nav left no-select");
      obj.navLeft.appendChild(arrow);
    } else {
      obj.navRight = navButton;
      obj.navRight.setAttribute("class","s-nav right no-select");
      obj.navRight.appendChild(arrow);
    }

    //Listener to change style of moused over nav area - var go is for determining
    //if the mouseover is in a child element of the nav (the arrow)
    navButton.addEventListener("mouseover", function(event) {
      var go = event.target.childNodes[0] ? true : false;

      if (go) {
        event.target.childNodes[0].style.width = "25px";
        event.target.childNodes[0].style.top = "calc(50% - 18.5px)";
        event.target.childNodes[0].style.opacity = ".85";
      }
    });

    //Listener to change style back to normal nav - var go is for determining
    //if the mouseover is in a child element of the nav (the arrow)
    navButton.addEventListener("mouseleave", function(event) {
      var go = event.target.childNodes[0] ? true : false;

      if (go && event.target.childNodes[0]) {
        event.target.childNodes[0].style.width = "20px";
        event.target.childNodes[0].style.top = "calc(50% - 14.5px)";
        event.target.childNodes[0].style.opacity = ".5";
      }
    });

    //Listen for a click on the nav buttons, calls [cycle] and passes a direction
    //determined by the class of the nav button that was clicked, and calls [updateDots]
    navButton.addEventListener("click", function(event) {
      if (event.target.className.slice(0,10) === "s-nav left" || event.target.parentElement.className.slice(0,10) === "s-nav left") {
        cycle("left", obj);
      } else {
        cycle("right", obj);
      }
      updateDots(obj);
    });

    obj.holderDiv.appendChild(navButton);
  }
}

/**
 * Creates, stores, and appends DOM elements that contain the image and the title
 * and description text and text-shadows
 * @param {object} obj The current slider object being constructed
 */
function addElements(obj) {
  var contentDiv = obj.contentDiv = document.createElement("div");
  var sliderImage = obj.sliderImage = document.createElement("img");
  var sliderTitleShadow = obj.sliderTitleShadow = document.createElement("div");
  var sliderDescShadow = obj.sliderDescShadow = document.createElement("div");
  var sliderTitle = obj.sliderTitle = document.createElement("p");
  var sliderDesc = obj.sliderDesc = document.createElement("p");

  contentDiv.setAttribute("class","content " + obj.id);  //adding the object id allows differentation between multiple sliders
  sliderImage.setAttribute("class","slider-image");
  sliderTitleShadow.setAttribute("class","slider-title-shadow");
  sliderDescShadow.setAttribute("class","slider-desc-shadow");
  sliderTitle.setAttribute("class","slider-title");
  sliderDesc.setAttribute("class","slider-desc");

  //append the image, text shadow, and text to the content div
  contentDiv.appendChild(sliderTitleShadow);
  contentDiv.appendChild(sliderTitle);
  contentDiv.appendChild(sliderDescShadow);
  contentDiv.appendChild(sliderDesc);

  obj.holderDiv.appendChild(contentDiv);  //append the new content div to the holder div
}

/**
 * Function that looks for the slider data - gives an error if it can't be found, or
 * calls [setInitialContent] to continue constructing the slider
 * @param {object} JSON object containing image, title, and description data
 * @param {object} obj The current slider object being constructed
 */
function queryData(mainDataObj, obj){
  //If there is a property of the main data object that matches the obj.id, pass it to [setInitialContent]
  if (mainDataObj[obj.id]) {
    var sliderDataArr = mainDataObj[obj.id];
    setInitialContent(sliderDataArr, obj);
  } else {  //else give error
    alert("ERROR - No data found for this slider\nPlease update the slider JSON object");
  }
}

/**
 * Function that uses an array of objects from the main data object to set the appropriate
 * images, titles, and descriptions in the slider
 * @param {object} array in the main data object that matches the obj.id
 * @param {object} obj The current slider object being constructed
 */
function setInitialContent(sliderDataArr, obj){
  var imageSrc;
  var descSrc;
  var titleSrc;

  obj.position = 0;

  imageSrc = obj.assetsPath + sliderDataArr[obj.position].image;
  descSrc = sliderDataArr[obj.position].desc;
  titleSrc = sliderDataArr[obj.position].title;

  obj.sliderDesc.innerHTML = descSrc;
  obj.sliderTitle.innerHTML = titleSrc;

  //stores the current data in a property of the slider object for use with d3 '.data'
  obj.current[0].desc = descSrc;
  obj.current[0].image = imageSrc;
  obj.current[0].title = titleSrc;

  //adds an image for every object found in the 'sliderDataArr' and gives it class
  d3.select(".content." + obj.id).selectAll(".slider-image")
    .data(obj.current, function(d) {
      return d.title;
    })
    .enter()
    .append("img")
      .attr("class","slider-image")
      .attr("src",function(d) {
        return d.image;
      });
}

/**
 * Changes the position and corresponding images, titles, and descriptions in the slider
 * @param {string} dir Direction to cycle based on which nav button was pushed
 * @param {object} obj The current slider object being constructed
 */
function cycle(dir, obj) {
  var check = d3.select(".content." + obj.id).selectAll(".slider-image");
  check.remove();

  //increments/decrements/loops 'obj.position' based on current 'obj.position' and 'dir'
  if ( dir === "left" ) {
    if( obj.position === 0 ) {
      obj.position = sliderJSON[obj.id].length - 1;
    }else {
      obj.position--;
    }
  } else {
    if( obj.position === sliderJSON[obj.id].length - 1 ) {
      obj.position = 0;
    }else {
      obj.position++;
    }
  }

  //adds new object to 'obj.current' with incoming image/title/description for use with d3 enter selection
  obj.current[1] = {};
  obj.current[1].image = obj.assetsPath + sliderJSON[obj.id][obj.position].image;  //CHANGE
  obj.current[1].desc = sliderJSON[obj.id][obj.position].desc;  //CHANGE
  obj.current[1].title = sliderJSON[obj.id][obj.position].title;  //CHANGE

  //selects correct content div and uses d3 enter selection to add images that
  //are new in 'obj.current'
  var image = d3.select(".content." + obj.id).selectAll(".slider-image")
    .data(obj.current, function(d) {
      return d.title;
    })
    .enter()
    .append("img")
      .attr("class","slider-image")
      .attr("src",function(d){
        return d.image;
      });

  //does not add or delete title or description paragraph - just changes the inner
  //html to fit the incoming title and description
  obj.sliderDesc.innerHTML = obj.current[1].desc;
  obj.sliderTitle.innerHTML = obj.current[1].title;

  obj.current.shift();  //deletes the object in position [0] of 'obj.current' for use with d3 exit selection

  //select image that was already in the slider but has now been shifted out of the
  //'obj.current' dataset. Optional transitional styling can be added after '.exit()'
  //and before '.remove();' (one version shown is commented out for now)
  d3.select(".content." + obj.id).selectAll(".slider-image")
    .data(obj.current, function(d) {
      return d.title;
    })
    .exit()
    //.style("position","absolute")
    //.style("left","0px")
    //.transition().duration(750)
    //  .style("left",function(){
    //      if(dir === "left"){
    //        return -obj.mainDiv.clientWidth + "px";//"-600px";
    //      }else{
    //        return obj.mainDiv.clientWidth + "px";//"600px";
    //      }
    //    })
    //  .style("opacity","0")
    .remove();
}

/**
 * Function that adds and svg element and used d3 to add a circle for every slider
 * image. Creates and stores several measurement variables for ease of use if they need
 * to be fine tuned in the future (should make passable argument for this in constructor).
 * @param {object} obj The current slider object being constructed
 */
function makeDots(obj) {
  var cRadius = obj.cRadius = 5;
  var cRadiusSelect = obj.cRadiusSelect = cRadius + 3;
  var cX = obj.cX = 30;
  var dLength = obj.dLength = sliderJSON[obj.id].length;
  var sliderWidth = obj.mainDiv.clientWidth;
  var cY = sliderWidth * 0.6 * 0.10 * 0.5;
  var start;

  var svg = d3.selectAll("#" + obj.id)
    .append("svg");

  var g = obj.g = svg.append("g")
    .attr("class","dot-holder");

  g.selectAll("circle")
    .data(sliderJSON[obj.id])
    .enter()
    .append("circle")
      .attr("cy", cY)
      //large calculation to ensure that the dots are centered even if the dimensions
      //of the dots change
      .attr("cx", function(d,i) {
        start = (sliderWidth / 2) - ( ( ( (dLength - 1) * (cX - (2 * cRadius) ) ) + ( 2 * cRadius * dLength) ) / 2 );
        return start + (cX * i);
      })
      //gives circle that matches 'obj.position' a larger radius
      .attr("r", function(d,i) {
        if (i == obj.position) {
          return cRadiusSelect;
        } else {
          return cRadius;
        }
      })
      //gives circle that matches 'obj.position' a different color
      .attr("fill",function(d,i) {
        if (i == obj.position) {
          return "rgb(4, 216, 238)";
        } else {
          return "rgb(255, 255, 255)";
        }
      })
      //gives circle that matches 'obj.position' a different opacity
      .style("opacity",function(d,i) {
        if (i == obj.position) {
          return 0.75;
        } else {
          return 0.5;
        }
      })
      .attr("class","dot");
}

/**
 * Function that is called on slider cycle, moves selected circle position between
 * the available circle depending on the current 'obj.position' when called. D3 transition
 * between sizes and colors.
 * @param {object} obj The current slider object being constructed
 */
function updateDots(obj) {
  obj.g.selectAll("circle")
    .data(sliderJSON[obj.id]) //CHANGE
    .transition().duration(250)
      //gives circle that matches 'obj.position' a larger radius
      .attr("r", function(d,i) {
        if (i == obj.position) {
          return obj.cRadiusSelect;
        } else {
          return obj.cRadius;
        }
      })
      //gives circle that matches 'obj.position' a different color
      .attr("fill",function(d,i) {
        if (i == obj.position) {
          return "rgb(4, 216, 238)";
        } else {
          return "rgb(255, 255, 255)";
        }
      })
      //gives circle that matches 'obj.position' a different opacity
      .style("opacity",function(d,i) {
        if (i == obj.position) {
          return 0.75;
        } else {
          return 0.5;
        }
      });
}

/**
 * Function to add listeners. Currently adds listener on 'resize' of window that
 * adjusts the positioning of the slider dots to keep them in the center of the slider
 * @param {object} obj The current slider object being constructed
 */
function addListeners(obj) {
  window.addEventListener('resize', function() {
    var sliderWidth = obj.mainDiv.clientWidth;
    var cY = sliderWidth * 0.6 * 0.10 * 0.5;  //recalculate center y placement after resize

    obj.g.selectAll("circle")
      .attr("cy", cY)
      .attr("cx", function(d,i) {
        start = (sliderWidth / 2) - ( ( ( (obj.dLength - 1) * (obj.cX - (2 * obj.cRadius) ) ) + ( 2 * obj.cRadius * obj.dLength) ) / 2 );
        return start + (obj.cX * i);
      });

  }, true);
}

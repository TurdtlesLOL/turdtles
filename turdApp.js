function openCity(evt, cityName) {
  var i, tabcontent, tab;
	
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
	
  tab = document.getElementsByClassName("tab");
  for (i = 0; i < tab.length; i++) {
    tab[i].className = tab[i].className.replace(" active", "");
  }
	
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
	
}

//memeGen

document.getElementById('generate-btn').addEventListener('click', function() {
    var topText = document.getElementById('top-text-input').value;
    var bottomText = document.getElementById('bottom-text-input').value;

    document.getElementById('text-top').innerText = topText;
    document.getElementById('text-bottom').innerText = bottomText;
});

// Add more JavaScript for additional functionality like changing the image template

document.getElementById('template-selector').addEventListener('change', function() {
    var selectedImage = this.value;
    document.getElementById('meme-image').src = selectedImage;
});

document.getElementById('upload-btn').addEventListener('click', function() {
    var fileInput = document.getElementById('image-upload');
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('meme-image').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('add-image-btn').addEventListener('click', function() {
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = e => {
        var file = e.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var img = new Image();
                img.src = e.target.result;
                img.className = 'draggable-image';
                img.style.position = 'absolute';
                img.style.width = '100px';  // default size, can be adjusted
                img.style.height = 'auto';
                img.style.left = '0';       // default position, can be adjusted
                img.style.top = '0';
                document.getElementById('additional-images-container').appendChild(img);
                initializeDrag(img);
            };
            reader.readAsDataURL(file);
        }
    };

    fileInput.click();
});

function initializeDrag(element) {
    var posX = 0, posY = 0, posInitialX = 0, posInitialY = 0;

    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the initial mouse cursor position at startup:
        posInitialX = e.clientX;
        posInitialY = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        posX = posInitialX - e.clientX;
        posY = posInitialY - e.clientY;
        posInitialX = e.clientX;
        posInitialY = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - posY) + "px";
        element.style.left = (element.offsetLeft - posX) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

//add pre selected


document.getElementById('add-selected-image-btn').addEventListener('click', function() {
    var selectedImageSrc = document.getElementById('image-selection').value;
    var img = new Image();
    img.src = selectedImageSrc;
    img.className = 'draggable-image';
    img.style.position = 'absolute';
    img.style.width = '100px';
    img.style.height = 'auto';
    img.style.left = '0';
    img.style.top = '0';
    document.getElementById('meme-generator').appendChild(img);
    initializeDrag(img);
    addResizeAndRotateHandles(img);
});

fileInput.onchange = e => {
    var file = e.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = new Image();
            img.src = e.target.result;
            img.className = 'draggable-image';
            img.style.position = 'absolute';
            img.style.width = '100px';
            img.style.height = 'auto';
            img.style.left = '0';
            img.style.top = '0';
            document.getElementById('meme-generator').appendChild(img);
            initializeDrag(img);
            addResizeAndRotateHandles(img);
        };
        reader.readAsDataURL(file);
    }
};

//resize & rotate


//Dookie Rain//


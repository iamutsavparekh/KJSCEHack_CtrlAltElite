/*let uploadButton = document.getElementById("upload_button");
let image = document.getElementById("chosen-image");
uploadButton.onchange = () => {
    document.querySelector(".image-container").style.display = "inline";
    // document.querySelector(".image-container");
    let reader = new FileReader();
    reader.readAsDataURL(uploadButton.files[0]);
    reader.onload = () => {
        image.setAttribute("src", reader.result);
    }
}
  */
var loadFile = function(event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
}; 
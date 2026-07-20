let specialPlaying = false;
let lastImage = 0;

function playPloc()
{
    var audio = document.getElementById("ploc");
    audio.play();
}

function specialFunction()
{
    var image = document.getElementById("mainCatImage");
    specialPlaying = true;
    allMyFellas();

    function allMyFellas()
    {
        var audio = document.getElementById("music");

        audio.setAttribute("src", "assets/songs/allmyfellas.mp3");
        audio.play();
        cleanAnimation("flip-scale-up-hor", "mainCatImage");
        // INITIAL ANIMATION


        // REPLICATE CATS
        setTimeout(function (index)
        {
            createCat(1, "newCatImage-01");
            createCat(2, "newCatImage-02");
        }, 3500);

        // FULL ANIMATION

        setTimeout(function (index)
        {
            setTimeout(function (index)
            {
                var mainCat = document.getElementById("mainCatImage");
                var newCat01 = document.getElementById("newCatImage-01");
                var newCat02 = document.getElementById("newCatImage-02");
    
                mainCat.classList.add("scale-down-center");
                newCat01.classList.add("scale-down-center");
                newCat02.classList.add("scale-down-center");
            }, 700);

            var mainCat = document.getElementById("mainCatImage");
            var newCat01 = document.getElementById("newCatImage-01");
            var newCat02 = document.getElementById("newCatImage-02");

            setTimeout(function (index)
            {
                cleanAnimation("scale-down-center", "mainCatImage");
                cleanAnimation("scale-down-center", "newCatImage-01");
                cleanAnimation("scale-down-center", "newCatImage-02");
            }, 2500);
            mainCat.classList.add("rotate-center");  
            newCat01.classList.add("rotate-center");
            newCat02.classList.add("rotate-center");
    
            setTimeout(function()
            {
                mainCat.classList.remove("rotate-center");
                newCat01.classList.remove("rotate-center");
                newCat02.classList.remove("rotate-center");
            }, 5000);

            setTimeout(function (index)
            {
                var mainCat = document.getElementById("mainCatImage");
                var newCat01 = document.getElementById("newCatImage-01");
                var newCat02 = document.getElementById("newCatImage-02");
    
                mainCat.classList.add("scale-down-center");
                newCat01.classList.add("scale-down-center");
                newCat02.classList.add("scale-down-center");
            }, 3500);
        }, 6500);

        // UNDO CATS
        setTimeout(function (index)
        {
            var newCat01 = document.getElementById("newCatImage-01");
            var newCat02 = document.getElementById("newCatImage-02");

            newCat01.remove();
            newCat02.remove();
        }, 20000);

        specialPlaying = false;
    }

    function initialD()
    {

    }

    function fatRatOutro()
    {

    }

    function createCat(position, newId)
    {
        var newCat = image.cloneNode(true);
        newCat.setAttribute("id", newId);
    
        var insertArea = document.getElementById("catBox");
        if (position === 1)
        {
            insertArea.insertBefore(newCat, image);
        } else
        {
            insertArea.appendChild(newCat);
        } 
        cleanAnimation("flip-scale-up-hor", newId);
        grabFunction(newCat);
    }
}

function reloadFunction()
{
    if (specialPlaying === false)
    {
        let actualImage = document.getElementById("mainCatImage");
        let randomImgNumber;

        do
        {
            randomImgNumber = randomImgFunction(19);
        } while (lastImage === randomImgNumber);

        lastImage = randomImgNumber;

        let nextImage = "images/" + randomImgNumber + ".jpeg";

        function randomImgFunction(numberOfImages)
        {
            return Math.floor(Math.random() * numberOfImages) + 1;
        }

        actualImage.setAttribute("src", nextImage);
    }
}

function rotateImage(imageElement)
{
    if (specialPlaying === false)
    {
        var image = document.getElementById("mainCatImage");
        image.classList.add("rotate-center");
    
        setTimeout(function()
        {
            image.classList.remove("rotate-center");
        }, 500);
    }
}

        
function cleanAnimation(animationName, elementId)
{
    var element = document.getElementById(elementId);

    element.classList.add(animationName);
    setTimeout(function()
    {
        element.classList.remove(animationName);
    }, 500);
}

document.addEventListener("DOMContentLoaded", function ()
{
    var image = document.getElementById("mainCatImage");
    grabFunction(image);
});

function grabFunction(imageElement)
{
    var audio = document.getElementById("meew");
    var isDragging = false;
    var initialX, initialY;
    var originalX, originalY;
    
    imageElement.addEventListener("mousedown", function (e)
    {
        audio.play();
        e.preventDefault();
        isDragging = true;
        imageElement.style.cursor = "grabbing";
        initialX = e.clientX;
        initialY = e.clientY;
        originalX = parseInt(imageElement.style.left || 0, 10);
        originalY = parseInt(imageElement.style.top || 0, 10);
    });
    
    document.addEventListener("mousemove", function (e)
    {
        if (isDragging)
        {
            let newX = e.clientX - initialX;
            let newY = e.clientY - initialY;
            imageElement.style.left = newX + "px";
            imageElement.style.top = newY + "px";
        }
    });
    
    document.addEventListener("mouseup", function ()
    {
        isDragging = false;
        imageElement.style.cursor = "grab";
        imageElement.style.left = originalX + "px";
        imageElement.style.top = originalY + "px";
    });
}

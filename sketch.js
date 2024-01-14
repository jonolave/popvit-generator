var animal = ["Kuenes", "Dyrenes", "Cellenes", "Spurvenes", "Hvalenes", "Sauenes", "Loppenes", "Bakterienes", "Grisenes", "Løvenes", "Humlenes", "Virusets", "Trærnes", "Fiskenes", "Gasellenes", "Tigrenes", "Måkenes", "Kråkenes", "Vortenes", "Kvisenes", "Blodets", "Puppenes", "Mennenes", "Kvinnenes", "Barnas", "Pensjonistens", "Tankenes", "Verdens", "Månens", "Vestlandets", "Naturens", "Vindens", "Elvenes", "Havets", "Solens", "Slangenes", "Parasittenes", "Bussens", "Bilens", "Trikkens", "Husets", "Mobilens", "Dagens", "Teknologiens", "De dødes", "Ordets", "Dråpens", "En manns", "En kvinnes", "Min kones", "Min manns", "Min fars", "Mormors"];

var adjektiv = ["hemmelige", "vidunderlige", "forbløffende", "forunderlige", "underlige", "magiske", "lunefulle", "vemmelige", "rare", "mytiske", "farlige", "ødelagte", "strålende", "vakre", "nye", "gamle", "glemte", "bortgjemte", "nyoppdagede", "evige", "forgrodde", "rosa", "bekmørke", "irrgrønne", "seige", "forblåste", "sære", "fasinerende", "egoistiske", "altruistiske", "begavede"];

var area = ["liv", "verden", "område", "tanker", "hjem", "hemmelighet", "sannhet", "oppdagelse", "innfall", "idéer", "herredømme", "oppfinnelse", "kreativitet", "fordøyelse", "hjerne", "idealisme", "valgprogram", "konspirasjon", "gråsone", "begjær", "døgnrytme", "trassalder", "fødsel", "død", "oppstandelse", "religion", "sjel", "tro", "tvil", "overtro", "teori", "oppdragelse", "form", "farge", "legning", "uttrykk"];

var tempAnimal;
var tempAdjektiv;
var tempArea;

var title = "";
var filename = "";
var titleColor;

var newButton;
var saveButton;

var loadimageslist = [];
var images = [];
var currentImage;

var titlePosition;
var indexImage;

var author = "";
var authorPosition = 935;
var authorColor;

var savemethod = 1;

var fonts = [];
var currentFont = []; // name, size

var maxWidth = 500; // max width of canvas
var canvasScale = maxWidth / 750.0;
var textXpos = 130;
var textYposTop = 295;
var textYposBottom = 880; // 690

var counter = 0;

var sel;

var mycanvas;

var somethingChanged = false;

function preload() {
    // Load first image
    images[0] = [loadImage("assets/high1.jpg"), '#CEA87D', '#cea87d'];
    // Load fonts
    fonts[0] = [loadFont('fonts/AbrilFatface-Regular.ttf'), 72];
    fonts[1] = [loadFont('fonts/Roboto-Medium.ttf'), 68];
    fonts[2] = [loadFont('fonts/Bungee-Regular.ttf'), 58];
    fonts[3] = [loadFont('fonts/Lora-BoldItalic.ttf'), 72];
}

function loadimages() {

    // Load the rest of the images and fonts
    loadimageslist[0] = [loadImage("assets/high2.jpg"), '#0E0E0E', '#FAFAFA'];
    loadimageslist[1] = [loadImage("assets/high3.jpg"), '#DB65C5', '#FAFAFA'];
    loadimageslist[2] = [loadImage("assets/high4.jpg"), '#FFDA00', '#2C5C65'];
    loadimageslist[3] = [loadImage("assets/high5.jpg"), '#E6CEBA', '#0C0807'];
    loadimageslist[4] = [loadImage("assets/high6.jpg"), '#EBE5A0', '#EBE5A0'];
    loadimageslist[5] = [loadImage("assets/high7.jpg"), '#BF3636', '#9A9EA2'];
    loadimageslist[6] = [loadImage("assets/high8.jpg"), '#FFFF00', '#0D0A08'];
    loadimageslist[7] = [loadImage("assets/high9.jpg"), '#FAFAFA', '#FAFAFA'];
    loadimageslist[8] = [loadImage("assets/high10.jpg"), '#EFE99D', '#F4F3ED'];
    loadimageslist[9] = [loadImage("assets/low1.jpg"), '#FAFAFA', '#D2D1BB'];
    loadimageslist[10] = [loadImage("assets/low2.jpg"), '#390635', '#FAFAFA'];
    loadimageslist[11] = [loadImage("assets/low3.jpg"), '#FAFAFA', '#FAFAFA'];
    loadimageslist[12] = [loadImage("assets/low4.jpg"), '#F3F3F1', '#F3F3F1'];
    loadimageslist[13] = [loadImage("assets/low5.jpg"), '#BAD262', '#D1C5B2'];
    loadimageslist[14] = [loadImage("assets/low6.jpg"), '#1C88B7', '#EBF5C2'];

    // After images are loaded, put them in the images array
    for (var i = 0; i < loadimageslist.length; i++) {
        images.push(loadimageslist[i]);
    }
}

function setup() {
    var canvasSize;

    if (displayWidth > maxWidth) {
        canvasSize = maxWidth;
        canvasScale = maxWidth / 750.0;
    }
    else {
        canvasSize = displayWidth;
        canvasScale = canvasSize / 750.0;
    }

    mycanvas = createCanvas(canvasSize, canvasSize / 750 * 1050);


    newButton = createButton('Lag ny bok');
    newButton.position(150, 10);
    newButton.mousePressed(generateNewTitle);

    /*
    sel = createSelect();
    sel.position(10, 30);
    sel.option('1');
    sel.option('2');
    sel.option('3');
    sel.changed(mySelectEvent);
    */

    saveButton = createButton('Lagre bilde');
    if (windowWidth > 400) {
        saveButton.position(windowWidth - 90, 10);
    } else {
        saveButton.position(500, 10);
    }
    saveButton.mousePressed(saveImage);

    generateNewTitle();

    var inp = createInput('Ditt navn');
    inp.input(myInputEvent);
    inp.position(10, 10);

    currentImage = images[0][0];
    currentFont = fonts[0];

    // Load all fonts
    fonts.forEach(function (thisfont, index) {
        textFont(thisfont[0]);
    });

    somethingChanged = true;

    loadimages();

}

function draw() {

    if (somethingChanged) {
        background(currentImage);

        titleColor = color(images[indexImage][1]);

        authorColor = color(images[indexImage][2]);

        // Show text
        // put drawing code here
        fill(titleColor);

        var fontName = currentFont[0];
        var fontSize = currentFont[1];

        textFont(fontName);
        textSize(fontSize * canvasScale);
        text(title, textXpos * canvasScale, titlePosition * canvasScale);

        fill(authorColor);
        textFont(fonts[1][0], 24 * canvasScale);
        text(author, textXpos * canvasScale, authorPosition * canvasScale);

        // console.log(currentFont);

        somethingChanged = false;

        counter++;
    }
    if (counter > 0) {
        counter -= 1;
    }
}


function generateNewTitle() {
    var mellomrom1;
    var mellomrom2;
    var lines;

    if (counter === 0) {

        tempAnimal = animal[Math.floor(Math.random() * animal.length)];
        tempAdjektiv = adjektiv[Math.floor(Math.random() * adjektiv.length)];
        tempArea = area[Math.floor(Math.random() * area.length)];

        if ((tempAnimal.length + tempAdjektiv.length) < 12) {
            mellomrom1 = ' ';
            mellomrom2 = ' \n';
            lines = 2;
        } else if ((tempAdjektiv.length + tempArea.length) < 12) {
            mellomrom1 = ' \n';
            mellomrom2 = ' ';
            lines = 2;
        } else {
            mellomrom1 = ' \n';
            mellomrom2 = ' \n';
            lines = 3;
        }

        title = tempAnimal + mellomrom1 + tempAdjektiv + mellomrom2 + tempArea;
        filename = tempAnimal + "_" + tempAdjektiv + "_" + tempArea;

        currentFont = fonts[Math.floor(Math.random() * fonts.length)];
        // console.log(currentFont);

        indexImage = Math.floor(Math.random() * images.length);

        currentImage = images[indexImage][0];

        if (indexImage < 10) {
            // High
            titlePosition = textYposTop;
        } else {
            // Low
            if (lines > 2) {
                // 3 lines
                titlePosition = textYposBottom - (currentFont[1] * 2.5);
            } else {
                titlePosition = textYposBottom - (currentFont[1] * 1.5);
            }
        }

        somethingChanged = true;

        counter = 10;
    }
}

function windowResized() {
    var newSize;

    if (windowWidth > maxWidth) {
        newSize = maxWidth;
        canvasScale = maxWidth / 750.0;
    }
    else {
        newSize = windowWidth;
        canvasScale = newSize / 750.0;
    }

    if (windowWidth > 400) {
        saveButton.position(windowWidth - 90, 10);
    }

    resizeCanvas(newSize, newSize / 750 * 1050);
    somethingChanged = true;
}




function saveImage() {
    var fullfilename;

    if (savemethod === 1) {
        // Attempt 1
        fullfilename = filename + ".jpeg";
        save(fullfilename);
    } else if (savemethod === 2) {
        // Attempt 2
        fullfilename = filename + ".jpeg";

        var image = defaultCanvas0.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
        // var image = defaultCanvas0.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
        var anchor = document.createElement('a');
        anchor.setAttribute('href', image);
        anchor.setAttribute('download', fullfilename);
        anchor.click();
    } else if (savemethod === 3) {
        // Attempt 2
        saveFrames(filename, "jpg", 1, 1);
    }

    // Try https://github.com/devgeeks/Canvas2ImagePlugin
}

function myInputEvent() {
    author = this.value();
    somethingChanged = true;
}

function keyReleased() {
    // Use key nymber 1, 2, 3
    if (keyCode === 49) {
        savemethod = 1;
        console.log("Save method 1");
    } else if (keyCode === 50) {
        savemethod = 2;
        console.log("Save method 2");
    } else if (keyCode === 51) {
        savemethod = 3;
        console.log("Save method 3");
    }
    return false; // prevent any default behavior
}

/*
function mySelectEvent() {
  savemethod = Number(sel.value());
  console.log("Save method " + savemethod);
}


function touchEnded() {
    generateNewTitle();
    // prevent default
    return false;
}
*/
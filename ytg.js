function initDownloadLinks (e) {
    var value = document.getElementById("inputURL").value;
    console.log(value);
    var isVimeo = checkVimeo(value);
    console.log(isVimeo)
    if (isVimeo) {
        isVimeo = isVimeo[isVimeo.length - 1];
        getVimeoDetails(isVimeo);
        return 0;
    }
    var result = (extractValue(value));
    if (result === 0) {
        return 0;
    }
    appendImages(result);
    return false;
}
function initFunction () {
    documentReady();

    document.getElementById("submitButton").onclick = function (e) {
        initDownloadLinks(e);
    }
}
function setDisplay (value) {
    var arrayOfElements = document.getElementsByClassName('download-bt');
    var lengthOfArray = arrayOfElements.length;

    for (var i = 0; i < lengthOfArray; i++) {
        arrayOfElements[i].style.display = value;
    }
}

    function appendVimeoVideos (hdLink, mdLink, sdLink) {
        setDisplay("none");
        document.getElementsByClassName('right-click-info')[0].style.display = "block";

        document.getElementById("hdrestext").textContent = "HD Image (640x480)";
        document.getElementById("sdrestext").textContent = "SD Image (200x150)";
        document.getElementById("normalrestext").textContent = "Normal Image (100x74)";
        document.getElementById("imgListing").style.display = "block";
        document.getElementById("bottomListing").style.display = "block";
        document.getElementById("topListing").style.display = "block";
        var element = document.getElementById("maxres")
        element.setAttribute("src", hdLink);
        element.style.display = "block";
        element = document.getElementById("hqres");
        element.setAttribute("src", sdLink);
        element.style.display = "block";
        element = document.getElementById("sdres");
        element.setAttribute("src", mdLink);
        document.getElementById("extraYTImg").style.display = "none";
        document.getElementById("hdreslink").style.display = "none";
        document.getElementById("sdreslink").style.display = "none";
        document.getElementById("hqreslink").style.display = "none";
    }

    function checkVimeo (data) {
        var res = data.match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/)
        return res;
    }

    function getVimeoDetails (link) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
                if (xmlhttp.status == 200) {
                    var data = (JSON.parse(xmlhttp.responseText));
                    appendVimeoVideos(data[0].thumbnail_large, data[0].thumbnail_medium, data[0].thumbnail_small);
                }
                else if (xmlhttp.status == 400) {
                    alert("There is no video in the vimeo link you have given");
                }
                else {
                    alert("There is no video in the vimeo link you have given");
                }
            }
        };

        xmlhttp.open("GET", 'https://vimeo.com/api/v2/video/' + link + '.json', true);
        xmlhttp.send();

    }
    function isMaxResAvailable (result) {
        var img = new Image()
        img.onload = function () {
            if (this.width < 1280) {

                document.getElementById("hdreslink").style.display = "none";
                document.getElementById("hdrestext").textContent = "High resolution not available";
                isSDAvailalbe(result);
            } else {
                document.getElementById("hdrestext").textContent = "HD Image (1280x720)";
            }
        }
        img.onerror = function () {
            document.getElementById("sdrestext").textContent = "High resolution not available";
            isSDAvailalbe(result);
        }
        img.src = "https://img.youtube.com/vi/" + result + "/maxresdefault.jpg";

    }
    function isImageAvailable () {

        alert("Please check the youtube video link. It appears the video link is broken.")


    }
    function isSDAvailalbe (result) {
        var img = new Image()
        img.onload = function () {
            if (this.width === 120 && this.height === 90) {
                document.getElementById("sdrestext").textContent = "Standard Quality not available";
                document.getElementById("sdreslink").style.display = "none";
            } else {
                document.getElementById("sdrestext").textContent = "SD Image (640x480)";
            }
        }
        img.onerror = function () {
            document.getElementById("sdrestext").textContent = "Standard Quality not available";

        }
        img.src = "https://img.youtube.com/vi/" + result + "/sddefault.jpg";

    }

    function appendImages (result) {
        //document.getElementsByClassName("download-btn").style.display = "block";
        setDisplay("block");

        document.getElementsByClassName('right-click-info')[0].style.display = "none";
        document.getElementById("hdreslink").href = "http://iyoutubethumbnaildownloader.com/download.php?id=" + result + "&quality=HD";
        document.getElementById("sdreslink").href = "http://iyoutubethumbnaildownloader.com/download.php?id=" + result + "&quality=SD";
        document.getElementById("hqreslink").href = "http://iyoutubethumbnaildownloader.com/download.php?id=" + result + "&quality=HQ";
        document.getElementById("mqreslink").href = "http://iyoutubethumbnaildownloader.com/download.php?id=" + result + "&quality=MQ";
				document.getElementById("defreslink").href = "http://iyoutubethumbnaildownloader.com/download.php?id=" + result + "&quality=def";
	

        document.getElementById("hdreslink").style.display = "inline";
        document.getElementById("sdreslink").style.display = "inline";
        document.getElementById("hqreslink").style.display = "inline";
        document.getElementById("inputURL").value = "https://youtube.com/watch?v=" + result;
        document.getElementById("imgListing").style.display = "block";
        document.getElementById("bottomListing").style.display = "block";
        document.getElementById("topListing").style.display = "block";
        document.getElementById("hdrestext").textContent = "HD Image (1280x720)";
        document.getElementById("sdrestext").textContent = "SD Image (640x480)";
        document.getElementById("normalrestext").textContent = "Normal Image (480x360)";
        document.getElementById("maxres").setAttribute("src", "https://img.youtube.com/vi/" + result + "/maxresdefault.jpg");//.removeClass("disabled");
        document.getElementById("sdres").setAttribute("src", "https://img.youtube.com/vi/" + result + "/sddefault.jpg");
        document.getElementById("hqres").setAttribute("src", "https://i3.ytimg.com/vi/" + result + "/hqdefault.jpg");
        document.getElementById("mqres").setAttribute("src", "https://img.youtube.com/vi/" + result + "/mqdefault.jpg");
        document.getElementById("defres").setAttribute("src", "https://img.youtube.com/vi/" + result + "/default.jpg");
        isMaxResAvailable(result);

        document.getElementById("extraYTImg").style.display = "block";
    }

    function extractValue (data) {
        console.log(data)
        var res = data.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
        if (res == undefined) {
            alert("Please check the URL you have entered");
            return 0;
        }
        return res[1];
    }


    function showAlertInfo (info) {
        var div = document.createElement("div");
        div.setAttribute("class", "alert alert-info alert-dismissable fade in " + info);
        div.setAttribute("id", "alertBanner");
        var aTag = document.createElement("a");
        a.setAttribute(href, "#");
        a.setAttribute("class", "close");
        a.setAttribute("aria-label", "close");
        a.setAttribute("text", "x");
        a.setAttribute("data-dismiss", "alert");
        div.appendChild(a);
        div.appendChild(html);
        document.getElementById("images").appendChild(div);
    }
    function documentReady () {

        (function () {
            function getQueryStringValue (key) {
                return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
            }
            var id = getQueryStringValue('id');
            var type = getQueryStringValue("type");
            if (type == "vimeo") {
                document.getElementById("inputURL").value = "https://vimeo.com/" + id
                var vimId = checkVimeo("https://www.vimeo.com/" + id);
                vimId = vimId[vimId.length - 1];

                getVimeoDetails(vimId);
                return 0;
            }
            if (id !== "") {
                appendImages(id);
            }

        }());
    };
    initFunction();

async function displayVideo() {

    //create all HTML elemnts that we will interact with
    const mainDiv = document.createElement("div");
    const captureButton = document.createElement("button");
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");

    // add text to button
    captureButton.innerHTML = "capture";

    // reacreate HTML structure
    mainDiv.appendChild(captureButton);
    mainDiv.appendChild(video);
    document.body.appendChild(mainDiv);
    document.body.appendChild(canvas);

    // ask user permission to acces webcam & stor einput on stream
    const stream = await navigator.mediaDevices.getUserMedia({video: true});

    //display whats coming from the webcam onto the webpage
    video.srcObject = stream;
    await video.play();

    // pause execution until capture button has been clicked
    await new Promise((resolve) => captureButton.onclick = resolve);

    // save image in the canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // draw video onto the canvas image
    canvas.getContext('2d').drawImage(video, 0, 0);

    // stop video from streaming
    stream.getVideoTracks()[0].stop();

    //remove the whole main div
    mainDiv.remove();

    // return canvas data
    const capturedImage = canvas.toDataURL("image/jpeg");
    return capturedImage;
}

displayVideo();


// -- main --
/**
 * 
 */
console.proto = function (
    text,
    color = "FFFFFF",
    fontWeight = "normal",
    fontSize = "inherit"
) {
    color = String(color).replace(/^#/, "");

    console.log(
        `%c${text}`,
        `color: #${color}; font-weight: ${fontWeight}; font-size: ${fontSize};`
    );
};

console.title = (text) => console.proto(text, "EEE", "bold", "18px");
console.chapter = (text) => console.proto(text, "AAA", "bold", "15px");


$(function () {
    console.clear();
    console.info("*****************************************");
    //console.note("test", "#F00");
    //console.note("test", "#F00", "bold");


    console.info("*****************************************");
    //console.note("Normal white");
    //console.note("Bold green", "00FF00", "bold");
    console.title("Title");
    console.chapter("Chapter");
    //console.note("Tiny grey whisper", "999999", "normal", "10px");



    console.info("*****************************************");
});
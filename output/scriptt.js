document.addEventListener("DOMContentLoaded", function () {
    const options = document.querySelectorAll(".option");
    let selectedOption;

    options.forEach((option) => {
        option.addEventListener("click", function () {
            if (selectedOption) {
                selectedOption.classList.remove("selected");
            }
            option.classList.add("selected");
            selectedOption = option;
        });
    });

    const startButton = document.getElementById("startButton");
    startButton.addEventListener("click", function () {
        if (selectedOption) {
            const selectedValue = selectedOption.getAttribute("data-value");
            console.log("Selected Value:", selectedValue);
            // Replace this console.log statement with the logic that should be executed when a job title is selected and the "Start" button is clicked
        } else {
            alert("Please select a job title before starting.");
        }
    });
});

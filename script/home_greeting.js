(function () {
    $(document).ready(function () {
        const date = new Date();
        const hour = date.getHours();
        let greeting;

        if (hour >= 5 && hour < 12) {
            greeting = "morning";
        }
        if (hour >= 12 && hour < 18) {
            greeting = "afternoon";
        } else {
            greeting = "evening";
        }

        const greetingText = $("#greeting-text");
        greetingText.animate({ opacity: 0 }, 300, () => {
            setTimeout(() => {
                greetingText.text(`Good ${greeting}, visitor! Here's a random fact just for you:`);
                greetingText.animate({ opacity: 1 },300, () => {});
            },300)
        })
    })
})()
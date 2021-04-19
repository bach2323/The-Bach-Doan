(function () {
    $(document).ready(async function () {
        const fact = await getFact().catch(error => {
            console.error(error);
            return undefined;
        });
        $("#random_fact-text").text(fact ? fact : "Unfortunately no fact today :(");
    })

    async function getFact() {
        const res = await fetch("https://uselessfacts.jsph.pl/random.json?language=en")
        const data = await res.json();
        return data && data.text;
    }
})();

(function () {
    const INDEX_KEY = "imgIndex";
    const PREV_CLASS = "img-carousel__prev";
    const NEXT_CLASS = "img-carousel__next";

    $(document).ready(function () {
        // add index counter and prev and next button
        $(".img-carousel").data(INDEX_KEY, 0).each((_index, carousel) => {
            const images = $(carousel).children(".img-carousel__img");
            const indexText = $(`<span class="img-carousel__index">1 / ${images.length}</span>`);
            const prev = $('<a class="img-carousel__prev">&#10094;</a>');
            const next = $('<a class="img-carousel__next">&#10095;</a>');
            $(carousel).append(indexText, prev, next);
        });

        // add click handler for prev and next button
        $(`.${PREV_CLASS}, .${NEXT_CLASS}`).each((_index, button) => {
            $(button).click(() => {
                const carousel = $(button.parentElement);
                const images = carousel.children(".img-carousel__img");
                const currentIndex = carousel.data(INDEX_KEY);

                // -1 for prev, +1 for next
                const modifier = $(button).hasClass(PREV_CLASS) ? -1 : 1;

                // make sure newIndex is between 0 to (number of images - 1)
                const newIndex = (currentIndex + modifier + images.length) % images.length;

                // update index and index counter
                carousel.data(INDEX_KEY, newIndex);
                carousel.children(".img-carousel__index").text(`${newIndex + 1} / ${images.length}`);

                // hide all images and show the prev/next image
                images.hide();
                $(images[newIndex]).show();
            })
        })
    })
})()
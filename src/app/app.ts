import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    imports: [CommonModule],
    selector: 'app-root',
    styleUrl: './app.scss',
    templateUrl: './app.html',
})

export class App {

    //* ________________________ Properties ________________________

    public products = [
        { img: "1.jpg", title: "Candle Set", description: "Set of four soft toned candles on a stone platform with dried grass, lit by gentle and warm natural light." },
        { img: "2.jpg", title: "Business Cards", description: "Playful pink and orange stationery set with bold, modern geometric shapes and a clean, friendly brand feel." },
        { img: "3.jpg", title: "Juice Bottle", description: "Hand drawn grape juice label with soft colors, a cheerful character and a fun, playful look on a mint base." },
        { img: "4.jpg", title: "Candy Helmet", description: "Surreal 3D astronaut helmet overflowing with colorful candy balls, set against a bright pink, glossy backdrop." },
        { img: "5.jpg", title: "Smart Watches", description: "Two sleek smartwatches in black and gold with clean, easy to read displays on a vivid, bright blue background." },
        { img: "6.jpg", title: "Cherry Bottle", description: "Bold red sculpted jug with a kraft tag, a white cap and a strong, premium look on a deep dark background." },
        { img: "7.jpg", title: "Lavender Box", description: "Soft lavender drawer box with a simple white front, a small pull tab and an elegant seal logo on top." },
        { img: "8.jpg", title: "Burger Brand", description: "Fresh burger branding with a cup, napkin holder and sauce bottles, all on a bright and cheerful teal base." },
        { img: "9.jpg", title: "Chrono Watch", description: "Matte black chronograph watch with a soft leather strap, sharp white hands and a refined, bold dial design." },
        { img: "10.jpg", title: "Wireless Audio", description: "Wireless over ear headphones in warm beige and navy blue with plush cushions made for all day comfort." },
        { img: "11.jpg", title: "Perfume Bottle", description: "Dark glass perfume bottle resting on raw stone, shot in a moody, luxurious scene with soft studio lighting." },
        { img: "12.jpg", title: "Game Controller", description: "Glossy red wireless controller with black grips and sharp details, shot on a deep red backdrop with bold light." },
        { img: "13.jpg", title: "Black Glasses", description: "Classic black frame glasses styled on a dark desk with matching leather cases for a sleek, minimal look." },
        { img: "14.jpg", title: "Skincare Jar", description: "Green skincare jar with a white lid floating among glass bubbles on a calm, fresh and dreamy background." },
        { img: "15.jpg", title: "Laptop Setup", description: "Space gray laptop and phone placed on a dark surface, arranged in a clean, minimal and modern workspace setup." },
        { img: "16.jpg", title: "Amber Perfume", description: "Amber glass perfume bottle resting on a warm beige surface between rough driftwood, with soft golden light." },
    ];

    public isProductHovered: boolean = false;
    public currentImgIndex: number = 0;
    public halfLengthProducts: number = Math.floor(this.products.length / 2);

    // (!) non null assertion
    public popupEle!: HTMLElement;
    public popupImg!: HTMLImageElement;

    public currentBox!: HTMLElement;

    //* ________________________ Methods ________________________

    public updateBoxHovered(box: HTMLElement) {
        this.isProductHovered = true;
        this.currentBox = box;
    }

    //* ________________________

    public openPopup(popupEle: HTMLElement, popupImg: HTMLImageElement, currentImg: HTMLImageElement) {
        this.popupEle = popupEle;
        this.popupImg = popupImg;
        this.currentImgIndex = Number(currentImg.getAttribute('data-index'));

        this.popupEle.classList.add('active');
        setTimeout(() => {
            this.popupEle.classList.add('show');
        }, 1);

        this.updateImgSrc(currentImg.src);

    }

    //* ________________________

    public closePopup() {

        this.popupEle?.classList.remove('show');
        setTimeout(() => {
            this.popupEle?.classList.remove('active');
        }, 500);

    }

    //* ________________________

    public stopProp(e: Event) {
        e.stopPropagation();
    }

    //* ________________________

    public updateImgSrc(currentImgSrc: string) {
        this.popupImg.src = currentImgSrc;

        let currentIndex = this.products.findIndex(function (product) {
            return currentImgSrc.includes(`assets/images/${product.img}`);
        });

        setTimeout(function () {
            document.querySelector(`.indicators li[data-index="${currentIndex}"]`)?.scrollIntoView();
        }, 100);
    }

    //* ________________________

    public updateImg() {
        let newImg = (this.products[this.currentImgIndex])?.img,
            newImgSrc = `assets/images/${newImg}`;

        this.updateImgSrc(newImgSrc);
    }

    //* ________________________

    public targetImg(direct: string) {

        if (direct == 'next') {
            this.currentImgIndex = ++this.currentImgIndex % this.products.length;

        } else if (direct == 'prev') {
            this.currentImgIndex = (--this.currentImgIndex + this.products.length) % this.products.length;
        }

        this.updateImg();
    }
    
    //* ________________________

    public paginateImg(index: number) {

        this.currentImgIndex = index;
        this.updateImg();
    }

}

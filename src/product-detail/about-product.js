import { PolymerElement,html } from "@polymer/polymer/polymer-element.js";

class AboutProduct extends PolymerElement{
    static get template(){
        return html `
        <style>

        </style>

        <div> product Detail</div>

        `
    }
}

window.customElements.define('about-product',AboutProduct);
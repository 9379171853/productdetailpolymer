import {html , PolymerElement } from '@polymer/polymer/polymer-element.js';

class ProductList extends PolymerElement{
    static get properties() {
        return {
            data: Array,
            totalbalance:{
              type: Number,
              value :0
          }
        }
    }


    _handleResponse(event) {
      this.data = event.detail.response;       
      console.log("datas=",this.data);
    }

    static get template(){
        return html `
        <style>

        </style>

        <div> product list</div>
    <iron-ajax 
        auto 
        id="ajax"
        handle-as="json"
       on-response="_handleResponse"
        url="http://localhost:3000/products"
        on-response="_handleResponse"
    > </iron-ajax>


    <template is ="dom-repeat" items={{data}}>
    <vaadin-accordion >
      <vaadin-accordion-panel theme="filled">
      <div slot="summary"> prodcut Name: [[item.product-name]]</div>
       <template is="dom-repeat" items={{data}}>
       <div>[[item.item.product-name]]</div>
        <div>[[item.product-image-url]]</div>
        <div>[[item.header-top-right-text]]</div>
        <div>[[item.header-top-left-text]]</div>
        <div>[[product-url]]</div>
        <div>[[header-top-right-url]]</div>
        <div>[[product-cta-text]]</div>
        </template>
      </vaadin-accordion-panel>  
    </vaadin-accordion>
    </template>

        `
    }

}

window.customElements.define('product-list',ProductList);

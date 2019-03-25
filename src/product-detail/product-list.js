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


      
    <vaadin-accordion items={{data}}>
      <vaadin-accordion-panel theme="filled">
      <dom-repeat items="{{item.product-name}}" >
      <template>
        <div slot="summary"> prodcut Nme: {{item.product-name}}</div>
        <div>[[item.product-name]]</div>
        </template>
      </vaadin-accordion-panel>  
    </vaadin-accordion>
    

        `
    }

}

window.customElements.define('product-list',ProductList);

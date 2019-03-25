import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-ajax';

import '@polymer/paper-button/paper-button.js';

import '@vaadin/vaadin-accordion/vaadin-accordion.js';


import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-column-group.js'
import '@vaadin/vaadin-grid/src/vaadin-grid-templatizer.js';
import '@vaadin/vaadin-grid/src/vaadin-grid-styles.js';


// Set Polymer's root path to the same value we passed to our service worker
setPassiveTouchGestures(true);
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

/**
 * @customElement
 * @polymer
 */
class ProductDetail extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      --app-primary-color: #4285f4;
      --app-secondary-color: black;

      display: block;
    }

    app-drawer-layout:not([narrow]) [drawer-toggle] {
      display: none;
    }

    app-header {
      color: #fff;
      background-color: var(--app-primary-color);
    }

    app-header paper-icon-button {
      --paper-icon-button-ink-color: white;
    }

    .drawer-list {
      margin: 0 20px;
    }

    .drawer-list a {
      display: block;
      padding: 0 16px;
      text-decoration: none;
      color: var(--app-secondary-color);
      line-height: 40px;
    }

    .drawer-list a.iron-selected {
      color: black;
      font-weight: bold;
    }
  </style>
    
  <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Menu</app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name"
           class="drawer-list" role="navigation">
            <a name="products" route="{{subroute}}" href="[[rootPath]]products">products</a>
            <a name="product" route="{{subroute}}" href="[[rootPath]]product">product</a>
           
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              <div main-title="">Products Details</div>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <product-list name="products"></product-list>
            <about-product name="product"></about-product>            
            <not-found name="view404"></not-found>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }
  
  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }

static get observers() {
    return [
        '_routePageChanged(routeData.page)'
    ];
}

_routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'products';
    } else if (['products', 'product'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }


  _pageChanged(page) {    
    switch (page) {
      case 'products':
        import('./product-list.js');
        break;
      case 'product':
        import('./about-product.js');
        break;      
      case 'view404':
        import('./not-found.js');
        break;
    }
  }
}


window.customElements.define('product-detail', ProductDetail);

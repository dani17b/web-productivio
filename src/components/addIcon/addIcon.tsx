//@ts-nocheck
import'src/components/addIcon/addIcon.scss'; 

export enum IconSize{
    small,
    medium,
    large
}

export interface IconProps {
    name : String
    size : IconSize
    action? : any
}

class MyComponent extends React.Component {
    componentDidMount() {
      const script1 = document.createElement("script");
      script1.type = "module";
      script1.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
      document.head.appendChild(script1);
  
      const script2 = document.createElement("script");
      script2.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";
      script2.setAttribute("nomodule", "");
      document.head.appendChild(script2);
    }
  
    render() {
      return (
        <div>
          <h1>Ionicons Example</h1>
          <i class="icon ion-md-heart"></i>
          <i class="icon ion-ios-star"></i>
          <i class="icon ion-logo-github"></i>
        </div>
      );
    }
  }

  
  
    import React from 'react';
  import MyComponent from './MyComponent';
  
  class AnotherComponent extends React.Component {
    render() {
      return (
        <div>
          <h2>Another Component</h2>
          <MyComponent />
        </div>
      );
    }
  }
  
  export default AnotherComponent;

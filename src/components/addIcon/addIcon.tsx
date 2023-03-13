//@ts-nocheck
import'src/components/addIcon/addIcon.scss'; 

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': any;
    }
  }
}

export enum IconSize{
    SMALL = 'small',
    MEDIUM = 'medium',
    large = 'large'
}

export interface IconProps {
    name : String
    size : IconSize
    action? : any
}

export const AddIcon = (props: IconProps) => {
  const{name, size, action} = props;
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const script1 = document.createElement("script");
    script1.type = "module";
    script1.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
    script1.onload = handleScriptLoad;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";
    script2.setAttribute("nomodule", "");
    script2.onload = handleScriptLoad;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    }
  }, []);

  function handleScriptLoad() {
    setIsLoaded(true);
  }

  return (
    <div>
      <button className="rounded-button" type="button" > 
        {isLoaded ? (
          <ion-icon name={name} size={size}></ion-icon>
        ) : (
          <span>Loading icon...</span>
        )}
      </button>
    </div>
  );
}
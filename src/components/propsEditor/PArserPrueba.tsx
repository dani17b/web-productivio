import React, { useState } from 'react';
export const generateComponentCode = (props: any) => {
  const propsCode = Object.entries(props)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join(',\n');

  return `({ ${propsCode} }) => {
      const [text, setText] = useState(initialText);
  
      const handleTextChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        onTextChange(newText);
      };
  
      return (
        <div>
          <input type="text" value={text} onChange={handleTextChange} />
        </div>
      );
    }`;
};
/*Si quieres agregar o actualizar componentes en tu aplicación en tiempo de ejecución sin tener que detener y reiniciar la aplicación, puedes utilizar técnicas como la carga dinámica de componentes o el renderizado condicional.

La carga dinámica de componentes te permite importar componentes en tu aplicación en tiempo de ejecución utilizando la función import() de JavaScript. Aquí hay un ejemplo simple de cómo puedes hacer esto:

import React, { useState, Suspense } from 'react';

const DynamicComponent = React.lazy(() => import('./MyComponent'));

const App = () => {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div>
      <button onClick={() => setShowComponent(true)}>Mostrar componente</button>
      {showComponent && (
        <Suspense fallback={<div>Cargando...</div>}>
          <DynamicComponent />
        </Suspense>
      )}
    </div>
  );
};
En este ejemplo, estamos utilizando React.lazy y import() para importar dinámicamente un componente en nuestra aplicación. Cuando el usuario hace clic en el botón para mostrar el componente, se actualiza el estado y se muestra el componente dinámico utilizando Suspense para manejar la carga del componente.

El renderizado condicional te permite renderizar diferentes componentes en tu aplicación en función del estado o las props. Aquí hay un ejemplo simple de cómo puedes hacer esto:

import React, { useState } from 'react';

const Component1 = () => <div>Componente 1</div>;
const Component2 = () => <div>Componente 2</div>;

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState('component1');

  return (
    <div>
      <button onClick={() => setSelectedComponent('component1')}>
        Mostrar componente 1
      </button>
      <button onClick={() => setSelectedComponent('component2')}>
        Mostrar componente 2
      </button>
      {selectedComponent === 'component1' && <Component1 />}
      {selectedComponent === 'component2' && <Component2 />}
    </div>
  );
};
En este ejemplo, estamos utilizando el estado y el renderizado condicional para mostrar diferentes componentes en nuestra aplicación en función del componente seleccionado por el usuario. Cuando el usuario hace clic en uno de los botones para seleccionar un componente, se actualiza el estado y se muestra el componente seleccionado.

¿Esto te ayuda a entender cómo puedes agregar o actualizar componentes en tu aplicación en tiempo de ejecución?*/

import React from 'react';
import './taskForm.scss';
import {
  InputWithLabel,
  FormButton,
  DateSelect,
  SelectMenu,
} from 'lib-productivio';

export const TaskForm = () => {
  const option = (option: string) => void {};
  return (
    <div className="parent">
      <div className="text-fields">
        <InputWithLabel
          label="Nombre"
          height={31}
          width={346}
          name="name"
          textColor="#1A3891"
          borderColor="#1A3891"
          fontSize={16}
        />
        <InputWithLabel
          label="Descripción"
          height={100}
          width={346}
          name="description"
          textColor="#1A3891"
          borderColor="#1A3891"
          fontSize={16}
        />
        <div className="wrapper">
          <DateSelect label="Selecciona fecha" color="#1A3891" />
          <div className="select-menu">
            <SelectMenu
              options={['Fácil', 'Medio', 'Difícil']}
              onSelect={option}
              label="Dificultad"
              fontSize={16}
              color="#1A3891"
            />
          </div>
        </div>
        <InputWithLabel
          label="Asignar"
          height={31}
          width={346}
          name="assign"
          textColor="#1A3891"
          borderColor="#1A3891"
          fontSize={16}
        />
        <div className="select-group">
          <SelectMenu
            options={[]}
            onSelect={option}
            label="Asignar a un grupo de trabajo"
            fontSize={16}
            color="#1A3891"
          />
        </div>
      </div>
      <div className="buttons">
        <FormButton buttonText="Cancelar" buttonWidth={350} fontSize={16} />
        <FormButton buttonText="Guardar" buttonWidth={350} fontSize={16} />
      </div>
    </div>
  );
};

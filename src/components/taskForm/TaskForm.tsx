import React from 'react';
import './taskForm.scss';
import { InputWithLabel, FormButton } from 'lib-productivio';

export const TaskForm = () => {
  return (
    <div className="text-fields">
      <InputWithLabel
        label="Nombre"
        height={20}
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
        <InputWithLabel
          label="Dificultad"
          height={20}
          width={150}
          name="difficulty"
          textColor="#1A3891"
          borderColor="#1A3891"
          fontSize={16}
        />
        <InputWithLabel
          label="Fecha límite"
          height={20}
          width={150}
          name="deadLine"
          textColor="#1A3891"
          borderColor="#1A3891"
          fontSize={16}
        />
      </div>
      <InputWithLabel
        label="Asignar"
        height={20}
        width={346}
        name="assign"
        textColor="#1A3891"
        borderColor="#1A3891"
        fontSize={16}
      />
      <InputWithLabel
        label="Asigna a grupo de trabajo"
        height={20}
        width={346}
        name="workgroupAssign"
        textColor="#1A3891"
        borderColor="#1A3891"
        fontSize={16}
      />
      <div className="buttons">
        <FormButton buttonText="Cancelar" />
        <FormButton buttonText="Guardar" />
      </div>
    </div>
  );
};

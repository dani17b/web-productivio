import { InputWithLabel, FormButton } from 'lib-productivio';
import React from 'react';
import './taskForm.scss';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { form, FormProps, fetchGroups } from 'src/modules/newTask/actions';
import { useNavigate } from 'react-router-dom';
import {
  DateSelect,
  SelectMenu,
} from 'lib-productivio';
import { useSelector } from 'react-redux';

export const TaskForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { teamsInfo } = useSelector((state: any) => state.form);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const getTeamName = (): string[] => {
    return teamsInfo.map((team: any) => {
      return team.name;
    });
  };

  const [data, setData] = useState<FormProps>({
    name: '',
    description: '',
    date: '',
    difficulty: '',
    asign: '',
    workgroup: '',
  });

  return (
    <div>
      <div className="text-fields">
        <InputWithLabel
          label="Nombre"
          height={31}
          width={346}
          name="name"
          textColor="#1A3891"
          borderColor="#1A3891"
          fontSize={16}
          onChange={(value: any) => {
            setData({
              ...data,
              name: value,
            });
          }}
        />
        <InputWithLabel
          label="Descripción"
          height={100}
          width={346}
          name="description"
          textColor="#1A3891"
          borderColor="#1A3891"
          fontSize={16}
          onChange={(value: any) => {
            setData({
              ...data,
              description: value,
            });
          }}
        />
        <div className="wrapper">
          <DateSelect label="Selecciona fecha" color="#1A3891" />
          <div className="select-menu">
            <SelectMenu
              options={['Fácil', 'Medio', 'Difícil']}
              onSelect={(option) => {
                setData({
                  ...data,
                  difficulty: option,
                });
              }}
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
          onChange={(value: any) => {
            setData({
              ...data,
              asign: value,
            });
          }}
        />
        <div className="select-group">
          <SelectMenu
            options={getTeamName()}
            onSelect={(option) => {
              setData({
                ...data,
                workgroup: option,
              });
            }}
            label="Asignar a un grupo de trabajo"
            fontSize={16}
            color="#1A3891"
          />
        </div>
      </div>
      <div className="buttons">
        <FormButton
          buttonText="Cancelar"
          buttonWidth={350}
          fontSize={16}
          onClick={() => {
            navigate('/home');
          }}
        />
        <FormButton
          buttonText="Guardar"
          buttonWidth={350}
          fontSize={16}
          onClick={() => {
            dispatch(form(data));
            navigate('/user');
          }}
        />
      </div>
    </div>
  );
};

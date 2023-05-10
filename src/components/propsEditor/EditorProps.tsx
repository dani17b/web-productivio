import * as React from 'react';
import './propsEditor.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
} from '@fortawesome/free-solid-svg-icons';

interface PropsEditorProps {
  componentProps: {
    width: number;
    height: number;
    text: string;
    color: string;
    backgroundColor: string;
    fontSize: number;
    textAlign: 'left' | 'center' | 'right'; // nuevo campo
    flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse'; // nuevo campo
    justifyContent:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'; // nuevo campo
    alignItems: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'; // nuevo campo
    fontWeight: 'normal' | 'bold';
    style: React.CSSProperties;
  };
  onPropsChange: (newProps: PropsEditorProps['componentProps']) => void;
}

const PropsEditor: React.FC<PropsEditorProps> = ({
  componentProps,
  onPropsChange,
}) => {
  const [propsObject, setPropsObject] = React.useState(componentProps);

  const handleSaveProps = () => {
    const propsToSave = propsObject;
    const propsJSON = JSON.stringify(propsToSave);
    console.log(propsJSON);
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProps = { ...componentProps, width: parseInt(event.target.value) };
    onPropsChange(newProps);
    setPropsObject(newProps);
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProps = {
      ...componentProps,
      height: parseInt(event.target.value),
    };
    onPropsChange(newProps);
    setPropsObject(newProps);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProps = { ...componentProps, text: event.target.value };
    onPropsChange(newProps);
    setPropsObject(newProps);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProps = { ...componentProps, color: event.target.value };
    onPropsChange(newProps);
    setPropsObject(newProps);
  };

  const handleBackgroundColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProps = { ...componentProps, backgroundColor: event.target.value };
    onPropsChange(newProps);
    setPropsObject(newProps);
  };

  const handlefontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProps = {
      ...componentProps,
      fontSize: parseInt(event.target.value),
    };
    onPropsChange(newProps);
    setPropsObject(newProps);
  };
  const handleTextAlignChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newProps = {
      ...componentProps,
      textAlign: event.target
        .value as PropsEditorProps['componentProps']['textAlign'],
    };
    onPropsChange(newProps);
    setPropsObject(newProps);
  };

  const handleFlexDirectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newProps = {
      ...componentProps,
      flexDirection: event.target
        .value as PropsEditorProps['componentProps']['flexDirection'],
    };
    onPropsChange(newProps);
    setPropsObject(newProps);
  };

  const handleJustifyContentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newProps = {
      ...componentProps,
      justifyContent: event.target
        .value as PropsEditorProps['componentProps']['justifyContent'],
    };
    onPropsChange(newProps);
    setPropsObject(newProps);
  };

  const handleStyleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [styleProp, styleValue] = event.target.value.split(':');
    const newStyle = {
      ...componentProps.style,
      [styleProp.trim()]: styleValue.trim(),
    };
    const newProps = { ...componentProps, style: newStyle };
    onPropsChange(newProps);
    setPropsObject(newProps);
  };

  const handleAlignItemsChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onPropsChange({
      ...componentProps,
      alignItems: event.target
        .value as PropsEditorProps['componentProps']['alignItems'],
    });
  };

  const handleFontWeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onPropsChange({
      ...componentProps,
      fontWeight: event.target.checked ? 'bold' : 'normal',
    });
  };

  return (
    <div className="props-editor">
      <label>
        Width:
        <input
          type="number"
          value={componentProps.width}
          onChange={handleWidthChange}
        />
      </label>
      <br />
      <label>
        Height:
        <input
          type="number"
          value={componentProps.height}
          onChange={handleHeightChange}
        />
      </label>
      <br />
      <label>
        Text:
        <input
          type="text"
          value={componentProps.text}
          onChange={handleTextChange}
        />
      </label>
      <br />
      <label>
        Color:
        <input
          type="color"
          value={componentProps.color}
          onChange={handleColorChange}
        />
      </label>
      <br />
      <label>
        BackgroundColor:
        <input
          type="color"
          value={componentProps.backgroundColor}
          onChange={handleBackgroundColorChange}
        />
      </label>
      <label>
        FontSize:
        <input
          type="number"
          value={componentProps.fontSize}
          onChange={handlefontSizeChange}
        />
      </label>
      <label>
        Text Align:
        <div className="text-align-icons">
          <FontAwesomeIcon
            icon={faAlignLeft}
            onClick={() =>
              onPropsChange({ ...componentProps, textAlign: 'left' })
            }
            className={componentProps.textAlign === 'left' ? 'active' : ''}
          />
          <FontAwesomeIcon
            icon={faAlignCenter}
            onClick={() =>
              onPropsChange({ ...componentProps, textAlign: 'center' })
            }
            className={componentProps.textAlign === 'center' ? 'active' : ''}
          />
          <FontAwesomeIcon
            icon={faAlignRight}
            onClick={() =>
              onPropsChange({ ...componentProps, textAlign: 'right' })
            }
            className={componentProps.textAlign === 'right' ? 'active' : ''}
          />
        </div>
      </label>

      <br />
      <label>
        Flex-Direction:
        <select
          value={componentProps.textAlign}
          onChange={handleFlexDirectionChange}
        >
          <option value="row">row</option>
          <option value="row-reverse">row-reverse</option>
          <option value="column">column</option>
          <option value="column-reverse">column-reverse</option>
        </select>
      </label>
      <br />
      <label>
        JustifyContent:
        <select
          value={componentProps.textAlign}
          onChange={handleJustifyContentChange}
        >
          <option value="flex-start">flex-start</option>
          <option value="flex-end">flex-end</option>
          <option value="center">center</option>
          <option value="space-between">space-between</option>
          <option value="space-around">space-around</option>
        </select>
      </label>
      <br />
      <label>
        Style:
        <input type="text" onChange={handleStyleChange} />
      </label>

      <div>
        <button onClick={handleSaveProps}>Guardar props</button>
      </div>
    </div>
  );
};

export default PropsEditor;

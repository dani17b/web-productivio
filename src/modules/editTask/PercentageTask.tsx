import { TaskProgressBar } from 'lib-productivio';
import { useState } from 'react';
import './percentageTask.scss';

interface TaskProgressInputProps {

percentage: number;

text?: string;

parentBackgroundColor?: string;

childBackgroundColor?: string;

onPercentageChange: (percentage: number) => void;
}
export const TaskProgressInput = (props: TaskProgressInputProps) => {
const { percentage, text, parentBackgroundColor, childBackgroundColor, onPercentageChange } = props;
const [currentPercentage, setCurrentPercentage] = useState(percentage);

const handlePercentageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
const newPercentage = parseInt(event.target.value);
if (newPercentage >= 0 && newPercentage <= 100) {
setCurrentPercentage(newPercentage);
onPercentageChange(newPercentage);
}
};

return (
<div>
<div >
<TaskProgressBar
     percentage={percentage}
     text={text}
     parentBackgroundColor={parentBackgroundColor}
     childBackgroundColor={childBackgroundColor}
   />
</div>   
<p>Editar porcentaje de Tarea</p>
<input className='taskbar' type="number" value={currentPercentage} min="0" max="100" onChange={handlePercentageChange} />
</div>
);
};
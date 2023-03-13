import './teamDropdown.scss';

export interface TeamDropdownProps {
  title: string;
}

export const TeamDropdown = (props: TeamDropdownProps) => {
  const { title } = props;
  return <div className="dropdown-container">{title}</div>;
};

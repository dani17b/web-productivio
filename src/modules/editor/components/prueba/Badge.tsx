import './badge.scss';

import React from 'react';

interface BadgeProps {
  label: string;
  showAny: boolean;
}

export const Badge = (props: BadgeProps) => {
  const { label, showAny } = props;
  return (
    <div className="badge">
      Hola {label} {showAny && 'ANY'}
    </div>
  );
};

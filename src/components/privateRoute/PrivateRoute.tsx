import { useSelector } from 'react-redux';
import * as _ from 'lodash';

export interface PrivateRouteProps {
  roles?: string[];
  children: any;
}

const hasRole = (roles: string[] | undefined, userRoles: string[]) => {
  if (typeof roles == 'undefined') {
    return true;
  }

  if (roles.indexOf('any') !== -1 && userRoles && userRoles.length) {
    return true;
  }

  if(!userRoles){
    return false;
  }

  return _.intersection(roles, userRoles).length;
};

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { roles, children } = props;
  // Validar que para esos roles se puede mostrar la ruta
  const { userInfo } = useSelector((state: any) => state.login);

  const userHasRole = hasRole(roles, userInfo ? userInfo.roles : []);

  if (userHasRole) {
    return <div>{children}</div>;
  }

  return <div>No tienes permiso para ver esta pagina</div>;
};

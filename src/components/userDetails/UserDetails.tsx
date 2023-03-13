export interface UserDetailsProps {
    user: string;
}

export const UserDetails = (props: UserDetailsProps) => {
    const { user } = props;


    return (<div>
        Aqui debe ir la imagen del usuario<img src={user} alt="UserImage" />
        <p> Aqui debe ir el username</p>
        <p>Aquí  ira la descripción</p>
        Aqui deben ir las estrellas <img />

    </div>
    );
};
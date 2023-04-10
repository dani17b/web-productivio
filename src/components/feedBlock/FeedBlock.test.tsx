import { render, screen } from '@testing-library/react';
import { FeedBlock, FeedBlockProps } from './FeedBlock';

describe('FeedBlock component', () => {
  const props: FeedBlockProps = {
    imageSrc:
      'https://https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos.jpg',
    borderColor: '#000000',
    username: 'User Name',
    description: 'Description',
    taskProgessBarPercent: 60,
    totalLikes: 10,
    createdAt: '2023-04-01T14:30:00.000Z',
    comments: [],
    onClick: jest.fn(),
    likedByMe: true,
  };

  it('should render the component with the correct props', () => {
    render(<FeedBlock {...props} />);

    const userPhoto = screen.getByTestId('user-photo');
    const username = screen.getByTestId('username');
    const description = screen.getByTestId('user-description');
    const comments = screen.getByTestId('user-comments');
    const progressBar = screen.getByTestId('progress-bar');

    expect(userPhoto).toBeInTheDocument();
    expect(userPhoto).toHaveAttribute('src', props.imageSrc);
    expect(username).toBeInTheDocument();
    expect(username.textContent).toBe('User Name');
    expect(description).toBeInTheDocument();
    expect(description.textContent).toBe('Description');
    expect(comments).toBeInTheDocument();
    expect(progressBar).toBeInTheDocument();
  });
});

describe('FeedBlock component', () => {
  const props: FeedBlockProps = {
    imageSrc:
      'https://https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos.jpg',
    borderColor: '#000000',
    username: 'User Name',
    description: 'Description',
    taskProgessBarPercent: 0,
    totalLikes: 10,
    createdAt: '2023-04-01T14:30:00.000Z',
    comments: [],
    onClick: jest.fn(),
    likedByMe: true,
  };

  it('should render the component with the correct props', () => {
    render(<FeedBlock {...props} />);

    const userPhoto = screen.getByTestId('user-photo');
    const username = screen.getByTestId('username');
    const description = screen.getByTestId('user-description');
    const comments = screen.getByTestId('user-comments');
    const progressBar = screen.queryByTestId('progress-bar');

    expect(userPhoto).toBeInTheDocument();
    expect(userPhoto).toHaveAttribute('src', props.imageSrc);
    expect(username).toBeInTheDocument();
    expect(username.textContent).toBe('User Name');
    expect(description).toBeInTheDocument();
    expect(description.textContent).toBe('Description');
    expect(comments).toBeInTheDocument();
    expect(progressBar).not.toBeInTheDocument();
  });
});

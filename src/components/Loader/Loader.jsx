import { Rings } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Rings
      height="80"
      width="80"
      color="#4fa94d"
      radius="6"
      wrapperStyle={{ display: 'inline-block', textAlign: 'center' }}
      wrapperClass=""
      visible={true}
      ariaLabel="rings-loading"
    />
  );
};

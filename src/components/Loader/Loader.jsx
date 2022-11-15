import { InfinitySpin } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader} role="alert">
      <InfinitySpin color="#4fa94d" height={80} width={100} />
      Loading...
    </div>
  );
}

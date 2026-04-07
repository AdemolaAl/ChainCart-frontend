import { Link } from 'react-router-dom';
import * as IMG from './../../assets';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center flex-col group">
      <img src={IMG.ChainCart} alt="Logo" className="h-[50px] w-[50px] transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
    </Link>
  );
}

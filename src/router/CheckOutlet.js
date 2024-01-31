import {Outlet, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';

const CheckOutlet = ({children}) => {
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.auth.userCurr);

  useEffect(() => {
    const checkUser = () => {
      if(!currUser) {
        navigate('/login', {replace: true});
      }
    }
    checkUser();
  }, [currUser, navigate])

  return (
    <>
      {children ? children : <Outlet />}
    </>
  )
}

export default CheckOutlet;
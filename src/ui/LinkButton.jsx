import { Link, useNavigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
function LinkButton({children, to}) { 
   const navigate = useNavigate();
   const className = 'text-sm text-blue-500 hover:text-blue-600 hover:underline';
      if(to === '-1') return  <button className={className} onClick={() => navigate(-1)}>{children}</button>;
   return (
    <div>
      <Link to={to} className={className}>
      {children}
      </Link>   
    </div>
  )
}

export default LinkButton

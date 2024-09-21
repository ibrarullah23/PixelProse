import { Link, useNavigate } from "react-router-dom"


const Menu = ({ auth }) => {


  const handleLogout = async () => {

  }

  return (
    <div className="
    *:w-full *:px-2 *:py-1 *:rounded-md *:cursor-pointer *:text-sm 
    border font-details theme-bg theme-text  w-[200px] z-10 flex flex-col items-start absolute top-12 right-12 rounded-md p-3 space-y-3">
      {!auth && <Link className="  hover:bg-zinc-500/20" to="/login"><div>Login</div></Link>}
      {!auth && <Link className="  hover:bg-zinc-500/20" to="/register"><h3>Register</h3></Link>}
      {auth && <Link className="  hover:bg-zinc-500/20 " to={"/" + auth.username}><h3>Profile</h3></Link>}
      {auth && <Link className="  hover:bg-zinc-500/20 " to="/write"><h3>Write</h3></Link>}
      {auth && <Link className="  hover:bg-zinc-500/20 " to={"/myblogs/" + auth._id}><h3>My blogs</h3></Link>}
      {auth && <h3 onClick={handleLogout}>Logout</h3>}
      <hr />
      {<Link to="#"><h3 className="  hover:bg-slate-500/15 ">About</h3></Link>}
    </div>
  )
}

export default Menu


const Footer = () => {
  return (
    <>
<div className="mt-8 w-full bg-zinc-900  text-white  px-8  flex sm:flex-row flex-col space-y-6 sm:space-y-0  sm:justify-evenly text-sm md:text-base pt-8 ">
       <div className="flex flex-col ">
         <p>Featured Blogs</p>
         <p>Most viewed</p>
         <p>Readers Choice</p>
       </div>

       <div className="flex flex-col ">
         <p>Forum</p>
         <p>Support</p>
         <p>Recent Posts</p>
       </div>

       <div className="flex flex-col ">
         <p>Privacy Policy</p>
         <p>About Us</p>
         <p>Terms & Conditions</p>
         <p>Terms of Service</p>
       </div>
    </div>
    <p className="py-6 text-center  bg-zinc-900  text-white  text-sm">All rights reserved @Blog Market 2023</p>
    </>
    
  )
}

export default Footer
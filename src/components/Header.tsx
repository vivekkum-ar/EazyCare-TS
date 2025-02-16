import { assets } from "../assets/assets"

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
        <div className="md:w-1/2 flex flex-col justify-center items-start gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
          <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
            Book Appointment <br/> with Trusted Doctors
          </p>
          <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
            <img className="w-28" src={assets.group_profiles} alt="" />
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br className="hidden sm:block" /> Error soluta non at, sint aliquam harum.
            </p>
          </div>
            <a className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300" href="#speciality">
              Book appointment <img className="w-3" src={assets.arrow_icon} alt="" />
            </a>
        </div>
        <div className="md:w-1/2 relative ">
          <img className="rounded-lg bottom-0 h-auto  w-full" src={assets.header_img} alt="" />
        </div>

    </div>
  )
}

export default Header
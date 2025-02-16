import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="">
      <div className="text-center text-2xl pt-10 text-gray-500">
      <p className="">ABOUT<span className="text-gray-700 font-medium"> US</span></p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
      <img src={assets.about_image} className='max-w-[360px] w-full' alt="" />
      <div className="flex flex-col justify-center gap-6 text-justify text-sm text-gray-600">
        <p className="">
        Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records
        </p>
        <p className="">
        Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way
        </p>
        <b className="text-gray-800">
        Our Vision
        </b>
        <p className="">
        Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
        </p>
      </div>
      </div>
      <div className="text-center text-2xl pt-10 text-gray-500 py-4">
      <p className="">WHY<span className="text-gray-700 font-medium"> CHOOSE US</span></p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>EFFICIENCY</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>CONVENIENCE</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>PERSONALIZATION</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About
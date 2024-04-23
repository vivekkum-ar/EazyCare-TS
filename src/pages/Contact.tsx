import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="">
      <div className="text-center text-2xl pt-10 text-gray-500">
      <p className="">CONTACT<span className="text-gray-700 font-medium"> US</span></p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
      <img src={assets.contact_image} className='max-w-[360px] w-full' alt="" />
      <div className="flex flex-col justify-center gap-6 text-justify text-sm text-gray-600">
        <p className="uppercase font-semibold text-lg text-gray-600">Our OFFICE</p>
        <p className="">AJAY Garo's Home <br />AJAY Garo's Home</p>
        <p className="">Tel: (415) 555-0132<br/>Email: vivdev@gmail.com</p>
        <p className="uppercase font-semibold text-lg text-gray-600">Careers at PRESCRIPTO</p>
        <p className="">Learn more about our teams and job openings.</p>
        <button className='border border-black px-8 py-5 text-sm hover:bg-black hover:text-white transition-all duration-300 w-40'>Explore Jobs</button>
      </div>
      </div>
    </div>
  )
}

export default Contact
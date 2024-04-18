import { Icon } from "@iconify/react/dist/iconify.js"

const Footer = () => {
    return (
        <div className="md:mx-10">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                {/* /* ---------------------------------------- left Section ---------------------------------------- */}
                <div className="">
                    <div className="flex flex-row relative items-center gap-2 cursor-pointer">
                        <Icon icon={"raphael:paper"} className="w-14 h-14 text-primary" />
                        <p className="italic text-xl absolute left-2 line-clamp-1 w-44 text-zinc-500 font-bold text-center scale-110"><span className="text-primary">Eazy</span>Care</p>
                    </div>
                    <p className="w-full md:w-2/3 text-gray-600 leading-6">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
                {/* /* --------------------------------------- Center Section ---------------------------------------  */}
                <div className="">
                    <h1 className="text-xl font-medium mb-5">COMPANY</h1>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                {/* /* ---------------------------------------- Right Section ---------------------------------------  */}
                <div className="">
                    <h1 className="text-xl font-medium mb-5">GET IN TOUCH</h1>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>+1-212-456-7890</li>
                        <li>greatstackdev@gmail.com</li>
                    </ul>
                </div>
            </div>
            {/* /* --------------------------------------- Copyright text --------------------------------------- */}
            <div className="">
                <hr />
                <p className="py-5 text-sm text-center">Copyright © 2024 GreatStack - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
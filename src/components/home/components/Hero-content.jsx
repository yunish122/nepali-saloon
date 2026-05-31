import Button from "../../ui/Button"

function HeroContent() {
    return (
        <div className="flex flex-col gap-6 ">
            <div className="flex items-center flex-col gap-3">
                <h1 className="font-bold text-4xl text-center text-gray-900/80">Queue Management for Salons</h1>
                <h2 className="text-gray-500 font-medium text-sm">Real-time queue tracking, seamless bookings, and analytics for salons across Nepal.</h2>
            </div>

            {/* //this is for lower button */}
            <div className="flex justify-center items-center gap-3">
                <Button title="Get Started" size="md" className="hover:cursor-pointer bg-black text-white font-semibold rounded-lg border-1 hover:bg-black/80 transition duration-200"></Button>
                <Button title='Learn More' size="md" className=" hover:cursor-pointer font-semibold border-gray-500/20 shadow-sm border-1 rounded-lg hover:bg-[#9361FF] hover:text-white transition duration-200"></Button>
            </div>
        </div>

    )
}

export default HeroContent
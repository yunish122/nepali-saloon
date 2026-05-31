import Button from "../../ui/Button";


function CTA() {
    return (
        <section className="flex flex-col text-center items-center gap-3 border-1 border-black/10 rounded-lg py-3 max-w-2xl mx-auto">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold text-black-70">Ready to transform your salon?</h1>
                <p className="text-xs text-gray-700 font-medium">Join salons across Nepal with better queue management and customer satisfaction.</p>
            </div>
            <Button title="Get Started" size="sm" className="hover:cursor-pointer bg-black rounded-md text-white font-medium"></Button>
        </section>
    )
}

export default CTA;

import Button from "./ui/Button";
function Navbar({ buttons = [] }) {

    return (
        <header className="px-6 flex justify-between border-b-1 border-gray-500/20  mx-auto px-4 md:px-8 lg:px-10 py-3">
            <div className="flex items-center gap-2">
                <img
                    src="frontend/src/assets/barber-pole-icon-svg-download-png-1348738 (1).png"
                    alt="Logo"
                // className="h-6 w-6 object-contain"
                />
                <h1 className="text-xs font-semibold">Saloon Queuing System</h1>
            </div>
            <div>
                <Button title="Sign in" size="sm" className=" hover:cursor-pointer font-medium bg-black text-white border-1 rounded-lg"></Button>
                {
                    buttons.map((val, idx) => {
                        <Button onclick={val.onclick}>{val.label}</Button>
                    })
                }
            </div>
        </header>
    )

}

export default Navbar;
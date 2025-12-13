// src/pages/Staff/Teaching.jsx
const Teaching = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
            <h3 className="text-2xl font-bold text-blue-800 mb-4 border-b pb-2">Teaching Staff</h3>
            <p className="text-gray-700 mb-6">
                Meet our qualified instructors, experts in their respective TVET fields, committed to practical student success.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="border border-green-200 p-4 rounded-md bg-green-50/50 hover:shadow-md transition">
                    <p className="font-semibold text-xl text-blue-700">Multimedia Production Team</p>
                    <ul className="mt-2 list-disc pl-5 text-gray-700">
                        <li>Mr. Kabera - Lead Instructor (Graphic Design)</li>
                        <li>Ms. Mutoni - Instructor (Video Editing)</li>
                    </ul>
                </div>
                
                <div className="border border-green-200 p-4 rounded-md bg-green-50/50 hover:shadow-md transition">
                    <p className="font-semibold text-xl text-blue-700">Software Development Team</p>
                    <ul className="mt-2 list-disc pl-5 text-gray-700">
                        <li>Mr. Nsengimana - Lead Instructor (Coding/Databases)</li>
                        <li>Ms. Habimana - Instructor (Web Technologies)</li>
                    </ul>
                </div>
                
                <div className="border border-green-200 p-4 rounded-md bg-green-50/50 hover:shadow-md transition">
                    <p className="font-semibold text-xl text-blue-700">Building Construction Team</p>
                    <ul className="mt-2 list-disc pl-5 text-gray-700">
                        <li>Mr. Ruzindana - Lead Instructor (Masonry/Plumbing)</li>
                        <li>Mr. Claude - Instructor (Site Management)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default Teaching;
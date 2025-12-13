// src/pages/Staff/Administration.jsx
const Administration = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
            <h3 className="text-2xl font-bold text-blue-800 mb-4 border-b pb-2">Administration Staff</h3>
            <p className="text-gray-700 mb-6">
                Meet the dedicated leaders and support teams responsible for the smooth operation and strategic direction of Mutovu TSS.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
                <li className="p-3 bg-gray-100 rounded-md shadow-sm">
                    <p className="font-semibold text-lg text-blue-700">Principal: **John Doe**</p>
                    <p className="text-sm">Oversees all school operations and strategic planning.</p>
                </li>
                <li className="p-3 bg-gray-100 rounded-md shadow-sm">
                    <p className="font-semibold text-lg text-blue-700">Vice Principal: **Jane Smith**</p>
                    <p className="text-sm">Manages academic affairs, student discipline, and curriculum.</p>
                </li>
                <li className="p-3 bg-gray-100 rounded-md shadow-sm">
                    <p className="font-semibold text-lg text-blue-700">Accountant: **Elias Karemera**</p>
                    <p className="text-sm">Handles all financial transactions and budgeting.</p>
                </li>
                <li className="p-3 bg-gray-100 rounded-md shadow-sm">
                    <p className="font-semibold text-lg text-blue-700">Secretary: **Alice Uwase**</p>
                    <p className="text-sm">Manages records, communications, and admissions paperwork.</p>
                </li>
            </ul>
        </div>
    );
};
export default Administration;
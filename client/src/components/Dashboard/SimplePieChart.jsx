// SimplePieChart.jsx

const SimplePieChart = ({ data }) => {
  
    const total = data.reduce((sum, item) => sum + item.amount, 0)

  if (total === 0) 
    return (
    <div className="flex flex-col sm:flex-row md:flex-col justify-center items-center">
      <div className="flex justify-center items-center bg-slate-400 rounded-full h-40 w-40  md:h-56 md:w-56 lg:h-64 lg:w-64">
        <p className="text-slate-600">No data</p>
      </div>
    </div>
    );

    // colors for each category, you can customize these as needed
  const colors = [
    "#f3d20f", // food
    "#1beee7", // rent
    "#fff0ab", // loan
    "#2832b8", // tranport
    "#ff86d9", // shopping
    "#74dc9c",  // Health
    "#6d726a", // others   
  ];


const gradient = data.map((item, index) => {
      const percent = (item.amount / total) * 100;

      const start = data 
        .slice(0, index)
        .reduce((sum, prev) => sum + (prev.amount / total) * 100, 0);

      const end = start + percent;

      return `${colors[index % colors.length]} ${start}% ${end}%`;
      
  }).join(", ");

  return (
    <div className="w-full flex flex-col sm:flex-row sm:justify-between lg:flex-col items-start lg:items-end">
      <div
        className="h-40 w-40  md:h-52 md:w-52  xl:h-64 xl:w-64 rounded-full shadow-lg transition-all duration-500 mr-5 lg:mr-2"
        style={{
          background: `conic-gradient(${gradient})`,
        }}
      />

    {/* Properties */}    
    <div className="xl:w-[80%] flex flex-row justify-start flex-wrap sm:flex-col lg:flex-row lg:flex-wrap lg:justify-end  items-start mt-5"> 
    {/* Food   */}  
    <div className="text-slate-800 flex flex-row justify-center items-center mr-4  mb-2 lg:mr-5 lg:mb-4">
      <div className="h-2 w-2 p-2 rounded bg-amber-300  mr-2"></div>
        <p className="text-sm md:text-base font-medium">Food</p>
    </div>

    {/* Rent   */}  
    <div className="text-slate-800 flex flex-row justify-center items-center mr-4  mb-2 lg:mr-5 lg:mb-4">
      <div className="h-2 w-2 p-2 rounded bg-teal-300/80  mr-2"></div>
        <p className="text-sm md:text-base font-medium">Rent</p>
    </div>


    {/* Loan   */}  
    <div className="text-slate-800 flex flex-row justify-center items-center mr-4  mb-2 lg:mr-5 lg:mb-4">
      <div className="h-2 w-2 p-2 rounded bg-amber-100  mr-2"></div>
        <p className="text-sm md:text-base font-medium">Loan</p>
    </div>

    {/* Transport   */}  
    <div className="text-slate-800 flex flex-row justify-center items-center mr-4  mb-2 lg:mr-5 lg:mb-4">
      <div className="h-2 w-2 p-2 rounded bg-blue-800  mr-2"></div>
        <p className="text-sm md:text-base font-medium">Transport</p>
    </div>

    {/* Shopping   */}  
    <div className="text-slate-800 flex flex-row justify-center items-center mr-4  mb-2 lg:mr-5 lg:mb-4">
      <div className="h-2 w-2 p-2 rounded bg-pink-400  mr-2"></div>
        <p className="text-sm md:text-base font-medium">Shopping</p>
    </div>

    {/* Health   */}  
    <div className="text-slate-800 flex flex-row justify-center items-center mr-4  mb-2 lg:mr-5 lg:mb-4">
      <div className="h-2 w-2 p-2 rounded bg-green-400/80  mr-2"></div>
        <p className="text-sm md:text-base font-medium">Health</p>
    </div>

    {/* Other   */}  
    <div className="text-slate-800 flex flex-row justify-center items-center mr-4  mb-2 lg:mr-5 lg:mb-4">
      <div className="h-2 w-2 p-2 rounded bg-gray-500  mr-2"></div>
        <p className="text-sm md:text-base font-medium">Other</p>
    </div>



    </div>
</div> 
  );
};

export default SimplePieChart;
const Chart = () => {
  const data = [
    {
      name: "Giraffe",
      color: "NFR",
      category: "Pet",
      price: "524",
    },
    {
      name: "Strawberry Bat Dragon",
      color: "MFR",
      category: "Pet",
      price: "157",
    },
    {
      name: "Frost Dragon",
      color: "FR",
      category: "Pet",
      price: "127",
    },
    {
      name: "Frost Dragon",
      color: "FR",
      category: "Pet",
      price: "127",
    },
    {
      name: "Frost Dragon",
      color: "FR",
      category: "Pet",
      price: "127",
    },
    {
      name: "Frost Dragon",
      color: "FR",
      category: "Pet",
      price: "127",
    },
    {
      name: "Frost Dragon",
      color: "FR",
      category: "Pet",
      price: "127",
    },
    {
      name: "Frost Dragon",
      color: "FR",
      category: "Pet",
      price: "127",
    },
  ];

  return (
    <section className="mt-10 mx-auto max-w-4xl px-4 lg:px-8">
      <div className="border-2 border-slate-500 border-opacity-50 rounded-md shadow-sm bg-white dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white py-4 px-6 border-b border-gray-300 dark:border-gray-700">
          Most Traded Items
        </h2>
        <div className="relative overflow-y-auto max-h-80">
          <table
            className="w-full text-sm text-left text-gray-700 dark:text-gray-400"
            aria-label="Most traded pets table"
          >
            <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase text-gray-700 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Item Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Attribute
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } dark:bg-gray-800 dark:border-gray-700 border-b`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.color}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Chart;

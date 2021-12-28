const buttons = {
  green:
    "px-2 py-3 rounded-md border bg-green-500 text-white hover:bg-green-600",
  red: "px-2 py-3 rounded-md border bg-red-500 text-white hover:bg-red-600 my-1 w-full",
  inputStyle: "h-12 border border-red-400 w-full px-3",
  inputStyleDark: "h-12  w-full px-3 bg-black bg-opacity-30 my-1",
};

const comp = {
  headerColor:
    "text-3xl  border border-gray-500 px-2 py-4 rounded-md shadow-md bg-opacity-10 bg-white",
};

const components = {
  header: (text) => <h1 className={comp.headerColor}>{text}</h1>,
};
export {buttons, comp, components};

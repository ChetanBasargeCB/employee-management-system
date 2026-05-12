import Employe from "../Model/EmployeModel.js";

export const addEmployees = async (req, res) => {
  const { name, email, phone, department, role, status } = req.body;

  // console.log(name, email, phone, department, role, status)

  try {
    if (!name || !email || !phone || !department || !role || !status)
      return res.status(400).json({ message: "All fields required" });

    const exist = await Employe.findOne({ email });
    if (exist)
      return res
        .status(409)
        .json({ message: "Account already exists, please login !!" });

    await Employe.create({ name, email, phone, department, role, status });

    res.status(201).json({ message: "Employee Created!" });
  } catch (error) {
    console.log("Add Employee error", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllData = async (req, res) => {
  try {
    // pages
    const page = parseInt(req.query.page) || 1;

    // records limit
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    // send by search
    const search = req.query.search || "";

    const filter = search ? { name: { $regex: search, $options: "i" } } : {};

    // total employees count
    const totalEmployees = await Employe.countDocuments(filter);

    const employees = await Employe.find(
      filter,
      {
        _id: 1,
        name: 1,
        email: 1,
        department: 1,
        phone: 1,
        role: 1,
        status: 1,
      },
    )
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      employees,
      currentPage: page,
      totalPages: Math.ceil(totalEmployees / limit),
      totalEmployees,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("Deleting id", id);

    const isDelete = await Employe.findByIdAndDelete(id);

    if (!isDelete) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee Deleted" });
  } catch (error) {
    console.log("Employee deleting error", error);
    res.status(500).json({ message: "Internal Server issue" });
  }
};

export const getSinglemployee = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("id of single", id);
    const employee = await Employe.findById(id);

    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    res.status(200).json(employee);
  } catch (error) {
    console.log("Singal employee fetching error", error);
    res.status(500).json({ message: "Sever error" });
  }
};

export const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("id of updating", id);

    const updatedEmployee = await Employe.findByIdAndUpdate(
      id,
      req.body,

      // it returns data after updating
      {
        returnDocument: "after",
      },
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Emplyoee not found" });
    }
    res.status(200).json({ message: "Employee data updated" });
  } catch (error) {
    console.log("employee updating error", error);
  }
};

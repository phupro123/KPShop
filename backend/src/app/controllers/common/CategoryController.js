const Category = require("../../models/Category");

class CategoryController {
  // [GET] /category/all
  async getAllCategory(req, res, next) {
    const pageIndex = parseInt(req.query.pageIndex);
    const pageSize = parseInt(req.query.pageSize);
    const skipIndex = (pageIndex - 1) * pageSize;

    const queryObj = { ...req.query };
    const excludedFields = ["pageIndex", "pageSize"];
    excludedFields.forEach((el) => delete queryObj[el]);
    try {
      const data = await Category.find(queryObj)
        .limit(pageSize)
        .skip(skipIndex)
        .exec();
      const count = await Category.countDocuments(queryObj);
      res.status(200).json({
        data,
        total: count,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // [delete] /category/delete/:id
  async deleteCategory(req, res) {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json("Category deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  // [GET] /category/get/:id
  async getCategory(req, res, next) {
    await Category.find({ _id: req.params.id })
      .then((category) => {
        console.log(category);
        res.status(200).json(category);
      })
      .catch(next);
  }
  //[PUT]  /category/edit/:id
  async update(req, res, next) {
    await Category.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        Category.findById(req.params.id).then((category) => {
          res.status(200).json(category);
        });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  //  [POSt] /category/new
  async newCategory(req, res, next) {
    try {
      const count = await Category.find().count();
      const formData = req.body;
      console.log(formData);

      Category.init();
      const temp = { ...formData, _id: count + 1 };
      const category = new Category(temp);

      category
        .save()
        .then((category) => res.status(200).json(category))
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CategoryController();

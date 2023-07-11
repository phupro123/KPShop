const { join } = require("lodash");
const Brand = require("../../models/Brand");

class BrandController {
  // [GET] /brand/all
  async getAllBrand(req, res, next) {
    const pageIndex = parseInt(req.query.pageIndex);
    const pageSize = parseInt(req.query.pageSize);
    const skipIndex = (pageIndex - 1) * pageSize;

    const queryObj = { ...req.query };
    const excludedFields = ["pageIndex", "pageSize"];
    excludedFields.forEach((el) => delete queryObj[el]);

    try {
      const data = await Brand.find(queryObj)
        .limit(pageSize)
        .skip(skipIndex)
        .exec();

      const count = await Brand.countDocuments(queryObj);
      res.status(200).json({
        data,
        total: count,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // [GET] /brand/get/:categoryId category
  async getBrandByCategory(req, res, next) {
    console.log(req.params);
    await Brand.find({ category: req.params.id })
      // .populate("categoryId")
      .then((brand) => {
        res.status(200).json(brand);
      })
      .catch(next);
  }

  // [delete] /brand/delete/:id
  async deleteBrand(req, res) {
    try {
      await Brand.findByIdAndDelete(req.params.id);
      res.status(200).json("Brand deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  // [GET] /brand/get/:id
  async getBrand(req, res, next) {
    await Brand.find({ _id: req.params.id })
      .then((brand) => {
        console.log(brand);
        res.status(200).json(brand);
      })
      .catch(next);
  }
  //[PUT]  /brand/edit/:id
  async update(req, res, next) {
    await Brand.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        Brand.findById(req.params.id).then((brand) => {
          res.status(200).json(brand);
        });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  //  [POSt] /brand/new
  async newBrand(req, res, next) {
    try {
      const count = await Brand.find().count();
      const formData = req.body;

      Brand.init();
      const temp = { ...formData, _id: count + 1 };
      const brand = new Brand(temp);

      brand
        .save()
        .then((brand) => res.status(200).json(brand))
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new BrandController();

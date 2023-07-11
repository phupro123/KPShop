const { last } = require("lodash");
const Product = require("../../models/Product");

class ProductController {
  // [GET] /product/all
  async getAllProduct(req, res, next) {
    const pageIndex = parseInt(req.query.pageIndex);
    const pageSize = parseInt(req.query.pageSize);
    const skipIndex = (pageIndex - 1) * pageSize;

    const price = req.query.price?.split("-");
    const star = req.query.star;

    const sort = req.query.sort && JSON.parse(req.query.sort);


    const queryObj = {
      ...req.query,
      ...(price && {
        price: {
          $gte: Number(price[0] || 0),
          $lt: Number(price[1] || 99999999),
        },
      }),
      ...(star && {
        star: {
          $gte: Number(star),
          $lt: Number(star) + 1,
        },
      }),
    };

    const excludedFields = ["pageIndex", "pageSize"];
    excludedFields.forEach((el) => delete queryObj[el]);
    try {
      const data = await Product.find(queryObj)
        .sort(
          sort ? Object.fromEntries([[sort.key, sort.value]]) : { title: 1 }
        )
        .limit(pageSize)
        .skip(skipIndex)
        .exec();
      const count = await Product.countDocuments(queryObj);
      res.status(200).json({
        data,
        total: count,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // [delete] /product/delete/:id
  async deleteProduct(req, res) {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // [GET] /product/get/:_id
  async getProductById(req, res, next) {
    console.log(req.params);
    await Product.findById(req.params._id)
      .then((product) => {
        res.status(200).json(product);
      })
      .catch(next);
  }
  async getProductBySlug(req, res, next) {
    console.log(req.params.slug);
    await Product.findOne({ slug: req.params.slug })
      .then((product) => {
        res.status(200).json(product);
      })
      .catch(next);
  }
  //[PUT]  /product/edit/:id
  async update(req, res, next) {
    await Product.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.status(200).json("Updated Success"))
      .catch(next);
  }

  //  [POSt] /Product/new
  async newProduct(req, res, next) {
    try {
      const dataProduct = await Product.find();
      const count = last(dataProduct)._id;
      const formData = req.body;

      Product.init();
      const temp = { ...formData, _id: Number(count) + 1 };
      const product = new Product(temp);

      product
        .save()
        .then((product) => res.status(200).json(product))
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getTop5Product(req, res, next) {
    Product.find({})
      .limit(4)
      .then((product) => {
        res.status(200).json(product);
      })
      .catch(() => {
        res.status(500).json(err);
      });

    // res.send('detail'+req.params.slug)
  }

  async getCategory1(req, res, next) {
    Product.find({ category_id: { $regex: req.params.name, $options: "i" } })

      .then((product) => {
        res.status(200).json(product);
      })
      .catch(() => {
        res.status(500).json(err);
      });

    // res.send('detail'+req.params.slug)
  }

  async getProductBySeller(req, res, next) {
    Product.find({ seller_id: req.params.id })
      .then((product) => {
        res.status(200).json(product);
      })
      .catch(() => {
        res.status(500).json(err);
      });

    // res.send('detail'+req.params.slug)
  }

  async getProductLength(req, res) {
    await Product.find()
      .count()
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  async search(req, res) {
    // try {
    //   const data = await Product.find({
    //     $text: { $search: req.params.name },
    //   }).exec();
    //   const count = await Product.countDocuments({
    //     $text: { $search: req.params.name },
    //   });
    //   res.status(200).json({
    //     data,
    //     total: count,
    //   });
    // } catch (err) {
    //   res.status(500).json(err);
    // }
    const value= req.params.name
    try {
      const data = await Product.find({title:{$regex:value,$options:"i"}})
      .exec();
      const count = await Product.countDocuments({title:{$regex:value,$options:"i"}});
      res.status(200).json({
        data,
        total: count,
      });
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  }

  async queryProduct(req, res) {
    const data = req.query;
    console.log(data);
    if (data?.category && data?.brand) {
      await Product.find({ category: data?.category, brand: data?.brand })
        .limit(data.limit)
        .then((product) => {
          res.status(200).json(product);
        })
        .catch(() => {
          res.status(500).json(err);
        });
    } else if (data?.category) {
      await Product.find({ category: data?.category })
        .limit(data.limit)
        .then((product) => {
          res.status(200).json(product);
        })
        .catch(() => {
          res.status(500).json(err);
        });
    } else {
      await Product.find({ brand: data?.brand })
        .limit(data.limit)
        .then((product) => {
          res.status(200).json(product);
        })
        .catch(() => {
          res.status(500).json(err);
        });
    }
  }

  async queryProductNew(req, res) {
    try {
      //  let obj = {

      //   "parameter.RAM": [
      //     "4 GB"],
      // }
      // let products;

      // products= await Product.find(obj);

      // let obj = {
      //   "brand": ["Samsung","Xiaomi"],
      //   "category": "Phone",
      // }
      let obj = req.body;
      let products;

      products = await Product.find(obj);

      res.json(products);
    } catch (err) {
      console.log(err, "filter Controller.searchByQueryType error");
      res.status(500).json({
        errorMessage: "Please try again later",
      });
    }

    // const { type, query } = req.body;

    // try {
    //   let products;

    //   switch (type) {
    //     case 'text':
    //       products = await Product.find({ $text: { $search: query } });
    //       break;
    //     case 'category':
    //       products = await Product.find({ productCategory: query });
    //       break;
    //   }

    //   if (!products.length > 0) {
    //     products = await Product.find({});
    //   }

    //   res.json({ products });
    // } catch (err) {
    //   console.log(err, 'filter Controller.searchByQueryType error');
    //   res.status(500).json({
    //     errorMessage: 'Please try again later',
    //   });
    // }
  }
}

module.exports = new ProductController();

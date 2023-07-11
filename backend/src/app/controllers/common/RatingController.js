const Rating = require("../../models/Rating");

class RatingController {
  // [GET] /Rating/all
  async getAllRating(req, res, next) {
    const pageIndex = parseInt(req.query.pageIndex);
    const pageSize = parseInt(req.query.pageSize);
    const skipIndex = (pageIndex - 1) * pageSize;

    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    const queryObj = {
      ...req.query,
      ...(fromDate &&
        toDate && {
          updatedAt: {
            $gte: new Date(fromDate),
            $lt: new Date(toDate),
          },
        }),
    };
    const excludedFields = ["pageIndex", "pageSize"];
    excludedFields.forEach((el) => delete queryObj[el]);
    try {
      const data = await Rating.find(queryObj)
        .limit(pageSize)
        .skip(skipIndex)
        .exec();
      const count = await Rating.countDocuments(queryObj);
      res.status(200).json({
        data,
        total: count,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // [delete] /Rating/delete/:id
  async deleteRating(req, res) {
    try {
      await Rating.findByIdAndDelete(req.params.id);
      res.status(200).json("Rating deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  // [GET] /Rating/get/product/:id product
  async getRatingByProduct(req, res, next) {
    await Rating.find({ product_id: req.params.id })
      .populate("user_id")
      .then((rating) => {
        res.status(200).json(rating);
      })
      .catch(next);
  }

  //[PUT]  /Rating/edit/:id
  async updateRating(req, res, next) {
    const rating = await Rating.findById(req.params.id);

    const check = rating.discuss.some((e) => {
      if (e._id === req.body._id) return true;
    });
    if (check) {
      await Rating.updateOne(
        {
          _id: req.params.id,
          "discuss._id": req.body._id,
        },
        { $set: { "discuss.$.discuss": [req.body] } }
      )
        .then(() => res.status(200).json("Reply Success"))
        .catch(next);
    } else {
      await Rating.updateOne(
        { _id: req.params.id },
        { $push: { discuss: req.body } }
      )
        .then(() => res.status(200).json("Updated Success"))
        .catch(next);
    }
  }

  //[PUT]  /rating/:id/addDiscuss
  async addDiscussRating(req, res, next) {
    await Rating.updateOne(
      { _id: req.params.id },
      { $push: { discuss: req.body } }
    )
      .then(() => res.status(200).json("Reply Success"))
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  //  [POSt] /Product/new
  async newRating(req, res, next) {
    const formData = req.body;

    const newRating = new Rating(formData);

    newRating
      .save()
      .then(() => res.status(200).json(newRating))
      .catch((error) => {
        res.status(500).json(error);
      });
  }

  async getRatingPage(req, res, next) {
    const perPage = 10; //10docs in single page
    const page = req.params.id;
    await Rating.find({})
      .skip(perPage * page)
      .limit(perPage)
      .populate("product_id")
      .populate("customer_id")
      .then((rating) => res.status(200).json(rating))
      .catch((error) => {
        res.status(500).json(error);
      });
  }
}

module.exports = new RatingController();

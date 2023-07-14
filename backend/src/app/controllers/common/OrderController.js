const Order = require("../../models/Order");

const mongoose = require("mongoose");

class OrderController {
  // [GET] /order/all
  async getAllorder(req, res, next) {
    const pageIndex = parseInt(req.query.pageIndex);
    const pageSize = parseInt(req.query.pageSize);
    const skipIndex = (pageIndex - 1) * pageSize;

    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const totalPrice = req.query.totalPrice?.split("-");
    const sort = req.query.sort ? JSON.parse(req.query.sort) : {};

    const queryObj = {
      ...req.query,
      ...(fromDate &&
        toDate && {
          updatedAt: {
            $gte: new Date(fromDate),
            $lt: new Date(toDate),
          },
        }),
      ...(totalPrice && {
        totalPrice: {
          $gte: Number(totalPrice[0] || 0),
          $lt: Number(totalPrice[1] || 999999999),
        },
      }),
    };

    const excludedFields = ["pageIndex", "pageSize"];
    excludedFields.forEach((el) => delete queryObj[el]);
    try {
      const data = await Order.find(queryObj)
        .sort(sort)
        .limit(pageSize)
        .skip(skipIndex)
        .exec();
      const count = await Order.countDocuments(queryObj);
      res.status(200).json({
        data,
        total: count,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // [delete] /order/delete/:id
  async deleteorder(req, res) {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("order deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  // [GET] /order/get/:id
  async getorder(req, res, next) {
    await Order.findById(req.params.id)
      .then((order) => {
        res.status(200).json(order);
      })
      .catch(next);
  }
  //[PUT]  /order/edit/:id
  async update(req, res, next) {
    await Order.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.status(200).json("Updated Success"))
      .catch(next);
  }

  async cancel(req, res, next) {
    await Order.updateOne({ _id: req.params.oid }, {status:"Đã hủy"})
      .then(() => res.status(200).json("Updated Success"))
      .catch(next);
  }
  //  [POSt] /Product/new
  async neworder(req, res, next) {
    const formData = req.body;

    const neworder = new Order(formData);

    neworder
      .save()
      .then(() => res.status(200).json(neworder))
      .catch((error) => {
        res.status(500).json(error);
        console.log(error);
      });
  }

  // [GET] /order/all
  async getAllorderById(req, res, next) {
    Order.find({ customer_id: req.params.oid })

      .then((order) => {
        res.status(200).json(order);
      })
      .catch((err) => {
        res.status(500).json(err);
      });

    // res.send('detail'+req.params.slug)
  }

  async getOrderById(req, res, next) {
    Order.findById(req.params.id)

      .then((order) => {
        res.status(200).json(order);
      })
      .catch((err) => {
        res.status(500).json(err);
      });

    // res.send('detail'+req.params.slug)
  }

  // [GET] /order/all
  async getAllorderByIdSeller(req, res, next) {
    Order.find({ seller_id: req.params.id })
      // .populate('seller_id')
      .populate("customer_id")
      .populate("pay_id")
      .populate("status")
      .then((order) => {
        res.status(200).json(order);
      })
      .catch(() => {
        res.status(500).json(err);
      });

    // res.send('detail'+req.params.slug)
  }

  async getorderLength(req, res) {
    await Order.find()
      .count()
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        return res.status(500).json(err);
      });
  }
}

module.exports = new OrderController();

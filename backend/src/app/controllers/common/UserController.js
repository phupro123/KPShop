const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { promise } = require("bcrypt/promises");
const jwt = require("jsonwebtoken");

class UserController {
  // [GET] /user/all
  async getAllUser(req, res, next) {
    const pageIndex = parseInt(req.query.pageIndex);
    const pageSize = parseInt(req.query.pageSize);
    const skipIndex = (pageIndex - 1) * pageSize;

    const fullname = req.query.fullname || "";
    const username = req.query.username || "";

    const queryObj = {
      ...req.query,
      ...(fullname && {
        fullname: { $regex: fullname, $options: "i" },
      }),
      ...(username && {
        username: { $regex: username, $options: "i" },
      }),
    };
    const excludedFields = ["pageIndex", "pageSize"];
    excludedFields.forEach((el) => delete queryObj[el]);
    const sort = req.query.sort && JSON.parse(req.query.sort);

    try {
      const data = await User.find(queryObj)
        .sort(sort)
        .limit(pageSize)
        .skip(skipIndex)
        .exec();
      const count = await User.countDocuments(queryObj);
      res.status(200).json({
        data,
        total: count,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // [delete] /user/delete/:id
  async deleteUser(req, res) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  // [GET] /user/get/:id
  async getUser(req, res, next) {
    await User.find({ userId: req.params.id })
      .then((user) => {
        console.log(user);
        res.status(200).json(user);
      })
      .catch(next);
  }
  //[PUT]  /user/edit/:id
  async update(req, res, next) {
    console.log("'''''''''''''''''", req.user);
    await User.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        User.findById(req.params.id).then((user) => {
          //   req.logIn(user, function (err) {
          //     if (err) { return next(err); }
          //     return { // Do  redirect perhaps? }
          // }})

          // req.logIn(user, function(error) {
          //     if (!error) {
          //        console.log('succcessfully updated user');
          //     }
          // });

          // res.end(); // important to update session

          res.status(200).json(user);
        });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }
  //[PUT]  /user/editPass/:id
  async updatePass(req, res, next) {
    // Get info
    const formData = req.body;
    // Encode pass
    const salt = await bcrypt.genSalt(10);
    formData.password = await bcrypt.hash(formData.password, salt);

    await User.updateOne({ _id: req.params.id }, formData)
      .then(() => {
        User.findById(req.params.id).then((user) => {
          res.status(200).json(user);
        });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  //  [POSt] /user/new
  async newUser(req, res, next) {
    try {
      const count = await User.find().count();
      const formData = req.body;

      User.init();
      const temp = { ...formData, userId: count + 1 };
      const user = new User(temp);

      user
        .save()
        .then((user) => res.status(200).json(user))
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getUserLength(req, res) {
    await User.find()
      .count()
      // await User.aggregate( [
      //     { $count: 'username'  }
      // ])
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  async addToWishlist(req, res) {
    const { _id, prodId } = req.body;
    try {
      const user = await User.findById(_id);
      const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
      if (alreadyadded) {
        let user = await User.findByIdAndUpdate(
          _id,
          {
            $pull: { wishlist: prodId },
          },
          {
            new: true,
          }
        );
      } else {
        let user = await User.findByIdAndUpdate(
          _id,
          {
            $push: { wishlist: prodId },
          },
          {
            new: true,
          }
        );
      }
      let temp = await User.findById(_id)
        .select("-password")
        .populate("wishlist");
      res.status(200).json(temp);
    } catch (error) {
      throw new Error(error);
    }
  }
  async pushAddress(req, res) {
    const formData = req.body;
    let position = 99;
    if (formData.isDefault) {
      position = 0;
    }
    await User.updateOne(
      { _id: req.params.id },
      { $push: { address: { $each: [formData], $position: position } } }
    );
    await User.findById({ _id: req.params.id })
      .select("-password")
      .populate("wishlist")
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  async popAddress(req, res) {
    const formData = req.body;

    await User.updateOne(
      { _id: req.params.id },
      { $pull: { address: formData } }
    );
    await User.findById({ _id: req.params.id })
      .select("-password")
      .populate("wishlist")
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  async editAddress(req, res) {
    const { oldAddress, newAddress } = req.body;

    if (newAddress.isDefault) {
      await User.updateOne(
        { _id: req.params.id },
        { $pull: { address: oldAddress } }
      );
      await User.updateOne(
        { _id: req.params.id },
        {
          $push: {
            address: { $each: [newAddress], $position: 0 },
          },
        }
      );
    } else {
      await User.updateOne(
        {
          _id: req.params.id,
          address: { $elemMatch: oldAddress },
        },
        {
          $set: {
            "address.$.fullname": newAddress.fullname,
            "address.$.phone": newAddress.phone,
            "address.$.city": newAddress.city,
            "address.$.district": newAddress.district,
            "address.$.ward": newAddress.ward,
            "address.$.address": newAddress.address,
            "address.$.mnemonicName": newAddress.mnemonicName,
            "address.$.isDefault": newAddress.isDefault,
          },
        }
      );
    }
    await User.findById({ _id: req.params.id })
      .select("-password")
      .populate("wishlist")
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  async editPhone(req, res, next) {
    const user = await User.findOne({ phone: req.body.phone });

    // Check account
    if (user) {
      return res.status(304).json("Số điện thoại đã được sử dụng");
    }

    await User.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        User.findById(req.params.id).then((user) => {
          res.status(200).json(user);
        });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  async checkEmail(req, res, next) {
    const user = await User.findOne({ username: req.body.username });

    // Check account
    if (user) {
      return res.status(200).json("Địa chỉ email đã được sử dụng");
    }
    return res.status(200).json("");
  }
  async checkPhone(req, res, next) {
    const user = await User.findOne({ phone: req.body.phone });

    // Check account
    if (user) {
      return res.status(200).json("Phone đã được sử dụng");
    }
    return res.status(200).json("");
  }
  async getWishList(req, res) {
    const token = req.body.accessToken;
    const user = await User.findOne({ userId: req.body.userId }).populate(
      "wishlist"
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, token });
  }
  async checkPassword(req, res, next) {
    console.log(req.body)
    const user = await User.findOne({ username: req.body.username });

    // Check account
    if (user.password) {
      return res.status(200).json("Có pass");
    }
    return res.status(200).json("Không");
  }
  
}

module.exports = new UserController();

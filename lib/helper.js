const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/knex");
const { dataUri } = require("../middleware/multer");
const { cloudinary } = require("../config/cloudinary");

const helper = {
  emailExist: (tbl, email) => {
    let ans = { exist: false };
    db(tbl)
      .where({ email })
      .select("email")
      .then((data) => {
        console.log(data, data.length);
        if (data.length > 0) {
          ans = { exist: true };
          console.log("greaten than zero");
        } else {
          ans = { exist: false };
          console.log("less than one");
        }
      });
    return ans;
  }, 
  nameExist: async (tbl, name) => {
    var reply = false;
    await db(tbl)
      .where({ name })
      .select()
      .then((data) => {
        if (data.length > 0) {
          reply = true;
        } else {
          reply = false;
        }
      });
    return reply;
  },
  updateStatus: async (tbl, id, status) => {
    var reply = false;
    const updated_at = new Date().toLocaleString();
    await db(tbl)
      .where({ id })
      .update({ status, updated_at })
      .then((data) => {
        if (data) {
          reply = true;
        } else {
          reply = false;
        }
      });
    return reply;
  },
  emptyCartItem: async (id) => {
    await db("orders").where("id", id).del();
  },
  plusStock: async (id, addedQty) => {
    var reply = false;
    const updated_at = new Date().toLocaleString();
    const stock = await db("stocks").where({ id }).select();
    console.log({ stock });
    let oldQty = stock[0].quantity;
    const quantity = oldQty + addedQty;
    await db("stocks")
      .where({ id })
      .update({ quantity, updated_at })
      .then((data) => {
        if (data) {
          reply = true;
        } else {
          reply = false;
        }
      });
    // })
    return reply;
  },
  minusStock: async (id, sold) => {
    var reply = false;
    const updated_at = new Date().toLocaleString();
    const stock = await db("stocks").where({ id }).select();
    let oldQty = stock[0].quantity;
    const quantity = oldQty - sold;
    await db("stocks")
      .where({ id })
      .update({ quantity, updated_at })
      .then((data) => {
        if (data) {
          reply = true;
        } else {
          reply = false;
        }
      });
    // })
    return reply;
  },
  isThereToken: (req) => {
    let data = {};
    if (
      (req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "bearer") ||
      (req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      data = {
        exist: true,
        token,
      };
    } else {
      data = { exist: false };
    }
    return data;
  },

  getProfile: (req, tbl, id) => {
    let payload = {};
    try {
      const verify = helper.isThereToken(req);
      if (verify && verify.exist === true) {
        const token = verify.token;
        db("signatures")
          .where({ token })
          .select(id)
          .then((data) => {
            if (data) {
              db(tbl)
                .where("id", data[0][id])
                .then((res) => {
                  // console.log('profile', res[0]);
                  payload.exist = true;
                  payload.data = res[0];
                });
            } else {
              payload.exist = false;
              payload.msg = "Invalid token, please sign in and try again!";
            }
          });
      } else {
        payload.exist = false;
        payload.msg = "Invalid token, please sign in and try again!";
      }
    } catch (err) {
      console.log("error", err);
    }
    return payload;
  },

  hash: (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  },

  generateToken: (user) => {
    try {
      var token = jwt.sign(user.id, process.env.SECRET_KEY);
      return token;
    } catch (err) {
      console.log("error", err);
    }
  },

  getRandomizer: (bottom, top) => {
    return function () {
      return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
    };
  },
  generateOTP: () => {
    var rollDie = helper.getRandomizer(0, 9);

    var results = "";
    for (var i = 0; i < 7; i++) {
      results += rollDie() + " "; //make a string filled with 1000 random numbers in the range 1-6.
    }
    return results;
  },
  setSignature: async (id, token) => {
    var reply = false;
    const updated_at = new Date().toLocaleString();
    await db("logins")
      .where("id", id)
      .update("token", token)
      .update("updated_at", updated_at)
      .then((data) => {
        if (data > 0) {
          reply = true;
        } else {
          reply = false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return reply;
  },
  setActivation: (email, phone, code, status) => {
    db("activations")
      .insert({ email, phone, code, status })
      .then((res) => {
        return res;
      });
  },
  uploader: async (file) => {
    var reply = null;
    const image = dataUri(file).content;
    await cloudinary.uploader
      .upload(image)
      .then((data) => {
        reply = data;
      })
      .catch((err) => {
        console.log(err);
      });

    return reply;
  },
};

module.exports = helper;

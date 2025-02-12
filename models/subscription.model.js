import mongoose from "mongoose"

const subSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: 3,
      maxLength: 30,
    },

    price: {
      type: String,
      required: [true, "Price is required"],
      min: [0, "Price should be greater than 0"],
    },

    currency: {
      type: String,
      enum: ["MAD", "USD", "EUR"],
      default: "MAD",
    },

    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },

    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
      ],
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },

    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },

    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
            return value > this.startDate
        },
        message: "Renewal date must be after start date",    
      },
    },

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },

  },
  { timestamps: true }
);


// auto calculate the renewal date if missing
subSchema.pre('save', function (next) {

    if (!this.renewalDate) {

        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        }

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency] );
    };

    // auto update the status if renewal date has passed
    if(this.renewalDate < new Date()) {
        this.status = 'expired';
    };

    next();
});

const Subscription = mongoose.model("Subscription", subSchema);

export default Subscription;
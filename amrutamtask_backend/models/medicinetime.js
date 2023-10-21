const mongoose = require("mongoose");
const { Schema } = mongoose;

const medicineTimingSchema = new Schema({
   patient: {
      name: {
         type: String,
      },
      userId: {
         type: Schema.Types.ObjectId,
         ref: 'User',
      }
   },
   caretaker: {
      name: {
         type: String,
      },
      userId: {
         type: Schema.Types.ObjectId,
         ref: 'User',
      }
   },
   medicineNames: String,
   from: String,
   to: String,
   frequency: String,
   times: [String],
   postedAt: String,
   email: String,
   contactNo: String,
   whatsAppNo: String,
   courseStatus: String,
});

module.exports = mongoose.model("MedicineIntakeSchedule", medicineTimingSchema);
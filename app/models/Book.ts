import { Schema, model, models } from "mongoose";

const BookSchema = new Schema({
  title: String,
  author: String,

  price: Number,
});

const Book = models.Book || model("Book", BookSchema);
export default Book;

import mongoose, { Model, models, Schema, Types } from "mongoose";

type NoteDocument = {
  _id: Types.ObjectId;
  title: string;
  content: string;
  isArchived: boolean;
  tags: string[];
  lastEdited?: string;
};

type NoteType = Types.Subdocument & NoteDocument;

type NotesDocument = {
  userId: string;
  notes: Types.DocumentArray<NoteType>;
};

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },

    content: {
      type: String,
      required: [true, "content is required"],
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    tags: {
      type: [String],
      required: [true, "tag is required"],
    },

    lastEdited: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const notesSchema = new Schema({
  userId: {
    type: String,
    required: [true, "UserId is required"],
  },
  notes: [noteSchema],
});

export const Note: Model<NoteDocument> =
  models.Note || mongoose.model<NoteDocument>("Note", noteSchema);

export const Notes: Model<NotesDocument> =
  models.Notes || mongoose.model<NotesDocument>("Notes", notesSchema);

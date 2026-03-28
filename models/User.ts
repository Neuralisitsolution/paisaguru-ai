import mongoose, { Schema, Document } from 'mongoose';

export interface IQuizScore {
  quizId: mongoose.Types.ObjectId;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: Date;
}

export interface IUser extends Document {
  email: string;
  name: string;
  quizScores: IQuizScore[];
  newsletterSubscribed: boolean;
  interests: string[];
  createdAt: Date;
  updatedAt: Date;
}

const QuizScoreSchema = new Schema<IQuizScore>(
  {
    quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
    quizTitle: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    percentage: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: { type: String, required: true, trim: true },
    quizScores: { type: [QuizScoreSchema], default: [] },
    newsletterSubscribed: { type: Boolean, default: false },
    interests: { type: [String], default: [] },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

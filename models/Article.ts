import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  metaDescription: string;
  category: string;
  author: {
    name: string;
    title: string;
    bio: string;
    slug: string;
    image: string;
  };
  faqs: { question: string; answer: string }[];
  status: 'draft' | 'review' | 'published' | 'rejected';
  qualityScore: number;
  wordCount: number;
  readingTime: number;
  expertReviewed: boolean;
  factChecked: boolean;
  templateType: number;
  views: number;
  shares: number;
  createdAt: Date;
  updatedAt: Date;
  metaTitle: string;
  tags: string[];
  publishedAt: Date | null;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    metaDescription: { type: String, required: true },
    category: { type: String, required: true, index: true },
    author: {
      name: { type: String, required: true },
      title: { type: String, required: true },
      bio: { type: String, required: true },
      slug: { type: String, required: true },
      image: { type: String, required: true },
    },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      enum: ['draft', 'review', 'published', 'rejected'],
      default: 'draft',
      index: true,
    },
    qualityScore: { type: Number, default: 0 },
    wordCount: { type: Number, default: 0 },
    readingTime: { type: Number, default: 0 },
    expertReviewed: { type: Boolean, default: false },
    factChecked: { type: Boolean, default: false },
    templateType: { type: Number, default: 1 },
    views: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    metaTitle: { type: String, default: '' },
    tags: [{ type: String }],
    publishedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

ArticleSchema.index({ slug: 1 });
ArticleSchema.index({ category: 1, status: 1 });
ArticleSchema.index({ createdAt: -1 });

export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

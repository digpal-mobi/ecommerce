import mongoose, { Schema, Types } from "mongoose";

export interface ISession {
  userId: Types.ObjectId;
  refreshTokenHash: string;
  familyId: Types.ObjectId;
  expiresAt: Date;
  revokedAt: Date | null;
  replacedBy?: Types.ObjectId;
  userIP?: string;
  deviceInfo?: {
    os?: string;
    browser?: string;
    deviceType?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    refreshTokenHash: {
      type: String,
      required: true,
      unique: true,
    },

    familyId: {
      type: Schema.Types.ObjectId,
      required: true,
    }, // to allow revoking all sessions of a family

    expiresAt: {
      type: Date,
      required: true,
    },

    revokedAt: {
      type: Date,
      default: null,
    },

    replacedBy: {
      type: Schema.Types.ObjectId,
      ref: "Session",
    },

    userIP: {
      type: String,
    },

    deviceInfo: {
      os: String,
      browser: String,
      deviceType: String,
    },
  },
  {
    timestamps: true,
  }
);

sessionSchema.index({ userId: 1, revokedAt: 1 }); // to quickly find sessions of a user that are not revoked
sessionSchema.index({ familyId: 1 }); // to quickly find all sessions of a family

export const SessionModel =
  mongoose.models.Session ||
  mongoose.model<ISession>("Session", sessionSchema);

export default SessionModel;
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

@Schema()
export class Contact {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  user: User;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ default: 'personal' })
  type: string;

  @Prop({ default: Date.now() })
  date: Date;
}

export type ContactDocument = Contact & mongoose.Document;

export const ContactSchema = SchemaFactory.createForClass(Contact);
